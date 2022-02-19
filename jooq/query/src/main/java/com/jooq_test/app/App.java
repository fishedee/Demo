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
import java.util.List;

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

    @Autowired
    private QueryTest queryTest;

    @PostConstruct
    public void init(){
        countryTest.go();

        //普通query测试
        QueryTest.Filter filter = new QueryTest.Filter();
        filter.setPageIndex(0);
        filter.setPageSize(10);
        filter.setCountryName("CHINA");

        List<QueryTest.DTO> result = queryTest.get(filter);
        log.info("query1 {}",result);

        //join测试
        QueryTest.Filter filter2 = new QueryTest.Filter();
        filter2.setPeopleName("US_2");
        List<QueryTest.DTO> result2 = queryTest.get(filter2);
        log.info("query2 {}",result2);

        //group测试
        List<QueryTest.DTO2> result3 = queryTest.group();
        log.info("group {}",result3);
    }
}
