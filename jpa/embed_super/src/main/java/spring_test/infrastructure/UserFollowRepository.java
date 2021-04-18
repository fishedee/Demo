package spring_test.infrastructure;

import org.springframework.stereotype.Component;
import spring_test.business.UserFollow;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by fish on 2021/4/18.
 */
@Component
public class UserFollowRepository extends CurdRepository<UserFollow,UserFollow.Id> {

    @PersistenceContext
    private EntityManager entityManager;

    public List<UserFollow> findByUserId(Long userId){
        return entityManager.createQuery("select f from UserFollow f where f.id.userId = :userId")
                .setParameter("userId",userId)
                .getResultList();
    }
}
