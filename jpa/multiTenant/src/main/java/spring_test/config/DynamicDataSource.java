package spring_test.config;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

public class DynamicDataSource extends AbstractRoutingDataSource {

    public DynamicDataSource(DataSource defaultTargetDataSource, Map<Object, Object> targetDataSources) {
        //默认目标数据源
        super.setDefaultTargetDataSource(defaultTargetDataSource);
        //目标数据源集合。数据源切换时从此列表选择
        super.setTargetDataSources(targetDataSources);
        //属性设置
        super.afterPropertiesSet();
    }

    public Connection getConnection() throws SQLException {
        Connection connection = super.getConnection();
        connection.setSchema(CurrentTenantHolder.getDataSchema());
        return connection;
    }

    public Connection getConnection(String username, String password) throws SQLException {
        Connection connection = super.getConnection(username,password);
        connection.setSchema(CurrentTenantHolder.getDataSchema());
        return connection;
    }

    @Override
    protected Object determineCurrentLookupKey() {
        //关键：更具数据源key。获取选择的数据源。
        return CurrentTenantHolder.getDataSourceKey();
    }
}
