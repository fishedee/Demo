package spring_test;

import org.springframework.context.annotation.ImportSelector;
import org.springframework.core.annotation.AnnotationAttributes;
import org.springframework.core.type.AnnotationMetadata;

/**
 * Created by fish on 2021/4/14.
 */
public class ShowMsgSelector implements ImportSelector {

    public String[] selectImports(AnnotationMetadata importingClassMetadata){
        AnnotationAttributes attributes = AnnotationAttributes
                .fromMap(importingClassMetadata.getAnnotationAttributes(
                        ShowMsg.class.getName(), false));

        String name = attributes.getString("value");
        String[] result = {name+".MyConfiguration"};
        return result;
    }
}
