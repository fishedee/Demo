package spring_test;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

/**
 * Created by fish on 2021/4/25.
 */
@RestController
@RequestMapping("/api/excel")
@Slf4j
public class ExcelController {

    @GetMapping("/go")
    public String go(){
        return "Hello World";
    }

    @Autowired
    private ExportExcelService excelService;

    @GetMapping("get1")
    public void get1(){

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = requestAttributes.getResponse();
        HttpServletRequest request = requestAttributes.getRequest();

        String filename = "地址列表.xls";
        OutputStream out = null;
        Workbook workbook = null;
        try {
            // 下面几行是为了解决文件名乱码的问题
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename,"UTF-8"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            out = response.getOutputStream();

            workbook = excelService.createWorkbook2003();
            workbook.write(out);
        }catch(IOException e){
            throw new RuntimeException(e);
        }finally {
            try{
                if( workbook != null ){
                    workbook.close();
                }
                if( out != null ){
                        out.close();
                }
            }catch(IOException e ){
                e.printStackTrace();
            }
        }
    }

    @GetMapping("get2")
    public void get2(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = requestAttributes.getResponse();
        HttpServletRequest request = requestAttributes.getRequest();

        String filename = "地址列表.xlsx";
        OutputStream out = null;
        Workbook workbook = null;
        try {
            // 下面几行是为了解决文件名乱码的问题
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename,"UTF-8"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            out = response.getOutputStream();

            workbook = excelService.createWorkbook2007();
            workbook.write(out);
        }catch(IOException e){
            throw new RuntimeException(e);
        }finally {
            try{
                if( workbook != null ){
                    workbook.close();
                }
                if( out != null ){
                    out.close();
                }
            }catch(IOException e ){
                e.printStackTrace();
            }
        }
    }

    @GetMapping("get3")
    public void get3(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = requestAttributes.getResponse();
        HttpServletRequest request = requestAttributes.getRequest();

        String filename = "地址列表.xlsx";
        OutputStream out = null;
        Workbook workbook = null;
        try {
            // 下面几行是为了解决文件名乱码的问题
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename,"UTF-8"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            out = response.getOutputStream();

            workbook = excelService.createWorkbook2007_large();
            workbook.write(out);
        }catch(IOException e){
            throw new RuntimeException(e);
        }finally {
            try{
                if( workbook != null ){
                    workbook.close();
                }
                if( out != null ){
                    out.close();
                }
            }catch(IOException e ){
                e.printStackTrace();
            }
        }
    }

    @Autowired
    private ExportExcelService2 exportExcelService2;

    @GetMapping("get4")
    public void get4(){
        exportExcelService2.export();
    }

    @Autowired
    private ImportExcelSevice importExcelSevice;

    //使用curl提交，curl http://localhost:8585/hello/post -X POST -F "data=@./excel.xlsx"
    @PostMapping("post")
    public Object post1(@RequestParam(name="data") MultipartFile file){
        InputStream is = null;
        try{
            is = file.getInputStream();
            return importExcelSevice.read(is);
        }catch(IOException e ){
            throw new RuntimeException(e);
        }finally {
            if( is != null ){
                try{
                    is.close();
                }catch(IOException e){
                    e.printStackTrace();
                }
            }
        }
    }

}
