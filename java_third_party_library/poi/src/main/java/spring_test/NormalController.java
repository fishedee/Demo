package spring_test;

import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/normal")
public class NormalController {

    @GetMapping("/get")
    public String get(@RequestParam(value = "name",required = true) String name){
        return name;
    }

    @Data
    public static class Form{
        private String name;

        private Integer age;
    }
    @PostMapping(value = "/postForm",consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public Form postForm(Form form){
        return form;
    }

    @PostMapping("/postJson")
    public Form postJson(@RequestBody Form form ){
        return form;
    }
}
