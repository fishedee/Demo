package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.TopicPartition;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.AbstractConsumerSeekAware;
import org.springframework.kafka.listener.ConsumerSeekAware;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
public class MyLastButOneListener extends AbstractConsumerSeekAware {

    @KafkaListener(topics = "topic4")
    public void receiveMessage(ConsumerRecord<String,String> record) {
        log.info("receive[Topic4] msg [{}]", record.value());
    }

    @Override
    public void onPartitionsAssigned(Map<TopicPartition, Long> assignments, ConsumerSeekCallback callback) {
        super.onPartitionsAssigned(assignments,callback);
        //启动的时候，设置offset为最后的往前一个
        this.getCallbacksAndTopics().forEach((cb, topics) -> {
            topics.forEach(topic->{
                cb.seekRelative(topic.topic(),topic.partition(),-1,false);
            });
        });
    }
}
