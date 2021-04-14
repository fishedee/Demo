package spring_test6;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.BeanDefinitionHolder;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.annotation.ClassPathBeanDefinitionScanner;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.annotation.AnnotationAttributes;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.core.type.filter.AssignableTypeFilter;
import org.springframework.util.StringUtils;
import spring_test6.MyRepository;
import spring_test6.MyRepositoryFactory;
import spring_test6.MyRepositoryScanner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

/**
 * Created by fish on 2021/4/14.
 */
public class ImportMyRepositoryRegistrar implements
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
                        EnableMyRepository.class.getName(), false));

        String[] basePackages = annotationAttributes.getStringArray("basePackages");
        List<String> basePackageList = new ArrayList<String>(Arrays.asList(basePackages));

        if( basePackageList.size() == 0){
            //当没有输入包名的时候,就用注解所在类的包
            try {
                String annotationClass = importingClassMetadata.getClassName();
                String importPackage = Class.forName(annotationClass).getPackage().getName();
                basePackageList.add(importPackage);
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        //开始扫描包并添加到工厂
        logger.info("info ImportMyRepositoryRegistrar begin ... {}",basePackageList);
        MyRepositoryScanner scanner = new MyRepositoryScanner(registry);
        scanner.setResourceLoader(resourceLoader);
        scanner.addIncludeFilter(new AnnotationTypeFilter(MyRepository.class));
        scanner.scan(basePackageList.toArray(new String[]{}));
    }
}
