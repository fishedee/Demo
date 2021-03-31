package mybatis_test.mapper;

import mybatis_test.model.Country;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by fish on 2021/3/27.
 */
@Mapper
public interface CountryMapper {
    List<Country> selectAll();
    int insertCheckName(Country country);
    List<Country> selectByWhere(Map<String,Object> where);
    int updateByIdSelective(Country country);
    int insertList(List<Country> countryList);
    int insertListWithPrint(List<Country> countryList);
}