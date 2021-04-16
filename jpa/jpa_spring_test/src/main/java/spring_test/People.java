package spring_test;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Table(name="t_people")
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

    @Override
    public String toString(){
        return String.format("People{id:%d,name:%s}",id,name);
    }
}
