package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.business.Country4;
import spring_test.business.People4;
import spring_test.infrastructure.Country4Repository;
import spring_test.infrastructure.CountryRepository;
import spring_test.infrastructure.People4Repository;
import spring_test.infrastructure.PeopleRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Component
@Slf4j
public class OneWayWithCascadeTest {
    @Autowired
    private Country4Repository countryRepository;

    @Autowired
    private People4Repository peopleRepository;

    @Transactional
    public void clearAll() {
        countryRepository.clearAll();
        peopleRepository.clearAll();
    }

    public void showAll() {
        List<Country4> countryList = countryRepository.getAll();
        log.info("all country {} ", countryList);

        List<People4> peopleList = peopleRepository.getAll();
        log.info("all people {} ", peopleList);
    }

    @Transactional
    public void add1() {
        Country4 country = new Country4("中国");
        countryRepository.add(country);

        People4 people1 = new People4("fish");
        People4 people2 = new People4("cat");
        country.addPeople(people1);
        country.addPeople(people2);
    }

    public void go() {
        OneWayWithCascadeTest app = (OneWayWithCascadeTest) AopContext.currentProxy();

        app.clearAll();
        app.add1();
        app.showAll();
    }
}
