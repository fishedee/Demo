package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@ToString
@Getter
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //使用enum作为映射对象,将枚举的字符串写入数据库,注意,枚举的值是区分大小写的.
    @Enumerated(EnumType.STRING)
    private CarBrand brand;

    private BigDecimal price;

    //可以设置为由Hibernate来生成时间戳
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(updatable = false)
    private Date createTime;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date modifyTime;

    protected Car(){

    }

    public Car(CarBrand carBrand,String name,BigDecimal price){
        this.brand = carBrand;
        this.name = name;
        this.price = price;
    }

    public void mod(CarBrand carBrand,String name,BigDecimal price){
        this.brand = carBrand;
        this.name = name;
        this.price = price;
    }
}
