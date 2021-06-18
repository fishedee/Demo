package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.infrastructure.CarRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Slf4j
@Component
public class CarTest {
    @Autowired
    private CarRepository car2Repository;

    @Transactional
    public void clear(){
        List<Car> cars = this.car2Repository.getAll();
        for( int i = 0 ;i != cars.size();i++){
            this.car2Repository.del(cars.get(i));
        }
    }

    @Transactional
    public Long addCar(Car car){
        //id在new的时候已经创建好了，不需要查表
        log.info("id ",car.getId());

        //时间戳是由JPA自动生成的，不需要依赖数据库的机制
        //当遇上Generated注解的时候就会去读取数据库
        this.car2Repository.add(car);
        //log.info("add Country id:{} createTime:{} modifyTime:{}",car.getId(),car.getCreateTime(),car.getModifyTime());


        //数据仍然在内存中，所以这个时候读取出来的createTime依然为null
        //注意这里无论如何都不会触发读数据库，因为insert的数据就在本地内存上，不需要再查询，只有find才有这个能力
        Long id = car.getId();
        //log.info("createTime {}",this.car2Repository.find(id).getCreateTime());

        //这段代码只有一个insert操作，不需要select时间戳
        return car.getId();
    }

    @Transactional
    public void addCarBatch(Car[] cars){
        for( int i = 0 ;i != cars.length;i++){
            this.car2Repository.add(cars[i]);
        }
    }

    @Transactional
    public void modCar(Long id, String name){
        Car car = this.car2Repository.find(id);
        if(car == null){
            throw new RuntimeException("找不到"+id+"的车");
        }
        car.setName(name);
        //只有在事务结束的时候,才进行真正的更新操作,所以这里读到的modifyTime依然是旧的.
        log.info("mod Car {}",car);
    }

    public void showAllCar(){
        List<Car> cars = this.car2Repository.getAll();
        log.info("all Car {}",cars);
    }

    //https://github.com/ttddyy/datasource-proxy
    public void go(){
        CarTest app = (CarTest) AopContext.currentProxy();

        app.clear();
        Long id = app.addCar(new Car("它的"));
        app.showAllCar();
        app.modCar(id,"我的");
        app.showAllCar();
        app.addCarBatch(new Car[]{new Car("A"),new Car("B")});
    }

    //https://blog.51cto.com/u_15082395/2590334
}
