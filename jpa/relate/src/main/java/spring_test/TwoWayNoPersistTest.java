package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.business.Country2;
import spring_test.business.People;
import spring_test.business.People2;
import spring_test.infrastructure.Country2Repository;
import spring_test.infrastructure.CountryRepository;
import spring_test.infrastructure.People2Repository;
import spring_test.infrastructure.PeopleRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Component
@Slf4j
public class TwoWayNoPersistTest {
    @Autowired
    private Country2Repository countryRepository;

    @Autowired
    private People2Repository peopleRepository;

    @Transactional
    public void clearAll(){
        countryRepository.clearAll();
        peopleRepository.clearAll();
    }

    public void showAll(){
        List<Country2> countryList = countryRepository.getAll();
        log.info("all country {} ",countryList);

        List<People2> peopleList = peopleRepository.getAll();
        log.info("all people {} ",peopleList);
    }

    @Transactional
    public void add1(){
        //现在Country是只读端,即使写入的时候添加了people进去,也不会触发peopleList的添加
        //Country里面的PeopleList仅仅只是触发读取时的行为
        Country2 country = new Country2("中国");
        countryRepository.add(country);

        People2 people1 = new People2("fish");
        People2 people2 = new People2("cat");
        country.addPeople(people1);
        country.addPeople(people2);

        //这个例子最终的结果是,country里面的peopleList依然是空的,并且没有触发people1和people2的insert操作
    }

    public void go1(){
        TwoWayNoPersistTest app = (TwoWayNoPersistTest) AopContext.currentProxy();

        app.clearAll();
        app.add1();

        app.showAll();
    }

    @Transactional
    public void add2(){
        //Country是只读端,而People是写入端
        Country2 country = new Country2("中国");
        countryRepository.add(country);

        //我们将people进行persist以后,只是得到了people的id
        People2 people1 = new People2("fish");
        People2 people2 = new People2("cat");
        peopleRepository.add(people1);
        peopleRepository.add(people2);

        //将people写入到内存的country,仅仅是为了让内存的country拥有了这个people而已
        //写入端的people里面的country字段依然为null,因此JPA并不认为,people需要指向Country
        country.addPeople(people1);
        country.addPeople(people2);

        //这个例子最终的结果是,country里面的peopleList依然是空的,并且触发了people1和people2的insert操作
        //但是people1与people2的country字段依然为null,下次读取的country依然为空
    }

    public void go2(){
        TwoWayNoPersistTest app = (TwoWayNoPersistTest) AopContext.currentProxy();

        app.clearAll();
        app.add2();
        app.showAll();
    }

    @Transactional
    public void add3(){
        //Country是只读端,而People是写入端
        Country2 country = new Country2("中国");
        countryRepository.add(country);

        //我们将people进行persist以后,只是得到了people的id
        People2 people1 = new People2("fish");
        People2 people2 = new People2("cat");


        //正确的方法,我们需要设置三个地方,
        //* persist(people)
        //* people的setCountry
        //* country的addPeople
        //这个就是JPA中最为迷惑和容易出错的地方,缺少任意一个,我们都会出错
        peopleRepository.add(people1);
        peopleRepository.add(people2);
        country.addPeople(people1);
        country.addPeople(people2);
        people1.setCountry(country);
        people2.setCountry(country);
    }

    public void go3(){
        TwoWayNoPersistTest app = (TwoWayNoPersistTest) AopContext.currentProxy();

        app.clearAll();
        app.add3();
        app.showAll();
    }

    public void go(){
        //go1();

        //go2();

        go3();
    }
}
