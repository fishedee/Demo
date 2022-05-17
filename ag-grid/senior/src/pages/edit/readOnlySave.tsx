'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    CellEditRequestEvent,
    ColDef,
    ColGroupDef,
    GetRowIdFunc,
    GetRowIdParams,
    Grid,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';

let rowImmutableStore: any[];

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete', minWidth: 160 },
        { field: 'age' },
        { field: 'country', minWidth: 140 },
        { field: 'year' },
        { field: 'date', minWidth: 140 },
        { field: 'sport', minWidth: 160 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 100,
            editable: true,
        };
    }, []);
    const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => {
                data.forEach((item, index) => (item.id = index));
                rowImmutableStore = data;
                setRowData(rowImmutableStore);
            });
    }, []);

    const onCellEditRequest = useCallback(
        (event: CellEditRequestEvent) => {
            //数据本身
            const data = event.data;
            //字段名
            const field = event.colDef.field;
            //字段值
            const newValue = event.newValue;
            const newItem = { ...data };
            newItem[field!] = event.newValue;
            console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
            rowImmutableStore = rowImmutableStore.map((oldItem) =>
                oldItem.id == newItem.id ? newItem : oldItem
            );
            setRowData(rowImmutableStore);
        },
        [rowImmutableStore]
    );

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    getRowId={getRowId}
                    //默认editor是原地修改数据的，打开readOnlyEdit以后，数据不能原地修改，而是通过发送请求来修改
                    readOnlyEdit={true}
                    onGridReady={onGridReady}
                    //cellEditRequest，数据更改后事件
                    onCellEditRequest={onCellEditRequest}
                ></AgGridReact>
            </div>
        </div>
    );
};