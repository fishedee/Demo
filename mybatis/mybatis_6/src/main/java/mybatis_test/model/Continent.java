package mybatis_test.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;

/**
 * Created by fish on 2021/3/29.
 */
public class Continent {
    final Logger logger = LoggerFactory.getLogger(getClass());

    private Long continentId;

    private String name;

    private Date createTime;

    private Date modifyTime;

    public Continent(Long continentId,String name,Date createTime,Date modifyTime){
        logger.info("continent construct call");
        this.continentId = continentId;
        this.name = name;
        this.createTime = createTime;
        this.modifyTime = modifyTime;
    }

    public Long getContinentId(){
        return this.continentId;
    }

    public String getName(){
        return this.name;
    }

    public Date getCreateTime(){
        return this.createTime;
    }

    public Date getModifyTime(){
        return this.modifyTime;
    }

    public String toString(){
        return String.format("Continent{id:%s,name:%s}",continentId,name);
    }
}
