package spring_test;

import org.springframework.context.ApplicationEvent;

/**
 * Created by fish on 2021/2/25.
 */
public class MyEvent extends ApplicationEvent {
    private String msg ;

    public MyEvent(Object source,String msg){
        super(source);
        this.msg = msg;
    }

    public void print(){
        System.out.println(this.msg);
    }
}
