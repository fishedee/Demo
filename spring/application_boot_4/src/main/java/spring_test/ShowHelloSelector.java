package spring_test;

import org.springframework.context.annotation.DeferredImportSelector;
import org.springframework.context.annotation.ImportSelector;
import org.springframework.core.annotation.AnnotationAttributes;
import org.springframework.core.type.AnnotationMetadata;

/**
 * Created by fish on 2021/4/14.
 */
//尝试将接口DeferredImportSelector改为ImportSelector
public class ShowHelloSelector implements DeferredImportSelector {
    public String[] selectImports(AnnotationMetadata importingClassMetadata){
        String[] result = {"spring_test4.MyConfiguration"};
        return result;
    }
}
