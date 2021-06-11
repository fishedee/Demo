package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
@ToString
@Getter
public class Country2 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //因为是多对多关联，所以你不应该加orphalRemove，和cascade为remove的设置。
    // 一个people可以隶属于多个country的。不能因为某个country不要这个people，就去把这个people删除掉
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
    @Fetch(FetchMode.SELECT)
    @JoinTable(
            name="country_people2",
            joinColumns = @JoinColumn(name="country_id"),
            inverseJoinColumns = @JoinColumn(name="people_id")
    )
    //没指名列名的话，列名就是people_list_order
    @OrderColumn
    private List<People2> peopleList = new ArrayList<>();

    protected Country2(){

    }

    public Country2(String name){
        this.name = name;
    }

    public void addPeople(People2 people){
        this.peopleList.add(people);
    }

    public void removePeopleIndex(int index){
        this.peopleList.remove(index);
    }
}
