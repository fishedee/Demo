package spring_test;

        import lombok.Data;
        import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private Service  service;

    @GetMapping("/go2")
    public String getDisplay(){
        return service.display();
    }

    @GetMapping("/go1")
    public String go1(){
        return "Hello World";
    }

}
