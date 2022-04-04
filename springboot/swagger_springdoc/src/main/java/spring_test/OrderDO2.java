package spring_test;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDO2 {

    @NotNull
    private OrderType orderType;

    @Schema(name="OrderDO2Item", description="OrderDO2的Item")
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Item{

        @Schema(description="名称")
        private String name2;

        private int id2;

        private BigDecimal count2;
    }

    private List<Item> itemList = new ArrayList<>();
}
