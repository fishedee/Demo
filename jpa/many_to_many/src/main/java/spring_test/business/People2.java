package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
@ToString
@Getter
public class People2 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    protected  People2(){

    }

    public People2(String name){
        this.name = name;
    }
}
