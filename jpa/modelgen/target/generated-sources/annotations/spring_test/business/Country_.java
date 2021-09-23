package spring_test.business;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Country.class)
public abstract class Country_ {

	public static volatile SingularAttribute<Country, String> name;
	public static volatile SingularAttribute<Country, Long> id;
	public static volatile SingularAttribute<Country, String> state;

	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String STATE = "state";

}

