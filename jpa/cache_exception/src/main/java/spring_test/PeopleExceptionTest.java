package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Car;
import spring_test.business.People;
import spring_test.infrastructure.PeopleRepository;

/**
 * Created by fish on 2021/5/4.
 */
@Component
@Slf4j
public class PeopleExceptionTest {
    @Autowired
    private PeopleRepository peopleRepository;


    @Transactional
    public void add(People people){
        this.peopleRepository.add(people);
    }

    @Transactional
    public void run2(){
        throw new RuntimeException("123");
    }

    @Transactional
    public void run(Long id){
        //插入数据
        People people = this.peopleRepository.find(id);
        log.info(" people name {}",people.getName());
        people.setName("cc");

        //里面发送了异常
        try {
            PeopleExceptionTest app = (PeopleExceptionTest) AopContext.currentProxy();
            app.run2();
        }catch(Exception e){
            //强行捕捉异常
            e.printStackTrace();
        }
        //内存的数据不会自动回滚,但数据库已经回滚了
        //如果后续的流程依然依赖这个People的cc的值,就会有问题
        log.info(" people name2 {}",people.getName());

        //EntityManager没有回滚,它在一级缓存存放的值依然是cc,新值
        People people2 = this.peopleRepository.find(id);
        log.info(" people name3 {}",people2.getName());
    }

    public void print(Long id){
        //这个时候读取出来的依然是mk,因为数据库已经回滚了
        log.info(" people name4 {}",peopleRepository.find(id));
    }

    public void go(){
        PeopleExceptionTest app = (PeopleExceptionTest) AopContext.currentProxy();

        People people = new People("mk");
        app.add(people);
        try{
            app.run(people.getId());
        }catch (Exception e){

        }

        app.print(people.getId());
    }
}
