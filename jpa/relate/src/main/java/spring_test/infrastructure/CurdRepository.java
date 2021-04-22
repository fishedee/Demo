package spring_test.infrastructure;

import org.hibernate.boot.Metadata;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

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
