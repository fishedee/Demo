package main;

import business.Add;
import business.Multiply;
import common.OperationFactory;
import client.Operation;

public class Main{
	static{
		Add.init();
		Multiply.init();
	}
	public static void main(String[] args){
		OperationFactory operationFactory = OperationFactory.DefaultFactory;
		Operation addOperation = operationFactory.get("add");
		Operation multiplyOperation = operationFactory.get("multiply");

		int a = 12;
		int b = 13;
        System.out.println("a , b add = "+addOperation.calculate(a,b));
        System.out.println("a , b multiply = "+multiplyOperation.calculate(a,b));
    }
}