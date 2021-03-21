package spring_test;


import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by fish on 2021/3/18.
 */
public class UserRowMapper implements RowMapper<User>{
    @Override
    public User mapRow(ResultSet set, int index) throws SQLException{
        User person = new User();
        person.setId(set.getInt("userId"));
        person.setName(set.getString("name"));
        person.setAge(set.getInt("age"));
        return person;
    }
}
