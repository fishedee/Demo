package spring_test;

import spring_test6.MyRepository;

/**
 * Created by fish on 2021/4/14.
 */
@MyRepository
public interface RepositoryA {
    void findById(int a);
}
