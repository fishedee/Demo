package com.jooq_test.app;

import com.jooq_test.app.business.Country;
import com.jooq_test.app.business.CountryRepository;
import com.jooq_test.app.business.People;
import com.jooq_test.app.business.PeopleRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jooq.DSLContext;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

import static org.jooq.impl.DSL.*;

@Component
@Slf4j
public class CountryTest {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private PeopleRepository peopleRepository;

    @Transactional
    public void initData(){
        countryRepository.add(new Country("CHINA",100));
        countryRepository.add(new Country("US",10));
        countryRepository.add(new Country("JAPAN",10));

        peopleRepository.add( new People("CHINA_1",10001L));
        peopleRepository.add( new People("CHINA_2",10001L));
        peopleRepository.add( new People("US_1",10002L));
        peopleRepository.add( new People("US_2",10002L));
        peopleRepository.add( new People("JAPAN_1",10003L));
        peopleRepository.add( new People("JAPAN_2",10003L));
    }

    @Transactional
    public void clearAll(){
        List<Country> countryList = this.countryRepository.getAll();
        for( Country country : countryList){
            this.countryRepository.del(country);
        }
        List<People> peopleList = this.peopleRepository.getAll();
        for( People people : peopleList){
            this.peopleRepository.del(people);
        }
    }

    public void showAll(){
        List<Country> countryList = this.countryRepository.getAll();
        log.info("{}",countryList);
        List<People> peopleList = this.peopleRepository.getAll();
        log.info("{}",peopleList);
    }

    public void go(){
        CountryTest app = (CountryTest) AopContext.currentProxy();

        app.clearAll();
        app.initData();
        app.showAll();
    }
}
