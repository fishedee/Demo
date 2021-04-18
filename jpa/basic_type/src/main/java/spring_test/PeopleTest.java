package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.business.People;
import spring_test.infrastructure.CountryRepository;
import spring_test.infrastructure.PeopleRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Component
@Slf4j
public class PeopleTest {
    @Autowired
    private PeopleRepository peopleRepository;

    @Transactional
    public Long addPeople(People people){
        this.peopleRepository.add(people);
        //因为add的id是用AUTO的方式,所以,这里只会取到
        log.info("add People id:{} createTime:{} modifyTime:{}",people.getId());
        return people.getId();
    }

    public void showAllPeople(){
        List<People> peoples = this.peopleRepository.getAll();
        log.info("all People {}",peoples);
    }

    public void go(){
        PeopleTest app = (PeopleTest) AopContext.currentProxy();

        Long id = app.addPeople(new People("Fish"));
        app.showAllPeople();
    }
}
