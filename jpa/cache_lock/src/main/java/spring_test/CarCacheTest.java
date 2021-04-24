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

    public void go(){
        CarCacheTest app = (CarCacheTest) AopContext.currentProxy();

        Long carId1 = app.add(new Car("车1"));
        Long carId2 = app.add(new Car("车2"));

        app.mod(carId1,carId2);
    }
}
