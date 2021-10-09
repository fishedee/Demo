package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Good2;
import spring_test.business.PurchaseOrder;
import spring_test.infrastructure.Good2Repository;
import spring_test.infrastructure.PurchaseOrderRepositoy;
import spring_test.infrastructure.Remain2Repository;

import java.util.List;

@Component
@Slf4j
public class Good2Test {
    @Autowired
    private Remain2Repository remainRepository;

    @Autowired
    private Good2Repository goodRepository;

    @Transactional
    public Long addOne(){
        Good2 good = new Good2();
        this.goodRepository.add(good);
        return good.getId();
    }

    @Transactional
    public Long addRemain(Long goodId,int count){
        Good2 good = this.goodRepository.find(goodId);
        good.setRemainService(remainRepository);
        return good.addRemain(count);
    }

    @Transactional
    public void incRemainCount(Long goodId,Long remainId,int incCount){
        Good2 good = this.goodRepository.find(goodId);
        good.setRemainService(remainRepository);
        good.incRemain(remainId,incCount);
    }

    @Transactional
    public void show(Long goodId){
        Good2 good = this.goodRepository.find(goodId);
        log.info("good {} {}",goodId,good);
    }

    @Transactional
    public void showAll(){
        List<Good2> good = this.goodRepository.getAll();
        log.info("good all {}",good);
    }

    public void go1(){
        log.info("go1 begin.......");
        Good2Test app = (Good2Test) AopContext.currentProxy();

        //插入需要2个sql，取hibernate_sequence的id，以及good本身
        Long goodId = app.addOne();

        //先加载good，2条sql，good本身，与remain
        //插入remain，2条sql，插入remain，以及update goodId
        Long remainId1 = app.addRemain(goodId,10);
        Long remainId2 = app.addRemain(goodId,7);

        //显示两个
        log.info("show1");
        app.show(goodId);

        //故意删掉一个，显示1个
        log.info("show2");
        app.incRemainCount(goodId,remainId1,-12);
        app.show(goodId);

        //将删掉的重新显示出来，显示2个
        log.info("show3");
        //更新需要3条sql，首先从数据库拉出来这条remain，然后用2条sql来update
        app.incRemainCount(goodId,remainId1,20);
        app.show(goodId);
    }

    public void go2(){
        log.info("go2 begin.......");
        Good2Test app = (Good2Test) AopContext.currentProxy();

        Long goodId = app.addOne();

        //先加载good，2条sql，good本身，与remain
        //插入remain，2条sql，插入remain，以及update goodId
        Long remainId1 = app.addRemain(goodId,777);
        Long remainId2 = app.addRemain(goodId,888);
        Long remainId3 = app.addRemain(goodId,999);

        log.info("show4");
        //批量查询，仅需要2条sql
        app.showAll();
    }

    public void go(){
        go1();
        go2();
    }
}

