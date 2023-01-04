package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Date;
import java.util.List;

@Component
public class OrderRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Order> findAll(){
        return this.jdbcTemplate.query("select * from my_order ",
                new BeanPropertyRowMapper(Order.class));
    }

    public List<Order> findByOrderDate(Date orderDate){
        return this.jdbcTemplate.query("select * from my_order where order_date = ? ",
                new Object[]{orderDate},
                new int[]{Types.DATE},
                new BeanPropertyRowMapper(Order.class));
    }

    public List<Order> findByCreateTimeRange(Date beginTime,Date endTime){
        return this.jdbcTemplate.query("select * from my_order where create_time >= ? and create_time <= ? ",
                new Object[]{beginTime,endTime},
                new int[]{Types.TIMESTAMP, Types.TIMESTAMP},
                new BeanPropertyRowMapper(Order.class));
    }


    public void add(Order order){
        final String INSERT_SQL = "insert into my_order(order_date,create_time) values(?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int affectedRows =jdbcTemplate.update(
                new PreparedStatementCreator() {
                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                        //注意要指定自增列的列名
                        PreparedStatement ps =
                                connection.prepareStatement(INSERT_SQL,new String[]{"id"});
                        //设置参数
                        ps.setDate(1, new java.sql.Date(order.getOrderDate().getTime()));
                        ps.setTimestamp(2, new java.sql.Timestamp(order.getCreateTime().getTime()));
                        return ps;
                    }
                },keyHolder);
        if( affectedRows > 0 ){
            order.setId(keyHolder.getKey().intValue());
        }
    }
}
