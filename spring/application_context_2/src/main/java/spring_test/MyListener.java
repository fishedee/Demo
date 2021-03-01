package spring_test;

import org.springframework.context.ApplicationListener;

/**
 * Created by fish on 2021/2/19.
 */
public class MyListener implements ApplicationListener<MyEvent>{
    public void onApplicationEvent(MyEvent var1){
        System.out.println("receive MyEvent: "+var1);
    }
}
