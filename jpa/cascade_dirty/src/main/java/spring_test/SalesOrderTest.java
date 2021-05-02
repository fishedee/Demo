package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import spring_test.business.SalesOrder;
import spring_test.infrastructure.SalesOrderRepository;

import org.springframework.transaction.annotation.Transactional;

/**
 * Created by fish on 2021/5/2.
 */
@Component
@Slf4j
public class SalesOrderTest {
    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Transactional
    public Long addOne(){
        SalesOrder salesOrder = new SalesOrder();
        this.salesOrderRepository.add(salesOrder);
        return salesOrder.getId();
    }

    @Transactional
    public void add1(Long id,String name){
        SalesOrder salesOrder = this.salesOrderRepository.find(id);
        salesOrder.addUser(name);
    }

    @Transactional
    public void add2(Long id,String name){
        SalesOrder salesOrder = this.salesOrderRepository.find(id);
        salesOrder.addUser2(name);
    }

    @Transactional
    public void mod1(Long id,int index,String name){
        SalesOrder salesOrder = this.salesOrderRepository.find(id);
        salesOrder.modUserName(index,name);
    }

    @Transactional
    public void mod2(Long id,int index,String name){
        SalesOrder salesOrder = this.salesOrderRepository.find(id);
        salesOrder.modUserName2(index,name);
    }

    @Transactional
    public void remove(Long id,int index){
        SalesOrder salesOrder = this.salesOrderRepository.find(id);
        salesOrder.remove(index);
    }

    public void go1(){
        log.info("go1 begin.......");
        SalesOrderTest app = (SalesOrderTest) AopContext.currentProxy();


        Long salesOrderId = app.addOne();
        app.add1(salesOrderId,"fish");
        //只增加一次,即使是将数据清空了以后重新插入
        app.add1(salesOrderId,"cat");

        //即使将数据删掉后,重新插入,只有名字没有改变,那么就不会产生update操作
        log.info("go1 mod name.......");
        app.mod1(salesOrderId,0,"fish");

        //原地更改的,更不会产生update操作
        log.info("go1 mod2 name.......");
        app.mod2(salesOrderId,0,"fish");
    }

    public void go2(){
        log.info("go2 begin.......");
        SalesOrderTest app = (SalesOrderTest) AopContext.currentProxy();

        Long salesOrderId = app.addOne();
        app.add2(salesOrderId,"fish");
        app.add2(salesOrderId,"dog");
        //只增加一次,即使是将数据清空了以后重新插入
        log.info("go2 add3 begin.......");
        app.add2(salesOrderId,"cat");

        log.info("go2 remove.......");
        //删除第一个的时候,会生成3个sql
        //第一个是删除后面的
        //另外2个是原地update order的
        app.remove(salesOrderId,0);
    }

    public void go(){
        go1();
        go2();
    }
}
