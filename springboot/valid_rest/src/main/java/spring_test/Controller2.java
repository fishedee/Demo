package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by fish on 2021/4/25.
 */
@RestController
@RequestMapping("/cat")
@Slf4j
public class Controller2 {

    //这个方法仍然需要手动查看错误,并打印后抛出
    @PostMapping("/go1")
    public void go1(@RequestBody @Valid  OrderDO orderDO, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            // 打印全部的错误信息
            for (ObjectError error : bindingResult.getAllErrors()) {
                System.out.println(error.getDefaultMessage());
            }
        }

        log.info("go1 {}",orderDO);
    }
}
