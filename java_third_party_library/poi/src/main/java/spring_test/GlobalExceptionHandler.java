package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@Component
@Slf4j
public class GlobalExceptionHandler {
    //拦截其他错误
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public void exceptionHandler(Exception e){
        log.error("server exception {}",e);
    }
}
