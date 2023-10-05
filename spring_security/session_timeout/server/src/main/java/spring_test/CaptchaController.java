package spring_test;

/**
 * Created by fish on 2021/6/3.
 */

import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class CaptchaController {

    @ResponseBody
    @RequestMapping("/captcha")
    public String captcha(HttpServletRequest request, HttpServletResponse response) throws Exception {
        SpecCaptcha specCaptcha = new SpecCaptcha(130, 48, 5);
        specCaptcha.setCharType(Captcha.TYPE_NUM_AND_UPPER);
        String verCode = specCaptcha.text().toLowerCase();
        //将结果写入到session中
        request.getSession().setAttribute("captcha",verCode);
        return specCaptcha.toBase64();
    }
}
