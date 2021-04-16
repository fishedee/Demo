package spring_test.query;

import jdk.nashorn.internal.ir.annotations.Immutable;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import spring_test.business.Contact;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Table(name="t_people")
@Immutable
@ToString
public class PeopleVO {

    @Id
    private Long id;

    private String name;

    /*
    //contactId可为0的情况,但是不可为null
    @ManyToMany(fetch = FetchType.EAGER)
    @BatchSize(size=10000)
    @JoinTable(
            name="t_people",
            joinColumns = @JoinColumn(name="id"),
            inverseJoinColumns = @JoinColumn(name="contactId")
    )
    private List<Contact> contact = new ArrayList<Contact>();
    */


    //contactId不可为0的情况,但是可为null
    @OneToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name="contactId")
    private ContactVO contact;

    @OneToMany(fetch = FetchType.EAGER)
    @BatchSize(size=1000)
    @JoinColumn(name="peopleId")
    private List<CarVO> cars = new LinkedList<CarVO>();
}
