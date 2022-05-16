import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { GetRowIdParams } from 'ag-grid-community';

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

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
        };
    }, []);
    const gridRef = useRef<AgGridReact>(null);

    const add = () => {
        let maxId = -1;
        rowData.forEach(single => {
            if (maxId <= single.id) {
                maxId = single.id;
            }
        })
        let newRowData = [
            ...rowData,
            {
                id: maxId + 1,
                make: "M" + maxId,
                model: "C" + maxId,
                price: maxId,
            },
        ]
        setRowData(newRowData);
    }

    let del = () => {
        let selectedRows = gridRef.current!.api.getSelectedNodes();
        let selectionRowIds = selectedRows.map(single => {
            return single.data.id;
        });
        let newRowData = rowData.filter((single) => {
            return selectionRowIds.indexOf(single.id) < 0;
        });
        console.log(rowData, selectionRowIds, newRowData);
        setRowData(newRowData);
    }

    //需要指定getRowId，才能启用animateRows，而且在重新刷新数据的时候更少地触发render
    const getRowId = useCallback((props: GetRowIdParams) => {
        return props.data.id;
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
            <div>
                <Button onClick={add}>{'添加一行'}</Button>
                <Button onClick={del}>{'删除一行'}</Button>
            </div>
            <div className="ag-theme-alpine" style={{ width: '100%', flex: '1' }}>
                <AgGridReact
                    ref={gridRef}
                    getRowId={getRowId}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    rowSelection={'multiple'}
                    columnDefs={columnDefs}
                    animateRows={true}>
                </AgGridReact>
            </div>
        </div>
    );
};

export default App;