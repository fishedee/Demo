package java_test;

public class User2 {

     Object a;

     Object b;

     Object c;

    //User2Inner3内部类是在类下面声明的
    public class User2Inner3{

    }

    public void getData(){
        //User2Inner内部类是在getData方法里面声明的
        class User2Inner{

        }
        this.a = new User2Inner();
    }

    public User2(){
        class User2Inner2{

        }
        //User2Inner2内部类是在User2构造器里面声明的
        this.b = new User2Inner2();
        this.c = new User2Inner3();
    }
}
