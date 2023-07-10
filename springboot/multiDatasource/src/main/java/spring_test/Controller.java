package spring_test;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

        import javax.validation.constraints.NotBlank;
        import java.util.List;

/**
 * Created by fish on 2021/4/25.
 */
@RestController
@RequestMapping("/hello")
public class Controller {

    @Autowired
    private UserRepository userRepository;

    //http://localhost:8080/hello/getAll?tenantId=tenant1
    @GetMapping("/getAll")
    public List<User> getAll(@NotBlank @RequestParam("tenantId") String tenantId){
        CurrentTenantHolder.setTenantId(tenantId);
        return this.userRepository.findAll();
    }

    //http://localhost:8080/hello/add?tenantId=tenant1&name=cat
    @GetMapping("/add")
    public void add(@NotBlank @RequestParam("tenantId") String tenantId,
                    @NotBlank @RequestParam("name") String name){
        CurrentTenantHolder.setTenantId(tenantId);
        User user = new User(name);
        this.userRepository.add(user);
    }
}
