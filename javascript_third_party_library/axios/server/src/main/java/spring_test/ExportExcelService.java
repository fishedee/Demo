package spring_test;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

@Component
public class ExportExcelService {

    public void injectContent(Sheet sheet){
        //创建行头
        Row row = sheet.createRow(0);
        Cell cell = row.createCell(0);
        cell.setCellValue("名称");
        cell = row.createCell(1);
        cell.setCellValue("年龄");

        //创建数据行1
        row = sheet.createRow(1);
        cell = row.createCell(0);
        cell.setCellValue("fish");
        cell = row.createCell(1);
        //通过写入的数据类型，来确定填充什么类型
        cell.setCellValue(12);

        //创建数据行2
        row = sheet.createRow(2);
        cell = row.createCell(0);
        cell.setCellValue("cat");
        cell = row.createCell(1);
        cell.setCellValue(89);
    }

    public Workbook createWorkbook2003(){
        Workbook w = new HSSFWorkbook();
        Sheet sheet = w.createSheet("表格1");
        this.injectContent(sheet);
        return w;
    }

    public Workbook createWorkbook2007(){
        Workbook w = new XSSFWorkbook();
        Sheet sheet = w.createSheet("表格1");
        this.injectContent(sheet);
        return w;
    }

    public Workbook createWorkbook2007_large(){
        Workbook w = new SXSSFWorkbook();
        Sheet sheet = w.createSheet("表格1");
        this.injectContent(sheet);
        return w;
    }
}
