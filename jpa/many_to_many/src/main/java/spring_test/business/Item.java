package spring_test.business;

import lombok.Getter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@ToString
@Getter
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    //一对多映射的时候，@JoinColumn是指对方表的字段
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    @OrderColumn
    @JoinColumn(name="item_id",nullable = false)
    private List<ItemCategory> categorys = new ArrayList<>();

    protected Item(){

    }
    public Item(String name){
        this.name = name;
    }

    public void addItemCategory(Category category,People2 people2){
        this.categorys.add(new ItemCategory(category,people2));
    }

    public void removeItemCategory(int index){
        this.categorys.remove(index);
    }

    public void setCategoryPeople2(int index,People2 people2){
        this.categorys.get(index).setPeople2(people2);
    }
}
