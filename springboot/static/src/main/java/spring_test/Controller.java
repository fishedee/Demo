package spring_test;

        import com.fasterxml.jackson.core.type.TypeReference;
        import com.fasterxml.jackson.databind.ObjectMapper;
        import lombok.Data;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.core.io.ClassPathResource;
        import org.springframework.core.io.Resource;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.constraints.Min;
        import javax.validation.constraints.NotEmpty;
        import java.io.BufferedInputStream;
        import java.io.BufferedOutputStream;
        import java.io.ByteArrayOutputStream;
        import java.io.IOException;
        import java.util.ArrayList;
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

    @Data
    public static class Person{
        private String name;
        private Integer age;
    }

    @Data
    public static class Country{
        private String name;

        private List<Person> people = new ArrayList<>();
    }

    private byte[] getResource(){
        Resource resource = new ClassPathResource("country.json");
        try(
                BufferedInputStream inputStream = new BufferedInputStream(resource.getInputStream());
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ){
            byte[] buffer = new byte[1024];
            int length = 0;
            while( (length= inputStream.read(buffer))!=-1){
                outputStream.write(buffer,0,length);
            }
            return outputStream.toByteArray();
        }catch( IOException e){
            throw new RuntimeException(e);
        }
    }

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("go2")
    public Country go2(){
        try{
            byte[] byteArray = this.getResource();
            TypeReference<Country> typeReference= new TypeReference<Country>() {};
            return objectMapper.readValue(byteArray,typeReference);
        }catch(IOException e){
            throw new RuntimeException(e);
        }
    }

}
