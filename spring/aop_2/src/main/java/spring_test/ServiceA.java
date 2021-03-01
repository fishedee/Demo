package spring_test;

/**
 * Created by fish on 2021/2/19.
 */
public class ServiceA {
    private String animal;

    public ServiceA(){
        System.out.println("serviceA ref "+this);
    }

    public void setAnimal(String animal){
        this.animal = animal;
    }

    public String getAnimal(){
        return this.animal;
    }

    public void showAnimal(){
        System.out.println("ServiceA showAnimal ref : "+ System.identityHashCode(this));
        System.out.println("showAnimal : "+this.animal);
    }

    public final void finalShowAnimal(){
        System.out.println("ServiceA finalShowAnimal ref : "+ System.identityHashCode(this));
        //this指针被替换为cglib的派生类,cglib派生类无法捕捉final函数,其会自动引用到空基类的final函数
        // 而空基类的animal为null的,所以这样做会失败,this.animal为空
        System.out.println("finalShowAnimal : "+this.animal);
    }

    public final void finalShowAnimal2(){
        //this指针被替换为cglib的派生类,派生类是可以捕捉getAnimal方法,所以这样会成功
        System.out.println("finalShowAnimal2 : "+this.getAnimal());
    }

    private void privateShowAnimal(){
        System.out.println("privateShowAnimal : "+this.getAnimal());
    }
}
