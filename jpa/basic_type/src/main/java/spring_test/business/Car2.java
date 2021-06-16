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
public class Car2 {
    private static Long globalId = 20001L;

    //改用自己的id生成算法
    @Id
    private Long id;

    private String name;

    //可以设置为由Hibernate来生成时间戳
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(updatable = false)
    private Date createTime;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date modifyTime;

    private Long generateId(){
        Long id = Car2.globalId++;
        return id;
    }
    protected Car2(){

        //这个不要设置id，这个protected是由JPA读取数据后自动填充用的
        //即使设置了generateId，JPA也不会将id使用update语句写入到数据库，因为JPA默认id是不可改变的。但是，这样做会让id增长不是连续的。
        //this.id = generateId();
    }

    public Car2(String name){
        this.id = generateId();
        this.name = name;
    }

    public void mod(String name){
        this.name = name;
    }
}
