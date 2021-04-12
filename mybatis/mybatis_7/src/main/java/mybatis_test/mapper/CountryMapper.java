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
    Country selectById(@Param("id")Long countryId);
    Country selectById2(@Param("id")Long countryId);
    int insertList(List<Country> countryList);
}