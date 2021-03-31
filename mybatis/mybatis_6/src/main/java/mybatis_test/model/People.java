package mybatis_test.model;

import java.util.Date;

/**
 * Created by fish on 2021/3/29.
 */
public class People {
    public Long peopleId;

    public String name;

    public String homeAddress;

    public String primaryEmail;

    public Long countryId;

    public Date createTime;

    public Date modifyTime;

    public String toString(){
        return String.format("People{id:%s,name:%s,homeAddress:%s,primaryEmail:%s,countryId:%s}",peopleId,name,homeAddress,primaryEmail,countryId);

    }
}
