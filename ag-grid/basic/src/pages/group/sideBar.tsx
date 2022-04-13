
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
            //打开了enableRowGroup才能放入groupPanel中
            field: 'country',
            enableRowGroup: true,

            //只展示聚合数据，不展示明细数据
            //pivot: true,
            //筛选器的提供
            filter: 'agSetColumnFilter',
            filterParams: {
                //默认是多次勾选一个集合的，这个是只筛选UI看到的集合，这个也好用，缺点是只能单选一个UI集合
                applyMiniFilterWhileTyping: true,
            },
        },
        {
            field: 'athlete', enableRowGroup: true,

            //只展示聚合数据，不展示明细数据
            //pivot: true,
            filter: 'agSetColumnFilter',
            filterParams: {
                //默认是多次勾选一个集合的，这个是只筛选UI看到的集合，这个也好用，缺点是只能单选一个UI集合
                applyMiniFilterWhileTyping: true,
            },
        },
        {
            field: 'year', enableRowGroup: true,
            filter: 'agSetColumnFilter',
            filterParams: {
                //默认是多次勾选一个集合的，这个是只筛选UI看到的集合，这个也好用，缺点是只能单选一个UI集合
                applyMiniFilterWhileTyping: true,
            },
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
            filter: 'agTextColumnFilter',
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            resizable: true,
            sortable: true,
            unSortIcon: true,
            floatingFilter: true,
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <div className="ag-theme-alpine" style={{ height: '80%', width: '80%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    //分组后，分组列数据是否保留，hide为false的话不需要设置这一个
                    //showOpenedGroup={true}
                    onGridReady={onGridReady}
                    autoGroupColumnDef={autoGroupColumnDef}
                    //打开sideBar，可以自定义聚合方法，展示的列
                    sideBar={true}
                    //打开自定义group面板，并保留列
                    rowGroupPanelShow={'always'}
                    suppressDragLeaveHidesColumns={true}
                    suppressMakeColumnVisibleAfterUnGroup={true}
                    //子合计，没啥用，别用
                    //groupIncludeFooter={true}
                    //主合计
                    groupIncludeTotalFooter={true}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;