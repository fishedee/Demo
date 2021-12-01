package java_test;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

@Component
@Slf4j
public class EvalTest {
    public void testEvalExpression(){

        ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
        ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");

        try {
            String script = "10+2";
            Object result = nashorn.eval(script);
            log.info("{} = {},{}",script,result,result.getClass().getTypeName());
        }catch(ScriptException e){
            System.out.println("执行脚本错误: "+ e.getMessage());
        }
    }

    public void testEvalObject(){
        ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
        ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");

        try {
            String script = "var a = {\"name\":\"fish\",\"data\":[1,2,3]};JSON.stringify(a)";
            String result = (String)nashorn.eval(script);
            log.info("{} = {},{}",script,result,result.getClass().getTypeName());
        }catch(ScriptException e){
            System.out.println("执行脚本错误: "+ e.getMessage());
        }
    }

    public void testEvalFunction(){
        ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
        ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");

        try {
            String script = "function run(){"+
                    "var a = {\"name\":\"fish\",\"data\":[1,2,3]};" +
                    "return JSON.stringify(a);"+
                    "}";
            ScriptObjectMirror invocable = (ScriptObjectMirror)nashorn.eval(script);
            Object result = invocable.call(null);
            log.info("{} = {},{}",script,result,result.getClass().getTypeName());
        }catch(ScriptException e){
            System.out.println("执行脚本错误: "+ e.getMessage());
        }
    }

    public void go(){
        testEvalExpression();
        testEvalObject();
        testEvalFunction();
    }
}
