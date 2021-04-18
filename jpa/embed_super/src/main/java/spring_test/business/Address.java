package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Embeddable;

/**
 * Created by fish on 2021/4/18.
 */
//Embeddable默认会继承实体的访问方式,因为User是按字段赋值的,所以Address也是用字段赋值的
@Embeddable
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@Getter
public class Address {

    private String country;

    private String city;

    private String street;

    private String zipcode;

    protected Address(){

    }
}
