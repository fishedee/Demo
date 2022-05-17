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
    ValueGetterParams,
} from 'ag-grid-community';

function createRowData() {
    var rowData = [];
    for (var i = 0; i < 100; i++) {
        rowData.push({
            a: Math.floor(i % 4),
            b: Math.floor(i % 7),
        });
    }
    return rowData;
}

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(createRowData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            headerName: '#',
            maxWidth: 100,
            valueGetter: (params: ValueGetterParams) => {
                //使用node参数
                return params.node ? params.node.rowIndex : null;
            },
        },
        { field: 'a' },
        { field: 'b' },
        {
            headerName: 'A + B',
            colId: 'a&b',
            valueGetter: (params: ValueGetterParams) => {
                //多个参数
                return params.data.a + params.data.b;
            },
        },
        {
            headerName: 'A * 1000',
            minWidth: 95,
            valueGetter: (params: ValueGetterParams) => {
                //单个参数
                return params.data.a * 1000;
            },
        },
        {
            headerName: 'B * 137',
            minWidth: 90,
            valueGetter: (params: ValueGetterParams) => {
                return params.data.b * 137;
            },
        },
        {
            headerName: 'Random',
            minWidth: 90,
            valueGetter: () => {
                //随机数
                //在跳出viewPort重新进入以后会刷新
                return Math.floor(Math.random() * 1000);
            },
        },
        {
            headerName: 'Chain',
            valueGetter: (params: ValueGetterParams) => {
                //相当于a+b，然后*1000，没啥意义
                return params.getValue('a&b') * 1000;
            },
        },
        {
            headerName: 'Const',
            minWidth: 85,
            valueGetter: () => {
                //常量
                return 99999;
            },
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 75,
            sortable: true,
            // cellClass: 'number-cell'
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;