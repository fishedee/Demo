package spring_test;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import spring_test.business.Item;
import spring_test.business.ItemContactAliasDTO;
import spring_test.business.ItemDTO;
import spring_test.business.ItemUnitConvertDTO;
import spring_test.infrastructure.ItemRepository;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@FunctionalInterface
interface Handler< R> {
    R apply();
}

@Component
@Slf4j
public class BenchmarkTest {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    public List<Item> testJpa(){
        List<Item> itemList = itemRepository.getAll();
        return itemList;
    }

    public List<ItemDTO> testJdbc(){
        //查询
        List<ItemDTO> itemList = ItemDTO.getAll(jdbcTemplate);
        List<Long> itemIdList = itemList.stream().map(single->{
            return single.getId();
        }).collect(Collectors.toList());
        Map<Long,List<ItemContactAliasDTO>> aliasDTOS = ItemContactAliasDTO.getBatch(jdbcTemplate,itemIdList)
                .stream().collect(Collectors.groupingBy(single->single.getItemId(),Collectors.toList()));
        Map<Long,List<ItemUnitConvertDTO>> itemUnitConvertDTOS = ItemUnitConvertDTO.getBatch(jdbcTemplate,itemIdList)
            .stream().collect(Collectors.groupingBy(single->single.getItemId(),Collectors.toList()));

        //组合数据
        itemList.stream().forEach(single->{
            List<ItemContactAliasDTO> alias = aliasDTOS.get(single.getId());
            if( alias != null ){
                single.setAliases(alias);
            }
            List<ItemUnitConvertDTO> unitConverts = itemUnitConvertDTOS.get(single.getId());
            if( unitConverts != null){
                single.setUnitConverts(unitConverts);
            }
        });
        return itemList;
    }

    public void testSingle(String msg,Handler<List> handler)throws Exception{
        Date beginTime = new Date();
        List list = handler.apply();
        Date endTime = new Date();
        Long duration = endTime.getTime() - beginTime.getTime();

        String json = objectMapper.writeValueAsString(list);
        int dataLength = json.length();
        log.info("testCase {} duration:[{}ms] dataSize:[{}] dataLength:[{}]",msg,duration,list.size(),dataLength);
    }

    public void go()throws Exception{
        this.testSingle("jpa",this::testJpa);
        this.testSingle("jdbc",this::testJdbc);
    }
}
