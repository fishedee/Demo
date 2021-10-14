package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.SalesOrder;
import spring_test.infrastructure.SalesOrderRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/19.
 */
@Component
@Slf4j
public class SalesOrderTest {
    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Transactional
    public Long add(){
        SalesOrder salesOrder = SalesOrder.create();
        this.salesOrderRepository.add(salesOrder);
        return salesOrder.getId();
    }

    @Transactional
    public void addUser(Long salesOrderId,Long userId){
        SalesOrder salesOrder = this.salesOrderRepository.find(salesOrderId);
        salesOrder.addUser(userId);
    }

    @Transactional
    public void addUser2(Long salesOrderId,Long userId){
        SalesOrder salesOrder = this.salesOrderRepository.find(salesOrderId);
        //绕过setter,视图直接获取users列表来添加
        salesOrder.getUsers().add(userId);
    }

    public void showAll(){
        List<SalesOrder> salesOrderList = this.salesOrderRepository.getAll();
        log.info("all salesOrderList {}",salesOrderList);
    }

    public void go(){
        SalesOrderTest app = (SalesOrderTest) AopContext.currentProxy();

        Long salesOrderId = app.add();

        app.showAll();

        app.addUser(salesOrderId,100L);
        app.addUser(salesOrderId,200L);

        app.showAll();

        Long salesOrderId2 = app.add();
        app.addUser(salesOrderId2,300L);
        app.addUser(salesOrderId2,400L);
        app.showAll();
    }
}
