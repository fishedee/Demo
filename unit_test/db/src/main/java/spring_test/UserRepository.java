package spring_test;

import org.springframework.stereotype.Component;

@Component
public class UserRepository extends CurdRepository<User,Long>{
}