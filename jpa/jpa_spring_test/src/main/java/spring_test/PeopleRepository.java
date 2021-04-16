package spring_test;


import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/12.
 */
@Component
public class PeopleRepository{

    @PersistenceContext
    private EntityManager entityManager;

    public List<People> getAll(){
        return entityManager.createQuery("select c from People c",People.class).getResultList();
    }

    public People find(Long id){
        return entityManager.find(People.class,id);
    }

    public void add(People people){
        entityManager.persist(people);
    }

    public void del(People people){
        entityManager.remove(people);
    }
}
