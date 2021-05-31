package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import spring_test.MyResponseBodyAdvice;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
public class MyErrorController implements ErrorController {

    private final String ERROR_PATH ="/error";

    /**
     * 出现错误，跳转到如下映射中
     * @return
     */
    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }

    @RequestMapping(value =ERROR_PATH)
    public MyResponseBodyAdvice.ResponseResult handleError(HttpServletRequest request, HttpServletResponse response) {
        int code = response.getStatus();
        if (404 == code) {
            return new MyResponseBodyAdvice.ResponseResult(HttpStatus.NOT_FOUND,1,"未找到资源",null);
        } else if (403 == code) {
            return new MyResponseBodyAdvice.ResponseResult(HttpStatus.FORBIDDEN,1,"没有访问权限",null);
        } else if (401 == code) {
            return new MyResponseBodyAdvice.ResponseResult(HttpStatus.UNAUTHORIZED,1,"登录过期",null);
        } else {
            return new MyResponseBodyAdvice.ResponseResult(HttpStatus.INTERNAL_SERVER_ERROR,1,"服务器内部错误",null);
        }
    }

}