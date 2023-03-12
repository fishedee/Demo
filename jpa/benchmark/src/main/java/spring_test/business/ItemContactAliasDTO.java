package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

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

    public static List<ItemContactAliasDTO> getBatch(JdbcTemplate jdbcTemplate,List<Long> key){
        List<String> question = new ArrayList<>();
        List<Object> arguments = new ArrayList<>();
        List<Integer> argumentTypes = new ArrayList<>();
        key.forEach(single->{
            question.add("?");
            arguments.add(single);
            argumentTypes.add(Types.BIGINT);
        });
        String sql = String.format("select * from item_contact_alias where item_id in (%s)",
                Strings.join(question,','));
        return jdbcTemplate.query(sql,
                arguments.toArray(new Object[]{}),
                argumentTypes.stream().mapToInt(single->single).toArray(),
                new BeanPropertyRowMapper(ItemContactAliasDTO.class));
    }
}
