package spring_test;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ImportExcelSevice {
    public Optional<List<List<Object>>> read(InputStream is){
        Workbook workbook;
        try{
            workbook = new XSSFWorkbook(is);
        }catch(IOException e){
            return Optional.empty();
        }
        Sheet sheet = workbook.getSheetAt(0);
        int firstRow = sheet.getFirstRowNum();
        int lastRow = sheet.getLastRowNum();
        List<List<Object>> result = new ArrayList<>();
        //这里需要有等于号
        for( int i = firstRow ;i <= lastRow;i++){
            Row row =  sheet.getRow(i);
            int firstColumn = row.getFirstCellNum();
            int lastColumn = row.getLastCellNum();
            List<Object> rowData = new ArrayList<>();
            //这里不能有等于号
            for( int j = firstColumn ; j < lastColumn;j++ ){
                Cell cell = row.getCell(j);
                if( cell.getCellType() == CellType.STRING){
                    rowData.add(cell.getStringCellValue());
                }else if(cell.getCellType() == CellType.NUMERIC){
                    rowData.add(cell.getNumericCellValue());
                }
            }
            result.add(rowData);
        }
        return Optional.of(result);
    }
}