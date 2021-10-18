package com.jooq_test.app;

import com.jooq_test.app.business.Country;
import com.jooq_test.app.business.CountryRepository;
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

import static com.jooq_test.app.codegen.tables.Country.COUNTRY;

import static org.jooq.impl.DSL.*;

@Component
@Slf4j
public class CountryTest {

    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public void initData(){
        countryRepository.add(new Country("CHINA",100));
        countryRepository.add(new Country("CHINA",100));
        countryRepository.add(new Country("US",10));
        countryRepository.add(new Country("US",10));

        countryRepository.add(new Country("US",10));

        countryRepository.add(new Country("JAPAN",10));
        countryRepository.add(new Country("JAPAN",10));
    }

    @Transactional
    public void clearAll(){
        List<Country> countryList = this.countryRepository.getAll();
        for( Country country : countryList){
            this.countryRepository.del(country);
        }
    }

    public void showAll(){
        List<Country> countryList = this.countryRepository.getAll();
        log.info("{}",countryList);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CountrySummary{
        private String name;

        private Integer count;
    }

    @Autowired
    private DSLContext dsl;

    public void jooqTest(){
        List<CountrySummary> countrySummaryList = dsl.select(COUNTRY.NAME,sum(field(COUNTRY.MAN_COUNT)).as("count"))
                .from(COUNTRY)
                .groupBy(COUNTRY.NAME)
                .fetch().into(CountrySummary.class);

        log.info("summary {}",countrySummaryList);
    }

    public void go(){
        CountryTest app = (CountryTest) AopContext.currentProxy();

        app.clearAll();
        app.initData();
        app.showAll();
        app.jooqTest();
    }
}
