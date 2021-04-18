package spring_test.business;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by fish on 2021/4/18.
 */
@Entity
@ToString
@Getter
public class UserFollow {
    //使用复合主键的时候,必须要重写equals和hashCode代码,否则会有问题
    @Embeddable
    @ToString
    @EqualsAndHashCode
    @Getter
    public static class Id implements Serializable{
        private Long userId;

        private Long followUserId;

        protected Id(){

        }
        public Id(Long userId,Long followUserId){
            this.userId = userId;
            this.followUserId = followUserId;
        }
    }

    @EmbeddedId
    private Id id;

    protected  UserFollow(){

    }

    public UserFollow(Long userId,Long followUserId){
        this.id = new Id(userId,followUserId);
    }
}
