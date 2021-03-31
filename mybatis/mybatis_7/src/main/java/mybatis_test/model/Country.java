package mybatis_test.model;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by fish on 2021/3/23.
 */
public class Country implements Serializable {
    public Long id;

    public String countryName;

    public String countryCode;

    public Date createTime;

    public Date modifyTime;
}
