package spring_test;

import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

/**
 * Created by fish on 2021/4/24.
 */
@Slf4j
public class StandardListener<T> {

    @PrePersist
    public void notifyAdd(T entity){
        //PrePersist是没有标识符的,因为persist之前
        log.info("notify add {}",entity);
    }

    @PreUpdate
    public void notifyUpdate(T entity){
        log.info("notify update {}",entity);
    }

    @PreRemove
    public void notifyRemove(T entity){
        log.info("notify remove {}",entity);
    }

    @PostPersist
    public void notifyAdd2(T entity){
        log.info("notify add post {}",entity);
    }

    @PostUpdate
    public void notifyUpdate2(T entity){
        log.info("notify update post {}",entity);
    }

    @PostRemove
    public void notifyRemove2(T entity){
        log.info("notify remove post {}",entity);
    }
}
