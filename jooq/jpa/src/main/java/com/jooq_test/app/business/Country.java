package com.jooq_test.app.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@ToString
@Getter
public class Country {

    private static Long globalId = 10001L;

    @Id
    private Long id;

    private String name;

    private Integer manCount;

    protected Country(){

    }

    public Country(String name,Integer manCount){
        this.id = globalId++;
        this.name = name;
        this.manCount = manCount;
    }

    public void modName(String name){
        this.name = name;
    }

    public void modCount(int count){
        this.manCount = count;
    }
}
