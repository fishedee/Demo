
//定义ID生成器
@TypeDefs({
        @TypeDef(name = "json", typeClass = JsonStringType.class)
})
package spring_test;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import com.vladmihalcea.hibernate.type.json.JsonType;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
