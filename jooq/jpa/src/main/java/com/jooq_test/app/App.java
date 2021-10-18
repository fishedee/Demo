package com.jooq_test.app;

import lombok.extern.slf4j.Slf4j;
import org.jooq.*;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.PostConstruct;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
@EnableAspectJAutoProxy(exposeProxy = true)
@Slf4j
public class App 
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    //非事务下的jooq测试
    @Autowired
    private CountryTest countryTest;

    //事务下，无flush的jooq会有bug
    @Autowired
    private CountryTest2 countryTest2;

    //事务下，有flush的jooq才能保证查询的结果正确
    @Autowired
    private CountryTest3 countryTest3;

    //事务下，jooq修改与JPA修改如何实现数据同步
    @Autowired
    private CountryTest4 countryTest4;

    //使用JPA的createNativeSQL来查询，转换为POJO，这种方法较为麻烦
    @Autowired
    private CountryTest5 countryTest5;

    //使用JPA的createNativeSQL来查询，转换为Entity，这种方法好一点，但是输出结果必须为实体，这样会产生其他问题
    @Autowired
    private CountryTest6 countryTest6;

    @PostConstruct
    public void init(){
        countryTest6.go();
    }
}
