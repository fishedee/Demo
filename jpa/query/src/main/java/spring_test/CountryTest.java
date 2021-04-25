package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Country;
import spring_test.infrastructure.CountryRepository;
import spring_test.query.CountryCount;

import java.util.Arrays;
import java.util.List;

/**
 * Created by fish on 2021/4/25.
 */
@Component
@Slf4j
public class CountryTest {
    @Autowired
    private CountryRepository countryRepository;

    @Transactional
    public void initData(){
        Country country1 = new Country("中A国","亚洲");
        Country country2 = new Country("日A本","亚洲");
        Country country3 = new Country("美B国","北美洲");
        Country country4 = new Country("德A国","欧洲");

        this.countryRepository.add(country1);
        this.countryRepository.add(country2);
        this.countryRepository.add(country3);
        this.countryRepository.add(country4);
    }

    public void showNamedQuery(){
        List<Country> countryList = this.countryRepository.findByIds(Arrays.asList(10001L,10003L));

        log.info("country findByIds {}",countryList);
    }

    public void showNativeNamedQuery(){
        List<CountryCount> countryCounts = this.countryRepository.countByName("%A%");

        log.info("country countByName {}",countryCounts);
    }

    public void go(){
        CountryTest app = (CountryTest) AopContext.currentProxy();

        app.initData();

        app.showNamedQuery();

        app.showNativeNamedQuery();
    }
}
