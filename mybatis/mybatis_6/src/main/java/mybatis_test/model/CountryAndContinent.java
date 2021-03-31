package mybatis_test.model;

/**
 * Created by fish on 2021/3/29.
 */
public class CountryAndContinent extends Country {

    private Continent continent;

    public void setContinent(Continent continent){
        this.continent = continent;
    }

    public String toString(){
        return String.format("CountryAndContinent{%s,continent:%s}",super.toString(),this.continent);
    }
}
