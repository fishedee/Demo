package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Table;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by fish on 2021/4/19.
 */
@Entity
@ToString
@Getter
public class SalesOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phoneNumber;

    private String address;

    protected SalesOrder(){

    }

    public SalesOrder(SalesOrderDTO dto){
        this.name = dto.getName();
        this.phoneNumber = dto.getPhoneNumber();
        this.address = dto.getAddress();
    }
}
