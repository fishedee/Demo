package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Proxy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
@ToString
@Getter
public class People4 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    protected  People4(){

    }

    public People4(String name){
        this.name = name;
    }
}
