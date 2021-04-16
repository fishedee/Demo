package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.business.Contact;
import spring_test.business.Country;
import spring_test.business.People;
import spring_test.infrastructure.*;
import spring_test.query.CountryVO;

import java.util.List;

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
    private CountryVORepository countryVORepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private CarRepository carRepository;

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

    @Transactional
    public void addCar(Car car){
        this.carRepository.add(car);
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
        List<CountryVO> countryPeopleList = this.countryVORepository.getAll();
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
        app.addPeople(new People(1L,3L,"李宁"));
        app.addPeople(new People(1L,4L,"大伟"));
        app.addPeople(new People(2L,null,"Kate"));
        app.addPeople(new People(2L,5L,"David"));

        app.addCar(new Car(7L,"丰田"));
        app.addCar(new Car(7L,"本田"));
        app.addCar(new Car(8L,"奔驰"));
        app.addCar(new Car(8L,"宝马"));
        app.addCar(new Car(8L,"宝马2"));
        app.addCar(new Car(10L,"路虎"));

        app.showAll();
        app.showAllCountry();
    }

    public   void run(ApplicationArguments arguments) throws Exception {
        go1();
    }
}
