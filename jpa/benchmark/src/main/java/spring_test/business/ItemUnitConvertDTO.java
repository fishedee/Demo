package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.persistence.Id;
import java.math.BigDecimal;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemUnitConvertDTO {
    private String id;

    private Date createTime;

    private Date modifyTime;

    private Long itemId;

    private Long unitId;

    private String unitName;

    private BigDecimal unitConvert;

    private Byte isBasic;

    private Byte isCommon;

    private Byte canBusinessLink;

    //允许为null
    private BigDecimal wholeSalesPrice;

    private String unitConvertDesc;

    public static List<ItemUnitConvertDTO> getBatch(JdbcTemplate jdbcTemplate, List<Long> key){
        List<String> question = new ArrayList<>();
        List<Object> arguments = new ArrayList<>();
        List<Integer> argumentTypes = new ArrayList<>();
        key.forEach(single->{
            question.add("?");
            arguments.add(single);
            argumentTypes.add(Types.INTEGER);
        });
        String sql = String.format("select * from item_unit_convert where item_id in (%s)",
                Strings.join(question,','));
        return jdbcTemplate.query(sql,
                arguments.toArray(new Object[]{}),
                argumentTypes.stream().mapToInt(single->single).toArray(),
                new BeanPropertyRowMapper(ItemUnitConvertDTO.class));
    }

}
