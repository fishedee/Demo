package spring_test.query;

import lombok.ToString;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Immutable
@Table(name="t_contact")
@ToString
public class ContactVO {
    @Id
    private Long id;

    private String phone;

}