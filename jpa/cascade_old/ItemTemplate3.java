package com.fishedee.erp.item.business;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fishedee.erp.framework.mvc.MyException;
import com.fishedee.erp.framework.utils.BaseEntityType;
import com.fishedee.erp.framework.utils.ValidatorUtil;
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
    public interface PropertyAddService {
        void add(ItemTemplate.Property property);
    }

    public interface OptionAddService {
        void add(ItemTemplate.Option option);
    }

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
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        protected Option(){

        }

        private Option(int optionsOrder , Long itemTemplatePropertyId,String name){
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
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
        @JoinColumn(name = "itemTemplatePropertyId",nullable = false)
        @Fetch(FetchMode.SELECT)
        @OrderColumn
        private List<Option> options = new ArrayList<>();

        protected Property(){

        }

        private Property(int propertiesOrder,Long itemTemplateId,String name){
            this.name = name;
        }

        private void setName(String name){
            this.name = name;
        }

        private void setOptions(OptionAddService optionAddService, List<ItemTemplateDTO.Option> newOptions){
            int i = 0;
            for( i = 0 ;i < this.options.size() ;i++){
                //修改原来的
                if( i < newOptions.size() ){
                    this.options.get(i).setName(newOptions.get(i).getName());
                }else{
                    break;
                }
            }

            if( i < newOptions.size()){
                //添加新的
                for( ;i < newOptions.size();i++){
                    Option option = new Option(i,this.getId(),newOptions.get(i).getName());
                    //optionAddService.add(option);
                    this.options.add(option);
                }
            }else{
                //删除旧的
                int delSize = this.options.size() - i;
                for( int j = 0 ;j != delSize;j++){
                    this.options.remove(i);
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
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "itemTemplateId",nullable = false)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    private List<Property> properties = new ArrayList<>();

    public List<Property> getProperties(){
        return Collections.unmodifiableList(properties);
    }

    @Autowired
    @Transient
    @JsonIgnore
    private PropertyAddService propertyAddService;

    @Autowired
    @Transient
    @JsonIgnore
    private OptionAddService optionAddService;

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
        int i = 0;
        for( i = 0 ;i < this.properties.size() ;i++){
            //修改原来的
            if( i < newProperties.size() ){
                this.properties.get(i).setName(newProperties.get(i).getName());
                this.properties.get(i).setOptions(this.optionAddService,newProperties.get(i).getOptions());
            }else{
                break;
            }
        }

        if( i < newProperties.size()){
            for( ;i < newProperties.size();i++){
                //添加新的
                Property property = new Property(i,this.getId(),newProperties.get(i).getName());
                //this.propertyAddService.add(property);
                this.properties.add(property);
                //添加以后才有id,才能进行setOption
                property.setOptions(this.optionAddService,newProperties.get(i).getOptions());
            }
        }else{
            //删除旧的
            int delSize = this.properties.size() - i;
            for( int j = 0 ;j != delSize;j++){
                this.properties.remove(i);
            }
        }
    }

    private List<Integer> getOption(ItemOptionKeyDTO optionKey){
        List<Long> optionListTrim = optionKey.getData();
        if( optionListTrim.size() != this.properties.size() ){
            return null;
        }
        //逐个检查每一项
        List<Integer> result = new ArrayList<Integer>();
        for( int i = 0; i != this.properties.size();i++){
            Long targetOptionId = optionListTrim.get(i);
            Property currentProperty = this.properties.get(i);
            List<Option> currentOption = currentProperty.options;
            boolean hasFoundOption = false;
            for( int j = 0 ;j != currentOption.size() ;j++){
                if( currentOption.get(j).getId().equals(targetOptionId)){
                    hasFoundOption = true;
                    result.add(j);
                    break;
                }
            }
            if( hasFoundOption == false ){
                return null;
            }
        }
        return result;
    }

    public boolean hasOption(ItemOptionKeyDTO optionKey){
        return this.getOption(optionKey) != null;
    }

    public String getOptionName(ItemOptionKeyDTO optionKey){
        List<Integer> options = this.getOption(optionKey);

        if( options == null){
            throw new MyException(1,"找不到这样的选项"+optionKey,null);
        }

        StringBuilder optionKeyName = new StringBuilder();
        optionKeyName.append(this.name);
        for( int i = 0 ;i != this.properties.size();i++){
            Property property = this.properties.get(i);
            Integer propertyOptionKey = options.get(i);
            optionKeyName.append("_");
            optionKeyName.append(property.getName());
            optionKeyName.append(property.getOptions().get(propertyOptionKey).getName());
        }
        return optionKeyName.toString();
    }
}
