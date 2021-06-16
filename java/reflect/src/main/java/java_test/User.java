package java_test;


import java.util.logging.Logger;

public class User extends Person implements Walker{

    public static class Address{
        String country;

        String city;
    }

    protected class Contact{
        String homePhone;

        String workPhone;
    }

    private int id;

    public String name;

    private Address address;

    protected Contact contact;

    public static Logger log;

    public User(){

    }

    protected User(String name){
        this.name = name;
    }

    private void setNameInner(String name){
        this.name = "MM_"+name;
    }

    public static void setPrefix(){

    }

    public void setName(String name){
        this.setNameInner(name);
    }

    public String getName(){
        return this.name;
    }

    protected void setAddress(Address addr){
        this.address = addr;
    }

    public void walk(){
        System.out.println("walk");
    }
}