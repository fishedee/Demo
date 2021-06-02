package spring_test.framework;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

//返回的Body进行自动化封装,指定为spring_test下所有的controller
@RestControllerAdvice(basePackages = "spring_test")
@Slf4j
public class MyResponseBodyAdvice implements ResponseBodyAdvice {
    @Data
    @AllArgsConstructor
    public static class ResponseResult{
        @JsonIgnore
        private HttpStatus statusCode;

        private int code;

        private String msg;

        private Object data;

        private String csrfToken;

        private void init(HttpStatus httpStatus,int code,String message,Object data){
            this.code = code;
            this.msg = message;
            this.data = data;
            this.statusCode = httpStatus;

            RequestAttributes requestAttributes =  RequestContextHolder.currentRequestAttributes();
            HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();
            Enumeration<String> days = request.getAttributeNames();
            while( days.hasMoreElements()){
                log.info("attributes {}",days.nextElement());
            }

            CsrfToken token = (CsrfToken)request.getAttribute("org.springframework.security.web.csrf.CsrfToken");
            if( token != null ){
                this.csrfToken = token.getToken();
            }
        }

        public ResponseResult(int code,String message,Object data){

            init(HttpStatus.OK,code,message,data);
            //throw new RuntimeException("123");
        }

        public ResponseResult(HttpStatus httpStatus,int code,String message,Object data){
            init(httpStatus,code,message,data);
        }
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        ResponseResult result = null;

        //处理body的不同类型
        if (body == null) {
            result = new ResponseResult(0,"",null);
        }else if ( body instanceof ResponseResult ) {
            result = (ResponseResult)body;
        }else{
            result = new ResponseResult(0,"",body);
        }

        //输出
        if( result.getStatusCode().isError() ){
            response.setStatusCode(result.getStatusCode());
        }
        return result;
    }

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }
}