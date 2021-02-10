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
            System.out.println("begin --- classLoader trace ---");
            ClassLoader classLoader = loader;
            do{
                System.out.println(classLoader);
                classLoader = classLoader.getParent();
            }while(classLoader!= null);
            System.out.println("end --- classLoader trace ---");

            //设置线程变量上的classLoader
            classLoader = Thread.currentThread().getContextClassLoader();
            System.out.println("default threadClassLoader: "+classLoader);

            Thread.currentThread().setContextClassLoader(loader);
            classLoader = Thread.currentThread().getContextClassLoader();
            System.out.println("setAfter threadClassLoader: "+classLoader);

            //根据classLoader获取资源
            InputStream stream = loader.getResourceAsStream("abc.xml");
            System.out.println(stream);
            System.out.println(App.getStreamData(stream));
        }catch(Exception e){
            e.printStackTrace();
        }

    }

    public static String getStreamData( InputStream in) throws IOException{
        byte[] result = new byte[in.available()];
        in.read(result);
        return new String(result,StandardCharsets.UTF_8);
    }
}
