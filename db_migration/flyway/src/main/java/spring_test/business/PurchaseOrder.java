package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by fish on 2021/4/19.
 */
@Entity
@ToString
@Getter
public class PurchaseOrder {
    //List嵌入对象的时候,要用Embeddable,且必须为static class
    @Embeddable
    @ToString
    protected static class Item {
        private Long itemId;

        private BigDecimal price;

        private BigDecimal amount;

        private BigDecimal total;

        protected Item(){

        }

        public Item(Long itemId,BigDecimal price,BigDecimal amount){
            this.itemId = itemId;
            this.price = price;
            this.amount = amount;
            this.total = this.price.multiply(this.amount);
        }

        public BigDecimal getTotal(){
            return this.total;
        }
    }

    @Id
    @GeneratedValue
    private Long id;

    //会生成items_order列,作为排序的依据
    //默认为Join拉取,要改为SELECT拉取,才能避免笛卡尔积
    //不要用SUBSELECT,会产生嵌套子查询复制原sql的问题
    @ElementCollection(fetch = FetchType.EAGER)
    @BatchSize(size=1000)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<Item> items = new ArrayList<>();

    private BigDecimal total = new BigDecimal("0");

    public PurchaseOrder(){

    }

    public void addItem(Long itemId,BigDecimal price,BigDecimal amount){
        Item newItem = new Item(itemId,price,amount);
        this.items.add(newItem);
        this.total = this.total.add(newItem.getTotal());
    }

    public void remove(int index){
        //删除的时候会生成多个sql
        //第一个sql为删除说在行
        //第二个sql为给后面的行的orderColumn减去1
        this.items.remove(index);
    }

    public List<Item> getItems(){
        return Collections.unmodifiableList(this.items);
    }
}
