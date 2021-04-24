package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.People;
import spring_test.business.People2;
import spring_test.infrastructure.People2Repository;
import spring_test.infrastructure.PeopleRepository;

/**
 * Created by fish on 2021/4/24.
 */
@Component
@Slf4j
public class LockPeopleTest {
    @Autowired
    private People2Repository peopleRepository;

    @Transactional
    public Long addPeople(){
        People2 people = new People2("未命名");
        this.peopleRepository.add(people);
        return people.getId();
    }

    @Transactional
    public void modPeople(Long peopleId,String name){
        //这句会生成for update的语句
        People2 people = this.peopleRepository.findForLock(peopleId);
        people.setName(name);
    }

    public void showOnePeople(Long peopleId){
        People2 people = this.peopleRepository.find(peopleId);

        log.info("people {} is {}",peopleId,people);
    }

    public void go(){
        LockPeopleTest app = (LockPeopleTest) AopContext.currentProxy();

        Long peopleId = app.addPeople();
        app.modPeople(peopleId,"新名字");
        app.showOnePeople(peopleId);
    }

}
