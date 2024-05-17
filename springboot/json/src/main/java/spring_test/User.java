package spring_test;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;

    private String name;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Map<String, Object> extraProps = new HashMap<>();

    @JsonAnyGetter
    public Map<String, Object> getExtraProps() {
        return extraProps;
    }

    @JsonAnySetter
    public void setExtraProps(String name, Object value) {
        this.extraProps.put(name, value);
    }
}
