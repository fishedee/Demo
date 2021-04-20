//定义ID生成器
@GenericGenerator(
        name="global_identity",
        strategy = "enhanced-sequence",
        parameters = {
                @Parameter(
                        name="sequence_name",
                        value="MY_SEQUENCE"
                ),
                @Parameter(
                        name="initial_value",
                        value="10001"
                )
        }

)
package spring_test;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
