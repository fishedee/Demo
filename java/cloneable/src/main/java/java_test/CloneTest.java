package java_test;

import com.fasterxml.jackson.databind.ObjectMapper;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

@Component
@Slf4j
public class CloneTest {

    public Country createCountry(){
        Country country = new Country();
        country.setId(1001L);
        country.setName("fish");

        People people1 = new People();
        people1.setId(201L);
        people1.setName("p1");

        People people2 = new People();
        people2.setId(202L);
        people2.setName("p2");

        List<People> peopleList = new ArrayList<>();
        peopleList.add(people1);
        peopleList.add(people2);
        country.setPeopleList(peopleList);
        return country;
    }

    public void testClone(Function<Country,Country> handler){
        Country country = createCountry();
        log.info("{}",country);

        Country country2 = handler.apply(country);
        country2.setName("cat");
        country2.getPeopleList().get(0).setName("p3");

        People people3 = new People();
        people3.setId(203L);
        people3.setName("p3");
        country2.getPeopleList().add(people3);

        log.info("old {}",country);
        log.info("new {}",country2);
    }

    @Autowired
    private ObjectMapper objectMapper;

    @SneakyThrows
    public <T> T deepCloneByJackJson(T input){
        byte[] arrayBytes = objectMapper.writeValueAsBytes(input);
        return (T)objectMapper.readValue(arrayBytes,input.getClass());
    }

    @SneakyThrows
    public <T extends Serializable> T deepClone(T input){
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(input);
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        ObjectInputStream iis = new ObjectInputStream(bais);
        return (T)iis.readObject();
    }

    public void go(){
        log.info("none clone");
        testClone(ref->ref);

        //Cloneable是浅拷贝实现
        log.info("shallow clone");
        testClone(ref->ref.clone());

        //Serializable是深拷贝实现
        log.info("deep clone");
        testClone(ref->deepClone(ref));

        //Jackson复制是深拷贝实现
        log.info("deep clone by jackjson");
        testClone(ref->deepCloneByJackJson(ref));
    }
}
