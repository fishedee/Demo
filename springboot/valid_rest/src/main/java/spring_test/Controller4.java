package spring_test;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Range;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.util.List;

/**
 * Created by fish on 2021/4/26.
 */
@RestController
@Slf4j
@RequestMapping("/sheep")
public class Controller4 {

    @Data
    public static class Req{
        @Min(0)
        private int count;

        @NotEmpty
        private List<Integer> items;
    }

    //对于对象类型,仅能在方法的位置加入注解@Valid,只在类的顶端加入@Validated注解是无法校验的,必须要在类的方法上加入@Valid或者@Validated注解
    //localhost:8080/sheep/go1?count=10&items%5B0%5D=1&items%5B1%5D=2
    @GetMapping(value = "/go1")
    public void go1(
            @Validated Req req ){ //

        System.out.println(req);
    }

    //这样写是错误的,基础类型的校验,必须要在类的顶端加入@Validated注解,否则捕捉不了错误
    @GetMapping(value = "/go2")
    public void go2(
            @Valid
            @Min(value = 0,message = "必须为整数")
            @RequestParam("count")
            int count ){ //

        System.out.println(count);
    }

    @Data
    public  static class Req2Inner{
        @Min(value = 0,message = "id不能为空")
        private int id;

        @NotEmpty(message = "name不能为空")
        private String name;
    }

    @Data
    public static class Req2{
        @Min(value = 0,message = "count必须为正数")
        private int count;

        //嵌套校验,必须加上@Valid参数
        @Valid
        @NotEmpty(message = "items不能为空")
        private List<Req2Inner> items;
    }
    @PostMapping(value="/go3")
    //方法上可以用@Valid或者@Validated注解
    public void go3(@Valid @RequestBody Req2 req){
        System.out.println(req);
    }

    @GetMapping(value="/go4")
    public void go4(){
        //这个会报500错误,因为RuntimeException不属于Exception
        throw new RuntimeException("123");
    }

    @GetMapping(value="/go5")
    public void go5(){
        throw new MyException(1,"你好",null);
    }
}

