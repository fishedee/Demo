package main

import (
    "crypto/tls"
    "golang.org/x/net/http2"
    "net"
    "net/http"
    "fmt"
    "time"
    "io/ioutil"
)


func main(){
    client := &http.Client{
        Transport:&http2.Transport{
            DialTLS: func(netw,addr string,cfg *tls.Config)(net.Conn,error){
                return tls.Dial(netw,addr,cfg)
            },
        },
        Timeout:10*time.Second,
    }
    resp, err := client.Get("https://www.turnitin.com/")
    if err != nil  {
        fmt.Println("get error", err)
        return
    }
    defer resp.Body.Close()

    _,err = ioutil.ReadAll(resp.Body)
    if err != nil{
        fmt.Println("read body error",err)
        return
    }
    fmt.Println("finish!")
}