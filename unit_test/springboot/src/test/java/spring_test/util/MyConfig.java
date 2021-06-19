package spring_test.util;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import spring_test.ServiceC;

@TestConfiguration
public class MyConfig {

    public static class MyServiceC extends ServiceC{
        private String name;
        public void set(String name){
            this.name = name;
        }
        public String get(){
            return this.name;
        }
    }

    @Bean
    @Primary
    public ServiceC getServiceC(){
        return new MyServiceC();
    }
}
