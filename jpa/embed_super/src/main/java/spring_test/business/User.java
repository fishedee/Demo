package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by fish on 2021/4/18.
 */
@Entity
@ToString
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Address address;

    protected User(){

    }

    public User(String name,Address address){
        this.name = name;
        this.address = address;
    }

    public void mod(String name,Address address){
        this.name = name;
        this.address = address;
    }
}
