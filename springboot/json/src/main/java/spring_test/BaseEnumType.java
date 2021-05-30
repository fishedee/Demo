package spring_test;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Objects;

/**
 * Created by fish on 2021/4/29.
 */
@JsonDeserialize(using = EnumJsonDeserializer.class)
@JsonSerialize(using = EnumJsonSerializer.class)
public interface BaseEnumType {
    /**
     * 用于显示的枚举名
     *
     * @return
     */
    String getDisplay();

    /**
     * 存储到数据库的枚举值
     *
     * @return
     */
    int getCode();

    //按枚举的value获取枚举实例
    static <T extends BaseEnumType> T fromValue(Class<T> enumType, int value) {
        for (T object : enumType.getEnumConstants()) {
            if (Objects.equals(value, object.getCode())) {
                return object;
            }
        }
        throw new RuntimeException(enumType.getCanonicalName()+"没有枚举类型为"+value);
    }
}
