package spring_test.business;

import lombok.Generated;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@ToString
@Getter
public class People {

    //改用自己的id生成算法
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    protected People(){
    }

    public People(String name){
        this.name = name;
    }

    public void setName(String name){
        this.name = name;
    }
}
