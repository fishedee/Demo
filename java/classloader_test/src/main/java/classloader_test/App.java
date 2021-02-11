package classloader_test;

import java.lang.reflect.Method;
import java.io.InputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        try{
            //加载class
            FolderClassLoader loader = new FolderClassLoader("lib");
            Class clazz = loader.loadClass("test.MyAdd");

            //得到class以后,尝试调用我们已知道的函数
            Method method = clazz.getMethod("add",int.class,int.class);
            Object obj = clazz.newInstance();
            Object result = method.invoke(obj,1,2);
            System.out.println(result);

            //打印classLoader树
            ClassLoader classLoader = loader;
            printClassLoaderTree(loader);

            //设置线程变量上的classLoader
            classLoader = Thread.currentThread().getContextClassLoader();
            System.out.println("default threadClassLoader: "+classLoader);

            Thread.currentThread().setContextClassLoader(loader);
            classLoader = Thread.currentThread().getContextClassLoader();
            System.out.println("setAfter threadClassLoader: "+classLoader);

            //加载资源
            loadResourceByClassLoader(loader);

            //第二次加载classLoader
            FolderClassLoader loader2 = new FolderClassLoader("lib",loader);
            Class clazz2 = loader2.loadClass("test.MyMul");

            //第二次,得到class以后,尝试调用我们已知道的函数
            Method method2 = clazz2.getMethod("mul",int.class,int.class);
            Object obj2 = clazz2.newInstance();
            System.out.println(obj2);
            Object result2 = method2.invoke(obj2,2,4);
            System.out.println(result2);

            //第二次打印classLoader树
            printClassLoaderTree(loader2);
        }catch(Exception e){
            e.printStackTrace();
        }

    }

    public static void loadResourceByClassLoader(ClassLoader loader)throws IOException{
        //根据classLoader获取资源
        InputStream stream = loader.getResourceAsStream("abc.xml");
        System.out.println(stream);
        System.out.println(App.getStreamData(stream));
    }

    public static void printClassLoaderTree(ClassLoader classLoader){
        System.out.println("begin --- classLoader trace ---");
        do{
            System.out.println(classLoader);
            classLoader = classLoader.getParent();
        }while(classLoader!= null);
        System.out.println("end --- classLoader trace ---");
    }

    public static String getStreamData( InputStream in) throws IOException{
        byte[] result = new byte[in.available()];
        in.read(result);
        return new String(result,StandardCharsets.UTF_8);
    }
}
