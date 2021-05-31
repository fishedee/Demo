package spring_test;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Created by fish on 2021/5/31.
 */
@Data
@AllArgsConstructor
public class MyException extends RuntimeException{
    private int code;
    private String message;
    private Object data;
}
