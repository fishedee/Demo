package spring_test;

import lombok.Data;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by fish on 2021/4/25.
 */
@RestController
@RequestMapping("/hello")
public class Controller {

    @GetMapping("/go1")
    public Map<String,String> go1(){
        Map<String,String> result =  new HashMap<String,String>();
        result.put("a","b");
        return result;
    }

    @GetMapping("/go2/{id}")
    public Map<String,String> go2(@PathVariable(name = "id") String id, @RequestParam(name = "name",required = true) String name) {
        Map<String,String> result =  new HashMap<String,String>();
        result.put("id",id);
        result.put("name",name);
        return result;
    }

    @Data
    public static class Req{
        private List<String> names;
    }

    //使用urlEncode的数组参数成功,但要注意下标要从0开始
    //localhost:8080/hello/go3?names%5B0%5D=1&names%5B1%5D=2
    @GetMapping("/go3")
    public Map<String,Object> go3(Req req) {
        Map<String,Object> result =  new HashMap<>();
        result.put("names",req.getNames());
        return result;
    }

    //使用Get请求的requestBody是不成功的
    @GetMapping("/go4")
    public Map<String,Object> go4(@RequestBody List<String> names){
        Map<String,Object> result =  new HashMap<>();
        result.put("names",names);
        return result;
    }

    //使用Post请求,传递json的参数的对象体是没有问题的
    //注意,请求的HeaderType要设置为application/json
    @PostMapping("/go5")
    public Map<String,Object> go5(@RequestBody Map<String,Object> data){
        return data;
    }

    //使用Post请求,传递json的参数的数组体是没有问题的
    //注意,请求的HeaderType要设置为application/json
    @PostMapping("/go6")
    public Map<String,Object> go6(@RequestBody List<String> data){
        Map<String,Object> result =  new HashMap<>();
        result.put("list",data);
        return result;
    }

    @GetMapping("/go7")
    public String go7(){
        throw new RuntimeException("123");
    }
}
