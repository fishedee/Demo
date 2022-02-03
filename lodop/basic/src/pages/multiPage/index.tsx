
import getAntdLodop from '@/util/lodopAntd';
import { Modal } from 'antd';
export default function IndexPage() {
    const onClick = () => {
        let LODOP = getAntdLodop();
        const desc =
            '<p style="font-size:12px;">超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，</p>';

        LODOP.PRINT_INITA(
            0,
            0,
            '50mm',
            '100mm',
            '打印控件功能演示_Lodop功能_表单一',
        );
        LODOP.SET_PRINT_PAGESIZE(0, 500, 1000, '条形码');
        LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1);

        for (let i = 0; i != 10; i++) {
            //手动分页
            LODOP.NewPage();
            LODOP.ADD_PRINT_BARCODE(
                10,
                16,
                '55.59mm',
                '37.99mm',
                'QRCode',
                '7-26-6-199' + i,
            );
            LODOP.SET_PRINT_STYLEA(0, 'QRCodeErrorLevel', 'H');
            LODOP.ADD_PRINT_HTM(174, 10, 149, 191, desc);
            LODOP.ADD_PRINT_TEXT(145, 10, 164, 20, '7-26-6-199' + i);
            LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
            LODOP.SET_PRINT_STYLEA(0, 'Horient', 2);
        }
        LODOP.PREVIEW();
    };
    return (
        <div>
            <button onClick={onClick}>{'点我'}</button>
        </div>
    );
}
