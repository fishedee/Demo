package spring_test;

        import io.swagger.v3.oas.annotations.Operation;
        import io.swagger.v3.oas.annotations.Parameter;
        import io.swagger.v3.oas.annotations.tags.Tag;
        import lombok.AllArgsConstructor;
        import lombok.Data;
        import lombok.NoArgsConstructor;
        import lombok.extern.slf4j.Slf4j;
        import org.springframework.core.annotation.Order;
        import org.springframework.validation.annotation.Validated;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.constraints.Min;
        import javax.validation.constraints.NotEmpty;
        import javax.validation.constraints.NotNull;
        import java.util.HashMap;
        import java.util.List;
        import java.util.Map;

/**
 * Created by fish on 2021/4/25.
 */
@RestController
@RequestMapping("/hello")
@Slf4j
@Validated
@Tag(name="控制器A",description = "接口B")
public class Controller {

    //GET请求 http://localhost:8080/hello/go1
    @GetMapping("/go1")
    public String go1(){
        return "Hello World";
    }

    //POST请求 http://localhost:8080/hello/go2
    /*
    {
        "name":123,
        "email":"123@qq.com",
        "size":4,
        "total":"8.0",
        "id":1
    }
     */
    @PostMapping("/go2")
    public void go2(@NotNull Long id, OrderDO orderDO){
        log.info("go2 {} {}",id,orderDO);
    }

    //GET请求 http://localhost:8080/hello/go2
    //localhost:8080/hello/go3?id=123&data=%7B%22name%22:123,%22email%22:%22123@qq.com%22,%22size%22:4,%22total%22:%228.0%22%7D
    //localhost:8080/hello/go3?id=123&data={"name":123,"email":"123@qq.com","size":4,"total":"8.0"},原始格式
    //@RequestParam指定的放其指定的字段上
    //其他的参数默认放在data字段上,用json格式,并且用urlEncode过
    @GetMapping("/go3")
    public void go3(@NotNull @RequestParam("id") Long id,OrderDO orderDO){
        log.info("go3 {} {}",id,orderDO);
    }

    @Operation(summary = "获取信息go4")
    @PostMapping("/go4")
    public OrderDO go4(@RequestBody OrderDO order){return order;}

    @Operation(summary = "获取信息go5")
    @Parameter(name="u",description="必传")
    @GetMapping("/go5")
    public OrderDO go5(OrderDO u,Long id){return u;}

    @Operation(summary = "获取信息go6")
    @GetMapping("/go6")
    public OrderDO2 go6(){return new OrderDO2();}

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Page<T>{
        private int count;
        private List<T> data;
    }

    @Operation(summary = "获取信息go7")
    @GetMapping("/go7")
    public Page<OrderDO> go7(){return new Page<>();}

    @Operation(summary = "获取信息go8")
    @GetMapping("/go8")
    public Page<OrderDO2> go8(){return new Page<>();}
}
