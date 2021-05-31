import XLSX from 'xlsx';

class Xlsx {
	constructor(workBook){
		this.workBook = workBook
	}
	exportFile(fileName){
		XLSX.writeFile(this.workBook, fileName);
	}
}

function blank(){
	var workBook = XLSX.utils.book_new();
	return new Xlsx(workBook);
}

function fromArray(sheets){
	var workBook = XLSX.utils.book_new();
	for( var i in sheets ){
		var sheet = sheets[i];
		var sheetName = sheet.name;
		var sheetData = sheet.data;
		var workSheet = XLSX.utils.aoa_to_sheet(sheetData);
		XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
	}
	return new Xlsx(workBook);
}

function fromJson(sheetName,data,columns){
	var result = [];
	var headerRow = [];
	for( var i in columns ){
		var column = columns[i];
		headerRow.push(column.title);
	}
	result.push(headerRow);
	for( var i in data ){
		var singleData = data[i];
		var dataRow = [];
		for( var j in columns ){
			var column = columns[j];
			var cellData = singleData[column.dataIndex];
			if( column.render ){
				cellData = column.render(cellData,singleData);
			}
			dataRow.push(cellData);
		}
		result.push(dataRow);
	}
	return fromArray([{
		name:sheetName,
		data:result,
	}]);
}

export default {
	blank,
	fromArray,
	fromJson,
}