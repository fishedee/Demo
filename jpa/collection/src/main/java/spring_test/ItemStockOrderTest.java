package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.ItemStockOrder;
import spring_test.business.MaterialStockOrder;
import spring_test.infrastructure.ItemStockOrderRepository;
import spring_test.infrastructure.MaterialStockOrderRepository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by fish on 2021/4/20.
 */
@Component
@Slf4j
public class ItemStockOrderTest {
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

    public void showAll(){
        List<ItemStockOrder> itemStockOrder = this.itemStockOrderRepository.getAll();
        log.info("itemStockOrder all is {}",itemStockOrder);
    }

    public void go(){
        ItemStockOrderTest app = (ItemStockOrderTest) AopContext.currentProxy();

        Long itemStockOrderId = app.add();

        app.addItem(itemStockOrderId,new ItemStockOrder.Item(10001L,new BigDecimal("30"),"凉鞋"));
        app.addItem(itemStockOrderId,new ItemStockOrder.Item(10002L,new BigDecimal("40"),"袜子"));
        app.addItem(itemStockOrderId,new ItemStockOrder.Item(10003L,new BigDecimal("50"),"球鞋"));

        app.showAll();
    }
}
