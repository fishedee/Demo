package spring_test.business;

        import lombok.Getter;
        import lombok.ToString;

        import javax.persistence.Entity;
        import javax.persistence.GeneratedValue;
        import javax.persistence.GenerationType;
        import javax.persistence.Id;

/**
 * Created by fish on 2021/4/24.
 */
@Entity
@ToString
@Getter
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    protected Car(){}

    public Car(String name){
        this.name = name;
    }

    public void setName(String name){
        this.name = name;
    }
}
