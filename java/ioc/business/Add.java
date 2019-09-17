package business;

import common.OperationFactory;
import client.Operation;

public class Add implements Operation{
	public Add(){
	}

	public int calculate(int left,int right){
		return left+right;
	}

	public static void init(){
		OperationFactory.DefaultFactory.register("add",new Add());
	}
}