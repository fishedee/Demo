package spring_test;

        import com.fasterxml.jackson.databind.ObjectMapper;
        import lombok.Data;
        import lombok.extern.slf4j.Slf4j;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.validation.annotation.Validated;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.constraints.Min;
        import javax.validation.constraints.NotEmpty;
        import javax.validation.constraints.NotNull;
        import java.math.BigDecimal;
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
public class Controller {

    //GET请求 http://localhost:8080/hello/go1
    @GetMapping("/go1")
    public String go1(){
        return "Hello World";
    }

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/go2")
    public String go2()throws Exception{
        OrderDO orderDO = new OrderDO();
        orderDO.setEmail("123@qq.com");
        orderDO.setName("678");
        orderDO.setSize(123);
        orderDO.setTotal(new BigDecimal("9.1"));
        orderDO.setAddress(new OrderDO.Address("中国","西藏"));
        return objectMapper.writeValueAsString(orderDO);
    }

    @GetMapping("/go3")
    public Object go3(){
        Map<Integer,EnabledEnum> result = new HashMap<Integer,EnabledEnum>();
        result.put(3,EnabledEnum.ENABLED);
        result.put(4,EnabledEnum.DISABLE);
        return result;
    }
}
