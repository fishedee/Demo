package mybatis_test;


import mybatis_test.mapper.CountryMapper;
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

    private void showCountryList(CountryMapper countryMapper){
        List<Country> countryList = countryMapper.selectAll();

        printCountryList(countryList);
    }

    private void addCountry(CountryMapper countryMapper){
        Country country = new Country();
        country.countryCode = "67";
        country.countryName = "我的国";

        countryMapper.add(country);
    }

    private void modCountry(CountryMapper countryMapper,Long id){
        Country country = new Country();
        country.id = id;
        country.countryCode = "88";
        country.countryName = "他的国";

        countryMapper.mod(country);
    }

    private void delCountry(CountryMapper countryMapper,Long id){
        countryMapper.del(id);
    }


    private void test1(){

        System.out.println("---- test1 ----");

        SqlSession sqlSession = this.sqlSessionFactory.openSession();

        CountryMapper countryMapper = sqlSession.getMapper(CountryMapper.class);

        try {
            showCountryList(countryMapper);

            addCountry(countryMapper);

            delCountry(countryMapper, 3L);

            modCountry(countryMapper, 2L);

            showCountryList(countryMapper);
        }finally {
            sqlSession.rollback();
        }
    }

    private void showCountryListNow(){
        SqlSession sqlSession2 = this.sqlSessionFactory.openSession();
        CountryMapper countryMapper = sqlSession2.getMapper(CountryMapper.class);
        showCountryList(countryMapper);
        sqlSession2.close();
    }

    private void test2(){

        System.out.println("---- test2 ----");

        SqlSession sqlSession = this.sqlSessionFactory.openSession();

        CountryMapper countryMapper = sqlSession.getMapper(CountryMapper.class);

        try {
            showCountryList(countryMapper);

            addCountry(countryMapper);

            //CountryMapp是与sqlSession绑定的,sqlSession未提交就,CountryMapper所做的修改也不会提交
            System.out.println("提交前");
            showCountryListNow();

            sqlSession.commit();
            sqlSession.close();

            //sqlSession提交以后,CountryMapper的修改才会提交
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
