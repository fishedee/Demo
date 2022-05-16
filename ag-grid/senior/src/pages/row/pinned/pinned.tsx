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
    GridReadyEvent,
    RowClassParams,
    RowStyle,
} from 'ag-grid-community';
import './style.css';

//自定义渲染器
const CustomPinnedRowRenderer: React.FC<any> = (props) => {
    return <span style={props.style}>{props.value}</span>;
}

function createData(count: number, prefix: string) {
    var result = [];
    for (var i = 0; i < count; i++) {
        result.push({
            athlete: prefix + ' Athlete ' + i,
            age: prefix + ' Age ' + i,
            country: prefix + ' Country ' + i,
            year: prefix + ' Year ' + i,
            date: prefix + ' Date ' + i,
            sport: prefix + ' Sport ' + i,
        });
    }
    return result;
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'athlete',
            cellRendererSelector: function (params) {
                //pinned数据与普通数据，使用相同的列方式渲染，用node.rowPinned来区分
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            //自定义渲染器的默认参数
                            style: { color: 'blue' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },
        },
        {
            field: 'age',
            cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { 'font-style': 'italic' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },
        },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 200,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);
    const getRowStyle = useCallback(function (
        params: RowClassParams
    ): RowStyle | undefined {
        //行的style设置
        if (params.node.rowPinned) {
            return { 'font-weight': 'bold' };
        }
    },
        []);
    const pinnedTopRowData = useMemo<any[]>(() => {
        return createData(1, 'Top');
    }, []);
    const pinnedBottomRowData = useMemo<any[]>(() => {
        return createData(1, 'Bottom');
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const onPinnedRowTopCount = useCallback(() => {
        var headerRowsToFloat = (document.getElementById('top-row-count') as any)
            .value;
        var count = Number(headerRowsToFloat);
        var rows = createData(count, 'Top');
        //命令方式地设置pinnedTopRowData，与pinnedBottomRowData
        gridRef.current!.api.setPinnedTopRowData(rows);
    }, []);

    const onPinnedRowBottomCount = useCallback(() => {
        var footerRowsToFloat = (document.getElementById('bottom-row-count') as any)
            .value;
        var count = Number(footerRowsToFloat);
        var rows = createData(count, 'Bottom');
        gridRef.current!.api.setPinnedBottomRowData(rows);
    }, []);

    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <div className="example-header">
                    <span>Rows to Pin on Top:</span>
                    <select
                        onChange={onPinnedRowTopCount}
                        id="top-row-count"
                        style={{ marginLeft: '10px', marginRight: '20px' }}
                    >
                        <option value="0">0</option>
                        <option value="1" selected={true}>
                            1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <span>Rows to Pin on Bottom:</span>
                    <select
                        onChange={onPinnedRowBottomCount}
                        id="bottom-row-count"
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="0">0</option>
                        <option value="1" selected={true}>
                            1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        getRowStyle={getRowStyle}
                        //pinnedTopRowData相当有用，它们与普通grid共用列，但是不同的数据源
                        //但是pinned数据，不参与排序，筛选，分组，选择
                        pinnedTopRowData={pinnedTopRowData}
                        pinnedBottomRowData={pinnedBottomRowData}
                        onGridReady={onGridReady}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;