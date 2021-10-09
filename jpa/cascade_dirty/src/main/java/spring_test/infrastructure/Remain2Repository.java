package spring_test.infrastructure;


import org.springframework.stereotype.Component;
import spring_test.business.Good2;

@Component
public class Remain2Repository extends CurdRepository<Good2.Remain2,Long> implements Good2.RemainService{
}
