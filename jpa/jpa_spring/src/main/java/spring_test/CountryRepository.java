package spring_test;


import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/12.
 */
@Component
public class CountryRepository{

    //在无事务的情况下,每次find,query,persist等操作对应的entityManager都是全新的
    //在有事务的情况下,每次find,query,persist等操作对应的是同一个entityManager
    @PersistenceContext
    private EntityManager entityManager;

    public List<Country> getAll(){
        return entityManager.createQuery("select c from Country c",Country.class).getResultList();
    }

    public Country find(Long id){
        return entityManager.find(Country.class,id);
    }

    public void add(Country country){
        entityManager.persist(country);
    }

    public void del(Country country){
        entityManager.remove(country);
    }
}
