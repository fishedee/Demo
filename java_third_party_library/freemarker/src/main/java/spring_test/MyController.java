package spring_test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

/**
 * Created by fish on 2021/4/25.
 */
@RestController
@RequestMapping("/hello")
@Slf4j
public class MyController {

    @Autowired
    private FreeMarkerService freeMarkerService;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Product{
        private String url;

        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Car{
        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MainData{
        private String user;

        private String sex;

        private List<Car> cars = new ArrayList<>();

        private BigDecimal assets;

        private Long assets2;

        private Product latestProduct;

        private Map<String,String> brands = new HashMap<>();
    }

    @GetMapping("/mainTpl")
    public String mainTpl(){
        Product product = new Product();
        product.setUrl("https://www.baidu.com");
        product.setName("百度");
        MainData data = new MainData();
        data.setUser("fish");
        data.setLatestProduct(product);
        return freeMarkerService.execute("main.ftl",data);
    }

    @GetMapping("/conditionTpl")
    public String conditionTpl(){
        Car car = new Car();
        car.setName("Toyota");
        Car car2 = new Car();
        car2.setName("Mercedes");
        MainData data = new MainData();
        data.setUser("fish");
        data.setSex("Man");
        data.setCars(Arrays.asList(car,car2));
        return freeMarkerService.execute("condition.ftl",data);
    }

    @GetMapping("/conditionTpl2")
    public String conditionTpl2(){
        MainData data = new MainData();
        data.setUser("Cat");
        data.setSex("mm");
        data.brands.put("LV","10个");
        data.brands.put("Coach","20个");
        return freeMarkerService.execute("condition.ftl",data);
    }


    @GetMapping("/valueTpl")
    public String valueTpl(){
        MainData data = new MainData();
        data.setAssets(new BigDecimal("123456789.123"));
        data.setAssets2(1234567890L);
        data.setUser("<div style=\"color:red\">你好</div>");
        return freeMarkerService.execute("value.ftl",data);
    }
}
