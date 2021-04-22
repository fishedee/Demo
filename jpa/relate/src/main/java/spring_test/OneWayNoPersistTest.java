package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.business.People;
import spring_test.infrastructure.CountryRepository;
import spring_test.infrastructure.PeopleRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Component
@Slf4j
public class OneWayNoPersistTest {
    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private PeopleRepository peopleRepository;

    @Transactional
    public void clearAll(){
        countryRepository.clearAll();
        peopleRepository.clearAll();
    }

    public void showAll(){
        List<Country> countryList = countryRepository.getAll();
        log.info("all country {} ",countryList);

        List<People> peopleList = peopleRepository.getAll();
        log.info("all people {} ",peopleList);
    }

    @Transactional
    public void add1(){
        //org.hibernate.TransientObjectException: object references an unsaved transient instance
        //这个测试会报出以上的异常,因为people加进了Country里面,但是people没有进行persist操作
        //Country的List检查到了添加People的操作,但是People自身没有进行persist
        Country country = new Country("中国");
        countryRepository.add(country);

        People people1 = new People("fish");
        People people2 = new People("cat");
        country.addPeople(people1);
        country.addPeople(people2);
    }

    public void go1(){
        OneWayNoPersistTest app = (OneWayNoPersistTest) AopContext.currentProxy();

        app.clearAll();
        app.add1();
        app.showAll();
    }

    @Transactional
    public void add2(){
        //这样就正确了,不仅需要添加进country,会要对people自身进行persist操作
        //但是,报错了这个错误Field 'country_id' doesn't have a default value,因为People缺少country_id的字段
        Country country = new Country("中国");
        countryRepository.add(country);

        People people1 = new People("fish");
        People people2 = new People("cat");
        peopleRepository.add(people1);
        peopleRepository.add(people2);
        country.addPeople(people1);
        country.addPeople(people2);
    }

    public void go2(){
        OneWayNoPersistTest app = (OneWayNoPersistTest) AopContext.currentProxy();

        app.clearAll();
        app.add2();
        app.showAll();
    }



    public void go(){
        //go1();

        //go2();
    }
}
