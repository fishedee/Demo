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

func encodeBody() []byte {
	return nil
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
		ServerName: "www.turnitin.com",
		NextProtos: []string{"h2"},
	}
	conn, err := tls.Dial("tcp", "www.turnitin.com:443", cfg)
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
	header := [][2]string{
		{":authority", "www.turnitin.com"},
		{":method", "GET"},
		{":path", "/"},
		{":scheme", "https"},
		{"accept-encoding", "gzip"},
	}
	writeFrame(conn, Frame{
		Type:     FrameHeaders,
		Flags:    FlagHeadersEndStream | FlagHeadersEndHeaders,
		StreamID: 1,
		Data:     encodeHeader(header),
	})
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
