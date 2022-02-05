import styles from './index.less';
import getAntdLodop from '@/util/lodopAntd';
export default function IndexPage() {

    function CreateOneFormPage(LODOP: any) {
        LODOP.PRINT_INIT('打印控件功能演示_Lodop功能_表单一');
        LODOP.SET_PRINT_STYLE('FontSize', 18);
        LODOP.SET_PRINT_STYLE('Bold', 1);
        LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, '打印页面部分内容');
        LODOP.ADD_PRINT_HTM(
            88,
            200,
            350,
            600,
            document.getElementById('form1')!.innerHTML,
        );
    }
    const prn1_preview = () => {
        try {
            let LODOP = getAntdLodop();
            CreateOneFormPage(LODOP);
            LODOP.PREVIEW();
        } catch (e) {
            console.log(e);
        }
    }
    const prn1_print = () => {
        try {
            let LODOP = getAntdLodop();
            CreateOneFormPage(LODOP);
            LODOP.PRINT();
        } catch (e) {
            console.log(e);
        }
    }
    const prn1_printA = () => {
        try {
            let LODOP = getAntdLodop();
            CreateOneFormPage(LODOP);
            LODOP.PRINTA();
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <h2 style={{ color: "#009999" }}>演示如何打印当前页面的内容：
            </h2>
            <form id="form1">
                <table width="300" id="tb01" style={{ border: 'solid 1px black', borderCollapse: 'collapse', backgroundColor: "#CCFFCC" }}><tr><td width="133" id="mtb001" style={{ fontFamily: "黑体", color: "#FF0000", fontSize: "3" }}>
                    <u>&nbsp;《表单一》&nbsp;</u></td></tr></table>
                <table style={{ width: "300px", height: "106px", borderCollapse: 'collapse', tableLayout: 'fixed', border: ' 1px solid black' }}><tr>
                    <td width="66" height="16" style={{ border: 'solid 1px black' }}><span style={{ color: "#0000FF" }}>A</span><span style={{ color: "#0000FF" }}>等</span></td>
                    <td width="51" height="16" style={{ border: 'solid 1px black' }}><span style={{ color: "#0000FF" }}>B</span><span style={{ color: "#0000FF" }}>等</span></td>
                    <td width="51" height="16" style={{ border: 'solid 1px black' }}><span style={{ color: "#0000FF" }}>C</span><span style={{ color: "#0000FF" }}>等</span></td></tr>
                    <tr>
                        <td width="66" height="16" style={{ border: 'solid 1px black' }}>A<sub>01</sub></td>
                        <td width="80" height="12" style={{ border: 'solid 1px black' }}>中-001</td>
                        <td width="51" height="12" style={{ border: 'solid 1px black' }}>C1<sup>x</sup></td>
                    </tr>
                    <tr>
                        <td width="66" height="16" style={{ border: 'solid 1px black' }}>A<sub>02</sub>Φ</td>
                        <td width="80" height="16" style={{ border: 'solid 1px black' }}>日-スの</td>
                        <td width="51" height="16" style={{ border: 'solid 1px black', fontFamily: 'Vernada' }}>7&#13221</td>
                    </tr>
                    <tr><td width="66" height="16" style={{ border: 'solid 1px black', overflow: 'hidden' }}>A<sub>03</sub>over隐藏后面的：1234567890
                    </td><td width="80" height="16" style={{ border: 'solid 1px black', overflow: 'hidden' }}>韩-안녕</td><td width="51" height="16">C3<sup>x</sup>
                        </td></tr> </table>
            </form>

            <p>1：若只打印《表单一》,看一下<a onClick={prn1_preview}>打印预览</a>,可<a onClick={prn1_print}>直接打印</a>也可
                <a onClick={prn1_printA}>选择打印机</a>打印。<br /><br /></p>
        </div>
    );
}