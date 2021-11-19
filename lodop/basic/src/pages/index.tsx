import styles from './index.less';
import getLodop from '@/util/lodop';
export default function IndexPage() {
    const onClick = () => {
        document.body.innerHTML = `<h2><font color="#009999">演示如何打印当前页面的内容：</font>
        </h2>
        <form id="form1">
          <table border="1" width="300" id="tb01" bgcolor="#CCFFCC" style="border:solid 1px black;border-collapse:collapse"><tr><td width="133" id="mtb001">
          <font face="黑体" color="#FF0000" size="3"><u>&nbsp;《表单一》&nbsp;</u></font></td></tr></table>
          <table border="1" width="300" height="106" cellspacing="0" bgcolor="#CCFFFF"style="border-collapse:collapse;table-layout:fixed;border:solid 1px black;"><tr>
          <td width="66" height="16" style="border:solid 1px black"><font color="#0000FF">A</font><font color="#0000FF">等</font></td>
        <td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">B</font><font color="#0000FF">等</font></td>
        <td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">C</font><font color="#0000FF">等</font></td></tr> 
        <tr>
        <td width="66" height="16" style="border:solid 1px black">A<sub>01</sub></td>
        <td width="80" height="12" style="border:solid 1px black">中-001</td>
        <td width="51" height="12" style="border:solid 1px black">C1<sup>x</sup></td>
        </tr> 
        <tr>
        <td width="66" height="16" style="border:solid 1px black">A<sub>02</sub>Φ</td>
        <td width="80" height="16" style="border:solid 1px black">日-スの</td>
        <td width="51" height="16" style="border:solid 1px black"><font face='Vernada'>7&#13221</font></td>
        </tr> 
          <tr><td width="66" height="16" style="border:solid 1px black;overflow:hidden">A<sub>03</sub><nobr>over隐藏后面的：1234567890</nobr>
        </td><td width="80" height="16" style="border:solid 1px black;overflow:hidden">韩-안녕</td><td width="51" height="16">C3<sup>x</sup>
        </td></tr> </table>
        </form>
        <br>
        <div id="form2">
          <table border="1" width="100%" id="tb01" bgcolor="#CCFFCC" style="border:solid 1px black;border-collapse:collapse"><tr><td width="133" id="mtb001">
          <font face="黑体" color="#FF0000" size="3">《表单二》&copy;</font></td></tr></table>
          <table border="1" width="100%" height="106" cellspacing="0" bgcolor="#CCFFFF" style="border:solid 1px black;border-collapse:collapse"><tr>
          <td width="66" height="16" style="border:solid 1px black"><font color="#0000FF">X</font><font color="#0000FF">等</font></td>
        <td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">Y等</font></td>
        <td width="51" height="16" style="border:solid 1px black"><font color="#0000FF">Z等</font></td></tr> 
          <tr><td width="66" height="12" style="border:solid 1px black"><span style="font-family:Wingdings;font-size:25px;" >&#254;</span>X001</td>
        <td width="51" height="12" style="border:solid 1px black"><strike>Y001</strike></td>
        <td width="51" height="44" rowspan="3"  style="border:solid 1px black">
              <ol style="list-style-type:upper-alpha;list-style-position:inside;">
                <li>Z001</li>
                <li>Z002</li>
                <li>Z003</li>
                <li>Z004</li>
                <li>Z005</li>
               </ol>
            </td></tr> 
        <tr><td width="30%" height="16" style="border:solid 1px black"><strong>X002</strong></td>
        <td width="51" height="16"  style="border:solid 1px black"><u>Y002</u><span style="visibility: hidden">hidesome</span></td></tr> 
          <tr><td width="30%" height="16" style="border:solid 1px black"><span style="text-decoration: overline">X003</span>
        </td><td width="40%" height="16" style="border:solid 1px black"><em>Y003</em><input type="radio" name="R1"><input type="radio" name="R1" checked></td></tr> </table>
        </div>
        <p>1：若只打印《表单一》,看一下<a href="javascript:prn1_preview()">打印预览</a>,可<a href="javascript:prn1_print()">直接打印</a>也可      
        <a href="javascript:prn1_printA()">选择打印机</a>打印。<br><br>
        2：若《表单一》和《表单二》一起并列输出,看一下<a href="javascript:prn2_preview()">打印预览</a>,其布局风格可<a href="javascript:prn2_manage()">打印维护</a>调整。
        <p>3：若打印整个页面,看看<a href="javascript:prn3_preview()">打印预览</a>。<br><br>
        本例要点是用Document的innerHTML方法把打印目标的超文本送给控件。  
        <p><a href="PrintSampIndex.html">&lt;&lt;回样例目录</a>
        </p> 
        `;
        var LODOP = getLodop();
        console.log(LODOP);
        prn1_preview();
        function prn1_preview() {
            CreateOneFormPage();
            LODOP.PREVIEW();
        }
        function prn1_print() {
            CreateOneFormPage();
            LODOP.PRINT();
        }
        function prn1_printA() {
            CreateOneFormPage();
            LODOP.PRINTA();
        }
        function CreateOneFormPage() {
            LODOP = getLodop();
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
        function prn2_preview() {
            CreateTwoFormPage();
            LODOP.PREVIEW();
        }
        function prn2_manage() {
            CreateTwoFormPage();
            LODOP.PRINT_SETUP();
        }
        function CreateTwoFormPage() {
            LODOP = getLodop();
            LODOP.PRINT_INIT('打印控件功能演示_Lodop功能_表单二');
            LODOP.ADD_PRINT_RECT(70, 27, 634, 242, 0, 1);
            LODOP.ADD_PRINT_TEXT(29, 236, 279, 38, '页面内容改变布局打印');
            LODOP.SET_PRINT_STYLEA(2, 'FontSize', 18);
            LODOP.SET_PRINT_STYLEA(2, 'Bold', 1);
            LODOP.ADD_PRINT_HTM(
                88,
                40,
                321,
                185,
                document.getElementById('form1')!.innerHTML,
            );
            LODOP.ADD_PRINT_HTM(
                87,
                355,
                285,
                187,
                document.getElementById('form2')!.innerHTML,
            );
            LODOP.ADD_PRINT_TEXT(
                319,
                58,
                500,
                30,
                '注：其中《表单一》按显示大小，《表单二》在程序控制宽度(285px)内自适应调整',
            );
        }
        function prn3_preview() {
            LODOP = getLodop();
            LODOP.PRINT_INIT('打印控件功能演示_Lodop功能_全页');
            LODOP.ADD_PRINT_HTM(
                0,
                0,
                '100%',
                '100%',
                document.documentElement.innerHTML,
            );
            LODOP.PREVIEW();
        }
    };
    return (
        <div>
            <button onClick={onClick}>{'点我'}</button>
        </div>
    );
}
