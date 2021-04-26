package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Range;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 * Created by fish on 2021/4/25.
 */
//Validated只能放在Controller校验,放在Service方法上没有意义的
@RestController
@Slf4j
@Validated
@RequestMapping("/dog")
public class Controller3 {
    @GetMapping(value = "/go1")
    public void go1(
            @Range(min = 1, max = 9, message = "年级只能从1-9")   //第2步
            @RequestParam(name = "grade", required = true) int grade, //

            @Min(value = 1, message = "班级最小只能1") @Max(value = 99, message = "班级最大只能99")  //第2步
            @RequestParam(name = "classroom", required = true) int classroom) { //

        System.out.println(grade + "," + classroom);
    }
}
