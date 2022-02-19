package com.jooq_test.app;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jooq.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.jooq.impl.DSL.*;

@Component
public class QueryTest {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DTO{
        private Long id;

        private String name;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Filter{
        private String countryName;

        private String peopleName;

        private Integer pageIndex;

        private Integer pageSize;
    }

    @Autowired
    private JooqRepository jooqRepository;

    public List<DTO> get(Filter filter){
        return jooqRepository.fetch((jooq)->{
            SelectSelectStep<?> selectStep =  jooq.select(field("country.name").as("name"),field("country.id").as("id"));

            //按需join
            SelectJoinStep<?> joinStep;
            if( filter.peopleName != null ){
                joinStep = selectStep.from(table("country").innerJoin(table("people")).on("country.id = people.country_id"));
            }else{
                joinStep = selectStep.from(table("country"));
            }

            //按需where
            List<Condition> condition = new ArrayList<>();
            if( filter.countryName != null ){
                condition.add(field("country.name").equal(filter.countryName));
            }
            if(filter.peopleName != null ){
                condition.add(field("people.name").equal(filter.peopleName));
            }

            SelectGroupByStep<?> conditionStep;
            if( condition.size() != 0 ){
                conditionStep = joinStep.where(condition);
            }else{
                conditionStep = joinStep;
            }

            //按需分页
            if( filter.pageIndex != null && filter.pageSize != null ){
                return conditionStep.limit(filter.pageSize).offset(filter.pageIndex);
            }else{
                return conditionStep;
            }
        },DTO.class);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DTO2{
        private Long countryId;

        private Long sum_id;
        private Integer count;

    }


    public List<DTO2> group(){
        return jooqRepository.fetch((jooq)->{
            return jooq.select(count().as("count"),sum(field("id",Integer.class)).as("sum_id"),field("country_id"))
                    .from("people")
                    .groupBy(field("country_id"));
        },DTO2.class);
    }
}
