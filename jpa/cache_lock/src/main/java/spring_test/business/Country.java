package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import spring_test.StandardListener;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/24.
 */
@Entity
@Getter
@ToString
@EntityListeners(StandardListener.class)
@Slf4j
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    protected Country(){

    }

    public Country(String name){
        this.name = name;
    }

    public void setName(String name){
        this.name =name;
    }

    //可以在entity自身添加倾听器,使用protected访问器较为安全
    @PostRemove
    protected void k(){
        log.info("country remove {}",this);
    }
}
