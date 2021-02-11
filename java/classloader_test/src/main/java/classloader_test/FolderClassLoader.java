package classloader_test;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * Created by fish on 2021/2/10.
 */
public class FolderClassLoader extends ClassLoader {
    private String folder;
    public FolderClassLoader(String folder){
        this.folder = folder;
    }
    public FolderClassLoader(String folder,ClassLoader parent){
        super(parent);
        this.folder = folder;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        Class clazz = null;
        byte []classData = getClassData(name);
        if( classData == null ){
            throw new ClassNotFoundException();
        }
        clazz = defineClass(name,classData,0,classData.length);
        return clazz;
    }

    private byte[] getClassData(String name)throws ClassNotFoundException{
        File file = null;
        InputStream fileInputStream = null;
        try {
             String namePath = name.replace('.','/');
             file = new File(this.folder + "/"+namePath+".class");
             fileInputStream = new FileInputStream(file);
            byte[] result = new byte[fileInputStream.available()];
            fileInputStream.read(result);
            return result;
        }catch(Exception e){
            e.printStackTrace();
            throw new ClassNotFoundException();
        }finally{
            if(fileInputStream != null){
                try{
                    fileInputStream.close();
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }
    }
}