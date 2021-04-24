package spring_test.infrastructure;

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

    /*
    //错误写法,不能将properties传入进去
    public T findForReadOnly(U id){
        Map<String,Object> properities = new HashMap<String,Object>();
        properities.put(QueryHints.READ_ONLY,true);
        return (T)entityManager.find(itemClass,id,properities);
    }
    */

    /*
    //错误写法,不能将setProperty,然后find进去
    public T findForReadOnly(U id){
        entityManager.setProperty(org.hibernate.jpa.QueryHints.HINT_READONLY,true);
        return (T)entityManager.find(itemClass,id);
    }
    */

    public T findForLock(U id){
        //PESSIMISTIC_WRITE为for update悲观锁
        //PESSIMISTIC_READ为for share悲观锁
        //OPTIMISTIC_FORCE_INCREMENT为执行find后,使用乐观锁自动递增version字段
        //PESSIMISTIC_FORCE_INCREMENT为执行find后,使用悲观锁自动递增version字段
        return (T)entityManager.find(itemClass,id,LockModeType.PESSIMISTIC_WRITE);
    }

    public T findForReadOnly(U id){
        //CriteriaBuilder的设置readOnly

        System.out.println("findByReadOnly");

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<T> criteria = cb.createQuery(itemClass);
        Root<T> root = criteria.from(itemClass);
        criteria.select(root).where(
                cb.equal(root.get("id"),id)
        );

        TypedQuery<T> query =  entityManager.createQuery(criteria).setHint(QueryHints.READ_ONLY,true);
        return query.getSingleResult();
    }

    public T findForReadOnly2(U id){
        //createQuery的设置readOnly

        System.out.println("findByReadOnly2");

        Metamodel metadata = entityManager.getMetamodel();
        EntityType t = metadata.entity(itemClass);
        return (T)entityManager.createQuery("select i from "+t.getName()+" i where i.id = :id")
                .setParameter("id",id)
                .setHint(org.hibernate.jpa.QueryHints.HINT_READONLY,true)
                .getSingleResult();
    }


    public T findForReadOnly3(U id){
        //find的方法,传递hint比较麻烦
        //https://docs.jboss.org/hibernate/stable/entitymanager/reference/en/html/objectstate.html#d0e1215

        System.out.println("findByReadOnly3");

        /*
        //这样设置无论如何都不行,不知道为什么
        HashMap<String,Object> properties = new HashMap<>();
        properties.put("org.hibernate.readOnly",Boolean.valueOf(true));
        T result = (T)entityManager.find(itemClass,id, LockModeType.NONE,properties);
        */

        //拉到数据以后进行detach,有短暂的内存上升,没有readOnly好用
        T result = (T)entityManager.find(itemClass,id);
        entityManager.detach(result);
        return result;
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
