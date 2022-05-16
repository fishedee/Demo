import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { ColDef, ColumnResizedEvent, GetRowIdFunc } from 'ag-grid-community';

const App: React.FC<any> = () => {
    const [rowData, setRowData] = useState([
        { id: 1, make: "Toyota", model: "Celica", price: '9.23', date: '2022-01-02' },
        { id: 2, make: "Ford", model: "Mondeo", price: '31.2', date: '2021-01-02' },
        { id: 3, make: "Porsche", model: "Boxter", price: '188.7', date: '2022-03-02' }
    ]);

    const [columnDefs] = useState([
        { headerName: '品牌', field: 'make', width: 100 },
        { headerName: '型号', field: 'model', width: 200 },
        //flex是自动获取当前的剩余宽度，使得刚好填充屏幕宽度
        { colId: 'price1', headerName: '价格', field: 'price', type: 'numberColumn', flex: 1 },
        //flex为2，所以日期列的宽度，刚好为价格列宽度的2倍
        { headerName: '日期', field: 'date', type: 'dateColumn', flex: 2 },
    ])

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
    const onColmnResized = useCallback((param: ColumnResizedEvent) => {
        console.log("column resize", param.column);
        if (param.finished) {
            //只处理那些finish以后的事件
            console.log("column resize finish", param.column);
        }
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
                    onGridReady={onGridReady}
                    onColumnResized={onColmnResized} />
            </div>
        </div>
    );
};

export default App;