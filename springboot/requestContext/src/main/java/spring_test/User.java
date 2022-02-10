package spring_test;

import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;

@ToString
@Getter
public class User  {
    private String name;

    private Integer age;

    public User(String name,Integer age){
        this.name = name;
        this.age = age;
    }

    public void setAge(Integer age){
        this.age = age;
    }
}
