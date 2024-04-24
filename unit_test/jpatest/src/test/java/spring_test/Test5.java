package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DataJpaTest(includeFilters = @ComponentScan.Filter(
        type= FilterType.ASSIGNABLE_TYPE,
        classes = {UserHelper.class}
))
@Slf4j
public class Test5{

    @SpyBean
    private UserHelper userHelper;

    @Test
    public void go(){
        //mock特定的接口和参数
        Optional<User> mockResult = Optional.of(new User("bb"));
        Optional<User> mockResult2 = Optional.of(new User("cc"));
        doReturn(mockResult).when(userHelper).getSingle(1L);
        doReturn(mockResult2).when(userHelper).getSingle(2L);

        assertEquals(userHelper.getSingle(1L),mockResult);
        assertEquals(userHelper.getSingle(2L),mockResult2);

        //其他的接口和参数走原来的逻辑
        assertThrows(RuntimeException.class,()->{
            userHelper.getSingle(3L);
        });
        assertEquals(userHelper.getAll(), Arrays.asList());
    }
}
