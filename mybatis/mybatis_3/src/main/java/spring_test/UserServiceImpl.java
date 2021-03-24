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

    public void save(User user){
        this.jdbcTemplate.update("insert into t_user(name,age) values(?,?)",
                new Object[]{user.getName(),user.getAge()},
                new int[]{Types.VARCHAR,Types.INTEGER});
    }

    public void del(int userId){
        this.jdbcTemplate.update("delete from t_user where userId = ?",userId);
    }

    public List<User> getAll(){
        return this.jdbcTemplate.query("select * from t_user",new UserRowMapper());
    }
}
