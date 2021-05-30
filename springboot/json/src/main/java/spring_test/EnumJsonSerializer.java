package spring_test;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by fish on 2021/4/29.
 */
@Component
public class EnumJsonSerializer  extends JsonSerializer<BaseEnumType>{
    @Override
    public void serialize(BaseEnumType value, JsonGenerator gen, SerializerProvider serializers) throws IOException{
        Map<String,Object> map = new HashMap<>();
        map.put("code", value.getCode());
        map.put("name", ((Enum)(value)).name().toLowerCase());
        map.put("display", value.getDisplay());
        gen.writeObject(map);
    }

}
