package spring_test;

import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/16.
 */
@Component
public class CountryPeopleRepository  {
    @PersistenceContext
    private EntityManager entityManager;

    public List<CountryPeopleDTO> getAll(){
        return entityManager.createQuery("select c from CountryPeopleDTO c where c.id in(1,2)",CountryPeopleDTO.class).getResultList();
    }
}
