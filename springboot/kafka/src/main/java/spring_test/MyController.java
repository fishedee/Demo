package spring_test;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.errors.ConcurrentTransactionsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringWriter;
import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * Created by fish on 2021/4/25.
 */
//@Controller+@ResponseBody，相当于@RestController
@Controller
@ResponseBody
@RequestMapping("/hello")
@Slf4j
public class MyController {

    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;

    //http://localhost:8585/hello/sendSync?topic=topic2&msg=cc
    @GetMapping("sendSync")
    public void sendSync(@RequestParam("topic")String topic,
                            @RequestParam("msg")String msg)throws InterruptedException, ExecutionException {
        ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic,msg);
        SendResult<String, String> sendResult = future.get();
    }

    @GetMapping("testTopic3")
    public void testTopic3()throws InterruptedException, ExecutionException {
        for( int i = 1 ;i <=6;i++){
            kafkaTemplate.send("topic3","c"+i);
        }
    }

    @GetMapping("sendAsync")
    public void sendAsync(@RequestParam("topic")String topic,
                            @RequestParam("msg")String msg)throws InterruptedException, ExecutionException {
        //key是由于路由分区的key，可以指定，可以不指定。不指定的情况下，kafka使用msg的哈希来确定路由的key
        String key = "cc";
        ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic,key,msg);
        future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
            @Override
            public void onFailure(Throwable throwable) {
                //FIXME 没能测试出来失败的情况，把broker中途关闭无法触发
                log.info("send kafka msg fail {}",throwable);
            }

            @Override
            public void onSuccess(SendResult<String, String> stringStringSendResult) {
                log.info("send kafka msg success {}");
            }
        });
    }
}
