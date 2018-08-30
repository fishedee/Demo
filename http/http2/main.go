package main

import (
	"bytes"
	"compress/gzip"
	"crypto/tls"
	"encoding/binary"
	"fmt"
	"golang.org/x/net/http2/hpack"
	"io"
	"io/ioutil"
	"net"
	"strconv"
)

const (
	FrameData         uint8 = 0x0
	FrameHeaders      uint8 = 0x1
	FramePriority     uint8 = 0x2
	FrameRSTStream    uint8 = 0x3
	FrameSettings     uint8 = 0x4
	FramePushPromise  uint8 = 0x5
	FramePing         uint8 = 0x6
	FrameGoAway       uint8 = 0x7
	FrameWindowUpdate uint8 = 0x8
	FrameContinuation uint8 = 0x9
)

const (
	// Data Frame
	FlagDataEndStream uint8 = 0x1
	FlagDataPadded    uint8 = 0x8

	// Headers Frame
	FlagHeadersEndStream  uint8 = 0x1
	FlagHeadersEndHeaders uint8 = 0x4
	FlagHeadersPadded     uint8 = 0x8
	FlagHeadersPriority   uint8 = 0x20

	// Settings Frame
	FlagSettingsAck uint8 = 0x1

	// Ping Frame
	FlagPingAck uint8 = 0x1

	// Continuation Frame
	FlagContinuationEndHeaders uint8 = 0x4

	FlagPushPromiseEndHeaders uint8 = 0x4
	FlagPushPromisePadded     uint8 = 0x8
)

type Frame struct {
	Type     uint8
	Flags    uint8
	StreamID uint32
	Data     []byte
}

func readFrame(r io.Reader) Frame {
	const frameHeaderLen = 9
	buf := make([]byte, frameHeaderLen, frameHeaderLen)
	_, err := io.ReadFull(r, buf)
	if err != nil {
		panic(err)
	}
	length := (uint32(buf[0])<<16 | uint32(buf[1])<<8 | uint32(buf[2]))
	frame := Frame{
		Type:     buf[3],
		Flags:    buf[4],
		StreamID: binary.BigEndian.Uint32(buf[5:]) & (1<<31 - 1),
	}
	if length != 0 {
		frame.Data = make([]byte, length, length)
		_, err := io.ReadFull(r, frame.Data)
		if err != nil {
			panic(err)
		}
	}
	return frame
}

func writeFrame(w io.Writer, frame Frame) {
	const frameHeaderLen = 9
	buf := make([]byte, frameHeaderLen, frameHeaderLen)
	length := len(frame.Data)
	buf[0] = byte(length >> 16)
	buf[1] = byte(length >> 8)
	buf[2] = byte(length)
	buf[3] = byte(frame.Type)
	buf[4] = byte(frame.Flags)
	buf[5] = byte(frame.StreamID >> 24)
	buf[6] = byte(frame.StreamID >> 16)
	buf[7] = byte(frame.StreamID >> 8)
	buf[8] = byte(frame.StreamID)

	if len(frame.Data) != 0 {
		buf = append(buf, frame.Data...)
	}

	n, err := w.Write(buf)
	if err != nil {
		panic(err)
	}
	if n != len(buf) {
		panic("write not full!")
	}
}

func encodeHeader(data [][2]string) []byte {
	var hbuf bytes.Buffer
	hpackEncoder := hpack.NewEncoder(&hbuf)
	for _, single := range data {
		hpackEncoder.WriteField(hpack.HeaderField{
			Name:  single[0],
			Value: single[1],
		})
	}
	headerData := hbuf.Bytes()
	return headerData
}

func encodeBody(data []byte) []byte {
	return data
}

func encodeUint32(v uint32) []byte {
	return append([]byte{}, byte(v>>24), byte(v>>16), byte(v>>8), byte(v))
}

func decodeHeader(frame Frame) [][2]string {
	flag := frame.Flags
	data := frame.Data
	padLength := 0
	if (flag & FlagHeadersPadded) != 0 {
		padLength = int(data[0])
		data = data[1:]
	}
	if (flag & FlagHeadersPriority) != 0 {
		panic("dosn't implement FlagHeadersPriority")
	}
	data = data[:len(data)-padLength]
	result := [][2]string{}
	var onNewHeaderField = func(f hpack.HeaderField) {
		result = append(result, [2]string{f.Name, f.Value})
	}
	decoder := hpack.NewDecoder(4096, onNewHeaderField)
	_, err := decoder.Write(data)
	if err != nil {
		panic(err)
	}
	return result
}

func decodeBody(frame Frame) []byte {
	flag := frame.Flags
	data := frame.Data
	padLength := 0
	if (flag & FlagHeadersPadded) != 0 {
		padLength = int(data[0])
		data = data[1:]
	}
	data = data[:len(data)-padLength]
	return data
}

func decompress(data []byte) []byte {
	dataReader := bytes.NewReader(data)
	gzipReader, err := gzip.NewReader(dataReader)
	if err != nil {
		panic(err)
	}
	result, err := ioutil.ReadAll(gzipReader)
	if err != nil {
		panic(err)
	}
	return result
}

func dial() net.Conn {
	cfg := &tls.Config{
		ServerName:         "yinghao.fishedee.com",
		NextProtos:         []string{"h2"},
		InsecureSkipVerify: true,
	}
	conn, err := tls.Dial("tcp", "yinghao.fishedee.com:443", cfg)
	if err != nil {
		panic(err)
	}
	err = conn.Handshake()
	if err != nil {
		panic(err)
	}
	return conn
}

func prepare(conn net.Conn) {
	conn.Write([]byte("PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n"))
	writeFrame(conn, Frame{
		Type:     FrameSettings,
		Flags:    0,
		StreamID: 0,
	})
	writeFrame(conn, Frame{
		Type:     FrameWindowUpdate,
		Flags:    0,
		StreamID: 0,
		Data:     encodeUint32(1 << 30),
	})
	frame := readFrame(conn)
	if frame.Type != FrameSettings {
		panic("read first frame fail!")
	}
	writeFrame(conn, Frame{
		Type:     FrameSettings,
		Flags:    FlagSettingsAck,
		StreamID: 0,
	})
}

func send(conn net.Conn) {
	fileData := bytes.Buffer{}
	fileData.WriteString(`------WebKitFormBoundaryLspqkg5Ax7OAwh4L
Content-Disposition: form-data; name="name"

fish
------WebKitFormBoundaryLspqkg5Ax7OAwh4L
Content-Disposition: form-data; name="file"; filename="Q-阿拉0827-0829-1500-美国文学.docx"
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document

`)
	for i := 0; i != 51200; i++ {
		fileData.WriteString("2")
	}
	fileData.WriteString("\n------WebKitFormBoundaryLspqkg5Ax7OAwh4L--")
	body := fileData.Bytes()

	header := [][2]string{
		{":method", "POST"},
		{":authority", "yinghao.fishedee.com"},
		{":scheme", "https"},
		{":path", "/test/file"},
		{"accept", "application/json, text/javascript, */*; q=0.01"},
		{"origin", "https://www.turnitin.com"},
		{"x-requested-with", "XMLHttpRequest"},
		{"user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"},
		{"content-type", "multipart/form-data; boundary=----WebKitFormBoundaryLspqkg5Ax7OAwh4L"},
		{"content-length", strconv.Itoa(len(body))},
		{"referer", "https://www.turnitin.com/t_submit.asp?r=90.7258888222476&svr=43&lang=en_us&aid=68130096"},
		{"accept-encoding", "gzip, deflate, br"},
		{"accept-language", "zh-CN,zh;q=0.9,en;q=0.8"},
		{"cookie", "_ga=GA1.2.314169825.1535456062"},
		{"cookie", "loginIntent=TRUE"},
		{"cookie", "test_cookie=1"},
		{"cookie", "xhfaculty=0"},
		{"cookie", "__utmc=162339897"},
		{"cookie", "__utmz=162339897.1535456208.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)"},
		{"cookie", "lang="},
		{"cookie", "_gid=GA1.2.1818139793.1535551441"},
		{"cookie", "session-id=783ef8b168bddd0fe307ff7c323572cf"},
		{"cookie", "t=783ef8b168bddd0fe307ff7c323572cf"},
		{"cookie", "__utma=162339897.314169825.1535456062.1535551449.1535629614.3"},
		{"cookie", "__utmt=1"},
		{"cookie", "__utmb=162339897.4.10.1535629614"},
	}
	writeFrame(conn, Frame{
		Type:  FrameHeaders,
		Flags: FlagHeadersEndHeaders,
		//Flags: FlagHeadersEndHeaders |FlagHeadersEndStream,
		StreamID: 1,
		Data:     encodeHeader(header),
	})

	maxFrameSize := 2048
	for len(body) != 0 {
		var flags uint8
		writeSize := 0
		if len(body) > maxFrameSize {
			writeSize = maxFrameSize
		} else {
			writeSize = len(body)
			flags |= FlagDataEndStream
		}
		writeFrame(conn, Frame{
			Type:     FrameData,
			Flags:    flags,
			StreamID: 1,
			Data:     encodeBody(body[0:writeSize]),
		})
		body = body[writeSize:]
	}
}

func receive(conn net.Conn) {
	frame := readFrame(conn)
	if frame.Type == FrameHeaders {
		header := decodeHeader(frame)
		fmt.Println("receive header: ", header)
	} else if frame.Type == FrameData {
		body := []byte{}
		for true {
			bodyFrame := decodeBody(frame)
			body = append(body, bodyFrame...)
			if (frame.Flags & FlagDataEndStream) != 0 {
				break
			} else {
				frame = readFrame(conn)
			}
		}
		result := decompress(body)
		fmt.Println("receive body: ", string(result))
	} else {
		fmt.Println("receive other frame ", frame.Type)
	}

}

func main() {
	conn := dial()
	prepare(conn)
	send(conn)
	for true {
		receive(conn)
	}
}
