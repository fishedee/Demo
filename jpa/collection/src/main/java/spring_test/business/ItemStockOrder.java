package spring_test.business;

import lombok.AllArgsConstructor;
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
    @Embeddable
    @ToString
    @Getter
    @AllArgsConstructor
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

    //Collection的主键可以设置为自增的
    //也可以自定义主键生成策略
    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    //@CollectionId(columns = @Column(name="item_stock_order_item_id"),
    //    type=@Type(type="long"),
    //    generator = "global_identity")
    private Collection<Item> items = new ArrayList<>();

    public ItemStockOrder(){

    }

    public void addItem(Item item){
        this.items.add(item);
    }
}
