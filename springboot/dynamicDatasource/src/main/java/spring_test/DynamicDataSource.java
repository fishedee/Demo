package spring_test;

import com.baomidou.dynamic.datasource.DynamicRoutingDataSource;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

public class DynamicDataSource extends DynamicRoutingDataSource {

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
}
