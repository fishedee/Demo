package mybatis_test;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import mybatis_test.mapper.CountryMapper;
import mybatis_test.model.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


/**
 * Hello world!
 *
 */
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
@EnableAspectJAutoProxy(exposeProxy = true)
public class App implements ApplicationRunner
{
    final Logger logger = LoggerFactory.getLogger(getClass());
    public static void main( String[] args )
    {
        SpringApplication.run(App.class,args);
    }

    @Autowired
    private CountryMapper countryMapper;

    @Transactional
    public void test1(){
        logger.info("------ test1 ------");

        int pageIndex = 1;
        int pageSize = 10;
        String orderBy = "id asc";

        //分页信息
        PageHelper.startPage(pageIndex, pageSize, orderBy);

        PageInfo<Country> countryPageInfo = new PageInfo<Country>(countryMapper.selectAll());

        countryPageInfo.getList().stream().forEach(System.out::println);

        //打印分页信息
        System.out.println("当前页码：第" + countryPageInfo.getPageNum() + "页");
        System.out.println("分页大小：每页" + countryPageInfo.getPageSize() + "条");
        System.out.println("数据总数：共" + countryPageInfo.getTotal() + "条");
        System.out.println("总页数：共" + countryPageInfo.getPages() + "页");

    }

    public   void run(ApplicationArguments arguments) throws Exception{

        //调用自身类的其他方法,要用AopContext的currentProxy来做,否则AOP增强没有打开
        App app = (App)(AopContext.currentProxy());

        app.test1();
    }
}
