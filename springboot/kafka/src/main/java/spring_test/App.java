package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.common.TopicPartition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@Slf4j
public class App
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @PostConstruct
    public void init(){
        //删除topic4下的关于defaultConsumerGroup的offset
        Properties properties = new Properties();
        properties.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:9092");
        AdminClient adminClient = AdminClient.create(properties);
        Set<TopicPartition> partitionSet = new HashSet<>();
        partitionSet.add(new TopicPartition("topic4",(short)0));
        adminClient.deleteConsumerGroupOffsets("defaultConsumerGroup",partitionSet);
    }

}
