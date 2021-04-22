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
public class Country3 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //OneToMany额外的@JoinColumn字段指定了peopleList是在关系的写入端
    //cascade.persist的意思是,提交的时候检查一下PeopleList是否有多的,有的话就要对相应的people进行persist操作
    //orphanRemoval的意思是,提交的时候检查一下PeopleList是否有少的,少的话要对应执行people的remove操作,(只有当前people只被Country引用时才能这样做)
    @OneToMany(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST},orphanRemoval = true,mappedBy = "country3")
    private List<People3> peopleList = new ArrayList<>();

    protected Country3(){

    }

    public Country3(String name){
        this.name = name;
    }

    public void addPeople(People3 people){
        this.peopleList.add(people);
        people.setCountry(this);
    }
}
