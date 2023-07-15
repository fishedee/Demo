package spring_test;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.transaction.annotation.Transactional;
        import org.springframework.web.bind.annotation.*;
        import spring_test.config.CurrentTenantHolder;

        import javax.validation.constraints.NotBlank;
        import java.util.ArrayList;
        import java.util.List;

/**
 * Created by fish on 2021/4/25.
 */
@RestController
@RequestMapping("/hello")
public class Controller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserHelper userHelper;

    //http://localhost:8080/hello/getAll?tenantId=tenant1
    @GetMapping("/getAll")
    public List<User> getAll(){
        return this.userRepository.getAll();
    }

    //http://localhost:8080/hello/add?tenantId=tenant1&name=cat
    @GetMapping("/add")
    @Transactional
    public void add(@NotBlank @RequestParam("name") String name){
        User user = new User(name);
        this.userRepository.add(user);
    }

    //http://localhost:8080/hello/addAll
    //同一个@Transactional，只能使用一个租户提交，中途切换租户不会产生影响，因为整个JPA在事务中只使用一个connection
    @GetMapping("/addAll")
    @Transactional
    public void addAll(@NotBlank @RequestParam("name") String name){
        //同时添加在两个租户，添加数据
        CurrentTenantHolder.setTenantId("tenant1");
        User user = new User(name);
        this.userRepository.add(user);

        CurrentTenantHolder.setTenantId("tenant2");
        User user2 = new User(name);
        this.userRepository.add(user2);
    }

    //http://localhost:8080/hello/addAll2
    //使用多个@Transactional，才能在多个租户里面提交数据
    @GetMapping("/addAll2")
    public void addAll2(@NotBlank @RequestParam("name") String name){

        CurrentTenantHolder.setTenantId("tenant1");
        this.userHelper.addUser(name);

        CurrentTenantHolder.setTenantId("tenant2");
        this.userHelper.addUser(name);
    }
}
