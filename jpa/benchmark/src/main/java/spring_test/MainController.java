package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class MainController {

    @Autowired
    private BenchmarkTest benchmarkTest;

    @GetMapping("/jdbc")
    public void testJdbc() throws Exception{
        this.benchmarkTest.testSingle("jdbc",this.benchmarkTest::testJdbcBySpecifyRowMapper);
    }

    @GetMapping("/jpa")
    public void testJpa() throws Exception{
        this.benchmarkTest.testSingle("jpa",this.benchmarkTest::testJpa);
    }

    @GetMapping("/all")
    public void all() throws Exception{
        this.benchmarkTest.go();
    }
}