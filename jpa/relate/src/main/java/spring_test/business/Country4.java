package spring_test.business;

import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
@ToString
public class Country4 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //OneToMany额外的@JoinColumn字段指定了peopleList是在关系的写入端
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "country_id",nullable = false)
    private List<People4> peopleList = new ArrayList<>();

    protected Country4(){

    }

    public Country4(String name){
        this.name = name;
    }

    public void addPeople(People4 people){
        this.peopleList.add(people);
    }
}
