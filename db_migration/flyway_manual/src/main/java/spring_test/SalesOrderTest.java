package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.SalesOrder;
import spring_test.business.SalesOrderDTO;
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
    public Long add( SalesOrderDTO dto){
        SalesOrder salesOrder = new SalesOrder(dto);
        this.salesOrderRepository.add(salesOrder);
        return salesOrder.getId();
    }

    public void showAll(){
        List<SalesOrder> salesOrderList = this.salesOrderRepository.getAll();
        log.info("all salesOrderList {}",salesOrderList);
    }

    public void go(){
        SalesOrderTest app = (SalesOrderTest) AopContext.currentProxy();

        Long salesOrderId = app.add(new SalesOrderDTO()
                .setName("fish")
                .setPhoneNumber("123")
                .setAddress("addr1"));

        app.showAll();

        Long salesOrderId2 = app.add(new SalesOrderDTO()
                .setName("cat")
                .setPhoneNumber("456")
                .setAddress("addr2"));

        app.showAll();
    }
}
