package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.ItemStockOrder;
import spring_test.infrastructure.ItemStockOrderRepository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by fish on 2021/4/20.
 */
@Component
@Slf4j
public class ItemStockOrderTest {
    /*
    @Autowired
    private ItemStockOrderRepository itemStockOrderRepository;

    @Transactional
    public Long add(){
        ItemStockOrder itemStockOrder = new ItemStockOrder();
        this.itemStockOrderRepository.add(itemStockOrder);
        return itemStockOrder.getId();
    }

    @Transactional
    public void addItem(Long itemStockOrderId, ItemStockOrder.Item item){
        ItemStockOrder itemStockOrder = this.itemStockOrderRepository.find(itemStockOrderId);
        itemStockOrder.addItem(item);
        log.info("addItem finish");
    }

    @Transactional
    public void removeFirst(Long itemStockOrderId){
        ItemStockOrder itemStockOrder = this.itemStockOrderRepository.find(itemStockOrderId);
        itemStockOrder.removeFirst();
        log.info("remove finish");
    }

    @Transactional
    public void addItem2(Long itemStockOrderId){
        ItemStockOrder itemStockOrder = this.itemStockOrderRepository.find(itemStockOrderId);
        itemStockOrder.clearItem();

        ItemStockOrder.Item item1 = new ItemStockOrder.Item(10001L,new BigDecimal("1"),"凉1");
        ItemStockOrder.Item item2 = new ItemStockOrder.Item(10002L,new BigDecimal("2"),"凉2");
        ItemStockOrder.Item item3 = new ItemStockOrder.Item(10003L,new BigDecimal("3"),"凉3");
        ItemStockOrder.Item item4 = new ItemStockOrder.Item(10004L,new BigDecimal("4"),"凉4");

        //插入两个相同的item3,依然会有5条记录
        itemStockOrder.addItem(item1);
        itemStockOrder.addItem(item2);
        itemStockOrder.addItem(item3);
        itemStockOrder.addItem(item4);
        itemStockOrder.addItem(item3);

        showOne(itemStockOrderId);

        //删除一个item3的时候,只会删除第一个item,尾部的item3依然保留
        //注意,只有在同一个事务里面,才能复用同一个item3,不同事务的时候,item3重新反序列化的时候,地址已经不同了.
        itemStockOrder.removeItem(item3);

        showOne(itemStockOrderId);
    }


    public void showAll(){
        List<ItemStockOrder> itemStockOrder = this.itemStockOrderRepository.getAll();
        log.info("itemStockOrder all is {}",itemStockOrder);
    }

    public void showOne(Long itemStockOrderId){
        ItemStockOrder itemStockOrder = this.itemStockOrderRepository.find(itemStockOrderId);
        log.info("itemStockOrder {} is {}",itemStockOrderId,itemStockOrder);
    }

    public void go(){
        ItemStockOrderTest app = (ItemStockOrderTest) AopContext.currentProxy();

        Long itemStockOrderId = app.add();

        //插入两个相同item2,在collection里面两个都会被插入
        ItemStockOrder.Item item1 = new ItemStockOrder.Item(10001L,new BigDecimal("30"),"凉鞋");
        ItemStockOrder.Item item2 = new ItemStockOrder.Item(10002L,new BigDecimal("40"),"袜子");
        ItemStockOrder.Item item3 = new ItemStockOrder.Item(10003L,new BigDecimal("50"),"球鞋");
        app.addItem(itemStockOrderId,item1);
        app.addItem(itemStockOrderId,item2);
        app.addItem(itemStockOrderId,item3);
        app.addItem(itemStockOrderId,item2);

        log.info("remove begin---");
        app.removeFirst(itemStockOrderId);
        log.info("remove end---");

        app.showOne(itemStockOrderId);

        //测试2
        //app.addItem2(itemStockOrderId);
    }
     */
}
