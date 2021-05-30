package spring_test;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by fish on 2021/4/29.
 */
@Component
@Slf4j
public class EnumJsonDeserializer extends JsonDeserializer<BaseEnumType> {

    private Map<String,Class> nameToClass = new ConcurrentHashMap<>();

    @Override
    public BaseEnumType deserialize(JsonParser jp, DeserializationContext ctx) throws IOException, JsonProcessingException{
        int code = 0;
        if( jp.currentToken().equals(JsonToken.VALUE_NUMBER_INT)){
            //普通的整数类型
            code = jp.getIntValue();
        }else if( jp.currentToken().equals(JsonToken.START_OBJECT)){
            //嵌套的object类型
            boolean hasFound = false;
            while(!jp.currentToken().equals(JsonToken.END_OBJECT)){
                JsonToken jsonToken = jp.nextToken();
                if(JsonToken.FIELD_NAME.equals(jsonToken)){
                    String fieldName = jp.getCurrentName();

                    jsonToken = jp.nextToken();

                    if("code".equals(fieldName)){
                        hasFound = true;
                        code = jp.getIntValue();
                    }
                }
            }
            if( hasFound == false ){
                throw new RuntimeException("找不到"+jp.getCurrentName()+"对应的枚举值");
            }
        }else{
            throw new RuntimeException("不合法的enum输入:"+jp.getValueAsString());
        }

        //查找缓存
        String currentName = jp.getCurrentName();
        Class currentValue = jp.getCurrentValue().getClass();
        String key = currentValue.getName()+"_"+currentName;
        Class fieldClass = nameToClass.get(key);
        if( fieldClass == null ){
            Field field;
            try{
                field = currentValue.getDeclaredField(currentName);
            }catch(NoSuchFieldException e){
                throw new RuntimeException(e);
            }
            fieldClass = field.getType();
            nameToClass.putIfAbsent(key,fieldClass);
        }
        return BaseEnumType.fromValue(fieldClass,code);
    }
}
