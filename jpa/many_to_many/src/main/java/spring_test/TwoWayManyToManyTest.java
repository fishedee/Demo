package spring_test;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import spring_test.business.Country;
import spring_test.business.People;
import spring_test.infrastructure.CountryRepository;
import spring_test.infrastructure.PeopleRepository;

import javax.transaction.TransactionScoped;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Slf4j
public class TwoWayManyToManyTest {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private PeopleRepository peopleRepository;

    @Transactional
    public Long addCountry(String name){
        Country country = new Country(name);
        this.countryRepository.add(country);
        return country.getId();
    }

    @Transactional
    public void addExistPeopleToCountry(Long peopleId,Long countryId){
        People people = this.peopleRepository.find(peopleId);
        Country country = this.countryRepository.find(countryId);
        country.addPeople(people);
    }

    @Transactional
    public void addNewPeopleToCountry(String name,Long countryId){
        People people = new People(name);
        Country country = this.countryRepository.find(countryId);
        country.addPeople(people);
    }

    @Transactional
    public void removeCountryPeople(Long countryId,int index){
        Country country = this.countryRepository.find(countryId);

        country.removePeopleIndex(index);
    }

    @Transactional
    public Long addPeople(String name){
        People people = new People(name);
        this.peopleRepository.add(people);
        return people.getId();
    }

    public void printCountry(Long id){
        //因为是双向映射，每次读取Country都需要经过三个select
        //第一个读取国家
        /*
    select
        country0_.id as id1_0_0_,
        country0_.name as name2_0_0_
    from
        country country0_
    where
        country0_.id=?
         */
        //第二个读取国家关联的people
        /*
    select
        peoplelist0_.country_id as country_1_1_1_,
        peoplelist0_.people_id as people_i2_1_1_,
        peoplelist0_.people_order as people_o3_1_,
        people1_.id as id1_2_0_,
        people1_.name as name2_2_0_
    from
        country_people peoplelist0_
    inner join
        people people1_
            on peoplelist0_.people_id=people1_.id
    where
        peoplelist0_.country_id=?
         */
        //第三个读取people关联的国家，反向关联
        /*
    select
        countrylis0_.people_id as people_i2_1_1_,
        countrylis0_.country_id as country_1_1_1_,
        country1_.id as id1_0_0_,
        country1_.name as name2_0_0_
    from
        country_people countrylis0_
    inner join
        country country1_
            on countrylis0_.country_id=country1_.id
    where
        countrylis0_.people_id=?
         */
        Country country = this.countryRepository.find(id);
        log.info("country id:{} country:{}",id,country);
    }

    public void printPeople(Long id){
        People people = this.peopleRepository.find(id);
        log.info("people id:{} people:{} countryList:{}",id,people,people.getCountryList());
    }

    public void go(){
        TwoWayManyToManyTest app = (TwoWayManyToManyTest) AopContext.currentProxy();

        //添加Country
        log.info("new country");
        Long countryId1 = app.addCountry("中国");
        Long countryId2 = app.addCountry("韩国");

        app.printCountry(countryId1);
        app.printCountry(countryId2);


        //新建People到Country
        log.info("addNewPeopleToCountry");
        app.addNewPeopleToCountry("李雷",countryId1);
        app.addNewPeopleToCountry("韩梅",countryId1);
        app.printCountry(countryId1);


        //沿用已有的People到Country
        log.info("addExistPeopleToCountry");
        Long people1 = app.addPeople("张三");
        Long people2 = app.addPeople("李四");
        app.addExistPeopleToCountry(people1,countryId1);
        app.addExistPeopleToCountry(people2,countryId1);
        app.addExistPeopleToCountry(people2,countryId2);
        app.printCountry(countryId1);
        app.printCountry(countryId2);

        app.printPeople(people1);
        app.printPeople(people2);

        //删除
        log.info("removeCountryPeople");
        //执行两条sql，先删除第4条数据
        /*
        delete
        from
            country_people
        where
            country_id=?
            and people_order=?
         */
        //然后将第3条数据更新people_id
        /*
        update
            country_people
        set
            people_id=?
        where
            country_id=?
            and people_order=?
         */
        //注意，不会删除people的数据，自会删除关系表country_people的数据
        app.removeCountryPeople(countryId1,2);
        app.printCountry(countryId1);
        app.printPeople(people2);
    }
}
