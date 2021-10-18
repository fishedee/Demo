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

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

import static org.jooq.impl.DSL.*;

@Component
@Slf4j
public class CountryTest3 {

    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public void initData(){
        countryRepository.add(new Country("CHINA",100));
        Country country2 = new Country("CHINA",100);

        countryRepository.add(country2);
        countryRepository.add(new Country("US",10));
        countryRepository.add(new Country("US",10));

        countryRepository.add(new Country("US",10));

        countryRepository.add(new Country("JAPAN",10));
        countryRepository.add(new Country("JAPAN",10));

        //事务下的jooq查询
        this.jooqTest();

        //flush以后，依然可以对内存中脏数据进行修改操作
        country2.modName("US");

        //事务下的jooq查询
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
    private EntityManager em;

    @Autowired
    private DSLContext dsl;

    public void jooqTest(){
        //事务状态下，要将JPA脏数据落地
        if( em.isJoinedToTransaction() ){
            //所有实体都落地
            em.flush();
        }
        List<CountrySummary> countrySummaryList = dsl.select(field("name"),sum(field("man_count",Integer.class)).as("count"))
                .from(table("country"))
                .groupBy(field("name"))
                .fetch().into(CountrySummary.class);

        log.info("summary {}",countrySummaryList);
    }

    public void go(){
        CountryTest3 app = (CountryTest3) AopContext.currentProxy();

        app.clearAll();
        app.initData();
        app.showAll();

        //非事务下的jooq查询
        app.jooqTest();
    }
}

