import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { ColDef, GetRowIdFunc } from 'ag-grid-community';

const App: React.FC<any> = () => {
    const [rowData, setRowData] = useState([
        { id: 1, make: "Toyota", model: "Celica", price: '9.23', date: '2022-01-02' },
        { id: 2, make: "Ford", model: "Mondeo", price: '31.2', date: '2021-01-02' },
        { id: 3, make: "Porsche", model: "Boxter", price: '188.7', date: '2022-03-02' }
    ]);

    const [columnDefs] = useState([
        //headerName是名称
        { headerName: '品牌', field: 'make' },
        //field是字段名
        { headerName: '型号', field: 'model' },
        //定义col的ID，以及类型
        { colId: 'price1', headerName: '价格', field: 'price', type: 'numberColumn' },
        //width没有定义，defaultColDef定义为170，dateColumn定义为200，最终值为200
        { headerName: '日期', field: 'date', type: 'dateColumn' },
        //width是宽度，这里定义的width为500，不会被defaultColDef的width为170覆盖
        { colId: 'price2', headerName: '价格2', field: 'price', type: 'numberColumn', width: 500 },
        //使用groupId与children，创建一个列分组
        {
            headerName: 'Medals',
            groupId: 'medalsGroup',
            children: [
                { colId: 'price3', headerName: '价格3', field: 'price', type: 'numberColumn' },
                { headerName: '型号', field: 'model' },
                //hide为隐藏该列
                { headerName: '品牌', field: 'make', hide: true },
            ]
        }
    ])

    //列的属性默认属性，由columnDefs + defaultColDef（和defaultColGroupDef） + columnType合并为最终类型
    //合并规则为：
    //原columnDefs的值中非undefined的属性不会被覆盖，只有undefined的属性会被覆盖
    //defaultColDef的优先级，比columnType的优先级要低
    const defaultColDef = useMemo(() => {
        return {
            width: 170,
            //可调宽度
            resizable: true,
        };
    }, []);

    const columnTypes = useMemo(() => {
        return {
            //定义数字类型
            numberColumn: {
                headerClass: 'ag-right-aligned-header',
                cellClass: 'ag-right-aligned-cell'
            },
            //定义日期类型
            dateColumn: {
                width: 200,
            },
        };
    }, []);

    const getRowId: GetRowIdFunc = useCallback((props) => {
        return props.data.id;
    }, []);
    const onGridReady = useCallback((params) => {
        console.log('grid ready');
    }, []);
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    getRowId={getRowId}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    columnTypes={columnTypes}
                    onGridReady={onGridReady} />
            </div>
        </div>
    );
};

export default App;