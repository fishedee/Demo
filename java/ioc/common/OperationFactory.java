package common;

import client.Operation;
import java.util.HashMap;

public class OperationFactory{
	public static OperationFactory DefaultFactory = new OperationFactory();

	private HashMap<String, Operation> operationMap;

	public OperationFactory(){
		this.operationMap = new HashMap<String,Operation>();
	}

	public void register(String name,Operation operation){
		this.operationMap.put(name, operation);
	}

	public Operation get(String name){
		return this.operationMap.get(name);
	}
}