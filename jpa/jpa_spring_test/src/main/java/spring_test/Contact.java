package spring_test;

import lombok.ToString;

import javax.persistence.*;

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

    protected Contact(){

    }

    public Contact(String phone){
        this.phone = phone;
    }
}
