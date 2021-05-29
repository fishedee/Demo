package spring_test;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by fish on 2021/4/25.
 */
@Data
public class Order2DO {

    @Data
    public static class Item{
        private Long id;

        private String name;
    }
    @NotNull
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    @Email
    private String email;

    @Min(value = 1,message = "必须为正数")
    private int size;

    @NotNull
    @DecimalMin(value = "0.0001",message = "必须为正数")
    private BigDecimal total;

    @Valid @NotNull
    @NotEmpty
    private List<Item> itemList;

}
