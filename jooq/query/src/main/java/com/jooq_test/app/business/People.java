package com.jooq_test.app.business;

import lombok.Getter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@ToString
@Getter
public class People {

    private static Long globalId = 10001L;

    @Id
    private Long id;

    private String name;

    private Long countryId;

    protected People(){

    }

    public People(String name,Long countryId){
        this.id = globalId++;
        this.name = name;
        this.countryId = countryId;
    }
}
