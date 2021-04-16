package spring_test;

import jdk.nashorn.internal.ir.annotations.Immutable;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Subselect;

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
public class CountryPeopleDTO{

    @Id
    private Long id;

    private String countryName;

    private String countryCode;

    @OneToMany(fetch = FetchType.EAGER)
    @BatchSize(size=1000)
    @JoinColumn(name="countryId")
    private List<PeopleDTO> peoples = new LinkedList<PeopleDTO>();

    public String toString(){
        return String.format("CountryPeople{id:%d,name:%s,code:%s,peoples:%s}",id,countryName,countryCode,peoples.toString());
    }
}
