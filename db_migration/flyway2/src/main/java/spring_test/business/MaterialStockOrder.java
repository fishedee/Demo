package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by fish on 2021/4/19.
 */
@Entity
@ToString
@Getter
public class MaterialStockOrder {
    @Embeddable
    @ToString
    @Getter
    public static class Material{
        private Long materialId;

        private BigDecimal amount;

        private Long unitId;

        protected Material(){

        }

        public Material(Long materialId,BigDecimal amount,Long unitId){
            this.materialId = materialId;
            this.amount = amount;
            this.unitId = unitId;
        }
    }

    @Id
    @GeneratedValue
    private Long id;

    //默认列名为items_key,可以用@MapKeyColumn注解修改
    @ElementCollection(fetch = FetchType.EAGER)
    @BatchSize(size=1000)
    @Fetch(FetchMode.SELECT)
    //@MapKeyColumn(name="key")
    private Map<Long,Material> items = new HashMap<>();

    private int itemSize;

    public MaterialStockOrder(){

    }

    public void removeItem(Long id){
        this.items.remove(id);
        this.itemSize = this.items.size();
    }

    public void addItem(Material material){
        this.items.put(material.getMaterialId(),material);
        this.itemSize = this.items.size();
    }
}
