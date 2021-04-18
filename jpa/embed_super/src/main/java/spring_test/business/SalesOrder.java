package spring_test.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by fish on 2021/4/18.
 */
//注意ToString,要调用父类的方法,否则会输出不了
@Entity
@ToString(callSuper = true)
@Getter
public class SalesOrder extends Order{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String salesName;

    protected SalesOrder(){

    }

    public SalesOrder(String salesName,String total,String owner,String remark){
        super(total,owner,remark);
        this.salesName = salesName;
    }

    public void modSalesName( String salesName){
        this.salesName = salesName;
    }
}
