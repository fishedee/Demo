package spring_test.business;

import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
//必须去掉country2的toString,否则会造成死循环
@ToString(exclude = "country2")
public class People2 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //ManyToOne默认含有的@JoinColumn指定了这个是关系的写入端
    @ManyToOne(fetch = FetchType.EAGER)
    private Country2 country2;

    protected  People2(){

    }

    public People2(String name){
        this.name = name;
    }

    public void setCountry(Country2 country){
        this.country2 = country;
    }
}
