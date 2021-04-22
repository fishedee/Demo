package spring_test.business;

import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
//必须去掉country3的toString,否则会造成死循环
@ToString(exclude = "country3")
public class People3 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    private Country3 country3;

    protected  People3(){

    }

    public People3(String name){
        this.name = name;
    }

    public void setCountry(Country3 country){
        this.country3 = country;
    }
}
