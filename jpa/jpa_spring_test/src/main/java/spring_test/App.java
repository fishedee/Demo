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

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private CountryPeopleRepository countryPeopleRepository;

    @Transactional
    public void addCountry(Country country){
        this.countryRepository.add(country);
    }

    @Transactional
    public void delCountry(Long id){
        Country country = this.countryRepository.find(id);
        this.countryRepository.del(country);
    }

    @Transactional
    public void addPeople(People people){
        this.peopleRepository.add(people);
    }

    public void showAllCountry(){
        List<Country> countries = this.countryRepository.getAll();
        logger.info("all countryList {}",countries);
    }

    public void showAll(){
        List<CountryPeople> countryPeopleList = this.countryPeopleRepository.getAll();
        logger.info("all countryPeopleList {}",countryPeopleList);
    }

    public void go1(){
        App app = (App)AopContext.currentProxy();

        app.showAll();

        app.addCountry(new Country("中国","CN"));
        app.addCountry(new Country("美国","US"));
        app.addPeople(new People(1L,"李宁"));
        app.addPeople(new People(1L,"大伟"));
        app.addPeople(new People(2L,"Kate"));
        app.addPeople(new People(2L,"David"));

        app.showAll();
        app.showAllCountry();
    }

    public   void run(ApplicationArguments arguments) throws Exception {
        go1();
    }
}
