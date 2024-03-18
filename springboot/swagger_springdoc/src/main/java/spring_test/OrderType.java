package spring_test;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema
public enum OrderType {
    DIRECT("直连"),
    PROXY("代理");

    private String label;

    OrderType(String label){
        this.label = label;
    }

    @Override
    public String toString(){
        return String.format("OrderType(%s,%s)",name(),label);
    }
}
