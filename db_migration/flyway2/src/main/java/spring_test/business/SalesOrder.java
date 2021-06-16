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
    @GeneratedValue
    private Long id;

    //eager加batchSize能有效避免N+1的问题
    @ElementCollection(fetch= FetchType.EAGER)
    @BatchSize(size=100)
    @CollectionTable(
            name="sales_order_user",
            joinColumns = @JoinColumn(name="sales_order_id")
    )
    @Column(name="user_id")
    @Fetch(FetchMode.SELECT)
    private Set<Long> users = new HashSet<Long>();

    public SalesOrder(){

    }

    //注意,lombok自动生成getter方法返回的是可修改Set
    public Set<Long> getUsers(){
        //返回禁止被修改的set列表,外部只能进行读取操作
        return Collections.unmodifiableSet(users);
    }

    public void addUser(Long userId){
        this.users.add(userId);
    }
}
