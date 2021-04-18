package spring_test.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@ToString
@Getter
//重写表名
@Table(name="t_people")
public class People {
    //直接在hibernate_sequence获取下一个自增值,所有表共用一个自增值
    //这样比IDENTITY的好处是,persist的时候不需要insert,而且可以批量在内存缓存多个主键,提高插入效率
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //重写列名
    @Column(name="people_name")
    private String name;

    //数据库有CreateTime和ModifyTime字段,但是修改操作的时候没有取出来,所以不用
    //可以只在query的时候才用这个字段

    protected People(){

    }

    public People(String name){
        this.name = name;
    }
}
