package mybatis_test.mapper;

import mybatis_test.model.Continent;
import mybatis_test.model.Country;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Created by fish on 2021/3/29.
 */
@Mapper
public interface ContinentMapper {
    List<Continent> selectAll();
}
