package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemContactAliasDTO {

    private Date createTime;

    private Date modifyTime;

    private String id;

    private Long itemId;

    private Long contactId;

    private String aliasItemName;

    private String aliasItemNumber;

    private static RowMapper<ItemContactAliasDTO> mapper = new RowMapper<ItemContactAliasDTO>() {
        @Override
        public ItemContactAliasDTO mapRow(ResultSet resultSet, int i) throws SQLException {
            ItemContactAliasDTO result = new ItemContactAliasDTO();
            //生成mapRow
            result.setCreateTime(resultSet.getTimestamp("create_time"));
            result.setModifyTime(resultSet.getTimestamp("modify_time"));
            result.setId(resultSet.getString("id"));
            result.setItemId(resultSet.getLong("item_id"));
            result.setContactId(resultSet.getLong("contact_id"));
            result.setAliasItemName(resultSet.getString("alias_item_name"));
            result.setAliasItemNumber(resultSet.getString("alias_item_number"));
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

    public static List<ItemContactAliasDTO> getBatch(JdbcTemplate jdbcTemplate,List<Long> key){
        String sql = String.format("select * from item_contact_alias where item_id in (%s)",
                getQuestionSql(key));
        return jdbcTemplate.query(sql,
                getArguments(key),
                getArgumentTypes(key),
                new BeanPropertyRowMapper(ItemContactAliasDTO.class));
    }

    public static List<ItemContactAliasDTO> getBatchBySpecifyRowMapper(JdbcTemplate jdbcTemplate,List<Long> key){
        String sql = String.format("select * from item_contact_alias where item_id in (%s)",
                getQuestionSql(key));
        return jdbcTemplate.query(sql,
                getArguments(key),
                getArgumentTypes(key),
                mapper);
    }

    public static List<ItemContactAliasDTO> getBatchByReflectRowMapper(JdbcTemplate jdbcTemplate,List<Long> key){
        String sql = String.format("select * from item_contact_alias where item_id in (%s)",
                getQuestionSql(key));
        return jdbcTemplate.query(sql,
                getArguments(key),
                getArgumentTypes(key),
                new FastBeanPropertyRowMapper<>(ItemContactAliasDTO.class));
    }
}
