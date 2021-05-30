package spring_test;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fish on 2021/5/3.
 */
//https://www.cnblogs.com/scar1et/articles/14134024.html
//https://www.itranslater.com/qa/details/2583881735951877120
@Configuration
public class JsonConfigure {
    public static class BigDecimalSerializer extends JsonSerializer<BigDecimal> {
        @Override
        public void serialize(BigDecimal var1, JsonGenerator var2, SerializerProvider var3) throws IOException{
            var2.writeString(var1.toPlainString());
        }

    }

    public static class BigIntegerSerializer extends JsonSerializer<BigInteger> {
        @Override
        public void serialize(BigInteger var1, JsonGenerator var2, SerializerProvider var3) throws IOException{
            var2.writeString(var1.toString());
        }

    }
    @Autowired
    private ObjectMapper objectMapper;

    @PostConstruct
    public void injectSelfMethodArgumentResolver() {
        configure(objectMapper);
    }

    public static void configure(ObjectMapper objectMapper){
        SimpleModule module = new SimpleModule();
        module.addSerializer(BigDecimal.class, new BigDecimalSerializer());
        module.addSerializer(BigInteger.class, new BigIntegerSerializer());
        objectMapper.registerModule(module);
    }
}
