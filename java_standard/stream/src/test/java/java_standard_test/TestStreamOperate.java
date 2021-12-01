package java_standard_test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
public class TestStreamOperate {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class User{
        private Long id;

        private String name;
    }

    @Test
    public void testMap(){
        List<User> userList = Arrays.asList(
                new User(1L,"fish"),
                new User(2L,"dog"),
                new User(3L,"sheep")
        );

        Map<Long,User> userMap = userList.stream().collect(Collectors.toMap(ref->ref.getId(), ref->ref));

        log.info("{}",userMap);
    }

    @Test
    public void testGroup(){
        List<User> userList = Arrays.asList(
                new User(1L,"fish"),
                new User(1L,"cat"),
                new User(2L,"dog"),
                new User(3L,"sheep")
        );

        Map<Long,List<User>> userMap = userList.stream().collect(Collectors.groupingBy(ref->ref.getId(),Collectors.toList()));

        log.info("{}",userMap);
    }
}
