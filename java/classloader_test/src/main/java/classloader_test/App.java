package classloader_test;

import java.lang.reflect.Method;

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
        }catch(Exception e){
            e.printStackTrace();
        }

    }
}
