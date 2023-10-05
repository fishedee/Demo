package spring_test.business;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/26.
 */
@Entity
@ToString
@Getter
public class User {
    public static enum Role{
        Admin,
        Cleark,
        WarehouseKeeper,
    }
    @JsonProperty("userId")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    protected User(){

    }

    public User(String name,String password,Role role){
        this.name = name;
        this.password = password;
        this.role = role;
    }
}
