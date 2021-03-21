package spring_test;

import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
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

    //数据正常提交
    @Transactional()
    public void addOne(){

        this.showTransactionInfo();
        User user = new User();
        user.setName("cat");
        user.setAge(700);
        userService.save(user);

        this.addTransactionNotify();
    }


    //数据有异常,被回滚
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void addOneAndHaveRuntimeException(){

        this.showTransactionInfo();
        User user = new User();
        user.setName("cat");
        user.setAge(700);
        userService.save(user);

        this.addTransactionNotify();

        throw new RuntimeException("Throw by me");
    }

    //没有使用同步管理器,可以看到不会有输出.同步管理器只在当前的事务里面是单次有效的.
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void addOneAndNoSyncTransaction(){
        User user = new User();
        user.setName("cat");
        user.setAge(700);
        userService.save(user);
    }

    private void showTransactionInfo(){
        String transactionName = TransactionSynchronizationManager.getCurrentTransactionName();
        boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        Integer isolationLevel = TransactionSynchronizationManager.getCurrentTransactionIsolationLevel();

        System.out.printf("transactionName:%s,isReadOnly:%s,isolationLevel:%s\n",transactionName,isReadOnly,isolationLevel);
    }

    private void addTransactionNotify(){
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronizationAdapter(){

            //只有可以commit才会回调,在提交前回调
            @Override
            public void beforeCommit(boolean readOnly) {
                System.out.printf("before Commit,isReadOnly :%s\n",readOnly);
            }

            //只有可以commit才会回调,在提交后回调
            @Override
            public void afterCommit() {
                System.out.println("afterCommit");
            }

            //总是回调,没有参数,在完成前回调
            @Override
            public void beforeCompletion() {
                System.out.println("beforeCompletion");
            }

            //总是回调,status为0是提交成功,status为1是提交失败,在完成后回调
            @Override
            public void afterCompletion(int status) {
                System.out.printf("afterCompletion status:%s\n",status);
            }
        });
    }

}
