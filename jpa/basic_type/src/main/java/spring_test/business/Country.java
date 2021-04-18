package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by fish on 2021/4/12.
 */
@ToString
@Getter
@Entity
//默认的表名为country
//默认的实体名为Country
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //默认的列名为下划线形式,country_name
    private String countryName;

    private String countryCode;

    //create_time字段是数据库自动生成的,所以insertable和updatable都为false,然后插入以后,要求hibernate从数据库取回这一行的列值
    //如果不关注CreateTime,可以扔掉Generated注解
    @Temporal(TemporalType.TIMESTAMP)
    @Column(insertable = false,updatable = false)
    @Generated(GenerationTime.INSERT)
    private Date CreateTime;

    //create_time字段是数据库自动生成的,所以insertable和updatable都为false,然后插入以后,要求hibernate从数据库取回这一行的列值
    //如果不关注ModifyTime,可以扔掉Generated注解
    @Temporal(TemporalType.TIMESTAMP)
    @Column(insertable = false,updatable = false)
    @Generated(GenerationTime.ALWAYS)
    private Date ModifyTime;

    protected  Country(){

    }

    public Long getId(){
        return this.id;
    }

    public Country(String countryName,String countryCode){
        this.countryCode = countryCode;
        this.countryName = countryName;
    }

    public void mod(String countryName,String countryCode){
        this.countryCode = countryCode;
        this.countryName = countryName;
    }

}
