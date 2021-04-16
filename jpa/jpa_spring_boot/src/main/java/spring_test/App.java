package spring_test;

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
    public Long add()  {
        Country country = new Country("MyCountry","UK");
        logger.info("countryRepository:{}",countryRepository);
        countryRepository.save(country);
        return country.getId();
    }

    @Transactional
    public void del(Long id){
        countryRepository.deleteById(id);
    }

    @Transactional
    public void mod(Long id,String name,String code){
        //不需要显式的save
        Optional<Country> country = countryRepository.findById(id);
        country.get().mod(name,code);
    }

    @Transactional
    public void showAll(){
        Iterable<Country> countryList = countryRepository.findAll();

        logger.info("countryList:{}",countryList);
    }

    @Transactional
    public void show(Long id){
        Optional<Country> country = countryRepository.findById(id);
        logger.info("country findById:{},{}",id,country);
    }

    public   void run(ApplicationArguments arguments) throws Exception{
        //调用自身类的其他方法,要用AopContext的currentProxy来做,否则AOP增强没有打开
        App app = (App)(AopContext.currentProxy());

        app.showAll();

        Long newId = app.add();

        app.show(newId);

        app.mod(newId,"MyCountry2","UK2");

        app.show(newId);

        app.del(newId);

        app.showAll();
    }
}
