package spring_test;

import lombok.AllArgsConstructor;
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
public class ImmutablePeopleTest {

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private People2Repository people2Repository;

    @Transactional
    public Long addPeople(){
        People people = new People("未命名");
        this.peopleRepository.add(people);
        return people.getId();
    }

    @Transactional
    public void modPeople(Long peopleId,String name){
        People people = this.peopleRepository.find(peopleId);
        people.setName(name);
    }

    public void showOnePeople(Long peopleId){
        People people = this.peopleRepository.find(peopleId);

        log.info("people {} is {}",peopleId,people);
    }

    @Transactional
    public Long addPeople2(){
        People2 people2 = new People2("未命名");
        this.people2Repository.add(people2);
        return people2.getId();
    }

    @Transactional
    public void modPeople2(Long peopleId,String name){
        People2 people = this.people2Repository.find(peopleId);
        people.setName(name);
    }

    @Transactional(readOnly = true)
    public void modPeople2_WithReadOnlyTrans(Long peopleId,String name){
        People2 people = this.people2Repository.find(peopleId);
        people.setName(name);
    }

    @Transactional
    public void modPeople2_FindForReadOnly(Long peopleId,String name){
        People2 people = this.people2Repository.findForReadOnly3(peopleId);
        people.setName(name);
    }

    public void modPeople2_NoTransaction(Long peopleId,String name){
        People2 people = this.people2Repository.find(peopleId);
        people.setName(name);
    }

    public void showOnePeople2(Long peopleId){
        People2 people = this.people2Repository.find(peopleId);

        log.info("people2 {} is {}",peopleId,people);
    }

    public void go(){
        ImmutablePeopleTest app = (ImmutablePeopleTest) AopContext.currentProxy();

        //Immutable测试
        Long peopleId = app.addPeople();
        log.info("---------- immutable test ----------");
        //因为People是Immutable的,所以修改会不成功
        app.modPeople(peopleId,"新名1");
        app.showOnePeople(peopleId);

        //mod测试
        Long peopleId2 = app.addPeople2();
        log.info("---------- mod test ----------");
        //修改成功
        app.modPeople2(peopleId2,"新名1");
        app.showOnePeople2(peopleId2);

        log.info("---------- mod readOnlyTrans test ----------");
        //因为Transiaction是ReadOnly的,所以修改会不成功
        app.modPeople2_WithReadOnlyTrans(peopleId2,"新名2");
        app.showOnePeople2(peopleId2);

        log.info("---------- mod readOnlySession test ----------");
        //因为Session是ReadOnly的,所以修改会不成功
        app.modPeople2_FindForReadOnly(peopleId2,"新名3");
        app.showOnePeople2(peopleId2);

        log.info("---------- mod no transaction test ----------");
        //因为没有开事务,所以修改是不会成功的
        app.modPeople2_FindForReadOnly(peopleId2,"新名4");
        app.showOnePeople2(peopleId2);
    }
}
