package spring_test.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by fish on 2021/4/19.
 */
@Entity
@ToString
@Getter
public class Good2 {

    public interface RemainService {
        Remain2 find(Long id);
        void add(Remain2 country);
    }
    @Entity
    @Getter
    @ToString
    @Table(name="remain2")
    public static class Remain2 {

        private static Long idGenerator = 10001L;

        //实体,必须带有id
        @Id
        private Long id;

        private Long goodId;

        private int count;

        private byte hasData;

        protected Remain2(){

        }

        private void refreshHasData(){
            if( this.count > 0 ){
                this.hasData = 1;
            }else{
                this.hasData = 0;
            }
        }
        public Remain2(Long goodId,int count){
            idGenerator++;
            this.id = idGenerator;
            this.goodId = goodId;
            this.count = count;
            this.refreshHasData();
        }

        public void incCount(int inc){
            this.count = this.count +inc;
            this.refreshHasData();
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //将itemsMap看成是非组合关系，但是add与remove由Good自己来全权操控
    //因为@Where条件中不存在的数据，不等于要删除的数据，所以不能使用cascade，也不能使用orphalRemove
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name="goodId")
    @Fetch(FetchMode.SELECT)
    @MapKeyColumn(name="id")
    @Where(clause = "has_data = 1")
    private Map<Long,Remain2> itemsList = new HashMap<>();

    @Transient
    private  RemainService remainService;

    public Good2(){

    }

    public void setRemainService(RemainService remainService){
        this.remainService = remainService;
    }

    public Long addRemain(int count){
        Remain2 remain = new Remain2(this.id,count);
        this.remainService.add(remain);
        this.itemsList.put(remain.getId(),remain);
        return remain.getId();
    }

    public void incRemain(Long remainId, int incCount){
        //首先从本地拿去
        Remain2 remain = null;
        remain = this.itemsList.get(remainId);
        if( remain == null ){
            //拿不到就向sql拿
            remain = this.remainService.find(remainId);
            this.itemsList.put(remainId,remain);
        }
        remain.incCount(incCount);
    }

}

