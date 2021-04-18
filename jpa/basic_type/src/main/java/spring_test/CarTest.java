package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.business.CarBrand;
import spring_test.business.Country;
import spring_test.infrastructure.CarRepository;
import spring_test.infrastructure.CountryRepository;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Slf4j
@Component
public class CarTest {
    @Autowired
    private CarRepository carRepository;

    @Transactional
    public Long addCar(Car car){
        this.carRepository.add(car);
        //因为add的id是用AUTO的方式,所以,这里只会取出自增id的操作,不会进行insert.返回的时间戳都是null的.
        //优点是不是不会产生select操作,因为时间戳是由hibernate生成的
        log.info("add Country id:{} createTime:{} modifyTime:{}",car.getId(),car.getCreateTime(),car.getModifyTime());
        return car.getId();
    }

    @Transactional
    public void modCar(Long id, CarBrand brand,String name,BigDecimal price){
        Car car = this.carRepository.find(id);
        if(car == null){
            throw new RuntimeException("找不到"+id+"的车");
        }
        car.mod(brand,name,price);
        //只有在事务结束的时候,才进行真正的更新操作,所以这里读到的modifyTime依然是旧的.
        log.info("mod Car {}",car);
    }

    public void showAllCar(){
        List<Car> cars = this.carRepository.getAll();
        log.info("all Car {}",cars);
    }

    public void go(){
        CarTest app = (CarTest) AopContext.currentProxy();

        Long id = app.addCar(new Car(CarBrand.BMW,"它的",new BigDecimal("6.891234567891")));
        app.showAllCar();
        app.modCar(id,CarBrand.Honda,"我的",new BigDecimal("100000.89"));
        app.showAllCar();
    }
}
