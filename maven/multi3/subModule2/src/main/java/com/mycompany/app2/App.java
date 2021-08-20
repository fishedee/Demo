package com.mycompany.app2;

import com.mycompany.app.Service;
/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        Service service = new Service();
        System.out.println(service.go());
    }
}
