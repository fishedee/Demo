package spring_test;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

/**
 * Created by fish on 2021/5/1.
 */
public class JsonAssertUtil {

    private static ObjectMapper objectMapper;

    private static ObjectMapper get(){
        if( objectMapper == null){
            objectMapper = new ObjectMapper();
            objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
            objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));
        }
        return objectMapper;
    }

    public static  void checkEqualNotStrict(String target,Object result){
        try{
            ObjectMapper objectMapper = get();
            String resultJson =  objectMapper.writeValueAsString(result);
            System.out.println(resultJson);
            JSONAssert.assertEquals(target, resultJson,false);
        }catch(Exception e){
            throw  new RuntimeException(e);
        }

    }

    public static  void checkEqualStrict(String target,Object result){
        try{
            ObjectMapper objectMapper = get();
            String resultJson =  objectMapper.writeValueAsString(result);
            System.out.println(resultJson);
            JSONAssert.assertEquals(target, resultJson,true);
        }catch(Exception e){
            throw  new RuntimeException(e);
        }

    }
}