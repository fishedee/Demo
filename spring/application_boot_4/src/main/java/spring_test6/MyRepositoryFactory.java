package spring_test6;

import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import spring_test.ServiceA;

import java.lang.reflect.Proxy;

/**
 * Created by fish on 2021/4/14.
 */
public class MyRepositoryFactory<T> implements FactoryBean<T> ,BeanClassLoaderAware{

    //可以正常使用Autowired
    @Autowired
    private ServiceA serviceA;

    private ClassLoader classLoader;

    private Class<T> mapperInterface;

    public MyRepositoryFactory(Class<T> mapperInterface){
        System.out.println("factory create");
        this.mapperInterface = mapperInterface;
    }

    @Override
    public void setBeanClassLoader(ClassLoader var1){
        this.classLoader = var1;
    }

    @Nullable
    public  T getObject() throws Exception{
        System.out.println("factory getObject");
        serviceA.showMsg();

        MyRepositoryInvocationHandler handler = new MyRepositoryInvocationHandler();
        Class<?>[] classes = new Class<?>[]{mapperInterface};
        return (T)Proxy.newProxyInstance(this.classLoader,classes,handler);
    }

    @Nullable
    public Class<?> getObjectType(){
        return mapperInterface;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
