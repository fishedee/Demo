import styles from './index.less';
import getLodop, { LodopType } from '@/util/lodop';
import { Modal } from 'antd';
export default function IndexPage() {
    const printTemplate = (LODOP: LodopType, input: any) => {
        LODOP.PRINT_INITA(
            0,
            0,
            '50.01mm',
            '100.01mm',
            '打印控件功能演示_Lodop功能_表单一',
        );
        LODOP.SET_PRINT_PAGESIZE(0, 500, 1000, '条形码');
        //注意不要少了这一句
        LODOP.SET_PRINT_MODE('PROGRAM_CONTENT_BYVAR', true);
        LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1);
        LODOP.ADD_PRINT_BARCODE(
            10,
            16,
            '55.59mm',
            '37.99mm',
            'QRCode',
            input.code,
        );
        LODOP.SET_PRINT_STYLEA(0, 'QRCodeErrorLevel', 'H');
        //这一句是为了让lodop设计器，生成代码的时候自动替换输出代码
        LODOP.SET_PRINT_STYLEA(0, 'ContentVName', 'input.code');
        LODOP.ADD_PRINT_HTM(174, 10, 149, 191, input.desc);
        LODOP.SET_PRINT_STYLEA(0, 'ContentVName', 'input.desc');
        LODOP.ADD_PRINT_TEXT(145, 10, 164, 20, input.title);
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
        LODOP.SET_PRINT_STYLEA(0, 'Horient', 2);
        LODOP.SET_PRINT_STYLEA(0, 'ContentVName', 'input.title');
    };
    const onClick = () => {
        let result = getLodop();
        if (result.errorType != null) {
            Modal.error({
                content: result.errorMessage,
            });
            return;
        }
        const LODOP = result.data;
        printTemplate(LODOP, {
            code: 'abcd-123',
            title: 'abcd-123',
            desc:
                '<p style="font-size:12px;">超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，</p>',
        });
        LODOP.PRINTA();
    };
    const onClick2 = () => {
        let result = getLodop();
        if (result.errorType != null) {
            Modal.error({
                content: result.errorMessage,
            });
            return;
        }
        const LODOP = result.data;
        printTemplate(LODOP, {
            code: 'abcd-123',
            title: 'abcd-123',
            desc:
                '<p style="font-size:12px;">超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，</p>',
        });
        LODOP.PRINT_DESIGN();
    };
    return (
        <div>
            <button onClick={onClick}>{'打印'}</button>
            <button onClick={onClick2}>{'打印设计'}</button>
        </div>
    );
}
