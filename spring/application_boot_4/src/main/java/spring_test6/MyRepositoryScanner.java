package spring_test6;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.AnnotatedBeanDefinition;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanDefinitionHolder;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.ClassPathBeanDefinitionScanner;

import java.util.Arrays;
import java.util.Set;

/**
 * Created by fish on 2021/4/14.
 */
public class MyRepositoryScanner extends ClassPathBeanDefinitionScanner {

    private Logger logger = LoggerFactory.getLogger(getClass());

    static final String FACTORY_BEAN_OBJECT_TYPE = "factoryBeanObjectType";

    public MyRepositoryScanner(BeanDefinitionRegistry registry) {
        super(registry, false);
    }

    @Override
    public Set<BeanDefinitionHolder> doScan(String... basePackages) {
        Set<BeanDefinitionHolder> beanDefinitions = super.doScan(basePackages);

        if (beanDefinitions.isEmpty()) {
            logger.warn("No MyRepository was found in {} package. Please check your configuration.",Arrays.toString(basePackages));
        } else {
            System.out.println(beanDefinitions);
            processBeanDefinitions(beanDefinitions);
        }

        return beanDefinitions;
    }

    private void processBeanDefinitions(Set<BeanDefinitionHolder> beanDefinitions) {
        AbstractBeanDefinition definition;
        BeanDefinitionRegistry registry = getRegistry();
        for (BeanDefinitionHolder holder : beanDefinitions) {
            definition = (AbstractBeanDefinition) holder.getBeanDefinition();
            String beanClassName = definition.getBeanClassName();
            logger.debug( "Creating MapperFactoryBean with name {} and {} mapperInterface",holder.getBeanName() ,beanClassName);

            definition.getConstructorArgumentValues().addGenericArgumentValue(beanClassName); // issue #59
            definition.setBeanClass(MyRepositoryFactory.class);
            //参考代码:https://github.com/mybatis/spring-boot-starter/issues/475
            definition.setAttribute(FACTORY_BEAN_OBJECT_TYPE, beanClassName);
        }
    }

    @Override
    protected boolean isCandidateComponent(AnnotatedBeanDefinition beanDefinition) {
        return beanDefinition.getMetadata().isInterface() && beanDefinition.getMetadata().isIndependent();
    }

    @Override
    protected boolean checkCandidate(String beanName, BeanDefinition beanDefinition) {
        if (super.checkCandidate(beanName, beanDefinition)) {
            return true;
        } else {
            logger.warn( "Skipping MapperFactoryBean with name {} and mapperInterface {}. Bean already defined with the same name!" , beanName , beanDefinition.getBeanClassName() );
            return false;
        }
    }
}
