'use strict';

import React, { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    ColumnPinnedEvent,
    Grid,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';

const GridExample = () => {
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', dispaly: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'athlete',
            width: 200,
        },
        {
            //该列总是在最左边，固定左侧，有自己独立的滚动条
            field: 'age', pinned: 'left', cellClass: 'locked-col',
            width: 500
        },
        { field: 'country', width: 500 },
        { field: 'year', width: 500 },
        {
            field: 'total',
            //该列总是在最右边，固定右侧，有自己独立的滚动条
            pinned: 'right', cellClass: 'locked-col', width: 500
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            //默认允许通过拖动方式，将部分列pinned到左侧或者右侧，使用lockPinned以后能禁止这种操作
            //lockPinned:true
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const onColumnPinned = useCallback((params: ColumnPinnedEvent) => {
        console.log('column pinned', params);
    }, []);
    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    suppressDragLeaveHidesColumns={true}
                    onGridReady={onGridReady}
                    onColumnPinned={onColumnPinned}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;