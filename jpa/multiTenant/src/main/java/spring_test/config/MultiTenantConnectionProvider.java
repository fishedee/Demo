package spring_test.config;

import org.hibernate.engine.jdbc.connections.spi.AbstractDataSourceBasedMultiTenantConnectionProviderImpl;
import org.hibernate.engine.jdbc.connections.spi.AbstractMultiTenantConnectionProvider;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

//另外一种实现是继承AbstractMultiTenantConnectionProvider，其实与AbstractDataSourceBasedMultiTenantConnectionProviderImpl是大同小异的
public class MultiTenantConnectionProvider extends AbstractDataSourceBasedMultiTenantConnectionProviderImpl {
    private DynamicDataSource dynamicDataSource;

    // 在没有提供tenantId的情况下返回默认数据源
    @Override
    protected DataSource selectAnyDataSource() {
        throw new Error("no default resource");
    }

    private DynamicDataSource getDynamicDataSource(){
        if( dynamicDataSource != null ){
            return dynamicDataSource;
        }
        dynamicDataSource = IocHelper.getBean(DynamicDataSource.class);
        return dynamicDataSource;
    }

    // 提供了tenantId的话就根据ID来返回数据源
    @Override
    protected DataSource selectDataSource(String tenantIdentifier) {
        DataSource targetDataSource = getDynamicDataSource().getResolvedDataSources().get(tenantIdentifier);
        if( targetDataSource == null ){
            throw new Error("找不到数据源"+tenantIdentifier);
        }
        return targetDataSource;
    }

    //设置Schema
    @Override
    public Connection getConnection(String tenantIdentifier) throws SQLException {
        Connection connection = super.getConnection(tenantIdentifier);
        connection.setSchema(CurrentTenantHolder.getDataSchema());
        return connection;
    }

}
