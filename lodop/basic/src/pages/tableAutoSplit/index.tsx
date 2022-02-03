import getAntdLodop from '@/util/lodopAntd';
import { Modal } from 'antd';
import _ from 'underscore';

type DataType = {
    amount: number,
    price: number,
    total: number,
}
const data: DataType[] = [];
for (let i = 0; i != 16; i++) {
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
<caption>报表统计演示</caption>
<thead>
    <tr>
    <th width="100%" colspan="4" tindex="1">
      当前是第<font tdata="PageNO" format="ChineseNum" color="blue">##</font>页</span>/共<font tdata="PageCount" format="ChineseNum" color="blue">##</font></span>页
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
        <!--必须放在font里面才能生效-->
        <td width="20%"><font tdata="Count" format="#">第######行</font></td>
        <td width="26%"><%= single.amount %></td>
        <td width="26%"><%= single.price %></td>
        <td width="28%"><%= single.total %></td>
    </tr>
    <% } %>
    <tr>
    </tr>
</tbody>
<tfoot>
        <tr>
            <th width="20%"></th>
            <th align="left" width="26%" tdata="SubSum" format="#.##">
            本页数量小计：######</th>            
            <th width="26%"></th>
            <th align="left" width="28%" tdata="SubSum" format="#,##0.00">
            本页金额小计：######</th>   
        </tr>
        <tr>
            <th width="20%"></th>
            <th align="left" width="26%" tdata="AllSum" format="#.##" tindex="4">
            全部金额小计：######</th>            
            <th width="26%"></th>
            <th align="left" width="28%" tdata="AllSum" format="#,##0.00" tindex="2">
            全部数量小计：######</th>   
        </tr>
</tfoot>
`;

export default function IndexPage() {
    const tpl = _.template(tableContent);
    const lastData = tpl({
        data: data,
    });

    const print_preivew = () => {
        let LODOP = getAntdLodop();
        LODOP.ADD_PRINT_TABLE(100, 1, "99.8%", 250, lastData);
        LODOP.PREVIEW();
    };
    return (
        <div>
            <button onClick={print_preivew}>{'预览打印'}</button>
            <div dangerouslySetInnerHTML={{ __html: lastData }}></div>
        </div>
    );
}
