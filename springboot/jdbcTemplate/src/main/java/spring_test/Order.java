package spring_test;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private int id;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")
    private Date orderDate;

    private Date createTime;

    public Order(Date orderDate,Date createTime){
        this.orderDate = orderDate;
        this.createTime = createTime;
    }
}
