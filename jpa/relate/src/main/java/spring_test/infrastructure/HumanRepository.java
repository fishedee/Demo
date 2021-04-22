package spring_test.infrastructure;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import spring_test.business.Human;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/22.
 */
@Component
public class HumanRepository extends CurdRepository<Human,Long>{
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public List<Human> getAll(){

        List<Human> humen = super.getAll();

        //强行初始化humen里面的Object,因为设置为Eager是无效的
        for( Human human :humen){
            Hibernate.initialize(human.getMan());
        }
        return humen;
    }
}
