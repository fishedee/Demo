package mybatis_test.mapper;

import mybatis_test.model.CountryAndPeople;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Created by fish on 2021/3/30.
 */
@Mapper
public interface CountryAndPeopleMapper {
    List<CountryAndPeople> selectAll();
    List<CountryAndPeople> selectAllWithNest();
}
