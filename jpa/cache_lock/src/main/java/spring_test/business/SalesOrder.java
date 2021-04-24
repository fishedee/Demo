package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.common.util.StringHelper;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fish on 2021/4/23.
 */
@Entity
@ToString
@Getter
public class SalesOrder {

    @Embeddable
    @Getter
    @Setter
    @ToString
    @AllArgsConstructor
    public static class Address{
        private String city;

        private String street;

        protected Address(){

        }
    }

    @Embeddable
    @ToString
    public static class Item {
        private Long itemId;

        private String name;

        private BigDecimal amount;

        protected Item() {

        }

        public Item(Long itemId, String name, BigDecimal amount) {
            this.itemId = itemId;
            this.name = name;
            this.amount = amount;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<Item> items = new ArrayList<Item>();

    private Address address;

    private String name;

    public SalesOrder(){

    }

    public void addItem( Item item){
        this.items.add(item);
    }

    public void addItem2(Item item){
        List<Item> newItemList = new ArrayList<>(this.items);
        newItemList.add(item);
        //改变了原有的list指向
        this.items = newItemList;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setAddress(Address address){
        this.address = address;
    }
}
