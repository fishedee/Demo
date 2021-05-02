package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
    @Entity
    @ToString
    @Table(name="purchase_order_items")
    protected static class Item {

        //实体,必须带有id
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        private String name;

        protected Item(){

        }

        public Item(String name){
            this.name = name;
        }

        public void setName(String name){
            this.name = name;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //这次嵌套的实体,不是Embedable
    //实体的脏检查通过数据本身,和地址本身,两个都一致才不会触发脏更新
    //另外每次插入都需要2次sql,插入一次,更新order一次.
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="purchase_order_id",nullable = false)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<Item> items = new ArrayList<>();

    public PurchaseOrder(){

    }

    public void addItem(String name){
        ArrayList<Item> newUser = new ArrayList<>(this.items);
        newUser.add(new Item(name));
        this.items.clear();
        this.items.addAll(newUser);
    }

    public void addItem2(String name){
        this.items.add(new Item(name));
    }

    public void modItemName(int index,String name){
        //删除了原来的实体,会触发脏更新
        this.items.remove(index);
        this.items.add(index,new Item(name));
    }

    public void modItemName2(int index,String name){
        this.items.get(index).setName(name);
    }

    public void remove(int index){
        this.items.remove(index);
    }

}
