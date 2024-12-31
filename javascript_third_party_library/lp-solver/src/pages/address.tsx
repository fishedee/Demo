import XLSX, { read, writeFileXLSX } from "xlsx";
import { Button } from 'antd';

const colTest = async () => {
    let col_index = XLSX.utils.decode_col("D");
    let col_name = XLSX.utils.encode_col(5);//从0开始，也就是第6个
    //3,F
    console.log(col_index, col_name);
}

const rowTest = async () => {
    let row_index = XLSX.utils.decode_row("4");
    let row_name = XLSX.utils.encode_row(5);//从0开始，也就是第6个
    //3,'6'
    console.log(row_index, row_name);
}

const cellTest = async () => {
    var address = XLSX.utils.decode_cell("A2");//
    var a1_addr = XLSX.utils.encode_cell({ r: 1, c: 0 });//第2行，第1列，下标都是从0开始
    //{c: 0, r: 1} 'A2'
    console.log(address, a1_addr);
}

const rangeTest = async () => {
    var range = XLSX.utils.decode_range("A1:D3");
    //s是start，e是end
    var a1_range = XLSX.utils.encode_range({ s: { c: 1, r: 1 }, e: { c: 3, r: 2 } });
    /*
    e: {c: 3, r: 2}
    s : {c: 0, r: 0}
     'B2:D3'
    */
    console.log(range, a1_range);
}

export default function IndexPage() {
    return (
        <div>
            <Button onClick={colTest}>{'col的编码与解码'}</Button>
            <Button onClick={rowTest}>{'row的编码与解码'}</Button>
            <Button onClick={cellTest}>{'cell的编码与解码'}</Button>
            <Button onClick={rangeTest}>{'range的编码与解码'}</Button>
        </div>
    );
}
