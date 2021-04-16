package spring_test;

import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/16.
 */
@Component
public class ContactRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Contact> getAll(){
        return entityManager.createQuery("select c from Contact c",Contact.class).getResultList();
    }

    public Contact find(Long id){
        return entityManager.find(Contact.class,id);
    }

    public void add(Contact country){
        entityManager.persist(country);
    }

    public void del(Contact country){
        entityManager.remove(country);
    }
}
