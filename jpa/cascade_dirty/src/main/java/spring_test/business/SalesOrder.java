package spring_test.business;

import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Table;
import org.springframework.core.annotation.Order;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;
import java.util.*;

/**
 * Created by fish on 2021/4/19.
 */
@Entity
@ToString
@Getter
public class SalesOrder {

    @Data
    @Embeddable
    @AllArgsConstructor
    @NoArgsConstructor
    public static class User{
        String name;
    }

    @Id
    @GeneratedValue
    private Long id;

    //Embeddable的脏检查通过数据本身
    @ElementCollection(fetch= FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<User> users = new ArrayList<User>();

    public SalesOrder(){

    }

    public void addUser(String name){
        ArrayList<User> newUser = new ArrayList<>(this.users);
        newUser.add(new User(name));
        this.users.clear();
        this.users.addAll(newUser);
    }

    public void addUser2(String name){
        this.users.add(new User(name));
    }

    public void modUserName(int index,String name){
        this.users.remove(index);
        this.users.add(index,new User(name));
    }

    public void modUserName2(int index,String name){
        this.users.get(index).setName(name);
    }

    public void remove(int index){
        this.users.remove(index);
    }
}
