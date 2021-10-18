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

import static org.jooq.impl.DSL.*;

@Component
@Slf4j
public class CountryTest2 {

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

        //在事务里面直接调用jooq的summary会失败，因为这个时候的JPA内存中的脏数据还没有写入到数据库中，没有flush
        this.jooqTest();
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
        List<CountrySummary> countrySummaryList = dsl.select(field("name"),sum(field("man_count",Integer.class)).as("count"))
                .from(table("country"))
                .groupBy(field("name"))
                .fetch().into(CountrySummary.class);

        log.info("summary {}",countrySummaryList);
    }

    public void go(){
        CountryTest2 app = (CountryTest2) AopContext.currentProxy();

        app.clearAll();
        app.initData();
        app.showAll();
    }
}
