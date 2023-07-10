package spring_test;

        import com.baomidou.dynamic.datasource.DynamicRoutingDataSource;
        import com.baomidou.dynamic.datasource.creator.HikariDataSourceCreator;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

        import javax.sql.DataSource;
        import javax.validation.constraints.NotBlank;
        import javax.validation.constraints.NotNull;
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
    private DataSource dataSource;

    @Autowired
    private HikariDataSourceCreator hikariDataSourceCreator;

    /*
    POST http://localhost:8080/hello/config
    [
  {
    "dataSchema":"schema1",
    "tenantId":"tenant1",
    "url":"jdbc:postgresql://localhost:5432/test2",
    "driverClassName":"org.postgresql.Driver",
    "username":"postgres",
    "password":"123"
  },
  {
    "dataSchema":"schema2",
    "tenantId":"tenant2",
    "url":"jdbc:postgresql://localhost:5432/test2",
    "driverClassName":"org.postgresql.Driver",
    "username":"postgres",
    "password":"123"
  },
  {
    "dataSchema":"public",
    "tenantId":"tenant3",
    "url":"jdbc:postgresql://localhost:5432/test1",
    "driverClassName":"org.postgresql.Driver",
    "username":"postgres",
    "password":"123"
  }
]
     */
    @PostMapping("config")
    public void config(@RequestBody @NotNull  List<CurrentTenantHolder.TenantConfig> configs){
        DynamicRoutingDataSource dynamicRoutingDataSource = (DynamicRoutingDataSource) dataSource;
        CurrentTenantHolder.refreshConfig(configs,dynamicRoutingDataSource,hikariDataSourceCreator);
    }

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
