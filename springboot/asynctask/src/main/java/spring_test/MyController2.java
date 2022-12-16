package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by fish on 2021/4/25.
 */
//@Controller+@ResponseBody，相当于@RestController
@Controller
@ResponseBody
@RequestMapping("/hello2")
@Slf4j
public class MyController2 {
    @Autowired
    private Service2 service2;

    @GetMapping("/getNoAsync")
    public String getNoAsync()throws  Exception{
        service2.goNoAsync();
        return "Hello World";
    }

    @GetMapping("/getAsync")
    public String getAsync()throws Exception{
        service2.goAsync();
        return "Hello World";
    }
}
