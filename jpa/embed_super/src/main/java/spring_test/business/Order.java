package spring_test.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.MappedSuperclass;

/**
 * Created by fish on 2021/4/18.
 */
@MappedSuperclass
@ToString
@Getter
public class Order {
    private String total;

    private String remark;

    private String owner;

    protected Order(){

    }

    public Order(String total,String owner,String remark){
        this.total = total;
        this.owner = owner;
        this.remark = remark;
    }

    public void setRemark(String remark){
        this.remark = remark;
    }
}
