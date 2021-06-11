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
@ToString(exclude = "countryList")
@Getter
public class People {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany(fetch = FetchType.EAGER,mappedBy = "peopleList")
    @Fetch(FetchMode.SELECT)
    private List<Country> countryList = new ArrayList<>();

    protected  People(){

    }

    public People(String name){
        this.name = name;
    }

    public List<Country> getCountryList(){
        return Collections.unmodifiableList(this.countryList);
    }
    public List<Country> dangerous_getCountryList(){
        return this.countryList;
    }
}
