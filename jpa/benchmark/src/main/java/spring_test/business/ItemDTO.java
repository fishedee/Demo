package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.math.BigDecimal;
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
}
