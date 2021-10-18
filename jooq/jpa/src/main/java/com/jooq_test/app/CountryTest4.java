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
public class CountryTest4 {

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

        //使用jooq的修改操作
        this.jooqModify(10002L,"US");

        //事务下的jooq查询
        this.jooqTest();

        //flush以后，依然可以对内存中脏数据进行修改操作
        //但是这样会引入隐晦的bug
        //jooq直接修改了数据库，但是内存中的JPA快照依然是旧的
        //这个时候country2持有的依然是CHINA数据，而不是US数据
        //所以JOOQ与JPA混合写数据，会导致JOOQ数据的写入丢失，尽量避免JOOQ写入数据。
        country2.modCount(1000);

        //解决办法有：
        //* 使用JOOQ写入以后，显式调用EntityManager的clear操作，将内存中的JPA实体全部去掉脏检查，强迫调用方重新拉数据，性能差一点，但是bug会少
        //* 使用JOOQ写入数据以后，由开发者自觉约定不再使用旧实体数据，性能好，但是对开发者要求太高
        //* 大家约定好，JOOQ不允许写入数据，只可以查询数据


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

    public void jooqModify(Long id,String name){

        //事务状态下，要将JPA脏数据落地
        if( em.isJoinedToTransaction() ){
            em.flush();
        }

        dsl.update(table("country"))
                .set(field("name"),name)
                .where(field("id").eq(id))
                .execute();

        //事务状态下，要将JPA脏数据落地
        if( em.isJoinedToTransaction() ){
            //将内存中的实体都剔除掉，避免内存中的JPA同步到数据库
            //em.clear();
        }
    }
    public void jooqTest(){
        //事务状态下，要将JPA脏数据落地
        if( em.isJoinedToTransaction() ){
            em.flush();
        }
        List<CountrySummary> countrySummaryList = dsl.select(field("name"),sum(field("man_count",Integer.class)).as("count"))
                .from(table("country"))
                .groupBy(field("name"))
                .fetch().into(CountrySummary.class);

        log.info("summary {}",countrySummaryList);
    }

    public void go(){
        CountryTest4 app = (CountryTest4) AopContext.currentProxy();

        app.clearAll();
        app.initData();
        app.showAll();

        //非事务下的jooq查询
        app.jooqTest();
    }
}

