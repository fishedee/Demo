package spring_test;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringWriter;
import java.util.*;

/**
 * Created by fish on 2021/4/25.
 */
//@Controller+@ResponseBody，相当于@RestController
@Controller
@ResponseBody
@RequestMapping("/hello")
@Slf4j
public class MyController {

    @Autowired
    private TestService testService;

    @GetMapping("/go")
    public void go(){
        testService.go();
    }

    @GetMapping("/get1")
    public String get1(){
        return "Hello World";
    }

    @GetMapping("/get2")
    public String get2(){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        String target = "";
        target += request.getMethod()+"<br/>";
        target += this.getQueryParam(request)+"<br/>";
        target += this.getHeader(request)+"<br/>";
        return target;
    }

    //同时获取query与body里面的参数
    public String getQueryAndBodyParam(HttpServletRequest request){
        List<String> paramList = new ArrayList<>();

        Map<String,String[]> parameterMap = request.getParameterMap();
        for( String key :parameterMap.keySet() ){
            paramList.add(key+"："+Arrays.asList(parameterMap.get(key))+"<br/>");
        }
        return paramList.toString();
    }

    //只获取query里面的参数，这里用UriComponentsBuilder来反向解析url
    public String getQueryParam(HttpServletRequest request){
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(request.getRequestURI()+"?"+request.getQueryString());
        UriComponents components = builder.build();
        MultiValueMap<String,String> queryParam = components.getQueryParams();
        List<String> paramList = new ArrayList<>();
        for( String key : queryParam.keySet()){
            paramList.add(key+"："+queryParam.get(key)+"<br/>");
        }
        return paramList.toString();
    }

    //获取header
    public String getHeader(HttpServletRequest request){
        List<String> nameList = new ArrayList<String>();
        Enumeration<String> enumeration = request.getHeaderNames();
        while( enumeration.hasMoreElements() ){
            String key = enumeration.nextElement();
            nameList.add(key+"："+request.getHeader(key)+"<br/>");
        }
        return nameList.toString();
    }

    //获取body
    public String getBody(HttpServletRequest request)throws IOException{
        StringWriter writer = null;
        try {
            writer = new StringWriter();
            BufferedReader reader = request.getReader();
            String s = null;
            while (true) {
                s = reader.readLine();
                if (s == null) {
                    break;
                }
                writer.append(s);
            }
            return writer.toString();
        }catch(IOException e){
            throw new RuntimeException(e);
        }finally {
            if( writer != null ){
                writer.close();
            }
        }
    }

    @PostMapping("/post1")
    public String post1() throws IOException {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String target = "";
        target += request.getMethod()+"<br/>";
        target += this.getQueryParam(request)+"<br/>";
        target += this.getHeader(request)+"<br/>";
        target += this.getBody(request)+"<br/>";
        return target;
    }

}
