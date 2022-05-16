
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import {
    ColDef,
    ColumnRowGroupChangedEvent,
    SortChangedEvent,
} from 'ag-grid-community';

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        //对athlete asc，country asc的方式进行排序，sortIndex是排序的顺序
        { field: 'country', sortable: true, sort: 'asc', sortIndex: 1, hide: false },
        { field: 'athlete', sortable: true, sort: 'asc', sortIndex: 0, hide: false },
        { field: 'year' },
        //分组后的合并函数
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
        { field: 'age' },
        { field: 'date' },
        //sortable就是是否允许在UI中自定义排序
        { field: 'sport', sortable: true, },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            resizable: true,
            //所有列均可排序
            sortable: true,
            //没有排序的列，也要显示可以排序的图标
            unSortIcon: true,
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

    const clearSort = () => {
        gridRef.current!.columnApi.applyColumnState({
            defaultState: {
                sort: null,
            }
        });
    }

    const getSort = () => {
        const columnState = gridRef.current!.columnApi.getColumnState();
        console.log('columnState', columnState);
    }

    const onSortChanged = useCallback((params: SortChangedEvent) => {
        console.log('SortChangedEvent', params);
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
            <div>
                <Button onClick={clearSort}>{'清除排序'}</Button>
                <Button onClick={getSort}>{'获取排序'}</Button>
            </div>
            <div className="ag-theme-alpine" style={{ width: '100%', flex: '1' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onSortChanged={onSortChanged}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;