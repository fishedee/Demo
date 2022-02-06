package spring_test;

import lombok.Data;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

public class ExcelUtil {

    public enum TableColumnType{
        STRING,
        INTEGER,
        BIG_DECIMAL,
        BYTE,
    }

    public static class TableColumn{
        private String title;

        private Function getter;

        private int width;

        public TableColumn(String title,Function getter,int width){
            this.title = title;
            this.getter = getter;
            this.width = width;
        }
    }

    public static class Table<T>{
        private List<TableColumn> data = new ArrayList<>();

        public Table(){

        }

        public <R> void addColumn(String title,Function<T,R> getter,int width){
            this.data.add(new TableColumn(title,getter,width));
        }

        public  int getColumnSize(){
            return data.size();
        }
    }

    private static SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static <T> void createTable(Sheet sheet,int beginRow,Table<T> table,List<T> data){
        Row row = sheet.createRow(beginRow);
        for( int i = 0 ;i != table.data.size();i++){
            TableColumn column = table.data.get(i);
            Cell cell = row.createCell(i);
            cell.setCellValue(column.title);
            //设置列宽度，建议设置为256的倍数，单位为字符宽度
            sheet.setColumnWidth(i,column.width*256);
        }

        for( int i = 0 ;i != data.size() ;i ++){
            T rowData = data.get(i);
            beginRow++;
            row = sheet.createRow(beginRow);
            for( int j = 0 ; j != table.data.size() ;j ++){
                TableColumn column = table.data.get(j);
                Cell cell = row.createCell(j);
                Object cellValue = column.getter.apply(rowData);
                if( cellValue instanceof Long){
                    cell.setCellValue((Long)cellValue);
                }else if( cellValue instanceof Integer){
                    cell.setCellValue((Integer)cellValue);
                }else if( cellValue instanceof Byte){
                    cell.setCellValue((Byte)cellValue);
                }else if( cellValue instanceof Date){
                    cell.setCellValue(ft.format((Date)cellValue));
                }else if( cellValue instanceof String){
                    cell.setCellValue((String)cellValue);
                }else if(cellValue instanceof BigDecimal){
                    cell.setCellValue(((BigDecimal) cellValue).stripTrailingZeros().toPlainString());
                }else{
                    throw new RuntimeException("unknown cellValue type "+cellValue.getClass().getName());
                }
            }
        }
    }

    public static void exportToWriter(Workbook workbook,String filename){

        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = requestAttributes.getResponse();
        HttpServletRequest request = requestAttributes.getRequest();

        OutputStream out = null;
        try {
            // 下面几行是为了解决文件名乱码的问题
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename,"UTF-8"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            out = response.getOutputStream();

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
}
