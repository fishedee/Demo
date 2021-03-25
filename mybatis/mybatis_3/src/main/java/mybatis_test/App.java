package mybatis_test;


import mybatis_test.mapper.CountryMapper;
import mybatis_test.model.Country;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.omg.SendingContext.RunTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


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
            logger.info("id:{},name:{},code:{}",country.id,country.countryName,country.countryCode);
        }
    }

    private void showCountryList(){
        List<Country> countryList = countryMapper.selectAll();

        printCountryList(countryList);
    }

    private void addCountry(){
        Country country = new Country();
        country.countryCode = "67";
        country.countryName = "我的国";

        countryMapper.add(country);
    }

    private void modCountry(Long id){
        Country country = new Country();
        country.id = id;
        country.countryCode = "88";
        country.countryName = "他的国";

        countryMapper.mod(country);
    }

    private void delCountry(Long id){
        countryMapper.del(id);
    }


    @Transactional
    private void test1(){

        System.out.println("---- test1 ----");

        showCountryList();

        addCountry();

        delCountry(3L);

        modCountry(2L);

        showCountryList();

        throw new RuntimeException("throw by me");
    }

    @Autowired
    SqlSessionFactory sqlSessionFactory;

    private void showCountryListNow(){
        SqlSession sqlSession2 = this.sqlSessionFactory.openSession();
        CountryMapper countryMapper = sqlSession2.getMapper(CountryMapper.class);
        List<Country> countryList = countryMapper.selectAll();
        printCountryList(countryList);
        sqlSession2.close();
    }

    private void test2(){

        System.out.println("---- test2 ----");

        showCountryList();

        //这里的CountryMapper绑定的不是普通的sqlSession,它绑定的是sqlSessionTemplate类
        //SqlSessionTemplate的特点是与事务绑定,当没有事务的时候,CountryMapper一个方法执行完毕后会自动commit
        //当有事务的时候,就会在事务提交的时候进行commit
        //具体看SqlSessionTemplate sqlSessionTemplate;的实现
        //参考资料:
        // * https://blog.csdn.net/yu_kang/article/details/88941908
        // * https://blog.csdn.net/xlgen157387/article/details/79438676
        addCountry();

        //所以,这里不需要sqlSession.commit操作,在其他线程中就能看到执行了country添加的结果
        showCountryListNow();
    }

    public   void run(ApplicationArguments arguments) throws Exception{

        try{
            this.test1();
        }catch(Exception e){

        }

        this.test2();
    }
}
