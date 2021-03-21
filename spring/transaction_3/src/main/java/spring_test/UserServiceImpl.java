package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.Types;
import java.util.List;

/**
 * Created by fish on 2021/3/18.
 */
@Component
public class UserServiceImpl  implements  UserService{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void save(User user){
        this.jdbcTemplate.update("insert into t_user(userId,name,age) values(?,?,?)",
                new Object[]{user.getId(),user.getName(),user.getAge()},
                new int[]{Types.INTEGER,Types.VARCHAR,Types.INTEGER});
    }

    @Override
    public void del(int userId){
        this.jdbcTemplate.update("delete from t_user where userId = ?",userId);
    }

    @Override
    public void clear(){
        this.jdbcTemplate.update("delete from t_user");
    }

    @Override
    public void mod(User user){
        this.jdbcTemplate.update("update t_user set age = ? where userId = ?",
                new Object[]{user.getAge(),user.getId()},
                new int[]{Types.INTEGER,Types.INTEGER});
    }

    @Override
    public List<User> getAll(){
        return this.jdbcTemplate.query("select * from t_user",new UserRowMapper());
    }
}
