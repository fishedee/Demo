package spring_test.business;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import spring_test.business.SalesOrder.Address;
import spring_test.business.SalesOrder.Item;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(SalesOrder.class)
public abstract class SalesOrder_ {

	public static volatile SingularAttribute<SalesOrder, Address> address;
	public static volatile SingularAttribute<SalesOrder, Date> createTime;
	public static volatile SingularAttribute<SalesOrder, String> name;
	public static volatile SingularAttribute<SalesOrder, Long> id;
	public static volatile ListAttribute<SalesOrder, Item> items;

	public static final String ADDRESS = "address";
	public static final String CREATE_TIME = "createTime";
	public static final String NAME = "name";
	public static final String ID = "id";
	public static final String ITEMS = "items";

}

