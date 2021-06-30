package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;

import static org.junit.jupiter.api.Assertions.*;
import spring_test.util.MainConfig;

@DataJpaTest
//可以使用导入@TestConfiguration的方式，加入其他的bean
@Import(MainConfig.class)
@Slf4j
public class Test4{

    @Autowired
    private UserService service;

    @Test
    public void go(){
        //因此这个service是空
        assertEquals(service.getDefaultName(),"mm");
    }
}