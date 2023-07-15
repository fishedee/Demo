package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.MigrationInfo;
import org.flywaydb.core.api.MigrationInfoService;
import org.flywaydb.core.api.output.ValidateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Types;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class FlywayInit {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean isExistFlywayHistory(String schemaName,String relName){
        List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT EXISTS (\n" +
                "  SELECT 1\n" +
                "  FROM   pg_catalog.pg_class c\n" +
                "  JOIN   pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n" +
                "  WHERE  n.nspname = ?\n" +
                "  AND    c.relname = ?\n" +
                "  AND    c.relkind = 'r'\n" + // only tables
                ")",
                new Object[]{schemaName,relName},
                new int[]{Types.VARCHAR,Types.VARCHAR});
        Boolean target = (Boolean)result.get(0).get("exists");
        return target;
    }

    public void init(){
        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .baselineOnMigrate(true)
                .baselineVersion("1.1")
                .load();
        if( isExistFlywayHistory("public","flyway_schema_history") == false ){
            //未迁移过，直接从跳到1.1版本，并执行1.1版本的baseLine操作
            flyway.baseline();
        }
        flyway.migrate();
    }
}
