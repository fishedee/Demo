import { LodopType } from '@/util/lodop';
import getAntdLodop from '@/util/lodopAntd';
import { useState } from 'react';
import jsSandBox from './jsSandBox';

export default function IndexPage() {
    const defaultTemplateInfo = `
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
    `
    const [code, setCode] = useState(defaultTemplateInfo);

    const OriginData =
    {
        code: 'abcd-123',
        title: 'abcd-123',
        desc:
            '<p style="font-size:12px;">超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，超文本2的HTML代码内容，</p>',
    };
    const print_preivew = () => {
        try {
            const LODOP = getAntdLodop();
            const packData = {
                LODOP: LODOP,
                input: OriginData,
            }
            jsSandBox(code, packData);
            LODOP.PREVIEW();
        } catch (e) {
            console.error(e);
        }
    }
    const print_setup = () => {
        try {
            const LODOP = getAntdLodop();
            //打开这一句才能在SETUP模式下获取命令
            LODOP.SET_PRINT_MODE("PRINT_SETUP_PROGRAM", true);
            LODOP.On_Return = function (TaskID: any, newValue: any) { setCode(newValue); };

            const packData = {
                LODOP: LODOP,
                input: OriginData,
            }
            jsSandBox(code, packData);
            LODOP.PRINT_SETUP();
        } catch (e) {
            console.error(e);
        }
    }
    const print_design = () => {
        try {
            const LODOP = getAntdLodop();
            const packData = {
                LODOP: LODOP,
                input: OriginData,
            }
            jsSandBox(code, packData);
            LODOP.On_Return = function (TaskID: any, newValue: any) { setCode(newValue); };
            LODOP.PRINT_DESIGN();
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <div>
            <textarea style={{ width: '100%', height: '50vh' }} value={code} onChange={(e) => {
                setCode(e.target.value);
            }} />
            <div>
                <button onClick={print_preivew}>{'打印预览，只能看，不能改'}</button>
                <button onClick={print_setup}>{'打印维护，只能移动，不能增删'}</button>
                <button onClick={print_design}>{'打印设计，可完全修改'}</button>
            </div>
        </div>
    );
}
