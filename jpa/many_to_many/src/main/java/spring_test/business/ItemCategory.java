package spring_test.business;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@ToString
@Getter
public class ItemCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //一对一映射的时候，@JoinColumn就是指当前表的字段
    //OneToOne的optional为false，就是字段不能为null
    @OneToOne(optional = false,cascade = CascadeType.PERSIST)
    @JoinColumn(name="category_id")
    private Category category;

    //OneToOne的optional为true，就是字段可以为null，默认值为true，就是可以为null。
    @OneToOne(optional = true)
    @JoinColumn(name="people2_id")
    private People2 people2;

    protected ItemCategory(){

    }

    public ItemCategory(Category category,People2 people2){
        this.category = category;
    }

    public void setPeople2(People2 people2){
        this.people2 = people2;
    }

}
