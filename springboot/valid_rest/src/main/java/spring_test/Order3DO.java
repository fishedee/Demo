package spring_test;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class Order3DO {

    @Data
    @Slf4j
    public static class Item{
        @Min(1)
        private int id;

        //JsonIgnore是禁止Json读写该字段
        @JsonIgnore
        //如果NotBlank，Validator就会采用Field直接读取的校验方式，不经过Get方法
        //@NotBlank
        private String name;

        //JackJson总是使用setter方法来将字段写进去的
        public void setId(int id){
            log.info("set Id",id);
            this.id = id;
        }

        @NotBlank
        public String getName(){
            log.info("getName {}",this.name);
            if( this.name == null ){
                this.name = "XXXX"+this.id+"XXXX";
            }
            return this.name;
        }
    }

    @Min(0)
    private int size;

    @NotEmpty
    @Valid
    private List<Item> items;
}
