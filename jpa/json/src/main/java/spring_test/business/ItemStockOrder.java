package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by fish on 2021/4/20.
 */
@Entity
@ToString
@Getter
public class ItemStockOrder {


    public static Long globalId = 20001L;

    @Embeddable
    @ToString
    @Getter
    //这个必须要加，否则会产生不必要的update
    @EqualsAndHashCode
    public static class Item{
        private Long itemId;

        private BigDecimal amount;

        private String itemName;

        protected Item(){

        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Type(type = "json")    private Collection<Item> items = new ArrayList<>();

    protected ItemStockOrder(){

    }
    public static ItemStockOrder create(){
        ItemStockOrder itemStockOrder = new ItemStockOrder();
        itemStockOrder.id = globalId++;
        return itemStockOrder;
    }

    public void addItem(Item item){
        this.items.add(item);
    }
}
