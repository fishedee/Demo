import XLSX, { read, writeFileXLSX } from "xlsx";
import { Button } from 'antd';

const onClick = async () => {
  const url = "https://sheetjs.com/data/executive.json";
  const raw_data = await (await fetch(url)).json();

  const prez = raw_data.filter((row: any) => row.terms.some((term: any) => term.type === "prez"));

  //将json转换为object[]
  const rows = prez.map((row: any) => ({
    name: row.name.first + " " + row.name.last,
    birthday: row.bio.birthday
  }));

  //创建book与添加sheet
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  //第三个参数为sheet的名字
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

  //添加表头，aoa是二维表格数据
  XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  //设置所有列的列宽，wch是字符宽度
  const max_width = rows.reduce((maxLength: any, single: any) => Math.max(maxLength, single.name.length), 10);
  worksheet["!cols"] = [{ wch: max_width }];

  //创建并写入，格式通过文件名的后缀.xlsx来确定
  XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
}

export default function IndexPage() {
  return (
    <div>
      <Button onClick={onClick}>{'基础'}</Button>
    </div>
  );
}
