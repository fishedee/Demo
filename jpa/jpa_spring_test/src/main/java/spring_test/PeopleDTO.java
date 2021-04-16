package spring_test;

import jdk.nashorn.internal.ir.annotations.Immutable;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(fetch = FetchType.EAGER)
    @BatchSize(size=1000)
    @JoinColumn(name="contactId")
    private List<Contact> contact = new ArrayList<Contact>();
}
