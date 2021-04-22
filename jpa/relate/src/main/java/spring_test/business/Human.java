package spring_test.business;

import lombok.ToString;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;

/**
 * Created by fish on 2021/4/22.
 */
@Entity
@ToString
@Immutable
public class Human {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //使用Object作为多态,相当好用,唯一不好的就是,即使设置为Eager,读取出来的依然需要又一次拉取
    //拉取的效率很高,自动按照man_type归类后组合数据
    @Any(metaColumn = @Column(name = "man_type"),fetch = FetchType.EAGER,optional=false)
    @AnyMetaDef(idType = "long", metaType = "string",
            metaValues = {
                    @MetaValue(targetEntity = Student.class,value="S"),
                    @MetaValue(targetEntity = Employee.class, value = "E")
            })
    @JoinColumn(name="man_id")
    //在Employee和Student上使用@Proxy(lazy=false),能解决懒加载的问题,但是会导致N+1问题
    private Object man;

    protected Human(){

    }

    public Human(Object man){
        this.man = man;
    }

    public Object getMan(){
        return man;
    }
}
