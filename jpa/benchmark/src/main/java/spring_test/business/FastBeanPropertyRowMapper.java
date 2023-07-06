package spring_test.business;

import lombok.*;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;

import javax.el.MethodNotFoundException;
import java.lang.reflect.*;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class FastBeanPropertyRowMapper<T> implements RowMapper<T> {

    @FunctionalInterface
    interface Functional2<T1,T2,R> {
        R apply(T1 a,T2 b) throws SQLException;
    }

    @ToString
    @Getter
    enum BeanPropertyType{
        BOOLEAN(ResultSet::getBoolean),
        BYTE(ResultSet::getByte),
        SHORT(ResultSet::getShort),
        INTEGER(ResultSet::getInt),
        LONG(ResultSet::getLong),
        STRING(ResultSet::getString),
        FLOAT(ResultSet::getFloat),
        DOUBLE(ResultSet::getDouble),
        TIMESTAMP(ResultSet::getTimestamp),
        BIG_DECIMAL(ResultSet::getBigDecimal);

        private Functional2<ResultSet,String,Object> handler;

        BeanPropertyType(Functional2<ResultSet,String,Object> handler){
            this.handler = handler;
        }

        static BeanPropertyType getType(Type ft){
            if( ft == boolean.class ||
                ft == Boolean.class ){
                return BOOLEAN;
            }else if( ft == byte.class ||
                    ft == Byte.class ){
                return BYTE;
            }else if( ft == int.class ||
                    ft == Integer.class ){
                return BeanPropertyType.INTEGER;
            }else if( ft == long.class ||
                ft == Long.class ) {
                return LONG;
            }else if( ft == String.class){
                return STRING;
            }else if( ft == float.class ||
                ft == Float.class){
                return FLOAT;
            }else if( ft == double.class ||
                ft == Double.class){
                return DOUBLE;
            }else if( ft== Date.class){
                return TIMESTAMP;
            }else if( ft == BigDecimal.class ){
                return BIG_DECIMAL;
            }else{
                throw new RuntimeException("unknown type "+ft);
            }
        }
    }

    @ToString
    @Getter
    public static class BeanPropertyInfo{
        private Method setMethod;

        private String columnName;

        private String fieldName;

        private BeanPropertyType beanProperty;

        public BeanPropertyInfo(Class clazz,Field field){
            this.fieldName = field.getName();
            this.beanProperty = BeanPropertyType.getType(field.getType());
            this.columnName = this.getColumnName(field.getName());
            this.setMethod = this.findMethod(clazz,field);
        }

        private char toLower(char c){
            if( c >= 'A' && c <= 'Z'){
                return (char)(c - 'A'+'a');
            }else{
                return c;
            }
        }
        private String getColumnName(String name){
            StringBuilder builder = new StringBuilder();
            for( int i = 0 ;i != name.length();i++){
                char c = name.charAt(i);
                if( i == 0 ){
                    //首字符
                    builder.append(this.toLower(c));
                }else{
                    //非首字符
                    if( c >= 'A' && c <= 'Z'){
                        builder.append('_');
                        builder.append(this.toLower(c));
                    }else{
                        builder.append(c);
                    }
                }
            }
            return builder.toString();
        }

        private Method findMethod(Class clazz,Field field){
            String fieldName = field.getName();
            String methodName = "set"+ fieldName.substring(0,1).toUpperCase()+fieldName.substring(1);
            try{
                return clazz.getMethod(methodName,field.getType());
            }catch (NoSuchMethodException e){
                throw new RuntimeException(e);
            }catch(SecurityException e){
                throw new RuntimeException(e);
            }
        }

        public void set(ResultSet resultSet,Object target) throws java.sql.SQLException{
            try{
                Object value = beanProperty.getHandler().apply(resultSet,this.columnName);
                this.setMethod.invoke(target,value);
            }catch(InvocationTargetException e){
                throw new RuntimeException(e);
            }catch(IllegalAccessException e){
                throw new RuntimeException(e);
            }

        }
    }
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BeanInfo{
        private Map<String,BeanPropertyInfo> beanPropertyInfoMap;

        private Class clazz;

        private Constructor createMethod;

        public BeanInfo(Class clazz){
            this.beanPropertyInfoMap = new LinkedHashMap<>();
            this.clazz = clazz;
            this.createMethod = findCreateMethod();
            this.init();
        }

        public Constructor findCreateMethod(){
            Constructor[] allConstructors = clazz.getDeclaredConstructors();
            for (int i = 0; i < allConstructors.length; i++) {
                Constructor temp = allConstructors[i];
                if( temp.getParameterCount() == 0 ){
                    return temp;
                }
            }
            String msg = String.format("Can not find [%s] empty constructor",clazz.getName());
            throw new RuntimeException(msg);
        }

        public Object create(){
            try{
                return this.createMethod.newInstance();
            }catch(InvocationTargetException e) {
                throw new RuntimeException(e);
            }catch(IllegalAccessException e){
                throw new RuntimeException(e);
            }catch(InstantiationException e){
                throw new RuntimeException(e);
            }
        }

        private void init(){
            //读取父类和子类的字段，并写入Map
            Class clazz = this.clazz;
            while( clazz != null ) {
                for (Field field : clazz.getDeclaredFields()) {
                    if( List.class.isAssignableFrom(field.getType())){
                        continue;
                    }
                    if( Modifier.isStatic(field.getModifiers())){
                        continue;
                    }
                    BeanPropertyInfo beanPropertyInfo = new BeanPropertyInfo(clazz, field);
                    this.beanPropertyInfoMap.put(beanPropertyInfo.getFieldName(), beanPropertyInfo);
                }
                clazz = clazz.getSuperclass();
            }
        }
    }

    private static Map<Class,BeanInfo> beanInfoMap = new ConcurrentHashMap<>();

    private static BeanInfo getBeanInfo(Class clazz){
        BeanInfo beanInfo = beanInfoMap.get(clazz);
        if( beanInfo != null){
            return beanInfo;
        }
        beanInfo = new BeanInfo(clazz);
        beanInfoMap.putIfAbsent(clazz,beanInfo);
        return beanInfo;
    }

    private BeanInfo beanInfo;

    public FastBeanPropertyRowMapper(Class<T> clazz){
        this.beanInfo = getBeanInfo(clazz);
    }

    @Override
    public T mapRow(ResultSet resultSet, int var2) throws SQLException{
        Object result = this.beanInfo.create();
        for( BeanPropertyInfo beanPropertyInfo : this.beanInfo.getBeanPropertyInfoMap().values()){
            beanPropertyInfo.set(resultSet,result);
        }
        return (T)result;
    }
}
