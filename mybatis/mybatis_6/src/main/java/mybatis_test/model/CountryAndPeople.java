package mybatis_test.model;

import java.util.List;

/**
 * Created by fish on 2021/3/30.
 */
public class CountryAndPeople extends Country{
    private List<People> peopleList;

    public void setPeopleList(List<People> peopleList){
        this.peopleList = peopleList;
    }

    public String toString(){
        return String.format("CountryAndPeople{%s,people:%s}",super.toString(),this.peopleList);
    }
}
