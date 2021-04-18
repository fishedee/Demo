package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Address;
import spring_test.business.SalesOrder;
import spring_test.business.Student;
import spring_test.infrastructure.SalesOrderRepository;
import spring_test.infrastructure.StudentRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/18.
 */
@Component
@Slf4j
public class SalesOrderTest {
    @Autowired
    private SalesOrderRepository salesOrderRepository;

    @Transactional
    public Long add(SalesOrder salesOrder){
        this.salesOrderRepository.add(salesOrder);
        return salesOrder.getId();
    }

    @Transactional
    public void mod(Long id,String salesName,String remark){
        SalesOrder salesOrder = this.salesOrderRepository.find(id);
        if(salesOrder == null){
            throw new RuntimeException("找不到"+id+"的销售订单");
        }
        salesOrder.modSalesName(salesName);
        salesOrder.setRemark(remark);
    }

    public void showAll(){
        List<SalesOrder> all = this.salesOrderRepository.getAll();
        log.info("all SalesOrder {}",all);
    }

    public void go(){
        SalesOrderTest app = (SalesOrderTest) AopContext.currentProxy();

        Long id = app.add(new SalesOrder("销售1","10元","拥有者1","无备注"));
        app.showAll();

        app.mod(id,"销售2","备注很长哦.....");
        app.showAll();
    }
}
