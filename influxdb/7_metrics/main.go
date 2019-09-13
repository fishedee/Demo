package main

import (
	"fmt"
	. "github.com/fishedee/app/metric"
	"time"
)

func main() {
	metric, err := NewMetric(MetricConfig{
		ConnectUrl: "http://localhost:8086",
		Database:   "test",
		User:       "",
		Password:   "",
	})
	if err != nil {
		panic(err)
	}

	go func() {
		for i := 0; i != 10000; i++ {
			time.Sleep(time.Millisecond * 100)
			//递增计数器
			metric.IncCounter("reqTime", 1)

			//计量时间与次数
			metric.UpdateTimer("reqTime2", time.Second*2)

			//计量Gauge
			metric.UpdateGauge("reqTime3[path=/user/get]", 12)

			fmt.Println("finish")
		}
		metric.Close()
	}()

	metric.Run()
}
