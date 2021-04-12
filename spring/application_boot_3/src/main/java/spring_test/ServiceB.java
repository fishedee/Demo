package spring_test;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created by fish on 2021/3/15.
 */
//缺少Component注解的时候,无法注册BeanFactory,更无法注入属性到该类实例中
@Component
@ConfigurationProperties(prefix="myapp.mail")
public class ServiceB {
    private String host;

    public void setHost(String host){
        this.host = host;
    }

    public String getHost(){
        return this.host;
    }

    private int port;

    public void setPort(int port){
        this.port = port;
    }

    public int getPort(){
        return this.port;
    }

    private String user;

    public void setUser(String user){
        this.user = user;
    }

    public String getUser(){
        return this.user;
    }

    private String password;

    public void setPassword(String passowrd){
        this.password = passowrd;
    }

    public String getPassword(){
        return this.password;
    }

    public void sendEmail(){
        System.out.printf("host:%s,port:%d,user:%s,password:%s\n",host,port,user,password);
    }
}
