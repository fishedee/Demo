package spring_test.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/18.
 */
@Entity
@ToString(callSuper = true)
@Getter
//修改了父级的列名,其他列保持不变
@AttributeOverrides({
        @AttributeOverride(name="remark",column = @Column(name="purchase_remark"))
})
public class PurchaseOrder extends Order{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String company;

    protected PurchaseOrder(){

    }

    public PurchaseOrder(String company,String total,String owner,String remark){
        super(total,owner,remark);
        this.company = company;
    }

    public void modCompany( String company){
        this.company = company;
    }
}
