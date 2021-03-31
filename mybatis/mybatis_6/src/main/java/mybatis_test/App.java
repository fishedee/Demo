package mybatis_test;


import mybatis_test.mapper.*;
import mybatis_test.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.util.*;


/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableAspectJAutoProxy(exposeProxy = true)
public class App implements ApplicationRunner
{
    final Logger logger = LoggerFactory.getLogger(getClass());
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private CountryMapper countryMapper;

    @Autowired
    private ContinentMapper continentMapper;

    @Autowired
    private PeopleMapper peopleMapper;

    @Autowired
    private CountryAndContinentMapper countryAndContinentMapper;

    @Autowired
    private CountryAndPeopleMapper countryAndPeopleMapper;

    private void test1(){
        //resultMap的属性赋值
        logger.info("---- test1 ----");
        List<Country> countries = countryMapper.selectAll();
        logger.info("countries {}",countries);
    }

    private void test2(){
        //resultMap的构造器赋值
        logger.info("---- test2 ----");
        List<Continent> continents = continentMapper.selectAll();
        logger.info("continents {}",continents);
    }

    private void test3(){
        //resultType的属性赋值,字段名自动映射,下划线转驼峰形式
        logger.info("---- test3 ----");
        List<People> peoples = peopleMapper.selectAll();
        logger.info("peoples {}",peoples);
    }

    private void test4(){
        logger.info("---- test4 ----");
        List<CountryAndContinent> countryAndContinents = countryAndContinentMapper.selectAll();

        logger.info("countryAndContinents {}",countryAndContinents);
    }

    private void test5(){
        logger.info("---- test5 ----");
        List<CountryAndContinent> countryAndContinents = countryAndContinentMapper.selectAllWithNest();

        logger.info("countryAndContinents {}",countryAndContinents);
    }

    private void test6(){
        logger.info("---- test6 ----");
        List<CountryAndPeople> countryAndPeoples = countryAndPeopleMapper.selectAll();

        logger.info("countryAndPeoples {}",countryAndPeoples);
    }

    private void test7(){
        logger.info("---- test7 ----");
        List<CountryAndPeople> countryAndPeoples = countryAndPeopleMapper.selectAllWithNest();

        logger.info("countryAndPeoples {}",countryAndPeoples);
    }

    public   void run(ApplicationArguments arguments) throws Exception{
        test1();

        test2();

        test3();

        test4();

        test5();

        test6();

        test7();
    }
}
