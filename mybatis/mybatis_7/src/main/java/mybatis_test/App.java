package mybatis_test;


import mybatis_test.mapper.CountryMapper;
import mybatis_test.mapper.CountryMapper2;
import mybatis_test.model.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
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
    private CountryMapper2 countryMapper2;

    private void printCountryList(List<Country> countryList){
        for( Country country : countryList){
            logger.info("id:{},name:{},code:{},createTime:{},modifyTime:{}",country.id,country.countryName,country.countryCode,country.createTime,country.modifyTime);
        }
    }

    private void showCountryList(){
        List<Country> countryList = countryMapper.selectAll();

        printCountryList(countryList);
    }

    @Transactional
    public void test1(){
        logger.info("------ test1 ------");
        //在同一个事务里面,同一个方法用同样的参数返回的总是同一个对象
        Country country = countryMapper.selectById(1L);

        country.countryName = "CC";

        //这一步没有查询数据库,直接查一级缓存后返回了
        Country country2 = countryMapper.selectById(1L);

        logger.info("country pointer : {}, country2 pointer: {}",System.identityHashCode(country),System.identityHashCode(country2));
        logger.info("country name: {}, country2 name: {}",country.countryName,country2.countryName);

        //这一步有查询数据库,因为selectById和selectById2是不同的方法
        Country country2_2 = countryMapper.selectById2(1L);

        logger.info("country pointer : {}, country2_2 pointer: {}",System.identityHashCode(country),System.identityHashCode(country2_2));
        logger.info("country name: {}, country2_2 name: {}",country.countryName,country2_2.countryName);

        //但是,在同一个事务里面,用其他方法就不会返回这个对象.
        //所以,一级缓存总是以方法和参数作为缓存的key
        showCountryList();

        //添加一个Country,这时候会清空mapper所在的缓存
        Country countryNew = new Country();
        countryNew.countryName = "MK世界";
        countryNew.countryCode = "MK";
        List<Country> countriesAdd = new ArrayList<Country>();
        countriesAdd.add(countryNew);
        countryMapper.insertList(countriesAdd);

        //因为一级缓存为空,所以这次查询会走数据库.
        Country country3 = countryMapper.selectById(1L);
        logger.info("country pointer : {}, country3 pointer: {}",System.identityHashCode(country),System.identityHashCode(country3));
        logger.info("country name: {}, country3 name: {}",country.countryName,country3.countryName);

    }

    public void test2(){
        logger.info("------ test2 ------");

        try{
            List<Country> countries = countryMapper2.selectAll();

            logger.info("countries select1 {}",countries.size());

            List<Country> countries2 = countryMapper2.selectAll();

            logger.info("countries select2 {}",countries2.size());

            Thread.sleep(5001,0);

            List<Country> countries3 = countryMapper2.selectAll();

            logger.info("countries select2 {}",countries3.size());
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public   void run(ApplicationArguments arguments) throws Exception{

        //调用自身类的其他方法,要用AopContext的currentProxy来做,否则AOP增强没有打开
        App app = (App)(AopContext.currentProxy());

        app.test1();

        app.test2();
    }
}
