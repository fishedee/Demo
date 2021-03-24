package mybatis_test;


import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import mybatis_test.model.Country;

import java.io.Reader;
import java.util.List;

public class App
{
    public static void main( String[] args )
    {
        new App().run();
    }

    private SqlSessionFactory sqlSessionFactory;

    private  void init(){
        try {
            Reader reader = Resources.getResourceAsReader("mybatis-config.xml");
            this.sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
            reader.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private void printCountryList(List<Country> countryList){
        for( Country country : countryList){
            System.out.printf("id:%s,name:%s,code:%s\n",country.id,country.countryName,country.countryCode);
        }
    }

    private void showCountryList(SqlSession sqlSession){
        List<Country> countryList = sqlSession.selectList("spring_test.mapper.CountryMapper.selectAll");

        printCountryList(countryList);
    }

    private void addCountry(SqlSession sqlSession){
        Country country = new Country();
        country.countryCode = "67";
        country.countryName = "我的国";

        sqlSession.insert("spring_test.mapper.CountryMapper.add",country);
    }

    private void modCountry(SqlSession sqlSession,Long id){
        Country country = new Country();
        country.id = id;
        country.countryCode = "88";
        country.countryName = "他的国";

        sqlSession.update("spring_test.mapper.CountryMapper.mod",country);
    }

    private void delCountry(SqlSession sqlSession,Long id){
        sqlSession.delete("spring_test.mapper.CountryMapper.del",id);
    }


    private void test1(){

        System.out.println("---- test1 ----");

        SqlSession sqlSession = this.sqlSessionFactory.openSession();

        try {
            showCountryList(sqlSession);

            addCountry(sqlSession);

            delCountry(sqlSession, 3L);

            modCountry(sqlSession, 2L);

            showCountryList(sqlSession);
        }finally {
            sqlSession.rollback();
        }
    }

    private void showCountryListNow(){
        SqlSession sqlSession2 = this.sqlSessionFactory.openSession();
        showCountryList(sqlSession2);
        sqlSession2.close();
    }
    private void test2(){

        System.out.println("---- test2 ----");

        SqlSession sqlSession = this.sqlSessionFactory.openSession();


        try {
            showCountryList(sqlSession);

            addCountry(sqlSession);

            //在sqlSession没有提交的时候,这个时候用另外一个sqlSession读取出来的数据依然是没有添加进去的
            System.out.println("提交前");
            showCountryListNow();

            sqlSession.commit();
            sqlSession.close();

            //在sqlSession提交以后,这个时候用另外一个sqlSession读取出来的数据才是有数据的
            //注意,两次读取必须用不同的sqlSession,否则会因为一级缓存读取出来的数据都是相同,无刷新的
            System.out.println("提交后");
            showCountryListNow();
        }finally {
        }
    }

    public void run(){
        init();

        test1();

        test2();
    }
}
