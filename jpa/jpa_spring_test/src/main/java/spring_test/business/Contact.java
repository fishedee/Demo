package spring_test.business;

import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fish on 2021/4/16.
 */
@Entity
@Table(name="t_contact")
@ToString
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String phone;

    protected  Contact(){

    }
    public Contact(String phone){
        this.phone = phone;
    }
}
