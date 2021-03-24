package spring_test;

import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by fish on 2021/3/18.
 */
@Component
public class UserAo {

    @Autowired
    private UserService userService;

    //数据被回滚了
    @Transactional
    public void addOneAndHaveRuntimeException(){
        User user = new User();
        user.setName("cat");
        user.setAge(700);
        userService.save(user);

        throw new RuntimeException("Throw by me");
    }

    //数据没有被回滚,因为Transaction标签默认只捕捉RunTimeException
    @Transactional
    public void addOneAndHaveNormalException()throws Exception{
        User user = new User();
        user.setName("cat");
        user.setAge(700);
        userService.save(user);

        throw new Exception("Throw by me2");
    }

    //数据被回滚了,因为Transaction标签指定了遇到Exception的时候都要回滚
    @Transactional(rollbackFor=Exception.class)
    public void addOneAndHaveNormalExceptionAndHaveRollBackForLabel()throws Exception{
        User user = new User();
        user.setName("cat");
        user.setAge(700);
        userService.save(user);

        throw new Exception("Throw by me2");
    }

    //直接使用this来调用自身的其他方法,会绕过AOP实现,导致事务注解没有开启
    public void addOneWithThis(){
        this.addOneAndHaveRuntimeException();
    }

    //应该AopContext来调用自身的其他方法,事务注解依然会开启
    public void addOneWithAopContextThis()throws Exception{
        ((UserAo)AopContext.currentProxy()).addOneAndHaveRuntimeException();
    }

    //对于readOnly为true,在应用层层面,会禁止修改操作,并且去掉脏数据检查.在数据库层面,会避免数据上锁.
    @Transactional(readOnly = true)
    public void addOneWithReadOnly(){
        User user = new User();
        user.setName("cat");
        user.setAge(700);
        userService.save(user);
    }

    //可以指定数据库的隔离级别,这个需要在并发环境下才能测试到不同的地方
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void addOneWithIsolation(){
        this.addOneAndHaveRuntimeException();
    }
}
