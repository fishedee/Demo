package spring_test.config;

import org.hibernate.annotations.QueryHints;
import org.hibernate.boot.Metadata;
import org.hibernate.cfg.annotations.QueryHintDefinition;

import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * Created by fish on 2021/4/16.
 */
public class CurdRepository<T,U extends Serializable> {

    @PersistenceContext
    private EntityManager entityManager;

    private Class itemClass;

    public CurdRepository(){
        ParameterizedType ptype = (ParameterizedType) this.getClass().getGenericSuperclass();
        itemClass = (Class<T>) ptype.getActualTypeArguments()[0];
    }

    public List<T> getAll(){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<T> criteria = cb.createQuery(itemClass);
        Root<T> item = criteria.from(itemClass);
        criteria.select(item);

        TypedQuery<T> query =  entityManager.createQuery(criteria);
        return query.getResultList();
    }

    public T find(U id){
        return (T)entityManager.find(itemClass,id);
    }

    public List<T> findBatch(Collection<U> id){
        Metamodel metadata = entityManager.getMetamodel();
        EntityType t = metadata.entity(itemClass);
        return (List<T>)entityManager.createQuery("select i from "+t.getName()+" i where i.id in (:ids)")
                .setParameter("ids",id)
                .setHint(org.hibernate.jpa.QueryHints.HINT_READONLY,true)
                .getResultList();
    }

    public T findForLock(U id){
        //PESSIMISTIC_WRITE为for update悲观锁
        //PESSIMISTIC_READ为for share悲观锁
        //OPTIMISTIC_FORCE_INCREMENT为执行find后,使用乐观锁自动递增version字段
        //PESSIMISTIC_FORCE_INCREMENT为执行find后,使用悲观锁自动递增version字段
        return (T)entityManager.find(itemClass,id,LockModeType.PESSIMISTIC_WRITE);
    }
    public void add(T country){
        entityManager.persist(country);
    }

    public void del(T country){
        entityManager.remove(country);
    }

    public void clearAll(){
        Metamodel metadata = entityManager.getMetamodel();
        EntityType t = metadata.entity(itemClass);
        entityManager.createQuery("delete from "+t.getName()).executeUpdate();
    }
}