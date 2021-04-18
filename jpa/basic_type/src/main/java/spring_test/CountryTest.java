package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.infrastructure.CountryRepository;

import java.util.List;

/**
 * Created by fish on 2021/4/17.
 */
@Slf4j
@Component
public class CountryTest {
    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public Long addCountry(Country country){
        this.countryRepository.add(country);
        //因为add的id是用IDENTITY的方式,所以,这里会进行insert操作,返回的是含有createTime和modifyTime
        log.info("add Country id:{} createTime:{} modifyTime:{}",country.getId(),country.getCreateTime(),country.getModifyTime());
        return country.getId();
    }

    @Transactional
    public void modCountry(Long id,String name,String code){
        Country country = this.countryRepository.find(id);
        if(country == null){
            throw new RuntimeException("找不到"+id+"的国家");
        }
        country.mod(name,code);
        //只有在事务结束的时候,才进行真正的更新操作,所以这里读到的modifyTime依然是旧的.
        log.info("mod Country id:{} createTime:{} modifyTime:{}",country.getId(),country.getCreateTime(),country.getModifyTime());
    }

    @Transactional
    public void modCountry2(Long id,String name,String code){
        Country country = this.countryRepository.find(id);
        if(country == null){
            throw new RuntimeException("找不到"+id+"的国家");
        }
        country.mod(name,code);

        //只有在事务结束的时候,才进行真正的更新操作,所以这里读到的modifyTime依然是旧的.
        //即使在数据库读一遍也不会得到新的modifyTime,因为它在一级缓存里面拿的
        country = this.countryRepository.find(id);
        log.info("mod Country id:{} createTime:{} modifyTime:{}",country.getId(),country.getCreateTime(),country.getModifyTime());
    }

    public void showAllCountry(){
        List<Country> countries = this.countryRepository.getAll();
        log.info("all Country {}",countries);
    }

    public void go(){
        CountryTest app = (CountryTest) AopContext.currentProxy();

        Long id = app.addCountry(new Country("中国","CN"));
        app.modCountry(id,"中国2","CN2");
        app.modCountry2(id,"中国3","CN3");
        app.showAllCountry();
    }
}
