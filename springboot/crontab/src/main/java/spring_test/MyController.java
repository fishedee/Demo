package spring_test;

import lombok.Data;
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
@RequestMapping("/hello")
@Slf4j
public class MyController {

    @GetMapping("/get1")
    public String get1(){
        return "Hello World";
    }
}
