package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Country;
import spring_test.query.CountryCount;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/25.
 */
@Component
public class CountryRepository extends CurdRepository<Country,Long>{
    @PersistenceContext
    private EntityManager entityManager;

    public List<Country> findByIds(List<Long> ids) {
        return entityManager.createNamedQuery("findByIds",Country.class)
                .setParameter("ids",ids)
                .getResultList();
    }

    public List<CountryCount> countByName(String name){
        return entityManager.createNamedQuery("countByName")
                .setParameter("name",name)
                .getResultList();
    }
}
