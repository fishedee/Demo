package spring_test;

import com.fasterxml.jackson.annotation.JsonRawValue;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDO2 {

    @ApiModel(value="OrderDO2Item", description="OrderDO2的Item")
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Item{

        @ApiModelProperty(name="名称")
        private String name2;

        private int id2;

        private BigDecimal count2;
    }

    private List<Item> itemList = new ArrayList<>();

    @ApiModelProperty(dataType = "spring_test.OrderDO2$Item")
    @JsonRawValue
    String itemInfo;
}
