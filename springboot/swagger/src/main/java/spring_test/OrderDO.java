package spring_test;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by fish on 2021/4/25.
 */
@Data
public class OrderDO {
    @NotBlank
    private String name;

    @NotNull
    private OrderType orderType;

    @NotNull
    @Email
    private String email;

    @Min(value = 1,message = "必须为正数")
    private int size;

    @NotNull
    @DecimalMin(value = "0.0001",message = "必须为正数")
    private BigDecimal total;

    private Map<String,Item> addressMap;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @ApiModel(value="OrderDOItem", description="OrderDO的Item")
    public static class Item{
        private String name;

        private int id;

        private BigDecimal count;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Info{
        private String address;
    }

    //生成的JSON会抹去info信息，因为有JsonUnwrapped
    @JsonUnwrapped
    private Info info;

    private List<Item> itemList = new ArrayList<>();
}