package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.SalesOrder;
import spring_test.business.SalesOrderWhere;
import spring_test.infrastructure.SalesOrderRepository;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by fish on 2021/4/24.
 */
@Component
@Slf4j
public class SalesOrderTest {

    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Transactional
    public void initData(){
        //添加订单1
        SalesOrder salesOrder = new SalesOrder();
        salesOrder.setName("他的");
        salesOrder.setAddress(new SalesOrder.Address("城市1","街道1"));
        salesOrder.addItem(new SalesOrder.Item(10001L,"物品1",new BigDecimal("30")));
        salesOrder.addItem(new SalesOrder.Item(10002L,"物品2",new BigDecimal("40")));
        salesOrder.addItem(new SalesOrder.Item(10003L,"物品3",new BigDecimal("50")));
        salesOrderRepository.add(salesOrder);

        //添加订单2
        SalesOrder salesOrder2 = new SalesOrder();
        salesOrder2.setName("cat的我");
        salesOrder2.setAddress(new SalesOrder.Address("城市2","街道2"));
        salesOrder2.addItem(new SalesOrder.Item(10002L,"物品2",new BigDecimal("300")));
        salesOrder2.addItem(new SalesOrder.Item(10003L,"物品3",new BigDecimal("400")));
        salesOrder2.addItem(new SalesOrder.Item(10004L,"物品4",new BigDecimal("500")));
        salesOrderRepository.add(salesOrder2);
    }

    public void showSearch(){
        SalesOrderWhere where = new SalesOrderWhere();
        where.setSalesOrderIds(Arrays.asList(10001L,10002L));
        List<SalesOrder> salesOrderList = salesOrderRepository.search(where);

        log.info("salesOrder search where {} = {}",where,salesOrderList);
    }

    public void showSearch2(){
        //获取今天开始的十天时间段
        Calendar endTime = Calendar.getInstance();
        Calendar beginTime = (Calendar) endTime.clone();
        beginTime.add(Calendar.DAY_OF_YEAR,-10);

        //构造where
        SalesOrderWhere where = new SalesOrderWhere();
        where.setEndTime(endTime.getTime());
        where.setBeginTime(beginTime.getTime());
        where.setName("的");
        List<SalesOrder> salesOrderList = salesOrderRepository.search2(where);

        log.info("salesOrder search2 where {} = {}",where,salesOrderList);
    }

    public void showSearchByName(){
        List<SalesOrder> salesOrderList = salesOrderRepository.serachByName("cat");

        log.info("salesOrder showSearchByName where cat = {}",salesOrderList);
    }

    public void showPage(){
        List<SalesOrder> salesOrderList = salesOrderRepository.getAll(5,10);

        log.info("salesOrder getAll {5,10} = {}",salesOrderList);
    }

    @Transactional
    public void nativeAndMod(){
        SalesOrder salesOrder = salesOrderRepository.find(10001L);
        salesOrder.setName("我A去");

        //在nativeSQL执行的时候,它默认会Flush所有实体的数据到数据库
        List<SalesOrder> salesOrderList = salesOrderRepository.serachByName("A");

        log.info("salesOrder nativeAndMod where cat = {}",salesOrderList);

    }

    public void go(){
        SalesOrderTest app = (SalesOrderTest) AopContext.currentProxy();

        app.initData();

        app.showSearch();
        app.showSearch2();
        app.showSearchByName();
        app.showPage();

        app.nativeAndMod();
    }
}
