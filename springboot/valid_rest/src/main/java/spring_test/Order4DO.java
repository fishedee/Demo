package spring_test;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class Order4DO {

    @Data
    @Slf4j
    public static class Item{
        @Min(1)
        private int id;

        //JsonProperty可以将该字段设置为只读
        @JsonProperty(access= JsonProperty.Access.READ_ONLY)
        @NotBlank
        private String name;
    }

    @Min(0)
    private int size;

    private List<Item> items;

    @NotEmpty
    @Valid
    public List<Item> getItems(){
        for( Item item : this.items ){
            if( item.getName() == null ){
                item.setName("UU"+item.getId()+"KK");
            }
        }
        return this.items;
    }
}
