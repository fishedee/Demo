package spring_test;

        import com.fasterxml.jackson.core.type.TypeReference;
        import com.fasterxml.jackson.databind.ObjectMapper;
        import com.fasterxml.jackson.databind.type.CollectionType;
        import com.fasterxml.jackson.databind.type.TypeFactory;
        import lombok.Data;
        import lombok.extern.slf4j.Slf4j;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.validation.annotation.Validated;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.constraints.Min;
        import javax.validation.constraints.NotEmpty;
        import javax.validation.constraints.NotNull;
        import java.lang.reflect.Type;
        import java.math.BigDecimal;
        import java.util.*;

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
        orderDO.setExtInfo(objectMapper.writeValueAsString(Arrays.asList(
                new OrderDO.Address("中国","西藏"),
                new OrderDO.Address("中国2","西藏2")
        )));
        orderDO.setEmail("123@qq.com");
        orderDO.setName("678");
        orderDO.setSize(123);
        orderDO.setTotal(new BigDecimal("9.1"));
        orderDO.setAddress(new OrderDO.Address("中国","西藏"));
        return objectMapper.writeValueAsString(orderDO);
    }

    private void showOrderDO(List<OrderDO2> data){
        log.info("begin log List<OrderDO>");
        data.forEach((single)->{
            log.info("address:{}",single.getAddress());
        });
    }
    @GetMapping("/go2_2")
    public String go2_2()throws Exception{

        String input = "["+
                "{\"city\":\"中国\",\"street\":\"西藏\",\"extInfo\":[{\"city\":\"中国\",\"street\":\"西藏\"},{\"city\":\"中国2\",\"street\":\"西藏2\"}],\"size\":123,\"total\":\"9.1\",\"fish_name\":\"678\"},"+
                "{\"city\":\"中国2\",\"street\":\"西藏2\",\"extInfo\":[{\"city\":\"中国\",\"street\":\"西藏\"},{\"city\":\"中国2\",\"street\":\"西藏2\"}],\"size\":123,\"total\":\"9.1\",\"fish_name\":\"678\"}"+
                "]";

        //用匿名类来传递实际的类型，静态的方法
        List<OrderDO2> m1 = objectMapper.readValue(input, new TypeReference<List<OrderDO2>>() {});
        showOrderDO(m1);

        //动态构建Type
        CollectionType collectionType = objectMapper.getTypeFactory().constructCollectionType(List.class, OrderDO2.class);
        List<OrderDO2> m2 = objectMapper.readValue(input, collectionType);
        showOrderDO(m2);

        //这种方法是错误的，因为Java是运行时擦除泛型类型的，实际运行时会丢失类型信息
        //所以生成出来的结果，实际是List<LinkedHashMap>类型
        //List<OrderDO2> testClass = new ArrayList<>();
        //List<OrderDO2> m3 = objectMapper.readValue(input,testClass.getClass()) ;
        //showOrderDO(m3);
        return "";
    }

    @GetMapping("/go3")
    public Object go3(){
        Map<Integer,EnabledEnum> result = new HashMap<Integer,EnabledEnum>();
        result.put(3,EnabledEnum.ENABLED);
        result.put(4,EnabledEnum.DISABLE);
        return result;
    }
}
