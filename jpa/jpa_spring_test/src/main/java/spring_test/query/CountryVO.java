package spring_test.query;

import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by fish on 2021/4/16.
 */

@ToString
@Entity
@Immutable
@Table(name="t_country")
public class CountryVO {

    @Id
    private Long id;

    private String countryName;

    private String countryCode;

    @OneToMany(fetch = FetchType.EAGER)
    @BatchSize(size=1000)
    @JoinColumn(name="countryId")
    private List<PeopleVO> peoples = new LinkedList<PeopleVO>();
}
