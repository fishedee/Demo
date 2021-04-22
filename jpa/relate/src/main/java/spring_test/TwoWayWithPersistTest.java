package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.business.Country3;
import spring_test.business.People;
import spring_test.business.People3;
import spring_test.infrastructure.*;

import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Component
@Slf4j
public class TwoWayWithPersistTest {
    @Autowired
    private Country3Repository countryRepository;

    @Autowired
    private People3Repository peopleRepository;

    @Transactional
    public void clearAll(){
        countryRepository.clearAll();
        peopleRepository.clearAll();
    }

    public void showAll(){
        List<Country3> countryList = countryRepository.getAll();
        log.info("all country {} ",countryList);

        List<People3> peopleList = peopleRepository.getAll();
        log.info("all people {} ",peopleList);
    }

    @Transactional
    public void add1(){
        //现在Country3也是只读读,但是开启了cascade.PERSIST功能,所以,不再需要手动对people1进行persist操作了
        Country3 country = new Country3("中国");
        countryRepository.add(country);

        //很好,不需要people1.persist()
        //很好,也不再需要people1.setCountry()
        People3 people1 = new People3("fish");
        People3 people2 = new People3("cat");

        //因为country.addPeople方法里面使用了people.setCountry方法,所以我们也不再需要设置people1.setCountry()
        country.addPeople(people1);
        country.addPeople(people2);

        //最终结果是对的,而且我们只需要设置一个地方,这个就是我们想要的效果!
    }

    public void go1(){
        TwoWayWithPersistTest app = (TwoWayWithPersistTest) AopContext.currentProxy();

        app.clearAll();
        app.add1();

        app.showAll();
    }

    @Transactional
    public void add2(){
        Country3 country = new Country3("中国");
        Country3 country2 = new Country3("美国");
        countryRepository.add(country);
        countryRepository.add(country2);

        People3 people1 = new People3("fish");
        People3 people2 = new People3("cat");
        People3 people3 = new People3("dog");
        country.addPeople(people1);
        country.addPeople(people2);
        country.addPeople(people3);

        //但是这样做,我们依然会产生容易出错的坑,因为people2的setCountry是public的
        //我们可以让people2添加到country的peopleList里面,并且让people2的setCountry方法设置为country2,这样就会容易产生相当迷惑的问题
        people2.setCountry(country2);

        //最终的结果是:
        // country在内存的peopleList中拥有了people1,people2和people3,但是在数据库仅拥有了people1和people3
        // country2在内存的peopleList中没有拥有people,在数据库中却拥有了people2

        /*
        关于这个问题的答案有:
        * 方法一:将people的setCountry方法设置为包级别,只能让Country3来访问,但是,这最终会导致所有的实体都聚在了一起,不行!
        * 方法二:将people的setCountry方法设置为private级别,然后Country3只能通过反射来访问,代码难看,但是的确可用!
        * 方法三:将people的setCountry方法设置为public级别,但是名字改为dangerous_setCountry方法,这个方法只能被Country3来访问,但是代码依然很难看.
        */

        /*
        我的答案是:关联设计在Hibernate里面从头到尾就是错的,从来就不应该使用:
        * 关联需要同时保证三个地方对齐,才能保证没有bug,对程序员来说就是额外的心智伤害
        * 关联虽然可以用简单的add操作来避免写SQL,但是性能真的太差了.试想一下,为了添加一个国家的people,你需要首先将整个国家的people都先加载出来,这不是搞笑吗
         */

    }

    public void go2(){
        TwoWayWithPersistTest app = (TwoWayWithPersistTest) AopContext.currentProxy();

        app.clearAll();
        app.add2();
        app.showAll();
    }

    public void go(){
        //go1();

        go2();
    }
}
