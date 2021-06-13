package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.MaterialStockOrder;
import spring_test.business.PurchaseOrder;
import spring_test.infrastructure.MaterialStockOrderRepository;
import spring_test.infrastructure.PurchaseOrderRepositoy;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by fish on 2021/4/19.
 */
@Component
@Slf4j
public class MaterialStockOrderTest {
    @Autowired
    private MaterialStockOrderRepository materialStockOrderRepository;

    @Transactional
    public Long add(){
        MaterialStockOrder materialStockOrder = new MaterialStockOrder();
        this.materialStockOrderRepository.add(materialStockOrder);
        return materialStockOrder.getId();
    }

    @Transactional
    public void addMaterial(Long materialStockOrderId, MaterialStockOrder.Material material){
        MaterialStockOrder materialStockOrder = this.materialStockOrderRepository.find(materialStockOrderId);
        materialStockOrder.addItem(material);
        log.info("addMaterial finish");
    }

    @Transactional
    public void removeMaterial(Long materialStockOrderId,Long materialId){
        MaterialStockOrder materialStockOrder = this.materialStockOrderRepository.find(materialStockOrderId);
        materialStockOrder.removeItem(materialId);
        log.info("removeMaterial finish");
    }

    public void showOne(Long materialStockOrderId){
        MaterialStockOrder materialStockOrder = this.materialStockOrderRepository.find(materialStockOrderId);
        log.info("materialStockOrder {} is {}",materialStockOrderId,materialStockOrder);
    }

    public void go(){
        MaterialStockOrderTest app = (MaterialStockOrderTest) AopContext.currentProxy();

        Long materialStockOrderId = app.add();

        app.showOne(materialStockOrderId);

        app.addMaterial(materialStockOrderId,new MaterialStockOrder.Material(10001L,new BigDecimal("50"),50001L));
        app.addMaterial(materialStockOrderId,new MaterialStockOrder.Material(10002L,new BigDecimal("12.7"),50002L));
        app.addMaterial(materialStockOrderId,new MaterialStockOrder.Material(10001L,new BigDecimal("30"),50003L));
        app.addMaterial(materialStockOrderId,new MaterialStockOrder.Material(10003L,new BigDecimal("78"),50004L));

        app.removeMaterial(materialStockOrderId,10002L);

        app.showOne(materialStockOrderId);
    }
}
