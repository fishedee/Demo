package spring_test;

import lombok.Data;

import javax.validation.constraints.*;
import java.math.BigDecimal;
/**
 * Created by fish on 2021/5/30.
 */
@Data
public class OrderDO {
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
}
