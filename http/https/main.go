package main

import (
	"fmt"
	"crypto/tls"
)

func main(){
	conn,err := tls.Dial("tcp","www.baidu.com:443",nil)
	if err != nil{
		panic(err)
	}
	data := 
`GET / HTTP/1.1
Host: www.baidu.com
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.9

`
	dataByte := []byte(data)
	n,err := conn.Write(dataByte)
	if err != nil{
		panic(err)
	}
	if n != len(dataByte){
		panic("write count dismatch")
	}

	buffer := make([]byte,1024,1024)
	for true{
		n,err = conn.Read(buffer)
		if err != nil{
			break
		}
		fmt.Println(string(buffer[0:n]))
	}
}