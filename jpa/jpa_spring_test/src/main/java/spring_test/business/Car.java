package spring_test.business;

import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Table(name="t_car")
@ToString
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Long peopleId;

    protected Car(){

    }

    public Car(Long peopleId,String name){
        this.peopleId = peopleId;
        this.name = name;
    }
}
