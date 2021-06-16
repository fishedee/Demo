package java_test;

import com.sun.tools.classfile.Opcode;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

public class User3 extends HashSet<String> {

    List<Integer> datas;

    public void go(LinkedList<Integer> a ){
        System.out.println(a);
    }

    public<T> void add(List<T> a ,T b){
        a.add(b);
    }

    public void login(String name,String password){

    }
}
