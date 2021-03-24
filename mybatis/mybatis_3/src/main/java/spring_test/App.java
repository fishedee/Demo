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
        System.out.println("----- test1 -----");
        showUsers();

        try {
            this.userAo.addOneAndHaveRuntimeException();
        }catch(Exception e ){

        }
        showUsers();
    }

    private void test2(){
        System.out.println("----- test2 -----");
        showUsers();

        try {
            this.userAo.addOneAndHaveNormalException();
        }catch(Exception e ){

        }
        showUsers();
    }

    private void test3(){
        System.out.println("----- test3 -----");
        showUsers();

        try {
            this.userAo.addOneAndHaveNormalExceptionAndHaveRollBackForLabel();
        }catch(Exception e ){

        }
        showUsers();
    }

    private void test4(){
        System.out.println("----- addOneWithThis -----");
        showUsers();

        try {
            this.userAo.addOneWithThis();
        }catch(Exception e ){

        }
        showUsers();
    }

    private void test5(){
        System.out.println("----- addOneWithAopContextThis -----");
        showUsers();

        try {
            this.userAo.addOneWithAopContextThis();
        }catch(Exception e ){

        }
        showUsers();
    }

    private void test6(){
        System.out.println("----- addOneWithReadOnly -----");
        showUsers();

        try {
            this.userAo.addOneWithReadOnly();
        }catch(Exception e ){
            //试一下打开这个
            //e.printStackTrace();
        }
        showUsers();
    }

    private void test7(){
        System.out.println("----- addOneWithIsolation -----");
        showUsers();

        try {
            this.userAo.addOneWithIsolation();
        }catch(Exception e ){
            e.printStackTrace();
        }
        showUsers();
    }

    public   void run(ApplicationArguments arguments) throws Exception{
        test1();

        test2();

        test3();

        test4();

        test5();

        test6();

        test7();
    }
}
