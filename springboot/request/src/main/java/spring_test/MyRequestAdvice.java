package spring_test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.std.StdArraySerializers;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.hibernate.validator.HibernateValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.core.MethodParameter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.*;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.validation.beanvalidation.SpringConstraintValidatorFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.annotation.PostConstruct;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.lang.annotation.Native;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.*;

//参考这里
//https://blog.csdn.net/WoddenFish/article/details/82593317
/**
 * Created by fish on 2021/4/29.
 */
@Component
@Slf4j
public class MyRequestAdvice implements HandlerMethodArgumentResolver {

    final static String JSONBODY_ATTRIBUTE = "com.fishedee.jsonbody";

    @Autowired
    private ObjectMapper objectMapper;
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        if( hasRequestParamAnnotation(parameter) ||
                isServletRequest(parameter) ){
            return false;
        }
        return true;
    }

    private boolean isServletRequest(MethodParameter parameter){
        return parameter.getParameterType() == HttpServletRequest.class ||
                parameter.getParameterType() == ServletRequest.class ||
                parameter.getParameterType() == HttpServletResponse.class;
    }
    private boolean hasRequestParamAnnotation(MethodParameter parameter){
        return parameter.hasParameterAnnotation(RequestParam.class) == true;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        final String jsonString = this.getRequestBody(webRequest);
        Type genericParameterType = parameter.getGenericParameterType();
        Class valueType = this.getParameterType(parameter);
        boolean isBasicValueType = this.basicTypeSet.contains(valueType);
        if( jsonString.isEmpty() ){
            //空的情况下直接返回
            if( isBasicValueType == false){
                if( valueType == List.class ){
                    //List类型
                    return null;
                }else{
                    Object result = parameter.getConstructor().newInstance();
                    this.check(result);
                    return result;
                }
            }else{
                return null;
            }

        }
        if( isBasicValueType ){
            //基础类型
            String key = alwaysGetParameterKey(parameter);
            return this.getFromKeyBasicType(jsonString,key,valueType);
        }else{
            //复合类型
            if( collectionTypeSet.contains(valueType)){
                //集合类型
                String key = alwaysGetParameterKey(parameter);
                return this.getFromKey(jsonString,key,genericParameterType);
            }else{
                //非集合类型
                String key = getAnnotationKey(parameter);
                if( Strings.isNotBlank(key)){
                    return this.getFromKey(jsonString,key,genericParameterType);
                }else{
                    return this.getFromWhole(jsonString,genericParameterType);
                }
            }
        }
    }

    @Autowired
    private LocalValidatorFactoryBean localValidatorFactoryBean;

    public void check(Object target){
        Set<ConstraintViolation<Object>> validateSet = localValidatorFactoryBean.validate(target);
        if (!CollectionUtils.isEmpty(validateSet)) {
            Iterator<ConstraintViolation<Object>> iterator = validateSet.iterator();
            List<String> msgList = new ArrayList<>();
            while (iterator.hasNext()) {
                ConstraintViolation<?> cvl = iterator.next();
                msgList.add(cvl.getPropertyPath()+":"+cvl.getMessage());
            }
            throw new RuntimeException(msgList.toString());

        }
    }

    private Object getFromWhole(String jsonString,Type valueType){
        try {
            Object result = objectMapper.readValue(jsonString, objectMapper.getTypeFactory().constructType(valueType));
            this.check(result);
            return result;
        }catch(IOException e){
            throw new RuntimeException("格式错误:"+e.getMessage());
        }
    }

    private Object getFromKey(String jsonString,String key,Type valueType){
        try {
            JsonNode root = objectMapper.readTree(jsonString);
            Iterator<Map.Entry<String, JsonNode>> elements = root.fields();
            while (elements.hasNext()) {
                Map.Entry<String, JsonNode> node = elements.next();
                String nodeKey = node.getKey();
                if (nodeKey.equals(key)) {
                    Object result = objectMapper.readValue(node.getValue().toString(), objectMapper.getTypeFactory().constructType(valueType));
                    this.check(result);
                    return result;
                }
            }
            return null;
        }catch(IOException e){
            throw new RuntimeException("格式错误:"+e.getMessage());
        }
    }

    private Object getFromKeyBasicType(String jsonString,String key,Class valueType){
        try {
            JsonNode root = objectMapper.readTree(jsonString);
            Iterator<Map.Entry<String, JsonNode>> elements = root.fields();
            while (elements.hasNext()) {
                Map.Entry<String, JsonNode> node = elements.next();
                String nodeKey = node.getKey();
                if (nodeKey.equals(key)) {
                    Object result = readBasicType(valueType, node.getValue());
                    this.check(result);
                    return result;
                }
            }
            return null;
        }catch(IOException e){
            throw new RuntimeException("格式错误:"+e.getMessage());
        }
    }

    private Object readBasicType(Class clazz, JsonNode node){
        if( clazz.equals(String.class)){
            return node.asText();
        }else if (clazz.equals(Integer.class)){
            return node.asInt();
        }else if( clazz.equals(Long.class)){
            return node.asLong();
        }else if ( clazz.equals(Short.class)){
            return (short)node.asInt();
        }else if ( clazz.equals(Float.class)){
            return (float)node.asDouble();
        }else if( clazz.equals(Double.class)){
            return node.asDouble();
        }else if( clazz.equals(Boolean.class)){
            return node.asBoolean();
        }else if( clazz.equals(BigDecimal.class)){
            return node.decimalValue();
        }else{
            return null;
        }
    }

    private Set<Class> basicTypeSet= new HashSet<>();

    private Set<Class> collectionTypeSet = new HashSet<>();

    private String getAnnotationKey(MethodParameter parameter){
        RequestJson parameterAnnotation = parameter.getParameterAnnotation(RequestJson.class);
        return parameterAnnotation != null? parameterAnnotation.value():"";
    }

    private String alwaysGetParameterKey(MethodParameter parameter){
        RequestJson parameterAnnotation = parameter.getParameterAnnotation(RequestJson.class);
        String key = parameterAnnotation != null? parameterAnnotation.value():"";
        if(!StringUtils.isEmpty(key) ){
            return key;
        }

        return parameter.getParameterName();
    }

    @PostConstruct
    private void init(){
        basicTypeSet.add(BigDecimal.class);
        basicTypeSet.add(String.class);
        basicTypeSet.add(Integer.class);
        basicTypeSet.add(Long.class);
        basicTypeSet.add(Short.class);
        basicTypeSet.add(Float.class);
        basicTypeSet.add(Double.class);
        basicTypeSet.add(Boolean.class);

        collectionTypeSet.add(List.class);
        collectionTypeSet.add(LinkedList.class);
        collectionTypeSet.add(ArrayList.class);
        collectionTypeSet.add(Collection.class);
        collectionTypeSet.add(Set.class);
        collectionTypeSet.add(HashSet.class);
        collectionTypeSet.add(TreeSet.class);
        collectionTypeSet.add(Map.class);
        collectionTypeSet.add(HashMap.class);
        collectionTypeSet.add(TreeMap.class);
    }

    @SuppressWarnings("rawtypes")
    private Class getParameterType(MethodParameter parameter) {
        Class t = parameter.getParameterType();
        return t;
    }

    private String getRealRequestJson(NativeWebRequest webRequest){
        HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        if( servletRequest.getMethod().toLowerCase().equals("get")){
            //get请求固定从data字段获取
            String json = servletRequest.getParameter("data");
            return json == null?"":json;
        }else {
            //post请求固定从body获取
            String contentType = servletRequest.getContentType();
            if (contentType != null&&
                    contentType.contains("application/x-www-form-urlencoded") == true) {
                return "";
            }
            try {
                BufferedReader input = servletRequest.getReader();
                StringBuilder stringBuilder = new StringBuilder();
                char[] b = new char[4096];
                for (int n = 0; (n = input.read(b)) != -1; ) {
                    stringBuilder.append(b);
                }
                return stringBuilder.toString();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
    private String getRequestBody(NativeWebRequest webRequest) {
        String jsonBody = (String) webRequest.getAttribute(JSONBODY_ATTRIBUTE, NativeWebRequest.SCOPE_REQUEST);
        if (jsonBody == null) {
            jsonBody = getRealRequestJson(webRequest);
            webRequest.setAttribute(JSONBODY_ATTRIBUTE, jsonBody, NativeWebRequest.SCOPE_REQUEST);
        }
        return jsonBody;
    }
}