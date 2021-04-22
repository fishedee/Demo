package spring_test.business;

import org.hibernate.annotations.Proxy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
@Proxy(lazy=false)
public class People {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    protected  People(){

    }

    public People(String name){
        this.name = name;
    }
}
