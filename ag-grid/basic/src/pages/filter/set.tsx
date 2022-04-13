import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';

const GridExample = () => {
    const gridRef = useRef<any>();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'athlete',
            //设置按照集合来筛选
            filter: 'agSetColumnFilter',
            //默认会从数据里面拿，我们也可以手动指定
            filterParams: {
                buttons: ['reset', 'apply'],
                // provide all days, even if days are missing in data!
                //values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            }
        },
        {
            field: 'age',
            maxWidth: 100,
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'country',
            filter: 'agSetColumnFilter',
            filterParams: {
                //默认是多次勾选一个集合的，这个是只筛选UI看到的集合，这个也好用，缺点是只能单选一个UI集合
                applyMiniFilterWhileTyping: true,
            },
        },
        {
            field: 'year',
            filter: 'agNumberColumnFilter',
            maxWidth: 100,
        },
        {
            field: 'sport',
            //多筛选器
            filter: 'agMultiColumnFilter',
            filterParams: {
                filters: [
                    {
                        filter: 'agTextColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                        filterParams: {
                            //默认是多次勾选一个集合的，这个是只筛选UI看到的集合，这个也好用，缺点是只能单选一个UI集合
                            applyMiniFilterWhileTyping: true,
                        },
                    }
                ]
            },
        },
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


    const reset = useCallback(() => {
        gridRef.current.api.setFilterModel(null);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <div className="ag-theme-alpine" style={{ height: '80%', width: '80%' }}>
                <Button onClick={reset}>重置筛选</Button>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    //加入侧边栏的筛选
                    sideBar={'filters'}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;