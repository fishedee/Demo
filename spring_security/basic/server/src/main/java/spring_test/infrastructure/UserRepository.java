package spring_test.infrastructure;

import org.hibernate.annotations.QueryHints;
import org.springframework.stereotype.Component;
import spring_test.business.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/26.
 */
@Component
public class UserRepository extends CurdRepository<User,Long>{
    @PersistenceContext
    private EntityManager entityManager;

    public User getByNameForRead(String name){
        List<User> users = entityManager.createQuery("select u from User u where u.name = :name")
                .setParameter("name",name)
                .setHint(QueryHints.READ_ONLY,true).getResultList();
        if( users.size() == 0 ){
            return null;
        }
        return users.get(0);
    }
}
