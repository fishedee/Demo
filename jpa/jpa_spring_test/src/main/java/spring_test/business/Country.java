package spring_test.business;

import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/12.
 */
@ToString
@Entity
@Table(name="t_country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String countryName;

    private String countryCode;

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
