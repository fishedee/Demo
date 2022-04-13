import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
//引入主题
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button } from 'antd';
import { GetRowIdFunc } from 'ag-grid-community';

const App: React.FC<any> = () => {
    const [rowData, setRowData] = useState([
        { id: 1, make: "Toyota", model: "Celica", price: 35000 },
        { id: 2, make: "Ford", model: "Mondeo", price: 32000 },
        { id: 3, make: "Porsche", model: "Boxter", price: 72000 }
    ]);

    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ])

    const add = () => {
        let newRowData = [
            ...rowData,
            {
                id: rowData.length + 1,
                make: "M1",
                model: "C2",
                price: 23000,
            },
        ]
        setRowData(newRowData);
    }
    //每行的style
    const getRowStyle = (params: any) => {
        if (params.node.rowIndex % 2 === 0) {
            return { background: 'red' };
        }
    };
    //每行的class
    const getRowClass = (params: any) => {
        if (params.node.rowIndex % 2 === 0) {
            return 'my-shaded-effect';
        }
    };

    const getRowId: GetRowIdFunc = useCallback((props) => {
        return props.data.id;
    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <Button onClick={add}>{'添加一行'}</Button>
            <div className="ag-theme-balham" style={{ height: '80%', width: '80%' }}>
                <AgGridReact
                    getRowId={getRowId}
                    getRowStyle={getRowStyle}
                    getRowClass={getRowClass}
                    rowData={rowData}
                    columnDefs={columnDefs}>
                </AgGridReact>
            </div>
        </div>
    );
};

export default App;