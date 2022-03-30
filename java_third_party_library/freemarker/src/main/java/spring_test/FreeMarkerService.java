package spring_test;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;

@Component
public class FreeMarkerService {
    private Configuration freeMarkConfiguration;

    @PostConstruct
    public void init(){
        try{
            freeMarkConfiguration = new Configuration(Configuration.VERSION_2_3_20);
            //当前工作目录下的tpl文件夹
            //freeMarkConfiguration.setDirectoryForTemplateLoading(new File("tpl"));
            //使用类的资源方式加载
            freeMarkConfiguration.setClassForTemplateLoading(this.getClass(),"/tpl");
            freeMarkConfiguration.setDefaultEncoding("UTF-8");
            freeMarkConfiguration.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    public String execute(String templateName,Object data){
        try{
            StringWriter stream = new StringWriter();
            Template tpl = freeMarkConfiguration.getTemplate(templateName);
            tpl.process(data,stream);
            return stream.toString();
        }catch(IOException e){
            throw new RuntimeException(e);
        }catch(TemplateException e){
            throw new RuntimeException(e);
        }
    }
}
