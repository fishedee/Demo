package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.*;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //定义一个RowMapper
    private RowMapper mapper = new RowMapper() {
        @Override
        public Object mapRow(ResultSet resultSet, int i) throws SQLException {
            User user = new User();
            user.setName(resultSet.getString("name"));
            user.setId(resultSet.getInt("id"));
            return user;
        }
    };

    public List<User> findAll(){
        //不要使用queryForList，只能返回单列的数据
        //this.jdbcTemplate.queryForList("select * from user",User.class);
        return this.jdbcTemplate.query("select * from user",mapper);
    }

    public List<User> findByName(String name){
        return this.jdbcTemplate.query("select * from user where name like ?",
                new Object[]{"%"+name+"%"},
                new int[]{Types.VARCHAR},
                new BeanPropertyRowMapper(User.class));
    }

    public List<User> findByName2(String name){
        //使用RowMapper来映射数据，很少这样做

        return this.jdbcTemplate.query("select * from user where name like ?",
                new Object[]{"%"+name+"%"},
                new int[]{Types.VARCHAR},
                mapper);
    }

    public Map<String,Object> findForMap(String name){
        return this.jdbcTemplate.queryForMap("select * from user where name like ?",User.class,"%"+name+"%");
    }

    public void add(User user){
        final String INSERT_SQL = "insert into user(name) values(?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int affectedRows =jdbcTemplate.update(
            new PreparedStatementCreator() {
                public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                    //注意要指定自增列的列名
                    PreparedStatement ps =
                            connection.prepareStatement(INSERT_SQL,new String[]{"id"});
                    //设置参数
                    ps.setString(1, user.getName());
                    return ps;
                }
            },keyHolder);
        if( affectedRows > 0 ){
            user.setId(keyHolder.getKey().intValue());
        }
    }

    public int mod(User user){
        //返回值就是影响行数
        return this.jdbcTemplate.update("update user set name = ? where id = ?",user.getName(),user.getId());
    }

    public int del(int userId){
        //返回值就是影响行数
        return this.jdbcTemplate.update("delete from user where id = ?",userId);
    }
}
