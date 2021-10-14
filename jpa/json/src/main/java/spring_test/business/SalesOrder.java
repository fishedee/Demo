package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.*;
import org.hibernate.annotations.Table;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;
import javax.persistence.Entity;
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

    public static Long globalId = 20001L;
    @Id
    private Long id;


    //使用JSON类型的缺点在于：
    //* h2数据库没有JSON类型，只有生产级别数据库，mysql和pg有json类型，这使得单元测试的时候带来困难
    //* 不考虑h2的局限情况下，使用mysql来映射字段为字符串类型，会出现无法用JPQL查询的问题，因为数据库字段是String类型，但是实际代码类型为Set
    //* 不考虑h2的局限情况下，使用mysql来映射字段为json类型，会出现无法用JPQL查询的问题，因为JPQL没有原生的json查询，只能用nativeSQL查询，但是nativeSQL会导致提前刷新的问题
    @Type(type = "json")
    private Set<Long> users = new HashSet<Long>();

    protected SalesOrder(){

    }
    public static SalesOrder create(){
        SalesOrder salesOrder = new SalesOrder();
        salesOrder.id = globalId++;
        return salesOrder;
    }

    public void addUser(Long userId){
        this.users.add(userId);
    }
}
