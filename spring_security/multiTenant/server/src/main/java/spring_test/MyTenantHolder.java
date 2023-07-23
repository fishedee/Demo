package spring_test;

import jdk.nashorn.internal.ir.RuntimeNode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class MyTenantHolder {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TenantInfo{
        private String dataSourceKey;

        private String dataSchemaKey;
    }

    private static final ThreadLocal<String> CONTEXT_HOLDER = new ThreadLocal<>();

    private static final Map<String,TenantInfo> tenantMap = new HashMap<>();

    static {
        tenantMap.put("tenant1",new TenantInfo("first","public"));
        tenantMap.put("tenant2",new TenantInfo("second","public"));
    }

    public static String getTenantIdByRequest(){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String tenantId = request.getParameter("tenantId");
        if(Strings.isNotBlank(tenantId)){
            return tenantId;
        }
        Cookie[] cookies  = request.getCookies();
        if( cookies == null ){
            return null;
        }
        for (int i = 0; i < cookies.length; i++) {
            Cookie cookie = cookies[i];
            if( cookie.getName().toLowerCase().equals("tenantid")){
                String cookieValue = cookie.getValue();
                if( Strings.isNotBlank(cookieValue)){
                    return cookieValue;
                }
                break;
            }
        }
        return null;
    }

    public static void setTenantId(String tenantId) {
        CONTEXT_HOLDER.set(tenantId);
    }

    private static TenantInfo getTenantInfo(){
        TenantInfo result = tenantMap.get(CONTEXT_HOLDER.get());
        if(result == null){
            throw new RuntimeException("找不到租户["+CONTEXT_HOLDER.get()+"]");
        }
        return result;
    }

    public static String getDataSourceKey() {
        return getTenantInfo().dataSourceKey;
    }

    public static String getDataSchema(){
        return getTenantInfo().dataSchemaKey;
    }

    public static void clearTenant() {
        CONTEXT_HOLDER.remove();
    }
}