package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.Car;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/24.
 */
@Component
public class CarRepository extends CurdRepository<Car,Long>{
    @PersistenceContext
    private EntityManager entityManager;

    public List<Car> findBySql(String sql){
        return entityManager.createQuery(sql).getResultList();
    }
}
