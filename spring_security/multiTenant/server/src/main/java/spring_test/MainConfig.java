package spring_test;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import spring_test.infrastructure.UserRepository;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class MainConfig {
    @Bean("firstDataSource")
    @ConfigurationProperties(prefix="spring.datasource.first")
    public DataSource firstDataSource(){
        return DataSourceBuilder.create().build();
    }

    @Bean("secondDataSource")
    @ConfigurationProperties(prefix="spring.datasource.second")
    public DataSource secondDataSource(){
        return DataSourceBuilder.create().build();
    }

    @Bean
    @Primary
    public MyDynamicDataSource dataSource(DataSource firstDataSource, DataSource secondDataSource) {
        Map<Object, Object> targetDataSources = new HashMap<>(2);
        targetDataSources.put("first", firstDataSource);
        targetDataSources.put("second", secondDataSource);
        //默认返回的也是一个datasource，也可以不填
        //new DynamicDataSource(firstDataSource, targetDataSources);
        return new MyDynamicDataSource(null,targetDataSources);
    }

    @Bean("tenantUserDetailService")
    @Primary
    public UserDetailsService userDetailsService(UserRepository userRepository){
        return new MyTenantUserDetailService(userRepository);
    }

    @Bean("tenantPersistentTokenRepository")
    @Primary
    public PersistentTokenRepository persistentTokenRepository(DataSource dataSource){
        return new MyTenantPersistentTokenRepository(dataSource);
    }
}