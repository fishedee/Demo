package spring_test;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class MainConfig {
    @Bean
    public NewTopic initialTopic(){
        return new NewTopic("topic1",1,(short)1);
    }

    @Bean
    public NewTopic initialTopic2(){
        return new NewTopic("topic2",1,(short)1);
    }

    @Bean
    public NewTopic initialTopic3(){
        return new NewTopic("topic3",1,(short)1);
    }

    @Bean
    public NewTopic initialTopic4(){
        return new NewTopic("topic4",1,(short)1);
    }
}
