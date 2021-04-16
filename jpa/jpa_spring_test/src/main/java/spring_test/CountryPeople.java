package spring_test;

import jdk.nashorn.internal.ir.annotations.Immutable;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

/**
 * Created by fish on 2021/4/16.
 */
@ToString
@Entity
@Immutable
@Table(name="t_country")
public class CountryPeople{

    @Id
    private Long id;

    private String countryName;

    private String countryCode;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name="countryId")
    private List<People> peoples = new LinkedList<People>();

    protected  CountryPeople(){

    }

    public String toString(){
        return String.format("CountryPeople{id:%d,name:%s,code:%s,peoples:%s}",id,countryName,countryCode,peoples.toString());
    }
}
