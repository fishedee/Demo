package spring_test;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Component
public class ExportExcelService2 {

    @Data
    @AllArgsConstructor
    public static class Person {
        private Long id;

        private String name;
    }

    private List<Person> getData() {
        ArrayList<Person> result = new ArrayList<>();
        for (int i = 0; i != 100; i++) {
            result.add(new Person(Long.valueOf(i + 10001), "fish"));
        }
        return result;
    }

    public XSSFCellStyle getTitleStyle(XSSFWorkbook wb){
        XSSFFont font = wb.createFont();
        font.setFontHeight(20);
        font.setFontName("微软雅黑");
        //font.setColor(Font.COLOR_RED);
        font.setColor(new XSSFColor(java.awt.Color.decode("#F0C0E0"),new DefaultIndexedColorMap()));

        XSSFCellStyle style = wb.createCellStyle();
        //边框
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);

        //字体
        style.setFont(font);

        //自动换行
        style.setWrapText(false);

        //水平对齐
        style.setAlignment(HorizontalAlignment.CENTER);

        //垂直对齐
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        return style;
    }

    public void export(){
        List<Person> person = this.getData();

        XSSFWorkbook wb = new XSSFWorkbook();
        Sheet sheet1 = wb.createSheet("Sheet1");

        //创建标题
        Row row = sheet1.createRow(0);
        Cell cell = row.createCell(0);
        cell.setCellValue("我是标题");

        //合并单元格
        //参数分别为firstRow,lastRow,firstCol和lastCol
        sheet1.addMergedRegion(new CellRangeAddress(0,0,0,1));

        //设置标题样式
        XSSFCellStyle style = this.getTitleStyle(wb);
        cell.setCellStyle(style);

        //行高
        //建议设置为20的倍数，单位为磅
        row.setHeight((short)(60*20));

        //创建表格
        ExcelUtil.Table<Person> table = new ExcelUtil.Table<>();
        table.addColumn("ID",Person::getId,20);
        table.addColumn("名称",Person::getName,40);
        ExcelUtil.createTable(sheet1,1,table,person);

        //导出
        ExcelUtil.exportToWriter(wb,"测试.xlsx");
    }
}


