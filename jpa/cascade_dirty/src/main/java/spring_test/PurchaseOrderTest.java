package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.PurchaseOrder;
import spring_test.business.SalesOrder;
import spring_test.infrastructure.PurchaseOrderRepositoy;
import spring_test.infrastructure.SalesOrderRepository;

/**
 * Created by fish on 2021/5/2.
 */
@Component
@Slf4j
public class PurchaseOrderTest {
    @Autowired
    private PurchaseOrderRepositoy purchaseOrderRepositoy;

    @Transactional
    public Long addOne(){
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        this.purchaseOrderRepositoy.add(purchaseOrder);
        return purchaseOrder.getId();
    }

    @Transactional
    public void add1(Long id,String name){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(id);
        purchaseOrder.addItem(name);
    }

    @Transactional
    public void add2(Long id,String name){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(id);
        purchaseOrder.addItem2(name);
    }

    @Transactional
    public void mod1(Long id,int index,String name){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(id);
        purchaseOrder.modItemName(index,name);
    }

    @Transactional
    public void mod2(Long id,int index,String name){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(id);
        purchaseOrder.modItemName2(index,name);
    }

    @Transactional
    public void remove(Long id,int index){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepositoy.find(id);
        purchaseOrder.remove(index);
    }

    public void go1(){
        log.info("go1 begin.......");
        PurchaseOrderTest app = (PurchaseOrderTest) AopContext.currentProxy();


        Long purchaseOrderId = app.addOne();
        //每次增加都需要2个sql
        //首先插入数据,然后再更新order
        app.add1(purchaseOrderId,"fish");
        //只增加一次,即使是将数据清空了以后重新插入!即使是实体也和Embeddable一样,只是sql数量一样
        app.add1(purchaseOrderId,"cat");

        //这个时候会产生删除再重新插入的问题,即使名字一样.因为实体容器的比较是通过地址
        log.info("go1 mod name.......");
        app.mod1(purchaseOrderId,0,"fish");

        //原地更改的,更不会产生update操作,且实体的地址也没有改变
        log.info("go1 mod2 name.......");
        app.mod2(purchaseOrderId,0,"fish");
    }

    public void go2(){
        log.info("go2 begin.......");
        PurchaseOrderTest app = (PurchaseOrderTest) AopContext.currentProxy();

        Long purchaseOrderId = app.addOne();
        app.add2(purchaseOrderId,"fish");
        app.add2(purchaseOrderId,"dog");

        log.info("go2 add3 begin.......");
        //每次增加都需要2个sql
        //首先插入数据,然后再更新order
        app.add2(purchaseOrderId,"cat");

        log.info("go2 remove.......");
        //删除第一个的时候,会生成3个sql
        //第一个是删除后面的
        //另外2个是原地update order的,和Embeddable一样
        app.remove(purchaseOrderId,0);
    }

    public void go(){
        go1();
        go2();
    }
}
