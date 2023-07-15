package spring_test.config;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;

@Slf4j
public class MultiTenantIdentifierResolver implements CurrentTenantIdentifierResolver {
    @Override
    public String resolveCurrentTenantIdentifier() {
        //这个仅在事务打开的时候才进行一次调用，如果在单个@Transiactonal切换租户的话，不会触发该接口，因此不会产生效果
        String dataSourceKey = CurrentTenantHolder.getDataSourceKey();
        log.info("resolveCurrentTenantIdentifier trigger [{}]",dataSourceKey);
        return dataSourceKey;
    }

    //If we want Hibernate to validate all the existing sessions belong to the same tenant identifier,
    // the method validateExistingCurrentSessions should return true.
    //在SpringBoot中，这个SessionContext没有用到这个特性
    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }
}
