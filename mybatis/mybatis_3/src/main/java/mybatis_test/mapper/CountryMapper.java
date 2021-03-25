package mybatis_test.mapper;

import mybatis_test.model.Country;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Created by fish on 2021/3/24.
 */
@Mapper
public interface CountryMapper {
    List<Country> selectAll();
    void add(Country country);
    void mod(Country country);
    void del(Long id);
}
