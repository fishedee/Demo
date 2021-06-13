package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fish on 2021/4/20.
 */
@Entity
@Immutable
@Table(name="purchase_order")
@ToString
@Getter
public class PurchaseOrderVO {
    @Embeddable
    @ToString
    protected static class ItemVO {
        private Long itemId;

        private BigDecimal price;

        private BigDecimal amount;

        private BigDecimal total;

        protected ItemVO() {

        }
    }

    @Id
    private Long id;

    //Immutable的表,倒是不需要指定SELECT,也会避免使用Join
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="purchase_order_items",joinColumns = @JoinColumn(name="purchase_order_id"))
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<ItemVO> items = new ArrayList<>();

    private BigDecimal total = new BigDecimal("0");

    protected PurchaseOrderVO() {

    }
}
