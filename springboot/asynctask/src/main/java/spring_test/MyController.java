package spring_test;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    private Service service;

    @GetMapping("/getNoAsync")
    public String getNoAsync()throws  Exception{
        service.goNoAsync();
        return "Hello World";
    }

    @GetMapping("/getAsync")
    public String getAsync()throws Exception{
        service.goAsync();
        return "Hello World";
    }
}
