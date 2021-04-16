package spring_test;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class App implements ApplicationRunner
{

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

    @Autowired
    private ContactRepository contactRepository;

    @Transactional
    public void addCountry(Country country){
        this.countryRepository.add(country);
    }

    @Transactional
    public void addPeople(People people){
        this.peopleRepository.add(people);
    }

    @Transactional
    public void addContact(Contact contact){
        this.contactRepository.add(contact);
    }

    public void showAllCountry(){
        List<Country> countries = this.countryRepository.getAll();
        log.info("all countryList {}",countries);
    }

    public void showAllContact(){
        List<Contact> contacts = this.contactRepository.getAll();
        log.info("all contacts {}",contacts);
    }

    public void showAll(){
        List<CountryPeopleDTO> countryPeopleList = this.countryPeopleRepository.getAll();
        log.info("all countryPeopleList {}",countryPeopleList);
    }

    public void go1(){
        App app = (App)AopContext.currentProxy();

        app.showAll();

        app.addCountry(new Country("中国","CN"));
        app.addCountry(new Country("美国","US"));
        app.addContact(new Contact("1"));
        app.addContact(new Contact("2"));
        app.addContact(new Contact("3"));
        app.addContact(new Contact("4"));

        app.showAllContact();
        app.addPeople(new People(1L,3L,"李宁"));
        app.addPeople(new People(1L,4L,"大伟"));
        app.addPeople(new People(2L,null,"Kate"));
        app.addPeople(new People(2L,5L,"David"));

        app.showAll();
        app.showAllCountry();
    }

    public   void run(ApplicationArguments arguments) throws Exception {
        go1();
    }
}
