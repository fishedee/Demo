package spring_test;

import jdk.nashorn.internal.ir.annotations.Immutable;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.ManyToAny;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Table(name="t_people")
@Immutable
@ToString
public class PeopleDTO {

    @Id
    private Long id;

    private String name;

    /*
    //contact可为空的情况
    @ManyToMany(fetch = FetchType.EAGER)
    @BatchSize(size=10000)
    @JoinTable(
            name="t_people",
            joinColumns = @JoinColumn(name="id"),
            inverseJoinColumns = @JoinColumn(name="contactId")
    )
    private List<Contact> contact = new ArrayList<Contact>();
    */


    //contact不可为空的情况
    @OneToOne(fetch = FetchType.EAGER,optional = true)
    @JoinColumn(name="contactId")
    private Contact contact;
}
