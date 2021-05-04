package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.infrastructure.CarRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * Created by fish on 2021/5/4.
 */
@Component
@Slf4j
public class CarCacheTest {

    @Autowired
    private CarRepository carRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void add(Car car){
        this.carRepository.add(car);
    }

    @Transactional
    public void get1(){
        //两次单独的get以后
        Car car1 = this.carRepository.find(10001L);
        Car car2 = this.carRepository.find(10002L);
        car2.setName(new Date().toString());

        //再执行一次getBatch,依然会向数据库发出select请求,只是返回的结果会取本地的数据
        //注意,由于car2有修改,所以也会产生一次update的操作以后,才进行select操作
        //这个叫FlushMode.AUTO模式
        List<Car> cars = this.carRepository.findBatch(Arrays.asList(10001L,10002L));
        log.info("debug {} {}",car2,cars.get(1));
    }

    @Transactional
    public void get2(){
        //执行一个getBatch以后
        List<Car> cars = this.carRepository.findBatch(Arrays.asList(10001L,10002L));

        cars.get(1).setName(new Date().toString());

        //之后的两次单独的get,都没有发送实际的select请求,真正地省略了发送
        Car car1 = this.carRepository.find(10001L);
        Car car2 = this.carRepository.find(10002L);

        log.info("debug {} {}",car2,cars.get(1));
    }

    @Transactional
    public void get3(){
        //执行一个add以后
        Car newCar = new Car(new Date().toString()+"cc");
        this.carRepository.add(newCar);

        //之后的get不需要发送select请求
        Car car1 = this.carRepository.find(newCar.getId());
    }

    @Transactional
    public void get4(){
        //两次单独的get以后
        Car car1 = this.carRepository.find(10001L);
        Car car2 = this.carRepository.find(10002L);

        //JPA会发现car有修改的地方,而select又需要重新查数据库,就会先将脏数据落地
        car2.setName("ez");
        //car2.setName("cc");

        //这句sql不仅会产生一次select操作,还会将car2的修改执行update操作
        List<Car> cars = entityManager.createQuery("select c from Car c where c.name= :name")
                .setParameter("name","cc")
                .getResultList();
        log.info("all data {}",cars);
    }

    public void go(){
        CarCacheTest app = (CarCacheTest) AopContext.currentProxy();

        app.add(new Car("车1"));
        app.add(new Car("车2"));
        app.add(new Car("车3"));
        app.add(new Car("车4"));
        app.add(new Car("车5"));

        log.info("get1 begin ...");
        app.get1();

        log.info("get2 begin ...");
        app.get2();

        log.info("get3 begin ...");
        app.get3();

        log.info("get4 begin ...");
        app.get4();
    }
}
