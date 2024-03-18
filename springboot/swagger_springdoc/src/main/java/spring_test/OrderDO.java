package spring_test;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
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
    private OrderType type;

    @NotNull
    @Email
    private String email;

    @Min(value = 1,message = "必须为正数")
    private int size;

    @NotNull
    @DecimalMin(value = "0.0001",message = "必须为正数")
    private BigDecimal total;

    private Map<String,Item> addressMap;

    @Getter
    @Entity
    @ToString
    public static class ItemDetailInfo{
        @Id
        private int id;

        private String name;

        private String unitName;
    }

    @Getter
    @Entity
    @ToString
    public static class Item  {
        @Id
        private int id;

        private String name;

        private BigDecimal count;

        @Transient
        private ItemDetailInfo itemInfo;

        protected Item(){

        }

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