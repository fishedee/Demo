package spring_test;

import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;

import javax.sql.DataSource;
import java.util.Date;

public class MyTenantPersistentTokenRepository extends JdbcTokenRepositoryImpl {

    public MyTenantPersistentTokenRepository(DataSource dataSource){
        this.setDataSource(dataSource);
    }

    @Override
    public void createNewToken(PersistentRememberMeToken token){
        String tenantId = MyTenantHolder.getTenantIdByRequest();
        if( tenantId == null ){
            throw new RuntimeException("缺少租户ID");
        }
        MyTenantHolder.setTenantId(tenantId);
        super.createNewToken(token);
    }

    @Override
    public void updateToken(String key, String value, Date date){
        String tenantId = MyTenantHolder.getTenantIdByRequest();
        if( tenantId == null ){
            throw new RuntimeException("缺少租户ID");
        }
        MyTenantHolder.setTenantId(tenantId);
        super.updateToken(key,value,date);
    }

    @Override
    public PersistentRememberMeToken getTokenForSeries(String key){
        String tenantId = MyTenantHolder.getTenantIdByRequest();
        if( tenantId == null ){
            return null;
        }
        MyTenantHolder.setTenantId(tenantId);
        return super.getTokenForSeries(key);
    }

    @Override
    public void removeUserTokens(String key){
        String tenantId = MyTenantHolder.getTenantIdByRequest();
        if( tenantId == null ){
            throw new RuntimeException("缺少租户ID");
        }
        MyTenantHolder.setTenantId(tenantId);
        super.removeUserTokens(key);
    }
}
