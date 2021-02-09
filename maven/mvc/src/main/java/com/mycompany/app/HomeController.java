package com.mycompany.app;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(path="/design",produces="application/json")
public class HomeController{
	@GetMapping("/recent")
	public String home(){
		return "123";
	}
}