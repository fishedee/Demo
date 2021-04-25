package spring_test.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by fish on 2021/4/25.
 */
@Entity
@ToString
@Getter
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String state;

    protected Country(){

    }

    public Country(String name,String state){
        this.name = name;
        this.state = state;
    }
}
