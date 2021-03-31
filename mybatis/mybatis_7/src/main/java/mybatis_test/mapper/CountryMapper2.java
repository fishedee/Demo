package mybatis_test.mapper;

import mybatis_test.model.Country;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Created by fish on 2021/3/31.
 */
@Mapper
public interface CountryMapper2 {
    List<Country> selectAll();
}
