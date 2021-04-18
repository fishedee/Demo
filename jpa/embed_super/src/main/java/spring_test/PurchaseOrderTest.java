package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.PurchaseOrder;
import spring_test.business.SalesOrder;
import spring_test.infrastructure.PurchaseOrderRepository;
import spring_test.infrastructure.SalesOrderRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/18.
 */
@Component
@Slf4j
public class PurchaseOrderTest {
    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Transactional
    public Long add(PurchaseOrder purchaseOrder){
        this.purchaseOrderRepository.add(purchaseOrder);
        return purchaseOrder.getId();
    }

    @Transactional
    public void mod(Long id,String company,String remark){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepository.find(id);
        if(purchaseOrder == null){
            throw new RuntimeException("找不到"+id+"的采购订单");
        }
        purchaseOrder.modCompany(company);
        purchaseOrder.setRemark(remark);
    }

    public void showAll(){
        List<PurchaseOrder> all = this.purchaseOrderRepository.getAll();
        log.info("all PurchaseOrder {}",all);
    }

    public void go(){
        PurchaseOrderTest app = (PurchaseOrderTest) AopContext.currentProxy();

        Long id = app.add(new PurchaseOrder("大公司","10元","拥有者1","无备注"));
        app.showAll();

        app.mod(id,"小微企业","AABB备注很长哦.....");
        app.showAll();
    }
}
