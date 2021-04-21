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
    //Collection的主键是隐形的,所以每次数据更新的时候,Hibernate总是清空整个collection,再重新插入数据
    //注意插入的时候不是用insert values,而是用多个insert ... value (),然后用jdbc.batch_size来优化
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

    public void removeItem(Item item){this.items.remove(item);}

    public void removeFirst(){
        if( this.items.size() != 0){
            this.items.remove(this.items.iterator().next());
        }
    }

    public void clearItem(){this.items.clear();}
}
