package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MyListener {
    //application.properties的concurrency为1，是指单个@KafkaListener的线程为1
    //不同@KafkaListener都有自己独立的线程
    @KafkaListener(topics = {"topic1"})
    public void onMessage1(ConsumerRecord<String,String> record)throws InterruptedException{
        log.info("ReceiveMsg topic1 begin, msg: {}",record.value());
        Thread.sleep(5000);
        log.info("ReceiveMsg topic1 end");
        if( Math.random() < 0.4){
            //抛出异常以后，Kafka会发送Seek to current的信息，重置旧的offset.
            //下一次获取消息的时候，依然从旧的offset开始，也就是消息会重复一次
            throw new RuntimeException("eee");
        }
    }

    @KafkaListener(topics = {"topic2"})
    public void onMessage2(ConsumerRecord<String,String> record)throws InterruptedException{
        log.info("ReceiveMsg topic2 begin, msg: {}",record.value());
        Thread.sleep(5000);
        log.info("ReceiveMsg topic2 end");
    }

    //模拟崩溃情况下的kafka的offset，依然不会丢失offset，但是会重放offset
    @KafkaListener(topics = {"topic3"})
    public void onMessage3(ConsumerRecord<String,String> record)throws InterruptedException{
        log.info("ReceiveMsg topic3 begin, msg: {}",record.value());
        Thread.sleep(500);
        if(Math.random()<0.01){
            log.info("ReceiveMsg topic3 exit, msg: {}",record.value());
            System.exit(0);
        }
    }
}
