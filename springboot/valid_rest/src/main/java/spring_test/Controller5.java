package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/mountain")
@Slf4j
public class Controller5 {

    @PostMapping("/go1")
    public Order3DO go1(@RequestBody  @Valid Order3DO order3DO){
        log.info("orderDO {}",order3DO);
        return order3DO;
    }

    @PostMapping("/go2")
    public Order4DO go2(@RequestBody  @Valid Order4DO orderDO){
        log.info("orderDO {}",orderDO);
        return orderDO;
    }
}
