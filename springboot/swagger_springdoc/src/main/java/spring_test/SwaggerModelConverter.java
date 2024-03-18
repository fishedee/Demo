package spring_test;
import java.util.Iterator;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.core.converter.AnnotatedType;
import io.swagger.v3.core.converter.ModelConverter;
import io.swagger.v3.core.converter.ModelConverterContext;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.media.StringSchema;
import org.springdoc.core.providers.ObjectMapperProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SwaggerModelConverter implements ModelConverter {

    @Autowired
    private ObjectMapperProvider springDocObjectMapper;

    @Override
    public Schema<?> resolve(
            AnnotatedType type,
            ModelConverterContext context,
            Iterator<ModelConverter> chain) {

        ObjectMapper mapper = springDocObjectMapper.jsonMapper();
        JavaType javaType = mapper.constructType(type.getType());
        if (javaType != null && javaType.isEnumType()) {
            Class<Enum> enumClass = (Class<Enum>) javaType.getRawClass();
            Enum[] enumConstants = enumClass.getEnumConstants();
            StringSchema stringSchema = new StringSchema();
            for (Enum en : enumConstants) {
                String enumValue = en.name();
                stringSchema.addEnumItem(enumValue);
            }
            return stringSchema;
        }
        return chain.hasNext() ? chain.next().resolve(type, context, chain) : null;
    }
}