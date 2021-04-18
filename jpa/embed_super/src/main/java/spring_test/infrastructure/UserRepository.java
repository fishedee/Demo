package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.User;

/**
 * Created by fish on 2021/4/18.
 */
@Component
public class UserRepository extends CurdRepository<User,Long> {
}
