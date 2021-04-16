package spring_test;

import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Table(name="t_people")
@ToString
public class People {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long countryId;

    private String name;

    protected People(){

    }

    public People(Long countryId,String name){
        this.countryId = countryId;
        this.name = name;
    }
}
