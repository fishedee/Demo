package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.SalesOrder;
import spring_test.infrastructure.SalesOrderRepository;

import java.math.BigDecimal;

/**
 * Created by fish on 2021/4/23.
 */
@Component
@Slf4j
public class SalesOrderDirtyCheckTest {

    @Autowired
    SalesOrderRepository salesOrderRepository;

    @Transactional
    public Long newSalesOrder(){
        SalesOrder salesOrder = new SalesOrder();
        salesOrder.setAddress(new SalesOrder.Address("城市","大街"));
        salesOrder.setName("我的");
        this.salesOrderRepository.add(salesOrder);
        return salesOrder.getId();
    }

    @Transactional
    public void addItem(Long salesOrderId ,SalesOrder.Item item){
        SalesOrder salesOrder = this.salesOrderRepository.find(salesOrderId);
        //直接在原来的list上面添加,JPA仅执行一次insert
        salesOrder.addItem(item);
    }

    @Transactional
    public void addItem2(Long salesOrderId ,SalesOrder.Item item){
        SalesOrder salesOrder = this.salesOrderRepository.find(salesOrderId);
        //直接在新的list上面添加,JPA会先执行一次delete,然后执行两次insert.
        //因为JPA认为引用变化了,所有数据都不同了
        salesOrder.addItem2(item);
    }

    @Transactional
    public void setName(Long salesOrderId){
        SalesOrder salesOrder = this.salesOrderRepository.find(salesOrderId);

        //没有触发更新,即使String的引用变了,因为String的equals和原来的一样
        salesOrder.setName("我的");
    }

    @Transactional
    public void setAddress(Long salesOrderId){
        SalesOrder salesOrder = this.salesOrderRepository.find(salesOrderId);

        //没有触发更新,即使Embeddable没有equals,而且引用也变了.因为Embeddable会进行内部基础类型的对比
        salesOrder.setAddress(new SalesOrder.Address("城市","大街"));
    }

    @Transactional
    public void setAddress2(Long salesOrderId){
        SalesOrder salesOrder = this.salesOrderRepository.find(salesOrderId);

        //没有触发更新,引用没变,数据没变,当然没变
        salesOrder.getAddress().setCity("城市");
        salesOrder.getAddress().setStreet("大街");
    }

    public void showOne(Long saleOrderId){
        SalesOrder salesOrder =this.salesOrderRepository.find(saleOrderId);
        log.info("salesOrder {} is {}",saleOrderId,salesOrder);
    }

    public void go(){
        SalesOrderDirtyCheckTest app = (SalesOrderDirtyCheckTest) AopContext.currentProxy();

        Long salesOrderId = app.newSalesOrder();

        app.addItem(salesOrderId,new SalesOrder.Item(10001L,"商品1",new BigDecimal("12.3")));
        app.addItem2(salesOrderId,new SalesOrder.Item(10002L,"商品2",new BigDecimal("8.8")));

        app.setName(salesOrderId);

        app.setAddress(salesOrderId);
        app.setAddress2(salesOrderId);

        showOne(salesOrderId);
    }
}
