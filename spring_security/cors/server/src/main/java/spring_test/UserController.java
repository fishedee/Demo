package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring_test.business.User;
import spring_test.infrastructure.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by fish on 2021/4/26.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/search")
    public Object search(){
        List<User> data = this.userRepository.getAll();
        Map<String,Object> result = new HashMap<>();
        result.put("count",data.size());
        result.put("data",data);
        return result;
    }
}
