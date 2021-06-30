package spring_test;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@ToString
@Getter
public class User{

    private static Long globalId = 10001L;

    @Id
    private Long id;

    private String name;

    protected User(){

    }

    public User(String name){
        this.id = globalId++;
        this.name = name;
    }

    public void mod(String name){
        this.name = name;
    }
}