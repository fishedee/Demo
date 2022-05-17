import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';

const GridExample = () => {
    const gridRef = useRef<any>();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'athlete',
            filter: 'agTextColumnFilter',
            //有filterParams的都不能自动刷新
            filterParams: {
                //弹出filter框的按钮有哪些，重置按钮，和应用按钮
                buttons: ['reset', 'apply'],
                //默认情况后，点击按钮并不会自动退出面板
            },
        },
        {
            field: 'age',
            maxWidth: 100,
            filter: 'agNumberColumnFilter',
            filterParams: {
                buttons: ['reset', 'apply'],
                //点击filter按钮后是否自动关闭filter框，且应用执行
                closeOnApply: true,
            },
        },
        {
            field: 'country',
            filter: 'agTextColumnFilter',
            filterParams: {
                //Clear按钮与Reset按钮不同的是，Clear按钮只是清除面板数据，并不会更新Filter数据
                buttons: ['clear', 'apply'],
            },
        },
        {
            field: 'year',
            filter: 'agNumberColumnFilter',
            filterParams: {
                //Cancel按钮就是取消了
                buttons: ['apply', 'cancel'],
                closeOnApply: true,
            },
            maxWidth: 100,
        },
        {
            headerName: '年',
            field: 'year',
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
                    let left = moment(filterLocalDateAtMidnight);
                    let right = moment(cellValue, 'YYYY');
                    let result = left.year() - right.year();
                    if (result < 0) {
                        return 1;
                    } else if (result > 0) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
                //默认inRange不包含两个边界点，需要指定这个选项
                inRangeInclusive: true,
            },
            maxWidth: 100,
        },
        { field: 'sport' },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: 'agNumberColumnFilter' },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            minWidth: 150,
            filter: true,
            floatingFilter: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <div className="ag-theme-alpine" style={{ height: '80%', width: '80%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;