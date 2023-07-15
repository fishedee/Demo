package spring_test.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

public class CurrentTenantHolder {
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
        tenantMap.put("tenant2",new TenantInfo("second","schema1"));
        tenantMap.put("tenant3",new TenantInfo("second","schema2"));
    }

    public static void setTenantId(String tenantId) {
        CONTEXT_HOLDER.set(tenantId);
    }

    public static boolean hasTenantInfo(){
        String tenantInfo = CONTEXT_HOLDER.get();
        return tenantInfo != null && tenantMap.containsKey(tenantInfo);
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
