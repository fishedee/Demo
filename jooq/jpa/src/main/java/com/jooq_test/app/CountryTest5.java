package com.jooq_test.app;
import com.jooq_test.app.business.Country;
import com.jooq_test.app.business.CountryRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.IntegerType;
import org.hibernate.type.StringType;
import org.jooq.DSLContext;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

import static org.jooq.impl.DSL.*;

@Component
@Slf4j
public class CountryTest5 {

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
        this.jooqNativeQuery();

        //flush以后，依然可以对内存中脏数据进行修改操作
        country2.modName("US");

        //事务下的jooq查询
        this.jooqNativeQuery();
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

    private static <E> List<E> nativeQuery(EntityManager em, org.jooq.Query query, Class<E> type) {

        Session session = em.unwrap(Session.class);
        // Extract the SQL statement from the jOOQ query:
        NativeQuery result = session.createNativeQuery(query.getSQL());

        result.addScalar("name", StringType.INSTANCE)
                .addScalar("count", IntegerType.INSTANCE)
                .setResultTransformer(Transformers.aliasToBean(type));



        // Extract the bind values from the jOOQ query:
        List<Object> values = query.getBindValues();
        for (int i = 0; i < values.size(); i++) {
            result.setParameter(i + 1, values.get(i));
        }

        // There's an unsafe cast here, but we can be sure that we'll get the right type from JPA
        return result.getResultList();
    }

    public void jooqNativeQuery(){
        //不需要flush操作，但是内部依然会Flush，而且这种方法转换为POJO比较麻烦
        List<CountrySummary> countrySummaryList = this.nativeQuery(em,dsl.select(field("name"),sum(field("man_count",Integer.class)).as("count"))
                .from(table("country"))
                .groupBy(field("name"))
                ,CountrySummary.class);

        log.info("summary {}",countrySummaryList);
    }

    public void go(){
        CountryTest5 app = (CountryTest5) AopContext.currentProxy();

        app.clearAll();
        app.initData();
        app.showAll();

        //非事务下的jooq查询
        app.jooqNativeQuery();
    }
}

