package spring_test;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by fish on 2021/4/26.
 */
//可以指定该Exception的错误类型
//@ResponseStatus(value= HttpStatus.NOT_FOUND,reason = "找不到呀")
@Data
@AllArgsConstructor
public class MyException extends RuntimeException{
    private int code;
    private String message;
    private Object data;
}
