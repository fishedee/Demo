package spring_test.business;

import jdk.nashorn.internal.ir.annotations.Immutable;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by fish on 2021/4/24.
 */
@Entity
@ToString
@Getter
//注意,不是JPA的Immutable注解,是Hibernate的Immutable注解
@org.hibernate.annotations.Immutable
public class People {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    protected People(){

    }
    public People(String name){
        this.name = name;
    }

    public void setName(String name){
        this.name = name;
    }
}
