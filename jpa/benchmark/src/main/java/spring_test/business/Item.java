package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@Slf4j
public class Item extends BaseEntityType {

    @Entity
    @ToString
    @Getter
    @Table(name="item_contact_alias")
    public static class ItemContactAlias extends BaseEntityType{
        @Id
        private String id;

        private Long contactId;

        private String aliasItemName;

        private String aliasItemNumber;

        protected ItemContactAlias(){

        }
    }

    @Entity
    @ToString
    @Getter
    @Table(name="item_unit_convert")
    public static class ItemUnitConvert extends BaseEntityType{
        @Id
        private String id;

        private Long unitId;

        private String unitName;

        private BigDecimal unitConvert;

        private Byte isBasic;

        private Byte isCommon;

        private Byte canBusinessLink;

        //允许为null
        private BigDecimal wholeSalesPrice;

        private String unitConvertDesc;

        protected ItemUnitConvert(){

        }
    }

    @Id
    private Long id;

    private String number;

    private String name;

    private Byte isCategory;

    private Byte isSystem;

    private Integer treeLevel;

    private String treePath;

    private Long parentId;

    private String modelRemark;

    private String specsRemark;

    private String remark;

    private Long basicUnitId;

    private String basicUnitName;

    private Long commonUnitId;

    private String commonUnitName;

    private BigDecimal commonUnitConvert;

    private String unitConvertDesc;

    private Byte isRegularType;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="itemId",nullable = false)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<ItemUnitConvert> unitConverts = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name="itemId",nullable = false)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<ItemContactAlias> aliases = new ArrayList<>();

    //仅为展示的时候使用
    @Transient
    private List<Item> children = new ArrayList<>();

    protected Item(){

    }
}
