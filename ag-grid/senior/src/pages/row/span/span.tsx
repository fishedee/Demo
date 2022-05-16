'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    ICellRendererComp,
    ICellRendererParams,
    RowSpanParams,
} from 'ag-grid-community';
import getData from './data';
import './style.css';

function rowSpan(params: RowSpanParams) {
    if (params.data.show) {
        return 4;
    } else {
        return 1;
    }
}

const ShowCellRenderer: React.FC<any> = (props) => {
    const cellBlank = !props.value;
    if (cellBlank) {
        return null;
    }
    return (
        <div>
            <div className="show-name">{props.value.name}</div>
            <div className="show-presenter">{props.value.presenter}</div>
        </div>
    );
}
const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'localTime' },
        {
            field: 'show',
            cellRenderer: ShowCellRenderer,
            //ag-grid的rowSpan是一个掩眼法，它没有真的在table里面使用rowSpan
            //它是根据rowSpan的数值来设置每个单元格的高度
            //例如，当rowSpan为2的时候，这个单元格的高度刚好为2倍的行高。而那个被rowSpan覆盖的单元格依然会被正常渲染出来
            rowSpan: rowSpan,
            cellClassRules: {
                //所以，rowSpan都需要一个特别的操作，将rowSpan的单元格设置background为一个具体的颜色，来掩盖下面的单元格
                //你可以试试更改show-cell为show-cell2的类名就知道了
                //cellClassRules的意思是，value（指当前的show字段）不为空的时候，该单元格就赋予一个show-cell的类名
                'show-cell': 'value !== undefined',
            },
            width: 200,
        },
        { field: 'a' },
        { field: 'b' },
        { field: 'c' },
        { field: 'd' },
        { field: 'e' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            resizable: true,
            width: 170,
        };
    }, []);

    /**
     * AgGrid的rowSpan有很多限制，包括有：
     * 不要在最后一行进行rowSpan，否则会产生span过高留有空行
     * 需要设置cellClassRules来设置背景，保证rowSpan的下面行看不到
     * 覆盖行肉眼上看不到，但是依然有效果，例如焦点转移的时候依然会转到它身上，（这简直太糟糕了，看不到的单元格还会占据焦点位置）
     * 动态行高，自动行高都用不了
     * 排序和筛选都有奇怪的展示效果
     * 范围选择也会有奇怪的效果，不能正常工作
     */
    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    //使用rowSpan的时候，我们都会加这个suppressRowTransform属性
                    //这个属性的意思，虚拟列表使用top来实现，而不是使用transform来实现
                    suppressRowTransform={true}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;