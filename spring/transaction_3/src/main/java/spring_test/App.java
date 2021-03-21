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

    private void prepare(){
        this.userService.clear();
        User user = new User();
        user.setId(1);
        user.setName("cat");
        user.setAge(700);
        this.userService.save(user);

        User user2 = new User();
        user2.setId(2);
        user2.setName("fish");
        user2.setAge(8000);
        this.userService.save(user2);
    }

    private void test1(){

        System.out.println(" --- test1 ---");

        showUsers();

        userAo.mod1_AgeOne();

        showUsers();
    }

    private void test2(){
        System.out.println(" --- test2 ---");

        showUsers();

        try {
            userAo.mod2_AgeTwo();
        }catch(Exception e){
            //e.printStackTrace();
        }

        showUsers();
    }

    private void test3(){
        System.out.println(" --- test3 ---");

        showUsers();

        try {
            userAo.mod3_AgeThree();
        }catch(Exception e){
            //报错了这个错误,特别注意为什么,Transaction rolled back because it has been marked as rollback-only
            e.printStackTrace();
        }

        showUsers();
    }

    private void test4(){
        System.out.println(" --- test4 ---");

        showUsers();

        userAo.mod4_AgeFour();

        showUsers();
    }

    private void test5(){
        System.out.println(" --- test5 ---");

        showUsers();

        userAo.mod5_AgeSix();

        showUsers();
    }

    public   void run(ApplicationArguments arguments) throws Exception{

        this.prepare();

        this.test1();

        this.test2();

        this.test3();

        this.test4();

        this.test5();
    }
}
