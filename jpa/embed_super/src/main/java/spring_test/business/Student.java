package spring_test.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/18.
 */
@Entity
@ToString
@Getter
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String school;

    private String name;

    //重写Address的某一个字段名,其他字段名保持不变
    @AttributeOverrides({
            @AttributeOverride(name="street",column=@Column(name="student_street"))
    })
    private Address address;

    protected Student(){

    }

    public Student(String school,String name,Address address){
        this.school = school;
        this.name = name;
        this.address = address;
    }

    public void mod(String school,String name,Address address){
        this.school = school;
        this.name = name;
        this.address = address;
    }
}
