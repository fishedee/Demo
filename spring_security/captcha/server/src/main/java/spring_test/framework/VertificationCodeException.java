package spring_test.framework;

import org.springframework.security.core.AuthenticationException;

/**
 * Created by fish on 2021/6/3.
 */

public class VertificationCodeException extends AuthenticationException {

    public VertificationCodeException(){
        super("图形验证码校验失败");
    }
}
