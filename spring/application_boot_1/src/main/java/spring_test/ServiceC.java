package spring_test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;


/**
 * Created by fish on 2021/3/15.
 */
@Component
public class ServiceC {
    @Resource(name="piano")
    private ServiceCDepend serviceCDepend;

    @Autowired
    @Qualifier("guitar")
    private ServiceCDepend serviceCDepend2;

    public void showMusic(){
        System.out.println("He is playing : "+this.serviceCDepend.getInstrument());

        System.out.println("She is playing : "+this.serviceCDepend2.getInstrument());
    }
}
