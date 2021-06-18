package spring_test;

import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.business.People;
import spring_test.infrastructure.CarRepository;
import spring_test.infrastructure.PeopleRepository;

@Component
public class MixedTest {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private CarTest carTest;

    @Autowired
    private PeopleTest peopleTest;

    @Transactional
    public void addBatch(){
        carRepository.add(new Car("A1"));
        peopleRepository.add(new People("B1"));
        carRepository.add(new Car("A2"));
        peopleRepository.add(new People("B2"));
        Car car3 = new Car("A3");
        carRepository.add(car3);
        People people3 = (new People("B3"));
        peopleRepository.add(people3);
        peopleRepository.add(new People("B4"));
        people3.setName("B5");
        car3.setName("A5");


    }

    public void go(){
        MixedTest mixedTest = (MixedTest) AopContext.currentProxy();
        carTest.clear();
        peopleTest.clear();

        mixedTest.addBatch();
    }
}
