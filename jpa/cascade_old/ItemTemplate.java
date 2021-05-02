package com.fishedee.erp.item.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fishedee.erp.framework.utils.BaseEntityType;
import com.fishedee.erp.framework.utils.ValidatorUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by fish on 2021/5/1.
 */
@Entity
@ToString
@Getter
public class ItemTemplate extends BaseEntityType {

    @JsonProperty("itemTemplateId")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long itemCategoryId;

    public String nameId;

    public String name;

    public Long unitId;

    public String remark;

    @Entity
    @ToString
    @Getter
    @Table(name="item_template_option")
    public static class Option{
        private int optionsOrder;
        private Long itemTemplatePropertyId;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        protected Option(){

        }

        private Option(int optionsOrder , Long itemTemplatePropertyId,String name){
            this.optionsOrder = optionsOrder;
            this.itemTemplatePropertyId = itemTemplatePropertyId;
            this.name = name;
        }

        private void setName(String name){
            this.name = name;
        }
    }

    @Entity
    @ToString
    @Getter
    @Table(name="item_template_property")
    public static class Property{

        private int propertiesOrder;

        private Long itemTemplateId;

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST,orphanRemoval = true,mappedBy = "itemTemplatePropertyId")
        @Fetch(FetchMode.SELECT)
        @OrderBy("options_order asc")
        private List<Option> options = new ArrayList<>();

        protected Property(){

        }

        private Property(int propertiesOrder,Long itemTemplateId,String name){
            this.propertiesOrder = propertiesOrder;
            this.itemTemplateId = itemTemplateId;
            this.name = name;
        }

        private void setName(String name){
            this.name = name;
        }

        private void setOptions(List<ItemTemplateDTO.Option> newOptions){
            int i = 0;
            for( i = 0 ;i < this.options.size() ;i++){
                //修改原来的
                if( i < newOptions.size() ){
                    this.options.get(i).setName(newOptions.get(i).getName());
                }else{
                    break;
                }
            }
            if( i < this.options.size() ){
                //删除原来的
                int shouldDelSize = this.options.size() - i;
                for( int j = 0 ;j != shouldDelSize;j++){
                    int lastIndex = this.options.size() - 1;
                    this.options.remove(this.options.get(lastIndex));
                }
            }else{
                //添加新的
                for( ;i < newOptions.size();i++){
                    this.options.add(
                            new Option(i,this.getId(),
                                    newOptions.get(i).getName())
                    );
                }
            }
        }

        public List<Option> getOptions(){
            return Collections.unmodifiableList(this.options);
        }
    }


    //嵌套@ElementCollection是不行的,https://stackoverflow.com/questions/22126397/embeddable-and-elementcollection-nesting
    //因为嵌套@ElementCollection的子表用的是复合主键
    //只能用cascade和orphanRemoval来模拟@ElementCollection
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true,mappedBy = "itemTemplateId")
    @Fetch(FetchMode.SELECT)
    @OrderBy("properties_order asc")
    private List<Property> properties = new ArrayList<>();

    public List<Property> getProperties(){
        return Collections.unmodifiableList(properties);
    }

    @Autowired
    @Transient
    @JsonIgnore
    private ItemTemplatePropertyAdd itemTemplatePropertyAdd;

    protected ItemTemplate(){

    }

    public ItemTemplate(ItemTemplateDTO.Basic basic){
        this.modBasic(basic);
    }

    public void modBasic(ItemTemplateDTO.Basic basic){
        ValidatorUtil.check(basic);
        this.itemCategoryId = basic.getItemCategoryId();
        this.name = basic.getName();
        this.nameId = basic.getNameId();
        this.unitId = basic.getUnitId();
        this.remark = basic.getRemark();
    }

    public void modProperties(List<ItemTemplateDTO.Property> newProperties){
        ValidatorUtil.check(newProperties);
        int i = 0;
        for( i = 0 ;i < this.properties.size() ;i++){
            //修改原来的
            if( i < newProperties.size() ){
                this.properties.get(i).setName(newProperties.get(i).getName());
                this.properties.get(i).setOptions(newProperties.get(i).getOptions());
            }else{
                break;
            }
        }
        if( i < this.properties.size() ){
            //删除原来的
            int shouldDelSize = this.properties.size() - i;
            for( int j = 0 ;j != shouldDelSize;j++){
                int lastIndex = this.properties.size() - 1;
                this.properties.remove(this.properties.get(lastIndex));
            }
        }else{
            //添加新的
            for( ;i < newProperties.size();i++){
                Property property = new Property(i,this.getId(),newProperties.get(i).getName());
                //添加以后才有id
                this.itemTemplatePropertyAdd.add(property);
                property.setOptions(newProperties.get(i).getOptions());
            }
        }
    }
}
