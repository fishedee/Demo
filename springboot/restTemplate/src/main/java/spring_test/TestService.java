package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class TestService {
    @Autowired
    private RestTemplate restTemplate;

    public void getResponseBody(){
        ResponseEntity<byte[]> result = restTemplate.getForEntity("http://localhost:8585/hello/get1",byte[].class);
        log.info("byte[] length {}",new String(result.getBody()));

        ResponseEntity<String> result2 = restTemplate.getForEntity("http://localhost:8585/hello/get1",String.class);
        log.info("string length {}",result2.getBody());
    }

    public void getResponseHeader(){
        //getForXXXX，只能发送get请求
        ResponseEntity<String> result = restTemplate.getForEntity("http://localhost:8585/hello/get2",String.class);

        log.info("status code {}",result.getStatusCode());
        log.info("header {}",result.getHeaders());
    }

    public void requestParam(){

        HttpHeaders headers = new HttpHeaders();
        headers.set("MyHeader", "MyHeaderValue");

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("http://localhost:8585/hello/get2")
                .queryParam("name", "fish")
                .queryParam("age",123);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        //exchange发送任意方法请求
        ResponseEntity<String> result = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET,entity,String.class);

        log.info("status code {}",result.getStatusCode());
        log.info("header {}",result.getHeaders());
        log.info("body {}",result.getBody());
    }

    public void requestFormBody(){
        //entity传递body与header信息
        HttpHeaders headers = new HttpHeaders();
        headers.set("MyHeader2", "MyHeaderValue2");

        //输入body类型为String的时候，默认的contentType为text/plain
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        //手动序列化uri-query参数
        UriComponentsBuilder bodyBuilder = UriComponentsBuilder
                .fromUriString("")
                .queryParam("height", "300 px")
                .queryParam("width","200px");

        HttpEntity<?> entity = new HttpEntity<>(bodyBuilder.build().encode().getQuery(),headers);

        //url传入query信息
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("http://localhost:8585/hello/post1")
                .queryParam("name", "fish")
                .queryParam("age",123);

        //exchange发送任意方法请求
        ResponseEntity<String> result = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.POST,entity,String.class);

        log.info("status code {}",result.getStatusCode());
        log.info("header {}",result.getHeaders());
        log.info("body {}",result.getBody());
    }

    public void requestJsonBody(){
        //entity传递body与header信息
        HttpHeaders headers = new HttpHeaders();
        headers.set("MyHeader3", "MyHeaderValue3");

        Map<String,Object> postBody = new HashMap<>();
        postBody.put("height","300px");
        postBody.put("width","200px");

        HttpEntity<?> entity = new HttpEntity<>(postBody,headers);

        //url传入query信息
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("http://localhost:8585/hello/post1")
                .queryParam("name", "fish")
                .queryParam("age",123);

        //exchange发送任意方法请求
        ResponseEntity<String> result = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.POST,entity,String.class);

        log.info("status code {}",result.getStatusCode());
        log.info("header {}",result.getHeaders());
        log.info("body {}",result.getBody());
    }


    public void go(){
        getResponseHeader();
        getResponseBody();
        requestParam();
        requestFormBody();
        requestJsonBody();
    }
}
