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
public interface CountryMapper2 {
    List<Country> selectAll();
    List<Country> selectByCodeAndName(String countryName,String countryCode);
    List<Country> selectByCodeAndNameWithParam(@Param("countryName") String countryName, @Param("countryCode") String countryCode);
    List<Country> selectByCodeAndNameWithClass(CountryCodeAndName param);
    int updateByMap(Map<String,Object> map);
    int updateByMapAndId(@Param("map") Map<String,Object> map,@Param("id") Long id);
    List<Country> selectByCountryCodeList(List<String> countryCodeList);
    int add(Country country);
}