package spring_test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

/**
 * Created by fish on 2021/5/30.
 */
@AllArgsConstructor
@Getter
public enum EnabledEnum implements BaseEnumType{

    ENABLED(1,"可用"),
    DISABLE(2,"不可用");

    private int code;

    private String display;
}
