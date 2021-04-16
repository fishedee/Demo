package spring_test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
@EnableAspectJAutoProxy(exposeProxy = true)
public class App implements ApplicationRunner
{
    private Logger logger = LoggerFactory.getLogger(getClass());

    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public void add(Country country){
        this.countryRepository.add(country);
    }

    @Transactional
    public void mod(Long id,String countryName,String countryCode){
        Country country = this.countryRepository.find(id);
        country.mod(countryName,countryCode);
    }

    @Transactional
    public void del(Long id){
        Country country = this.countryRepository.find(id);
        this.countryRepository.del(country);
    }

    public void showOne(Long id){
        Country country = this.countryRepository.find(id);
        logger.info("country {} : {}",id,country);
    }

    public void showAll(){
        List<Country> countryList = countryRepository.getAll();

        logger.info("countryList:{}",countryList);
    }

    public void go1(){
        //调用自身类的其他方法,要用AopContext的currentProxy来做,否则AOP增强没有打开
        App app = (App) (AopContext.currentProxy());

        logger.info("------- go1 -----");

        app.showAll();

        app.add(new Country("中国","CN"));
        app.add(new Country("美国","US"));
        app.add(new Country("英国","UK"));

        app.showAll();

        app.showOne(1L);
        app.showOne(2L);
        app.showOne(3L);

        app.del(2L);

        app.mod(3L,"澳洲","AS");

        app.showAll();
    }


    public void mod3(){
        //没有开事务,但是依然会开一级缓存和脏检查
        Country country1 = this.countryRepository.find(3L);
        System.out.println("before mod country : "+country1);
        country1.mod("我国3","WO3");

        System.out.println("after memory mod country : "+country1);

        //即使没有开事务,读的依然是一级事务
        //但是PersistenceContext注入的EntityManager的生命周期与事务是是一一对应的,第二次执行find的时候已经是新的entityManager
        Country country2 = this.countryRepository.find(3L);
        System.out.println("after memory mod country2 : "+country2);

        showOne(4L);
    }

    @Transactional
    public void mod2Inner(){
        Country country4 = this.countryRepository.find(4L);
        country4.mod("我国3","WO3");
        logger.info("reused EntityManager1 Country 4 : {}",country4);

        //这里走了一级缓存,因为在同一个事务里面
        Country country5 = this.countryRepository.find(4L);
        logger.info("reused EntityManager2 Country 5 : {}",country5);

        throw new RuntimeException("mm");
    }

    public void mod2(){
        //调用自身类的其他方法,要用AopContext的currentProxy来做,否则AOP增强没有打开
        App app = (App) (AopContext.currentProxy());

        try{
            app.mod2Inner();
        }catch(Exception e){
            //e.printStackTrace();
        }

        //数据库的旧数据,因为是rollback
        showOne(4L);
    }

    @Transactional
    public void add2(Country country1,Country country2){

        this.countryRepository.add(country1);
        this.countryRepository.add(country2);
    }

    public void go2() {
        //调用自身类的其他方法,要用AopContext的currentProxy来做,否则AOP增强没有打开
        App app = (App) (AopContext.currentProxy());

        logger.info("------- go2 -----");

        app.showAll();

        app.add2(new Country("我国1","WO"),new Country("我国2","WO2"));

        app.showAll();

        app.mod2();

        app.mod3();
    }

    public   void run(ApplicationArguments arguments) throws Exception {
        go1();

        go2();
    }

    /*
    @Bean
    public JpaTransactionManager transactionManager(LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(localContainerEntityManagerFactoryBean.getObject());

    }
    */
}
