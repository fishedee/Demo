import XLSX, { read, writeFileXLSX } from "xlsx";
import { Button } from 'antd';

const onClick = async () => {
    const rows = [
        {
            number: '1001',
            name: 'fish',
            age: 10,
            tall: 1.72,
            money: '100.23',
            birthday: '1959-01-03',
            firstCreated: '2001-02-03 12:12:23',
        },
        {
            number: '1002',
            name: 'cat',
            age: 11,
            tall: 0.83333,
            money: '-100.11',
            birthday: '1983-04-05',
            firstCreated: '2002-03-04 08:24:56',
        }
    ];

    //创建book
    const workbook = XLSX.utils.book_new();


    //添加表头，aoa是二维表格数据
    const aoas: any[] = [["编号", "名称", "年龄", "身高", "余额", "生日", "首次创建"]];

    rows.forEach(row => {
        let aoa = [];
        //文本类型
        aoa.push({
            t: 's',
            v: row.number,
        });
        aoa.push({
            t: 's',
            v: row.name,
        });
        //数字类型
        aoa.push({
            t: 'n',
            v: row.age,
        });
        aoa.push({
            t: 'n',
            v: row.tall,
        });
        //decimal类型
        aoa.push({
            t: 'n',
            v: row.money,
        });
        //date类型
        aoa.push({
            t: 'd',
            v: row.birthday,//FIXME，被固定转换为8:00:43的时间戳尾部
        });
        aoa.push({
            t: 'd',
            v: row.firstCreated,
        });
        aoas.push(aoa);
    });


    //第三个参数为sheet的名字
    let worksheet = XLSX.utils.aoa_to_sheet(aoas);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //设置所有列的列宽，wch是字符宽度,wpx是像素宽度
    worksheet["!cols"] = [{ wpx: 100 }, { wpx: 200 }];

    //创建并写入，格式通过文件名的后缀.xlsx来确定
    XLSX.writeFile(workbook, "Workbook.xlsx", { compression: true });
}

export default function IndexPage() {
    return (
        <div>
            <Button onClick={onClick}>{'cell测试'}</Button>
        </div>
    );
}
