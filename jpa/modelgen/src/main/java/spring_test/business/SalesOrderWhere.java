package spring_test.business;

import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Created by fish on 2021/4/24.
 */
@Data
public class SalesOrderWhere {
    private Date beginTime;

    private Date endTime;

    private List<Long> salesOrderIds;

    private String name;
}
