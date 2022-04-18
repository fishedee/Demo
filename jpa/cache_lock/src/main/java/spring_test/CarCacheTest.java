package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.infrastructure.CarRepository;

import javax.smartcardio.Card;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by fish on 2021/4/24.
 */
@Component
@Slf4j
public class CarCacheTest {
    @Autowired
    private CarRepository carRepository;

    @Transactional
    public Long add(Car car){
        this.carRepository.add(car);
        return car.getId();
    }

    @Transactional
    public void mod(Long carId1,Long carId2){
        Car car1 = this.carRepository.find(carId1);
        car1.setName("新车1");

        List<Car> cars= this.carRepository.findBatch(Arrays.asList(carId1,carId2));

        //用carId1读取出来的Card,依然是car1的实例的,可以看出一级缓存是跨方法的,这个比MyBatis好用多了
        log.info("all cars {}",cars);

        //即使carId2+10的数据不存在,也不会报错
        List<Car> cars2= this.carRepository.findBatch(Arrays.asList(carId1,carId2,carId2+10));
        log.info("all cars {}",cars2);
    }

    @Transactional
    public void mod2(Long carId,String name){
        //先用ReadOnly的方式读取Car出来
        Car car = this.carRepository.findForReadOnly(carId);

        //然后用findBatch的方式读取出来，修改
        Car car2 = this.carRepository.findBatch(Arrays.asList(carId)).get(0);
        car2.setName(name);
    }

    public String getName(Long carId){
        return this.carRepository.find(carId).getName();
    }

    public void go(){
        CarCacheTest app = (CarCacheTest) AopContext.currentProxy();

        Long carId1 = app.add(new Car("车1"));
        Long carId2 = app.add(new Car("车2"));

        app.mod(carId1,carId2);

        //以下的实验相当诡异，以forRead的方式读取数据到一级缓存以后，即使以后的数据不是forRead的方式，也会导致数据无法更新
        app.mod2(carId2,"车3");
        //这里输出的数据是，车2，而不是车3。结论是，永远不要使用forRead读取数据，因为这样可能导致失去脏检查没有写入数据。
        log.info("carId2 name {}",app.getName(carId2));
    }
}
