package java_test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
//Serializable会递归调用每个字段的Serializable接口，如果某个字段没有实现Serializable，就会抛出异常
//这意味着People也必须实现Serializable接口才能正常运行，否则运行时会抛出异常
//Cloneable仅仅是一个浅拷贝的实现
public class Country implements Cloneable,Serializable {

    private Long id;

    private String name;

    private List<People> peopleList = new ArrayList<>();

    @Override
    @SneakyThrows
    public Country clone(){
        return (Country)super.clone();
    }
}
