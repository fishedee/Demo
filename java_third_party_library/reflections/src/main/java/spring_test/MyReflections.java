package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Component
public class MyReflections {
    @Value("${reflections.packageName}")
    private String scanPackageName;

    @PostConstruct
    public void init(){
        if(Strings.isBlank(scanPackageName)){
            throw new RuntimeException("reflections.packageName为空");
        }
        log.info("scanPackageName {}",scanPackageName);
        Reflections reflections = new Reflections(this.scanPackageName);

        //获取所有枚举体
        Set<Class<? extends Enum>> allEnums = reflections.getSubTypesOf(Enum.class);
        log.info("allEnums {}",allEnums.stream().map(single->single.getName()).collect(Collectors.toList()));

        //获取所有注解的类
        Set<Class<?>> allAnnotations = reflections.getTypesAnnotatedWith(RestController.class);
        log.info("allControllers {}",allAnnotations.stream().map(single->single.getName()).collect(Collectors.toList()));
    }
}
