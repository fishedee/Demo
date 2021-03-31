package mybatis_test;


import mybatis_test.mapper.CountryCodeAndName;
import mybatis_test.mapper.CountryMapper2;
import mybatis_test.model.Country;
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
    private CountryMapper2 countryMapper2;

    private void printCountryList(List<Country> countryList){
        for( Country country : countryList){
            logger.info("id:{},name:{},code:{},createTime:{},modifyTime:{}",country.id,country.countryName,country.countryCode,country.createTime,country.modifyTime);
        }
    }

    private void showCountryList(){
        List<Country> countryList = countryMapper2.selectAll();

        printCountryList(countryList);
    }

    private void test1(){
        logger.info("---- test1 ----");
        //以下方法不行,不能想当然认为参数名称,就是传入到xml的名称.
        //List<Country> countrys = countryMapper2.selectByCodeAndName("美国","US");
        //printCountryList(countrys);
    }

    private void test2(){
        //使用@Param来传递参数,没问题
        logger.info("---- test2 ----");
        List<Country> countrys = countryMapper2.selectByCodeAndNameWithParam("美国","US");
        printCountryList(countrys);
    }

    private void test3(){
        //使用Class来传递参数,没问题
        logger.info("---- test3 ----");
        CountryCodeAndName cls = new CountryCodeAndName();
        cls.countryCode = "CN";
        cls.countryName = "中国";
        List<Country> countrys = countryMapper2.selectByCodeAndNameWithClass(cls);
        printCountryList(countrys);
    }

    private void test4(){
        //使用Map来传递参数,没问题
        logger.info("---- test4 ----");
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("id",1);
        map.put("countryCode","CN_China");
        map.put("countryName","中国2");
        int affectedRows = countryMapper2.updateByMap(map);
        logger.info("affectedRows {}",affectedRows);
        showCountryList();
    }

    private void test5(){
        //使用Map加Long,两个参数来传递参数,没问题
        logger.info("---- test5 ----");
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("countryCode","US_USA");
        map.put("countryName","美国3");
        int affectedRows = countryMapper2.updateByMapAndId(map,2L);
        logger.info("affectedRows {}",affectedRows);
        showCountryList();
    }

    private void test6(){
        //使用List来传递参数
        logger.info("---- test6 ----");
        List<String> countryCodeList = new ArrayList<String>();
        countryCodeList.add("RU");
        countryCodeList.add("GB");
        List<Country> countrys = countryMapper2.selectByCountryCodeList(countryCodeList);
        printCountryList(countrys);
    }

    private void test7(){
        //参数中带有jdbc的Type
        logger.info("---- test7 ----");
        int oneDay = 60*60*24*1000;
        Country country = new Country();
        country.countryName = "我国";
        country.countryCode = "ME";
        country.createTime = new Date();
        country.modifyTime = new Date(country.createTime.getTime()+oneDay);
        int affectedRows = countryMapper2.add(country);
        logger.info("affectedRows:{},countryId:{}",affectedRows,country.id);
        showCountryList();
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
