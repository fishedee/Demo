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
        }
    ];

    //创建book与添加sheet
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    //第三个参数为sheet的名字
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    //添加表头，aoa是二维表格数据
    XLSX.utils.sheet_add_aoa(worksheet, [["编号", "名称"]], { origin: "A1" });

    //设置所有列的列宽，wch是字符宽度,wpx是像素宽度
    worksheet["!cols"] = [{ wpx: 100 }, { wpx: 200 }];

    //创建并写入，格式通过文件名的后缀.xlsx来确定
    XLSX.writeFile(workbook, "Workbook.xlsx", { compression: true });
}

export default function IndexPage() {
    return (
        <div>
            <Button onClick={onClick}>{'列测试'}</Button>
        </div>
    );
}
