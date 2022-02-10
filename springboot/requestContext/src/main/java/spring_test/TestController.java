package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
@Slf4j
public class TestController {

    @Autowired
    private UserHolder userHolder;

    @GetMapping("/go")
    public void go(){
        log.info("get0");
        User user = userHolder.get();
        log.info("get1 {}",user);
        User user2 = userHolder.get();
        log.info("get2 {} {}",user2,user==user2);
        /*
        每次的输出结果都是一致的，都是以下的结果
2022-02-10 17:34:56.077  INFO 8796 --- [nio-8080-exec-1] spring_test.TestController               : get0
2022-02-10 17:34:56.077  INFO 8796 --- [nio-8080-exec-1] spring_test.UserHolder                   : getFromDb User
2022-02-10 17:34:56.077  INFO 8796 --- [nio-8080-exec-1] spring_test.TestController               : get1 User(name=fish, age=120)
2022-02-10 17:34:56.078  INFO 8796 --- [nio-8080-exec-1] spring_test.TestController               : get2 User(name=fish, age=120) true
2022-02-10 17:34:56.094  INFO 8796 --- [nio-8080-exec-1] spring_test.UserHolder                   : release user
*/
    }
}
