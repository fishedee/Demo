package spring_test.query;

import lombok.Data;
import org.hibernate.annotations.Immutable;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by fish on 2021/4/25.
 */
//必须要加entity才能映射
@Data
@Entity
public class CountryCount {

    private Long Count;

    @Id
    private String state;
}
