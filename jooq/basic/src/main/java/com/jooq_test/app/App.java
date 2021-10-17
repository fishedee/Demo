package com.jooq_test.app;

import com.jooq_test.app.codegen.Tables;
import com.jooq_test.app.codegen.tables.Author;
import lombok.extern.slf4j.Slf4j;
import org.jooq.*;
import org.jooq.impl.DSL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@Slf4j
public class App 
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private DSLContext context;

    @PostConstruct
    public void init(){
        Result<Record> result = context.select().from(Author.AUTHOR).fetch();
        log.info("result {}",result);

        context.insertInto(Tables.AUTHOR,Tables.AUTHOR.ID,Tables.AUTHOR.FIRST_NAME,Author.AUTHOR.LAST_NAME)
                .values(1,"f1","l1")
                .values(2,"f2","l2")
                .execute();


        Result<Record> result2 = context.select().from(Author.AUTHOR).fetch();
        log.info("result2 {}",result2);
    }
}
