package java_standard_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.Enumeration;
import java.util.Properties;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@Slf4j
public class App
{
    @Autowired
    private MyConfig myConfig;

    public static void main( String[] args )
    {
        printProperties();
        SpringApplication.run(App.class,args);
    }

    public static void printProperties(){
        Properties properties = System.getProperties();
        Enumeration<?> names = properties.propertyNames();
        while( names.hasMoreElements() ){
            String key = (String)names.nextElement();
            String value = properties.getProperty(key);
            log.info("property: [{}]-> [{}]",key,value);
        }
    }

    @PostConstruct
    public void init(){
        log.info("myConfig name {}",myConfig.getName());
    }
}
