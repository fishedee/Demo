package spring_test;

import java.util.List;

/**
 * Created by fish on 2021/3/18.
 */
public interface UserService {

    void save(User user);

    void del(int userId);

    List<User> getAll();
}
