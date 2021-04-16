package spring_test.query;

import lombok.ToString;
import org.hibernate.annotations.Immutable;

import javax.persistence.Id;
import javax.persistence.Table;

import javax.persistence.Entity;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Immutable
@Table(name="t_car")
@ToString
public class CarVO {
    @Id
    private Long id;

    private String name;
}
