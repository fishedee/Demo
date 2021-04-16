package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.query.CountryVO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/16.
 */
@Component
public class CountryVORepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<CountryVO> getAll(){
        return entityManager.createQuery("select c from CountryVO c where c.id in(1,2)",CountryVO.class).getResultList();
    }
}
