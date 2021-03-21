package spring_test;

import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

/**
 * Created by fish on 2021/3/18.
 */
@Component
public class UserAo {

    @Autowired
    private UserService userService;

    //默认的事务传播为REQUIRED,执行成功
    @Transactional(propagation = Propagation.REQUIRED)
    public void mod1_AgeOne(){
        User user = new User();
        user.setId(1);
        user.setAge(1);
        userService.mod(user);
    }

    //默认的事务传播为REQUIRED,执行失败
    @Transactional(propagation = Propagation.REQUIRED)
    public void mod2_AgeTwo(){
        User user = new User();
        user.setId(1);
        user.setAge(2);
        ((UserAo)AopContext.currentProxy()).mod2_AgeTwo_inner();
    }

    //默认的事务传播为REQUIRED,当已经有事务的时候,就沿用原来的事务,没有的话就重新开事务
    @Transactional(propagation = Propagation.REQUIRED)
    public void mod2_AgeTwo_inner(){
        User user = new User();
        user.setId(1);
        user.setAge(3);
        userService.mod(user);

        throw new RuntimeException("throw by me");
    }

    //默认的事务传播为REQUIRED,
    @Transactional(propagation = Propagation.REQUIRED)
    public void mod3_AgeThree(){
        User user = new User();
        user.setId(1);
        user.setAge(3);
        //错误用法,因为mod3_AgeThree_inner沿用已经同一个事务,已经捕捉到了RunTimeException,该事务被标注了回滚状态,但是依然企图对外部事务执行commit操作
        try {
            ((UserAo) AopContext.currentProxy()).mod3_AgeThree_inner();
        }catch(Exception e){

        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void mod3_AgeThree_inner(){
        User user = new User();
        user.setId(1);
        user.setAge(3);
        userService.mod(user);

        throw new RuntimeException("throw by me");
    }

    //默认的事务传播为REQUIRED,
    @Transactional(propagation = Propagation.REQUIRED)
    public void mod4_AgeFour(){
        User user = new User();
        user.setId(1);
        user.setAge(4);
        userService.mod(user);

        //正确用法,因为mod4_AgeThree_inner总是新建一个事务,所以它的事务是否回滚与外部事务没有关系
        try {
            ((UserAo) AopContext.currentProxy()).mod4_AgeFive_inner();
        }catch(Exception e){
        }

    }

    //使用REQUIRES_NEW的事务传播,表达总是使用新事务来执行代码,当异常发生的时候会触发回滚
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void mod4_AgeFive_inner(){
        User user = new User();
        user.setId(2);
        user.setAge(5);
        userService.mod(user);

        throw new RuntimeException("throw by me");
    }

    //默认的事务传播为REQUIRED,
    @Transactional(propagation = Propagation.REQUIRED)
    public void mod5_AgeSix(){
        User user = new User();
        user.setId(1);
        user.setAge(6);
        userService.mod(user);

        //正确用法,因为mod4_AgeThree_inner总是新建一个事务,所以它的事务是否回滚与外部事务没有关系
        try {
            ((UserAo) AopContext.currentProxy()).mod5_AgeSeven_inner();
        }catch(Exception e){

        }
    }

    //使用NOT_SUPPORTED的事务传播,总是用无事务状态来执行操作,当异常发生的时候没有回滚
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void mod5_AgeSeven_inner(){
        User user = new User();
        user.setId(2);
        user.setAge(7);
        userService.mod(user);

        throw new RuntimeException("throw by me");
    }
}
