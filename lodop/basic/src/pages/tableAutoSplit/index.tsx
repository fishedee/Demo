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
