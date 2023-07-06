package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import javax.persistence.Id;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
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

    private static RowMapper<ItemUnitConvertDTO> mapper = new RowMapper<ItemUnitConvertDTO>() {
        @Override
        public ItemUnitConvertDTO mapRow(ResultSet resultSet, int i) throws SQLException {
            ItemUnitConvertDTO result = new ItemUnitConvertDTO();
            //生成mapRow
            result.setCreateTime(resultSet.getTimestamp("create_time"));
            result.setModifyTime(resultSet.getTimestamp("modify_time"));
            result.setId(resultSet.getString("id"));
            result.setItemId(resultSet.getLong("item_id"));
            result.setUnitId(resultSet.getLong("unit_id"));
            result.setUnitName(resultSet.getString("unit_name"));
            result.setUnitConvert(resultSet.getBigDecimal("unit_convert"));
            result.setIsBasic(resultSet.getByte("is_basic"));
            result.setIsCommon(resultSet.getByte("is_common"));
            result.setCanBusinessLink(resultSet.getByte("can_business_link"));
            result.setWholeSalesPrice(resultSet.getBigDecimal("whole_sales_price"));
            result.setUnitConvertDesc(resultSet.getString("unit_convert_desc"));
            return result;
        }
    };

    private static Object[] getArguments(List<Long> key){
        List<Object> arguments = new ArrayList<>();
        key.forEach(single-> {
            arguments.add(single);
        });
        return arguments.toArray(new Object[]{});
    }

    private static int[] getArgumentTypes(List<Long> key){
        List<Integer> argumentTypes = new ArrayList<>();
        key.forEach(single->{
            argumentTypes.add(Types.BIGINT);
        });
        return argumentTypes.stream().mapToInt(single->single).toArray();
    }

    private static String getQuestionSql(List<Long> key){
        List<String> question = new ArrayList<>();
        key.forEach(single->{
            question.add("?");
        });
        return Strings.join(question,',');
    }

    public static List<ItemUnitConvertDTO> getBatch(JdbcTemplate jdbcTemplate, List<Long> key){
        String sql = String.format("select * from item_unit_convert where item_id in (%s)",
                getQuestionSql(key));
        return jdbcTemplate.query(sql,
                getArguments(key),
                getArgumentTypes(key),
                new BeanPropertyRowMapper(ItemUnitConvertDTO.class));
    }

    public static List<ItemUnitConvertDTO> getBatchBySpecifyRowMapper(JdbcTemplate jdbcTemplate,List<Long> key){
        String sql = String.format("select * from item_unit_convert where item_id in (%s)",
                getQuestionSql(key));
        return jdbcTemplate.query(sql,
                getArguments(key),
                getArgumentTypes(key),
                mapper);
    }

    public static List<ItemUnitConvertDTO> getBatchByReflectRowMapper(JdbcTemplate jdbcTemplate,List<Long> key){
        String sql = String.format("select * from item_unit_convert where item_id in (%s)",
                getQuestionSql(key));
        return jdbcTemplate.query(sql,
                getArguments(key),
                getArgumentTypes(key),
                new FastBeanPropertyRowMapper<>(ItemUnitConvertDTO.class));
    }
}
