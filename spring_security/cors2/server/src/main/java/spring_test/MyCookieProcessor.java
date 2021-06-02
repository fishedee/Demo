package spring_test;

import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.apache.tomcat.util.http.SameSiteCookies;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.FieldPosition;
import java.util.Date;

/**
 * Created by fish on 2021/6/2.
 */
public class MyCookieProcessor extends Rfc6265CookieProcessor {
    public String generateHeader(javax.servlet.http.Cookie cookie, HttpServletRequest request) {
        cookie.setDomain("test.com");
        return super.generateHeader(cookie,request);
    }
}
