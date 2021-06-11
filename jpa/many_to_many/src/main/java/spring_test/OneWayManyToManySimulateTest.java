package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import spring_test.business.Category;
import spring_test.business.Item;
import spring_test.business.People2;
import spring_test.infrastructure.CategoryRepository;
import spring_test.infrastructure.ItemRepository;
import spring_test.infrastructure.People2Repository;

import javax.transaction.Transactional;

@Component
@Slf4j
public class OneWayManyToManySimulateTest {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private People2Repository peopleRepository;

    @Transactional
    public Long addItem(String name){
        Item item = new Item(name);
        this.itemRepository.add(item);
        return item.getId();
    }

    @Transactional
    public void addExistCategoryToItem(Long categoryId,Long itemId){
        Category category = this.categoryRepository.find(categoryId);
        Item item = this.itemRepository.find(itemId);
        item.addItemCategory(category,null);
    }

    @Transactional
    public void addNewCategoryToItem(String name,Long itemId){
        //分2步sql
        //首先，插入ItemCategory信息
        /*
        insert
        into
            item_category
            (category_id, people2_id, item_id, categorys_order, id)
        values
            (?, ?, ?, ?, ?)
         */
        //然后，根据id，更新item_id和categorys_order，我觉得这一步没啥用
        /*
        update
            item_category
        set
            item_id=?,
            categorys_order=?
        where
            id=?
         */
        Category category = new Category(name);
        Item item = this.itemRepository.find(itemId);
        item.addItemCategory(category,null);
    }

    @Transactional
    public void removeItemCategory(Long itemId,int index){
        Item item = this.itemRepository.find(itemId);

        item.removeItemCategory(index);
    }

    @Transactional
    public void setItemCategoryPeople2(Long itemId,int index,Long peopleId){
        //需要1条sql
        /*
        update
            item_category
        set
            category_id=?,
            people2_id=?
        where
            id=?
         */
        People2 people2 = this.peopleRepository.find(peopleId);
        Item item = this.itemRepository.find(itemId);

        item.setCategoryPeople2(index,people2);
    }

    @Transactional
    public Long addPeople(String name){
        People2 people = new People2(name);
        this.peopleRepository.add(people);
        return people.getId();
    }

    @Transactional
    public Long addCategory(String name){
        Category category = new Category(name);
        this.categoryRepository.add(category);
        return category.getId();
    }

    public void printItem(Long id){
        //读取item需要2条sql
        /*首先，读取item的基础信息
    select
        item0_.id as id1_5_0_,
        item0_.name as name2_5_0_
    from
        item item0_
    where
        item0_.id=?
         */
        //然后，通过中间表，一起拉了category和people的信息。
        // 注意，category的optional为false，所以用inner join。
        //而people的optional为true，所以用left outer join
        /*
    select
        categorys0_.item_id as item_id4_6_3_,
        categorys0_.id as id1_6_3_,
        categorys0_.categorys_order as category5_3_,
        categorys0_.id as id1_6_2_,
        categorys0_.category_id as category2_6_2_,
        categorys0_.people2_id as people3_6_2_,
        category1_.id as id1_0_0_,
        category1_.name as name2_0_0_,
        people2x2_.id as id1_8_1_,
        people2x2_.name as name2_8_1_
    from
        item_category categorys0_
    inner join
        category category1_
            on categorys0_.category_id=category1_.id
    left outer join
        people2 people2x2_
            on categorys0_.people2_id=people2x2_.id
    where
        categorys0_.item_id=?
         */
        Item item = this.itemRepository.find(id);
        log.info("item id:{} item:{}",id,item);
    }

    public void go(){
        OneWayManyToManySimulateTest app = (OneWayManyToManySimulateTest) AopContext.currentProxy();

        //添加Item
        log.info("new item");
        Long itemId1 = app.addItem("沙发");
        Long itemId2 = app.addItem("床垫");

        app.printItem(itemId1);
        app.printItem(itemId2);


        //新建Category到Item
        log.info("addNewCategoryToItem");
        app.addNewCategoryToItem("重点产品",itemId1);
        app.addNewCategoryToItem("优质产品",itemId1);
        app.printItem(itemId1);


        //沿用已有的People到Country
        log.info("addExistCategoryToItem");
        Long categoryId1 = app.addCategory("3A产品");
        Long categoryId2 = app.addCategory("环保产品");
        app.addExistCategoryToItem(categoryId1,itemId1);
        app.addExistCategoryToItem(categoryId2,itemId1);
        app.addExistCategoryToItem(categoryId1,itemId2);
        app.printItem(itemId1);
        app.printItem(itemId2);

        //设置category的people信息
        log.info("setCategoryPeople");
        Long people1 = app.addPeople("张三");
        Long people2 = app.addPeople("李四");
        app.setItemCategoryPeople2(itemId1,0,people1);
        app.setItemCategoryPeople2(itemId1,2,people2);
        app.setItemCategoryPeople2(itemId2,0,people1);
        app.printItem(itemId1);
        app.printItem(itemId2);

        //删除
        log.info("removeItemCategory");
        //需要2条sql，首先更新删除位之后categorys_order对应的信息
        /*
   update
        item_category
    set
        item_id=?,
        categorys_order=?
    where
        id=?
         */
        //然后，删除末端数据
        /*
        delete
        from
            item_category
        where
            id=?
         */
        app.removeItemCategory(itemId1,2);
        app.printItem(itemId1);
        app.printItem(itemId2);
    }
}
