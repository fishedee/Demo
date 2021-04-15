package spring_test;


import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;
//import org.apache.log4j.Logger;
//import org.apache.log4j.Level;

public class App
{


    public static void main( String[] args )
    {
        new App().go();
    }

    private EntityManagerFactory emf;

    private void go(){
        emf = Persistence.createEntityManagerFactory("HelloWorldPU");
        this.go1();
        this.go2();
    }

    private void go2(){
        System.out.println("------------  go2 ------------");

        showAll();

        add2(new Country("我国1","WO"),new Country("我国2","WO2"));

        showAll();

        mod2();

        mod3();
    }

    private void mod3(){
        EntityManager em = emf.createEntityManager();

        //没有开事务,但是依然会开一级缓存和脏检查
        Country country1 = em.find(Country.class,4L);
        System.out.println("before mod country : "+country1);
        country1.mod("我国3","WO3");

        System.out.println("after memory mod country : "+country1);

        //即使没有开事务,读的依然是一级事务,
        Country country2 = em.find(Country.class,4L);
        System.out.println("after memory mod country2 : "+country2);

        showOne(4L);
    }

    private void mod2(){
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        Country country4 = em.find(Country.class,4L);
        country4.mod("我国3","WO3");

        //这里走了一级缓存,因为在同一个事务里面
        Country country5 = em.find(Country.class,4L);
        System.out.println("reused EntityManager1 Country 4 : "+country5);

        //事务回滚,或者提交后,自动清空一级缓存
        em.getTransaction().rollback();

        //数据库的旧数据,因为是rollback
        showOne(4L);

        //一级缓存被清空,所以,依然为旧数据
        Country country6 = em.find(Country.class,4L);
        System.out.println("reused EntityManager2 Country 4 : "+country6);
    }

    private void add2(Country country1,Country country2){
        EntityManager em = emf.createEntityManager();
        //没有transaction的时候,无法用
        em.getTransaction().begin();

        //执行修改操作的时候,必须打开transaction
        em.persist(country1);

        em.getTransaction().commit();

        //一旦EntityManager关闭以后,就不能再继续使用EntityManager
        //em.close();
        //未关闭的情况下你可以继续使用EntityManager

        em.getTransaction().begin();

        em.persist(country2);

        em.getTransaction().commit();

        em.close();
    }

    private void go1(){
        System.out.println("------------ go1 ------------ ");

        showAll();
        add("中国","CN");
        add("美国","US");
        add("英国","UK");

        showAll();

        showOne(1L);
        showOne(2L);
        showOne(3L);

        del(2L);

        mod(3L,"澳洲","AS");

        showAll();
    }

    private void showAll(){
        EntityManager em = emf.createEntityManager();
        List<Country> countryList = em.createQuery("select c from Country c ",Country.class).getResultList();
        System.out.println("allCountry "+countryList.toString());
        //记得手动关闭EntityManager
        em.close();
    }

    private void showOne(Long id){
        EntityManager em = emf.createEntityManager();
        Country country = em.find(Country.class,id);
        System.out.println("country "+id+" : "+country);
        em.close();
    }

    private void add(String countryName,String countryCode){
        EntityManager em = emf.createEntityManager();
        //没有transaction的时候,无法添加
        em.getTransaction().begin();

        //执行修改操作的时候,必须打开transaction
        Country country = new Country(countryName,countryCode);
        em.persist(country);

        em.getTransaction().commit();
        em.close();
    }

    private void del(Long id){
        EntityManager em = emf.createEntityManager();
        //没有transaction的时候,无法删除
        em.getTransaction().begin();

        //删除操作
        Country country = em.find(Country.class,id);
        em.remove(country);

        em.getTransaction().commit();
        em.close();
    }

    private void mod(Long id,String countryName,String countryCode){
        EntityManager em = emf.createEntityManager();
        //没有transaction的时候,无法修改
        em.getTransaction().begin();

        //修改操作,直接读出来改就行,EntityManager存放有内存快照,commit的时候会进行脏检查后update
        Country country = em.find(Country.class,id);
        country.mod(countryName,countryCode);

        em.getTransaction().commit();
        em.close();
    }
}
