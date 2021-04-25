package spring_test.infrastructure;

import org.hibernate.annotations.QueryHints;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Component;
import spring_test.business.SalesOrder;
import spring_test.business.SalesOrderWhere;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.*;

/**
 * Created by fish on 2021/4/24.
 */
@Component
public class SalesOrderRepository extends CurdRepository<SalesOrder,Long> {
    @PersistenceContext
    private EntityManager entityManager;

    public SalesOrderRepository() {
    }

    //JPQL查询
    public List<SalesOrder> search(SalesOrderWhere where){
        String sql = "select c from SalesOrder c where";

        ArrayList<String> whereSql = new ArrayList<>();
        HashMap<String,Object> argsSql = new HashMap<>();
        if(where.getBeginTime() != null ){
            whereSql.add(" c.createTime > :beginDate");
            argsSql.put("beginDate",where.getBeginTime());
        }

        if(where.getEndTime() != null ){
            whereSql.add(" c.createTime < :endDate");
            argsSql.put("endDate",where.getEndTime());
        }

        if(where.getSalesOrderIds() != null && where.getSalesOrderIds().size() != 0){
            whereSql.add(" c.id in (:ids)");
            argsSql.put("ids",where.getSalesOrderIds());
        }

        if(where.getName() != null){
            whereSql.add(" c.name like :nameLike");
            argsSql.put("nameLike","%"+where.getName()+"%");
        }

        Query query =  entityManager.createQuery(sql+String.join(" and ",whereSql));

        for( Map.Entry<String,Object> entry : argsSql.entrySet()){
            query.setParameter(entry.getKey(),entry.getValue());
        }

        return (List<SalesOrder>)query.getResultList();
    }

    //CriteriaBuilder查询
    public List<SalesOrder> search2(SalesOrderWhere where) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<SalesOrder> criteria = cb.createQuery(SalesOrder.class);
        Root<SalesOrder> item = criteria.from(SalesOrder.class);
        List<Predicate> predicates = new ArrayList<>();

        if(where.getBeginTime() != null ){
            predicates.add(
                    cb.greaterThanOrEqualTo(
                            item.get("createTime"),
                            where.getBeginTime()
                    )
            );
        }

        if(where.getEndTime() != null ){
            predicates.add(
                    cb.lessThanOrEqualTo(
                            item.get("createTime"),
                            where.getEndTime()
                    )
            );
        }

        if( where.getSalesOrderIds() != null ){
            predicates.add(
                    cb.in(
                            item.get("id")).value(where.getSalesOrderIds()
                    )
            );
        }

        if(where.getName() != null){
            predicates.add(
                    cb.like(
                            item.get("name"),
                            "%"+where.getName()+"%"
                    )
            );
        }

        criteria.select(item).where(predicates.toArray(new Predicate[]{}));

        return entityManager.createQuery(criteria).getResultList();
    }

    public List<SalesOrder> serachByName(String name){
        //即使使用nativeQuery,依然会拉嵌套的item的数据
        //不加binary的话,会有其他的出来
        Query query = entityManager.createNativeQuery("select * from sales_order where name like binary :name",SalesOrder.class);
        query.setParameter("name","%"+name+"%");

        return query.getResultList();
    }

    //分页
    public List<SalesOrder> getAll(int pageIndex, int pageSize ){
        Query query = entityManager.createQuery("select c from SalesOrder c");
        query.setFirstResult(pageIndex);
        query.setMaxResults(pageSize);

        return query.getResultList();
    }
}
