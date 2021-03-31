package mybatis_test.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;

/**
 * Created by fish on 2021/3/23.
 */
/* resultMap也支持属性的直接赋值,绕过setter赋值
public class Country{
    public Long countryId;

    public String name;

    public String code;

    public Long continentId;

    public Date createTime;

    public Date modifyTime;

    public String toString(){
        return String.format("Country{id:%s,name:%s,code:%s,continentId:%s}",countryId,name,code,continentId);

    }
}
*/
public class Country {
    final Logger logger = LoggerFactory.getLogger(getClass());
    private Long countryId;

    public void setCountryId(Long countryId){
        this.countryId = countryId;
    }

    public Long getCountryId(){
        return this.countryId;
    }

    private String name;

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    private String code;

    public void setCode(String code){
        this.code = code;
    }

    public String getCode(){
        return this.code;
    }

    private Long continentId;

    public void setContinentId(Long continentId){
        logger.info("setContinentId setter call {}",continentId);
        this.continentId = continentId;
    }

    public Long getContinentId(){
        return this.continentId;
    }

    private Date createTime;

    public void setCreateTime(Date createTime){
        this.createTime = createTime;
    }

    public Date getCreateTime(){
        return this.createTime;
    }

    private Date modifyTime;

    public void setModifyTime(Date modifyTime){
        this.modifyTime = modifyTime;
    }

    public Date getModifyTime(){
        return this.modifyTime;
    }

    public String toString(){
        return String.format("Country{id:%s,name:%s,code:%s,continentId:%s}",countryId,name,code,continentId);

    }
}