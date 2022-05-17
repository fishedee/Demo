
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'country',
            //打开了enableRowGroup才能放入groupPanel中
            enableRowGroup: true,
        },
        {
            field: 'athlete',
            enableRowGroup: true,
        },
        {
            field: 'year',
            enableRowGroup: true,
        },
        //分组后的合并函数
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
        { field: 'age' },
        { field: 'date' },
        {
            field: 'sport',
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            resizable: true,
            sortable: true,
            unSortIcon: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);


    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: 'MyGroup',
            minWidth: 300,

            //似乎没啥用
            // enables filtering on the group column
            //filter: true,
        };
    }, []);

    return (
        <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    //分组后，分组列数据是否保留，hide为false的话不需要设置这一个
                    //showOpenedGroup={true}
                    onGridReady={onGridReady}
                    autoGroupColumnDef={autoGroupColumnDef}
                    //打开自定义group面板，并保留列
                    //顶部的分组列，可以通过拖动列的方式自定义分组
                    rowGroupPanelShow={'always'}
                    suppressDragLeaveHidesColumns={true}
                    suppressMakeColumnVisibleAfterUnGroup={true}
                    //子合计，没啥用，别用
                    //groupIncludeFooter={true}
                    //主合计
                    groupIncludeTotalFooter={true}
                    animateRows={true}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;