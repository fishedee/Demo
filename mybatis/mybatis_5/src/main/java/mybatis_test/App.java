package mybatis_test;


import mybatis_test.mapper.CountryMapper;
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
    private CountryMapper countryMapper;

    private void printCountryList(List<Country> countryList){
        for( Country country : countryList){
            logger.info("id:{},name:{},code:{},createTime:{},modifyTime:{}",country.id,country.countryName,country.countryCode,country.createTime,country.modifyTime);
        }
    }

    private void showCountryList(){
        List<Country> countryList = countryMapper.selectAll();

        printCountryList(countryList);
    }

    private void test1(){
        logger.info("---- test1 ----");

        Country country = new Country();
        country.countryName = "";
        country.countryCode = "ME";
        countryMapper.insertCheckName(country);

        Country country2 = new Country();
        country2.countryName = "我国";
        country2.countryCode = "ME2";
        countryMapper.insertCheckName(country2);

        showCountryList();

    }

    private void test2(){
        logger.info("---- test2 ----");
        List<Country> result;

        //空选择
        Map<String,Object> where = new HashMap<String,Object>();
        result = countryMapper.selectByWhere(where);
        printCountryList(result);

        //只有countryName的选择
        where.put("countryName","中国");
        result = countryMapper.selectByWhere(where);
        printCountryList(result);

        //只有countryCode的选择
        where.clear();
        where.put("countryCode","US");
        result = countryMapper.selectByWhere(where);
        printCountryList(result);

        //同时有countryName和countryCode的选择
        where.clear();
        where.put("countryName","法国");
        where.put("countryCode","FR");
        result = countryMapper.selectByWhere(where);
        printCountryList(result);
    }

    private void showCountryFirst(){
        Map<String,Object> where = new HashMap<String,Object>();
        where.put("id",1);
        List<Country> result = countryMapper.selectByWhere(where);
        printCountryList(result);
    }

    private void test3(){
        logger.info("---- test3 ----");
        Country country = new Country();
        country.id = 1L;

        //空设置
        countryMapper.updateByIdSelective(country);
        showCountryFirst();

        //只设置countryName
        country.countryName = "中国2";
        country.countryCode = "";
        countryMapper.updateByIdSelective(country);
        showCountryFirst();

        //只设置countryCode
        country.countryName = "";
        country.countryCode = "CN2";
        countryMapper.updateByIdSelective(country);
        showCountryFirst();

        //同时设置countryCode和countryName
        country.countryName = "中国3";
        country.countryCode = "CN3";
        countryMapper.updateByIdSelective(country);
        showCountryFirst();
    }

    private void test4() {
        logger.info("---- test4 ----");
        Country country = new Country();
        country.countryCode = "MJ";
        country.countryName = "MJ世界";

        Country country2 = new Country();
        country2.countryCode = "MJ2";
        country2.countryName = "MJ世界2";

        List<Country> countries = new ArrayList<Country>();
        countries.add(country);
        countries.add(country2);

        //批量插入后依然能获取到自增id
        countryMapper.insertList(countries);
        for( Country temp :countries){
            logger.info("new insert id {}",temp.id);
        }

        showCountryList();

    }

    private void test5() {
        logger.info("---- test5 ----");
        Country country = new Country();
        country.countryCode = "DK";
        country.countryName = "DK世界";

        Country country2 = new Country();
        country2.countryCode = "DK2";
        country2.countryName = "DK世界2";

        List<Country> countries = new ArrayList<Country>();
        countries.add(country);
        countries.add(country2);

        //批量插入后依然能获取到自增id
        countryMapper.insertListWithPrint(countries);

    }

    public   void run(ApplicationArguments arguments) throws Exception{
        test1();

        test2();

        test3();

        test4();

        test5();
    }
}
