package spring_test;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import spring_test.business.Country2;
import spring_test.business.People2;
import spring_test.infrastructure.Country2Repository;
import spring_test.infrastructure.CountryRepository;
import spring_test.infrastructure.People2Repository;
import spring_test.infrastructure.PeopleRepository;

import javax.transaction.TransactionScoped;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Slf4j
public class OneWayManyToManyTest {

    @Autowired
    private Country2Repository countryRepository;

    @Autowired
    private People2Repository peopleRepository;

    @Transactional
    public Long addCountry(String name){
        Country2 country = new Country2(name);
        this.countryRepository.add(country);
        return country.getId();
    }

    @Transactional
    public void addExistPeopleToCountry(Long peopleId,Long countryId){
        People2 people = this.peopleRepository.find(peopleId);
        Country2 country = this.countryRepository.find(countryId);
        country.addPeople(people);
    }

    @Transactional
    public void addNewPeopleToCountry(String name,Long countryId){
        People2 people = new People2(name);
        Country2 country = this.countryRepository.find(countryId);
        country.addPeople(people);
    }

    @Transactional
    public void removeCountryPeople(Long countryId,int index){
        Country2 country = this.countryRepository.find(countryId);

        country.removePeopleIndex(index);
    }

    @Transactional
    public Long addPeople(String name){
        People2 people = new People2(name);
        this.peopleRepository.add(people);
        return people.getId();
    }

    public void printCountry(Long id){
        //因为是双向映射，每次读取Country都需要经过2个select
        //第一个读取国家
        /*
    select
        country2x0_.id as id1_1_0_,
        country2x0_.name as name2_1_0_
    from
        country2 country2x0_
    where
        country2x0_.id=?
         */
        //第二个读取国家关联的people
        /*
    select
        peoplelist0_.country_id as country_1_3_1_,
        peoplelist0_.people_id as people_i2_3_1_,
        peoplelist0_.people_list_order as people_l3_1_,
        people2x1_.id as id1_5_0_,
        people2x1_.name as name2_5_0_
    from
        country_people2 peoplelist0_
    inner join
        people2 people2x1_
            on peoplelist0_.people_id=people2x1_.id
    where
        peoplelist0_.country_id=?
         */
        Country2 country = this.countryRepository.find(id);
        log.info("country id:{} country:{}",id,country);
    }

    public void printPeople(Long id){
        People2 people = this.peopleRepository.find(id);
        log.info("people id:{} people:{}",id,people);
    }

    public void go(){
        OneWayManyToManyTest app = (OneWayManyToManyTest) AopContext.currentProxy();

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
            country_people2
        where
            country_id=?
            and people_list_order=?
         */
        //然后将第3条数据更新people_id
        /*
        update
            country_people2
        set
            people_id=?
        where
            country_id=?
            and people_list_order=?
         */
        app.removeCountryPeople(countryId1,2);
        app.printCountry(countryId1);
        app.printPeople(people2);
    }
}
