package spring_test.framework;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

@Component
public class DefaultPersistentTokenRepository extends JdbcTokenRepositoryImpl {
    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void init(){
        this.setDataSource(dataSource);
    }
}
