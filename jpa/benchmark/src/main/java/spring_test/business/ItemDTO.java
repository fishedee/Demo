package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {

    private Date createTime;

    private Date modifyTime;

    private Long id;

    private String number;

    private String name;

    private Byte isCategory;

    private Byte isSystem;

    private Integer treeLevel;

    private String treePath;

    private Long parentId;

    private String modelRemark;

    private String specsRemark;

    private String remark;

    private Long basicUnitId;

    private String basicUnitName;

    private Long commonUnitId;

    private String commonUnitName;

    private BigDecimal commonUnitConvert;

    private String unitConvertDesc;

    private Byte isRegularType;

    private List<ItemUnitConvertDTO> unitConverts = new ArrayList<>();

    private List<ItemContactAliasDTO> aliases = new ArrayList<>();

    public static List<ItemDTO> getAll(JdbcTemplate jdbcTemplate){
        return jdbcTemplate.query("select * from item",
                new BeanPropertyRowMapper(ItemDTO.class));
    }

    private static RowMapper<ItemDTO> mapper = new RowMapper<ItemDTO>() {
        @Override
        public ItemDTO mapRow(ResultSet resultSet, int i) throws SQLException {
            ItemDTO result = new ItemDTO();
            //生成mapRow
            result.setCreateTime(resultSet.getTimestamp("create_time"));
            result.setModifyTime(resultSet.getTimestamp("modify_time"));
            result.setId(resultSet.getLong("id"));
            result.setNumber(resultSet.getString("number"));
            result.setName(resultSet.getString("name"));
            result.setIsCategory(resultSet.getByte("is_category"));
            result.setIsSystem(resultSet.getByte("is_system"));
            result.setTreeLevel(resultSet.getInt("tree_level"));
            result.setTreePath(resultSet.getString("tree_path"));
            result.setParentId(resultSet.getLong("parent_id"));
            result.setModelRemark(resultSet.getString("model_remark"));
            result.setSpecsRemark(resultSet.getString("specs_remark"));
            result.setRemark(resultSet.getString("remark"));
            result.setBasicUnitId(resultSet.getLong("basic_unit_id"));
            result.setBasicUnitName(resultSet.getString("basic_unit_name"));
            result.setCommonUnitId(resultSet.getLong("common_unit_id"));
            result.setCommonUnitName(resultSet.getString("common_unit_name"));
            result.setCommonUnitConvert(resultSet.getBigDecimal("common_unit_convert"));
            result.setUnitConvertDesc(resultSet.getString("unit_convert_desc"));
            result.setIsRegularType(resultSet.getByte("is_regular_type"));
            return result;
        }
    };

    public static List<ItemDTO> getAllBySpecifyRowMapper(JdbcTemplate jdbcTemplate){
        return jdbcTemplate.query("select * from item",mapper);
    }

    public static List<ItemDTO> getAllByReflectRowMapper(JdbcTemplate jdbcTemplate){
        return jdbcTemplate.query("select * from item",new FastBeanPropertyRowMapper<ItemDTO>(ItemDTO.class));
    }
}
