package spring_test;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.math.BigDecimal;

/**
 * Created by fish on 2021/4/25.
 */
@Data
public class OrderDO2 {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Address{
        private String city;

        private String street;
    }

    @JsonProperty("fish_name")
    private String name;

    @JsonIgnore
    private String email;

    @JsonUnwrapped
    private Address address;

    private int size;

    private BigDecimal total;
}