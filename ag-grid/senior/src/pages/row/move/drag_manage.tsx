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
    RowDragEndEvent,
    RowDragEvent,
} from 'ag-grid-community';

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        //对该列增加一个手型按钮，可以拖动移行
        { field: 'athlete', rowDrag: true },
        { field: 'country' },
        { field: 'year', width: 100 },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 170,
            sortable: true,
            filter: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const onRowDragEnd = useCallback((params: RowDragEndEvent) => {
        console.log('rowDrag end', params);
        //拖动以后，这个数据依然是旧的
        console.log('data', rowData?.slice(0, 10));
        //forEachNode里面的才是新数据
        const result: any[] = [];
        params.api.forEachNode((single, index) => {
            if (index <= 10) {
                result.push(single.data);
            }
        });
        console.log('allData', result);
    }, [rowData]);
    /**
     * rowDragManaged模式的限制点：
     * 只能在Client模式中使用
     * 无法在分页，排序，筛选，分组，支点模式中使用
     */
    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    //拖动移行模式，将移行以后自动更新数据，默认是需要手动更新数据的
                    rowDragManaged={true}
                    onRowDragEnd={onRowDragEnd}
                    //移行的过程中，其他行不产生动画变化
                    suppressMoveWhenRowDragging={true}
                    animateRows={true}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;