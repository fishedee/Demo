package spring_test.config;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

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

        private String message;

        private Object data;


        public ResponseResult(int code,String message,Object data){
            this.code = code;
            this.message = message;
            this.data = data;
            this.statusCode = HttpStatus.OK;
        }
    }

    @Autowired
    private  ObjectMapper objectMapper;
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        ResponseResult result = null;

        //处理body的不同类型
        if (body == null) {
            result = new ResponseResult(0,"",null);
        } else if( body instanceof  String){
            //FIXME https://blog.csdn.net/weixin_33961829/article/details/92143322
            //字符串类型要特别改造,返回值也必须是字符串类型
            result = new ResponseResult(0,"",(String)body);
            try {
                String strResult = objectMapper.writeValueAsString(result);
                return strResult;
            }catch(JsonProcessingException e){
                throw  new RuntimeException(e);
            }
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