import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { ColDef, ColumnMovedEvent, ColumnResizedEvent, GetRowIdFunc } from 'ag-grid-community';

const App: React.FC<any> = () => {
    const [rowData, setRowData] = useState([
        { id: 1, make: "Toyota", model: "Celica", price: '9.23', date: '2022-01-02' },
        { id: 2, make: "Ford", model: "Mondeo", price: '31.2', date: '2021-01-02' },
        { id: 3, make: "Porsche", model: "Boxter", price: '188.7', date: '2022-03-02' }
    ]);

    const [columnDefs] = useState([
        { headerName: '品牌', field: 'make', minWidth: 100 },
        {
            headerName: '型号', field: 'model', maxWidth: 300,
            //禁止该列拖着移动，但是允许被其他列推动着移动
            suppressMovable: true
        },
        {
            colId: 'price1', headerName: '价格', field: 'price', type: 'numberColumn', width: 500,
            //禁止该列拖到Grid外面隐藏
            lockVisible: true,
        },
        { headerName: '日期', field: 'date', type: 'dateColumn' },
    ])

    const defaultColDef = useMemo(() => {
        return {
            width: 170,
            //默认就支持
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
    const onColmnMoved = useCallback((param: ColumnMovedEvent) => {
        console.log("column move", param);
    }, []);
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div className="ag-theme-alpine" style={{ height: '80%', marginTop: '10%', width: '100%' }}>
                <AgGridReact
                    getRowId={getRowId}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    columnTypes={columnTypes}
                    onGridReady={onGridReady}
                    onColumnMoved={onColmnMoved}
                //默认情况下，移动列有动画效果
                //suppressColumnMoveAnimation={false}
                //默认情况下，就支持拖动列来移动列位置，禁用的话需要使用suppressMovableColumns
                //suppressMovableColumns={true}
                //默认情况下，就支持将列拖出去屏幕以外来消失列，禁用的话需要使用suppressDragLeaveHidesColumns
                //suppressDragLeaveHidesColumns={true}
                />
            </div>
        </div>
    );
};

export default App;