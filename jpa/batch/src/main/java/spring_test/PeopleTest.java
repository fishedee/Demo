package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.business.People;
import spring_test.infrastructure.PeopleRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Slf4j
@Component
public class PeopleTest {
    @Autowired
    private PeopleRepository repository;

    @Transactional
    public void clear(){
        List<People> peoples = this.repository.getAll();
        for( int i = 0 ;i != peoples.size();i++){
            this.repository.del(peoples.get(i));
        }
    }

    @Transactional
    public void addBatch(People[] peoples){
        for( int i = 0 ;i != peoples.length;i++){
            this.repository.add(peoples[i]);
        }
    }

    @Transactional
    public void modAll(String name){
        List<People> peoples = this.repository.getAll();
        for( int i = 0 ;i != peoples.size();i++){
            peoples.get(i).setName(name+i);
        }
        log.info("mod Car {}",peoples);
    }

    public void showAll(){
        List<People> peoples = this.repository.getAll();
        log.info("all Car {}",peoples);
    }

    public void go(){
        PeopleTest app = (PeopleTest) AopContext.currentProxy();

        app.clear();

        app.addBatch(new People[]{new People("A"),new People("B"),new People("C")});
        app.modAll("KK");
    }
}
