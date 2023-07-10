package spring_test;

import com.baomidou.dynamic.datasource.DynamicRoutingDataSource;
import com.baomidou.dynamic.datasource.creator.HikariDataSourceCreator;
import com.baomidou.dynamic.datasource.spring.boot.autoconfigure.DataSourceProperty;
import com.baomidou.dynamic.datasource.strategy.LoadBalanceDynamicDataSourceStrategy;
import com.baomidou.dynamic.datasource.toolkit.DynamicDataSourceContextHolder;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;

import javax.sql.DataSource;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CurrentTenantHolder {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TenantInfo{
        private String dataSourceKey;

        private String dataSchemaKey;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TenantConfig{
        @NotNull
        @JsonUnwrapped
        private DataSourceProperty dataSource;

        @NotBlank
        private String dataSchema;

        @NotBlank
        private String tenantId;
    }

    private static final ThreadLocal<String> CONTEXT_HOLDER = new ThreadLocal<>();

    private static final ThreadLocal<String> DATA_SCHEMA_HOLDER = new ThreadLocal<>();

    private static Map<String,TenantInfo> tenantMap = new HashMap<>();

    public static void refreshConfig(List<TenantConfig> configs, DynamicRoutingDataSource dynamicDataSource, HikariDataSourceCreator hikariDataSourceCreator){
        //清空原来的key
        List<String> allKeys = dynamicDataSource.getDataSources().keySet().stream().collect(Collectors.toList());
        allKeys.forEach(sourceKey->{
            dynamicDataSource.getGroupDataSources();
        });
        //逐个添加，没有做相同dataSource的合并操作
        Map<String,TenantInfo> newTenantMap = new HashMap<>();
        configs.forEach(config->{
            //DynamicRoutingDataSource使用_来区分group，这个特性不太好使。例如，slave_1,slave_2，然后使用slave来获取groupDataSource
            config.tenantId = config.tenantId.replace('_','#');
            newTenantMap.put(config.tenantId,new TenantInfo(config.tenantId,config.dataSchema));
            DataSource dataSource = hikariDataSourceCreator.createDataSource(config.getDataSource());
            dynamicDataSource.addDataSource(config.getTenantId(), dataSource);
        });
        CurrentTenantHolder.tenantMap = newTenantMap;
    }

    public static void setTenantId(String tenantId) {
        CONTEXT_HOLDER.set(tenantId);
        //同步设置DATA_SCHEMA与DATA_SOURCE，避免refresh Config时造成不一致的情况
        TenantInfo tenantInfo = getTenantInfo();
        DATA_SCHEMA_HOLDER.set(tenantInfo.dataSchemaKey);
        DynamicDataSourceContextHolder.push(tenantInfo.dataSourceKey);
    }

    private static TenantInfo getTenantInfo(){
        TenantInfo result = tenantMap.get(CONTEXT_HOLDER.get());
        if(result == null){
            throw new RuntimeException("找不到租户["+CONTEXT_HOLDER.get()+"]");
        }
        return result;
    }

    public static String getDataSchema(){
        return DATA_SCHEMA_HOLDER.get();
    }

    public static void clearTenant() {
        CONTEXT_HOLDER.remove();
    }
}
