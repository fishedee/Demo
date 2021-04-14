package spring_test5;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.annotation.ClassPathBeanDefinitionScanner;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.annotation.AnnotationAttributes;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.filter.AnnotationTypeFilter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by fish on 2021/4/14.
 */
public class ImportMyComponentRegistrar implements
        ImportBeanDefinitionRegistrar, ResourceLoaderAware {
    private ResourceLoader resourceLoader;

    private Logger  logger = LoggerFactory.getLogger(getClass());

    @Override
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void registerBeanDefinitions(
            AnnotationMetadata importingClassMetadata,
            BeanDefinitionRegistry registry) {
        AnnotationAttributes annotationAttributes = AnnotationAttributes
                .fromMap(importingClassMetadata.getAnnotationAttributes(
                        EnableMyComponent.class.getName(), false));

        String[] basePackages = annotationAttributes.getStringArray("basePackages");
        List<String> basePackageList = new ArrayList<String>(Arrays.asList(basePackages));

        if( basePackages.length == 0){
            //当没有输入包名的时候,就用注解所在类的包
            try {
                String annotationClass = importingClassMetadata.getClassName();
                String importPackage = Class.forName(annotationClass).getPackage().getName();
                basePackageList.add(importPackage);
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        System.out.println(basePackageList);

        //开始扫描包并添加到工厂
        ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(registry,false);
        scanner.setResourceLoader(resourceLoader);
        scanner.addIncludeFilter(new AnnotationTypeFilter(MyComponent.class));
        scanner.scan(basePackageList.toArray(new String[]{}));
    }
}
