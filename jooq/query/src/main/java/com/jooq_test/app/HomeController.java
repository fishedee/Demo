package com.jooq_test.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/design",produces="application/json")
public class HomeController{
    @GetMapping("/recent")
    public String home(){
        return "123";
    }
}