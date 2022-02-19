package com.jooq_test.app;

import org.jooq.DSLContext;
import org.jooq.Query;
import org.jooq.ResultQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jooq.impl.DSL.*;

@Component
public class JooqRepository {

    @FunctionalInterface
    public interface JooqFetcher{
        ResultQuery apply(DSLContext dsl);
    }

    @Autowired
    private EntityManager em;

    @Autowired
    private DSLContext dslContext;

    public <T> List<T> fetch(JooqFetcher fetcher,Class<T> clazz){
        if( em.isJoinedToTransaction()){
            //将所有实体刷新到数据库中
            em.flush();
        }
        ResultQuery query = fetcher.apply(this.dslContext);
        return query.fetchInto(clazz);
    }
}
