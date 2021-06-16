package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.business.Car2;
import spring_test.business.CarBrand;
import spring_test.business.Country;
import spring_test.infrastructure.Car2Repository;
import spring_test.infrastructure.CarRepository;
import spring_test.infrastructure.CountryRepository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Slf4j
@Component
public class Car2Test {
    @Autowired
    private Car2Repository car2Repository;

    @Transactional
    public Long addCar(Car2 car){
        //id在new的时候已经创建好了，不需要查表
        log.info("id ",car.getId());

        //时间戳是由JPA自动生成的，不需要依赖数据库的机制
        this.car2Repository.add(car);
        log.info("add Country id:{} createTime:{} modifyTime:{}",car.getId(),car.getCreateTime(),car.getModifyTime());

        //这段代码只有一个insert操作，不需要select时间戳
        return car.getId();
    }

    @Transactional
    public void modCar(Long id, String name){
        Car2 car = this.car2Repository.find(id);
        if(car == null){
            throw new RuntimeException("找不到"+id+"的车");
        }
        car.mod(name);
        //只有在事务结束的时候,才进行真正的更新操作,所以这里读到的modifyTime依然是旧的.
        log.info("mod Car {}",car);
    }

    public void showAllCar(){
        List<Car2> cars = this.car2Repository.getAll();
        log.info("all Car {}",cars);
    }

    public void go(){
        Car2Test app = (Car2Test) AopContext.currentProxy();

        Long id = app.addCar(new Car2("它的"));
        app.showAllCar();
        app.modCar(id,"我的");
        app.showAllCar();
    }
}
