package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.List;

/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableTransactionManagement
@EnableAspectJAutoProxy(exposeProxy = true)
public class App implements ApplicationRunner
{
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }


    @Autowired
    private UserService userService;

    @Autowired
    private UserAo userAo;

    private void showUsers(){
        List<User> users = this.userService.getAll();
        System.out.println(users);
    }

    private void test1(){
        System.out.println("----- addOne -----");
        showUsers();

        try {
            this.userAo.addOne();
        }catch(Exception e ){

        }
        showUsers();
    }

    private void test2(){
        System.out.println("----- addOneAndHaveRuntimeException -----");
        showUsers();

        try {
            this.userAo.addOneAndHaveRuntimeException();
        }catch(Exception e ){

        }
        showUsers();
    }

    private void test3(){
        System.out.println("----- addOneAndNoSyncTransaction -----");
        showUsers();

        try {
            this.userAo.addOneAndNoSyncTransaction();
        }catch(Exception e ){

        }
        showUsers();
    }

    public   void run(ApplicationArguments arguments) throws Exception{
        test1();

        test2();

        test3();
    }
}
