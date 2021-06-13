package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.PurchaseOrder;
import spring_test.business.PurchaseOrderVO;
import spring_test.business.SalesOrder;
import spring_test.infrastructure.PurchaseOrderRepositoy;
import spring_test.infrastructure.PurchaseOrderVORepository;
import spring_test.infrastructure.SalesOrderRepository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by fish on 2021/4/19.
 */
@Component
@Slf4j
public class PurchaseOrderTest {
    @Autowired
    private PurchaseOrderRepositoy purchaseOrderRepositoy;

    @Autowired
    private PurchaseOrderVORepository purchaseOrderVORepository;

    @Transactional
    public Long add(){
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        this.purchaseOrderRepositoy.add(purchaseOrder);
        return purchaseOrder.getId();
    }

    @Transactional
    public void addItem(Long purchaseOrderId,Long itemId, BigDecimal price,BigDecimal amount){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(purchaseOrderId);
        purchaseOrder.addItem(itemId,price,amount);
        log.info("addItem finish");
    }

    @Transactional
    public void removeItem(Long purchaseOrderId,int index){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(purchaseOrderId);
        purchaseOrder.remove(index);
        log.info("removeItem finish");
    }

    public void showOne(Long purchaseOrderId){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(purchaseOrderId);
        log.info("purchaseOrder {} is {}",purchaseOrderId,purchaseOrder);
    }

    public void showAll(){
        List<PurchaseOrder> purchaseOrderList = this.purchaseOrderRepositoy.getAll();
        log.info("all purchaseOrderList {}",purchaseOrderList);
    }

    public void showAllVO(){
        List<PurchaseOrderVO> purchaseOrderList = this.purchaseOrderVORepository.getAll();
        log.info("all purchaseOrderList {}",purchaseOrderList);
    }

    public void go(){
        PurchaseOrderTest app = (PurchaseOrderTest) AopContext.currentProxy();

        Long purchaseOrderId = app.add();

        app.showOne(purchaseOrderId);

        app.addItem(purchaseOrderId,10001L,new BigDecimal("1.2"),new BigDecimal("10"));
        app.addItem(purchaseOrderId,10002L,new BigDecimal("3.4"),new BigDecimal("1"));
        app.addItem(purchaseOrderId,10002L,new BigDecimal("5.6"),new BigDecimal("20"));

        app.showOne(purchaseOrderId);

        app.removeItem(purchaseOrderId,1);

        app.showOne(purchaseOrderId);

        app.add();

        app.add();

        app.add();

        app.showAll();

        app.showAllVO();
    }
}
