package spring_test;

/**
 * Created by fish on 2021/3/18.
 */
public class User {
    private int id;

    public void setId(int id){
        this.id = id;
    }

    public int getId(){
        return this.id;
    }

    private String name;

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    private int age;

    public void setAge(int age){
        this.age = age;
    }

    public int getAge(){
        return this.age;
    }

    public String toString(){
        return String.format("User[id:%d,name:%s,age:%d]",this.id,this.name,this.age);
    }
}
