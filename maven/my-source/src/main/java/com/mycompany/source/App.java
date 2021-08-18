package com.mycompany.source;
import java.io.*;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        try{
            new App().run();
        }catch(Exception e){
            e.printStackTrace();
        }
        
    }
    public void run()throws Exception{
        InputStream is = getClass().getResourceAsStream( "/application.properties" );
        byte b[]=new byte[1024]; 
        is.read(b); 
        is.close();
        System.out.println("data is ["+ new String(b)+"]");
    }
}
