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
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //OneToMany额外的@JoinColumn字段指定了peopleList是在关系的写入端
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private List<People> peopleList = new ArrayList<>();

    protected Country(){

    }

    public Country(String name){
        this.name = name;
    }

    public void addPeople(People people){
        this.peopleList.add(people);
    }
}
