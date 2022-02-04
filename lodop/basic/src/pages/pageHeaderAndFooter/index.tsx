import { LodopType } from '@/util/lodop';
import getAntdLodop from '@/util/lodopAntd';
import { Modal } from 'antd';
import _ from 'underscore';

type DataType = {
    amount: number,
    price: number,
    total: number,
}
const data: DataType[] = [];
for (let i = 0; i != 60; i++) {
    let single = {
        amount: i + 10,
        price: i * 0.1 + 1.5,
        total: 0,
    };
    single.total = single.amount * single.price;
    data.push(single);
}
const tableContent = `
<table border="1" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse" bordercolor="#000000">
<thead>
    <tr>
    <th width="100%" colspan="4" tindex="1">
      <span tdata="PageNO" format="ChineseNum" color="blue">当前是第##页/</span> 
      <span tdata="PageCount" format="ChineseNum" color="blue">共##页</span>
    </tr>
    <tr>
        <th width="20%">序号</th>
        <th width="26%">数量</th>
        <th width="26%">单价</th>
        <th width="28%">金额</th>
    </tr>
</thead>
<tbody>
    <% for(var i = 0 ;i != data.length;i ++){ var single = data[i];%>
    <tr>
        <!--放在td里面不能生效，放在th或者span里面都可以-->
        <td><span tdata="Count" format="#">第######行</span></td>
        <td><%= single.amount %></td>
        <td><%= single.price %></td>
        <td><%= single.total %></td>
    </tr>
    <% } %>
    <tr>
    </tr>
</tbody>
<tfoot>
        <tr>
            <th align="right" colspan="2" tdata="SubSum" format="#.##">
            本页数量小计：######</th>   
            <th align="right" colspan="2" tdata="SubSum" format="#,##0.00">
            本页金额小计：######</th>   
        </tr>
        <tr>
            <th align="right" colspan="2" tdata="AllSum" format="#.##" tindex="4">
            全部金额小计：######</th>   
            <th align="right" colspan="2" tdata="AllSum" format="ChineseNum" tindex="2">
            全部数量小计：######</th>   
        </tr>
</tfoot>
`;

const pageHeader = `
<h1 style="LINE-HEIGHT: 30px;color:#0000FF;" align="center">销售发货单-01</h1>
<table border="0" cellspacing="0" cellpadding="0" width="100%">
  <tbody>
  <tr>
    <td width="43%" style='color:#0000FF'>所在店铺：<span id="rpt_Pro_Order_List_ctl00_lbl_eShop_Name">雅瑞专卖店</span></td>
    <td width="33%" style='color:#0000FF'>发货单号：<span>2011050810372</span></td>
    <td style='color:#0000FF'>快递单号：</td>
  </tr>
  <tr>
    <td style='color:#0000FF'>收 件 人：<span>王斌</span></td> 
    <td style='color:#0000FF'>网店单号：<span>74235823905643</span></td>
    <td style='color:#0000FF'>发货日期：2011-5-10</td>
  </tr>
  <tr>
    <td style='color:#0000FF'>电话号码：<span>13935429860　</span></td>
    <td style='color:#0000FF'>收件人ID：<span>云星王斌</span></td>
    <td style='color:#0000FF'>&nbsp;</td>
  </tr>
  </tbody>
</table>
`

const pageFooter = `
<div style="LINE-HEIGHT: 30px;color:#0000FF" align="center">感谢您对我们雅瑞专卖店的支持，(发货单01的表格外“页脚”，紧跟表格)</div>
`

const printHeader = `
总页号：<span tdata='pageNO' style='color:#0000ff' format='ChineseNum'>第##页</span>/<span tdata='pageCount' style='color:#0000ff' format='ChineseNum'>共##页</span>
`

export default function IndexPage() {
    const tpl = _.template(tableContent);
    const lastData = tpl({
        data: data,
    });

    const createPage = (LODOP: LodopType) => {
        //每页中间的表格，1号对象
        LODOP.ADD_PRINT_TABLE(135, "5%", "90%", 314, lastData);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
        //页头的设置
        LODOP.ADD_PRINT_HTM(26, "5%", "90%", 109, pageHeader);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
        //链接到1号对象
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);

        //页尾的设置
        LODOP.ADD_PRINT_HTM(444, "5%", "90%", 54, pageFooter);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", 1);


        //总页眉，没有LinkedItem，每个页面都有
        LODOP.ADD_PRINT_HTM(1, 600, 300, 100, printHeader);
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.ADD_PRINT_TEXT(3, 34, 196, 20, "总页眉：《两个发货单的演示》");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
    }
    const print_preivew = () => {
        let LODOP = getAntdLodop();
        createPage(LODOP);
        LODOP.PREVIEW();
    };
    const print_design = () => {
        let LODOP = getAntdLodop();
        createPage(LODOP);
        LODOP.PRINT_DESIGN();
    };
    return (
        <div>
            <button onClick={print_preivew}>{'预览打印'}</button>
            <button onClick={print_design}>{'打印设计'}</button>
            <div dangerouslySetInnerHTML={{ __html: printHeader }}></div>
            <div dangerouslySetInnerHTML={{ __html: pageHeader }}></div>
            <div dangerouslySetInnerHTML={{ __html: lastData }}></div>
            <div dangerouslySetInnerHTML={{ __html: pageFooter }}></div>
        </div>
    );
}
