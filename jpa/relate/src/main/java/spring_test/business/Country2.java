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
public class Country2 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //mappedBy字段指定了peopleList字段处于只读端,与触发添加与删除people无关
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "country2")
    private List<People2> peopleList = new ArrayList<>();

    protected Country2(){

    }

    public Country2(String name){
        this.name = name;
    }

    public void addPeople(People2 people){
        this.peopleList.add(people);
    }
}
