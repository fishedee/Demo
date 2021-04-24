package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.infrastructure.CountryRepository;

/**
 * Created by fish on 2021/4/24.
 */
@Component
@Slf4j
public class EntityListenerTest {
    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public Long add(){
        Country country = new Country("中国");
        this.countryRepository.add(country);
        return country.getId();
    }

    @Transactional
    public void mod(Long countryId,String name){
        Country country = this.countryRepository.find(countryId);
        country.setName(name);
    }

    @Transactional
    public void del(Long countryId){
        Country country = this.countryRepository.find(countryId);
        this.countryRepository.del(country);
    }

    public void go(){
        EntityListenerTest app = (EntityListenerTest) AopContext.currentProxy();

        log.info("add begin ...");
        Long countryId = app.add();
        log.info("add end ...");

        log.info("mod begin ...");
        app.mod(countryId,"美国");
        log.info("mod end ...");

        log.info("del begin ...");
        app.del(countryId);
        log.info("del end ...");
    }
}
