package spring_test;

import jdk.nashorn.internal.ir.annotations.Immutable;
import lombok.ToString;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by fish on 2021/4/16.
 */
public class ContactDTO {

}
/*
@Entity
@Immutable
@Table(name="t_contact")
@ToString
public class ContactDTO{
    @Id
    @Column(insertable = false,updatable = false)
    private Long id;

    private String phone;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name="id",
            insertable=false,
            updatable=false,
            referencedColumnName = "contactId"
    )
    private PeopleDTO people = null;

}
*/