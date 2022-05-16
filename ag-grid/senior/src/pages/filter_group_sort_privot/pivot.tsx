
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import {
    ColDef,
    ColumnPivotChangedEvent,
    ColumnRowGroupChangedEvent,
} from 'ag-grid-community';

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        //对country列进行分组rowGroup为true，分组后该列不消失hide为false
        //rowGroupIndex为分组的顺序，以country作为分组
        { field: 'country', enableRowGroup: true, rowGroup: true, rowGroupIndex: 0 },
        { field: 'athlete' },
        //将year的数据行，转换为year列
        { field: 'year', pivot: true, pivotIndex: 0 },
        //分组后的合并函数
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total' },
        { field: 'age' },
        { field: 'date' },
        //enablePivot就是是否允许在panel上进行自定义分组
        { field: 'sport', enablePivot: true, },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            flex: 1,
            minWidth: 150,
            resizable: true,
        };
    }, []);
    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: 'MyGroup',
            minWidth: 300,
        };
    }, []);

    const gridRef = useRef<AgGridReact>(null);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    const clearPivot = () => {
        gridRef.current!.columnApi.applyColumnState({
            defaultState: {
                pivot: false,
            }
        });
    }

    const getPivot = () => {
        const columnState = gridRef.current!.columnApi.getColumnState();
        console.log('columnState', columnState);
    }

    const onColumnPivotChanged = useCallback((params: ColumnPivotChangedEvent) => {
        console.log('rowGroupChanged', params);
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
            <div>
                <Button onClick={clearPivot}>{'清除Pivot'}</Button>
                <Button onClick={getPivot}>{'获取Pivot'}</Button>
            </div>
            <div className="ag-theme-alpine" style={{ width: '100%', flex: '1' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onColumnPivotChanged={onColumnPivotChanged}
                    rowGroupPanelShow={'always'}
                    //打开pivotMode
                    pivotMode={true}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;