package mybatis_test.mapper;

import mybatis_test.model.CountryAndContinent;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Created by fish on 2021/3/29.
 */
@Mapper
public interface CountryAndContinentMapper {
    List<CountryAndContinent> selectAll();
    List<CountryAndContinent> selectAllWithNest();
}
