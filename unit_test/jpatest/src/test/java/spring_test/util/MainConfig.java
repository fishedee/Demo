package spring_test.util;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import spring_test.User;

@TestConfiguration
//通过ComponentScan的方式加入bean
@ComponentScan(basePackageClasses= User.class)
public class MainConfig {
}
