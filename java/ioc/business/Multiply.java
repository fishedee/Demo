package business;

import common.OperationFactory;
import client.Operation;

public class Multiply implements Operation{
	public Multiply(){
	}

	public int calculate(int left,int right){
		return left*right;
	}

	public static void init(){
		OperationFactory.DefaultFactory.register("multiply",new Multiply());
	}
}