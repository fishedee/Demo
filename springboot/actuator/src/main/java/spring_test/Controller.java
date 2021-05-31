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
    public String go1(){
        return "Hello World";
    }

    @GetMapping("/go2")
    public String go2(){
        throw new MyException(1,"my error",null);
    }

    @GetMapping("/go3")
    public String go3(){
        throw new RuntimeException("my error2");
    }
}
