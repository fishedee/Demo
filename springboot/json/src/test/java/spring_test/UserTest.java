package spring_test;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class UserTest {
    @Autowired
    private ObjectMapper objectMapper;
    @Test
    public void testDeserialize() throws Exception {
        String json = "{ \"id\": 1, \"name\": \"John Doe\", \"extraProp1\": \"value1\", \"extraProp2\": 42 }";

        User user = objectMapper.readValue(json, User.class);

        assertNotNull(user);
        assertEquals(1L, user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals(2, user.getExtraProps().size());
        assertEquals("value1", user.getExtraProps().get("extraProp1"));
        assertEquals(42, user.getExtraProps().get("extraProp2"));
    }

    @Test
    public void testSerialize() throws Exception {
        Map<String, Object> extraProps = new HashMap<>();
        extraProps.put("extraProp1", "value1");
        extraProps.put("extraProp2", 42);

        User user = new User(1L, "John Doe", extraProps);

        String json = objectMapper.writeValueAsString(user);

        assertNotNull(json);
        assertEquals("{\"id\":1,\"name\":\"John Doe\",\"extraProp2\":42,\"extraProp1\":\"value1\"}", json);
    }
}
