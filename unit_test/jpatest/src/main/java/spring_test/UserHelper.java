package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserHelper {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAll(){
        List<User> result = new ArrayList();
        for( User user:userRepository.findAll()){
            result.add(user);
        }
        return result;
    }

    public Optional<User> getSingle(Long id){
        throw new RuntimeException("cc");
    }


}
