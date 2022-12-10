import XLSX, { read, writeFileXLSX } from "xlsx";
import { Button } from 'antd';

const onClick = async () => {
    const rows = [
        {
            number: '1001',
            name: 'fish',
        },
        {
            number: '1002',
            name: 'cat',
        },
        {
            number: '1003',
            name: 'cat3',
        },
        {
            number: '1004',
            name: 'cat4',
        }
    ];

    //创建book与添加sheet
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    //第三个参数为sheet的名字
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    //添加表头，aoa是二维表格数据
    XLSX.utils.sheet_add_aoa(worksheet, [["编号", "名称"]], { origin: "A1" });

    //合并多行
    const range = { s: { c: 1, r: 1 }, e: { c: 1, r: 2 } };

    if (!worksheet["!merges"]) {
        worksheet['!merges'] = [];
    }
    worksheet['!merges'].push(range);

    //创建并写入，格式通过文件名的后缀.xlsx来确定
    XLSX.writeFile(workbook, "Workbook.xlsx", { compression: true });
}

export default function IndexPage() {
    return (
        <div>
            <Button onClick={onClick}>{'合并范围'}</Button>
        </div>
    );
}
