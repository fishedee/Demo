import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { GetRowIdParams } from 'ag-grid-community';

const App: React.FC<any> = () => {
    const [rowData, setRowData] = useState([
        { id: 2, make: "Ford", model: "Mondeo", price: '91.2', price2: 91.2 },
        { id: 1, make: "Toyota", model: "Celica", price: '3.23', price2: 3.23 },
        { id: 3, make: "Porsche", model: "Boxter", price: '188.7', price2: 188.7 }
    ]);

    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { headerName: '价格（默认排序）', field: 'price' },
        {
            headerName: '价格（自定义排序）', field: 'price',
            //注意这个comparator与filter中的comparator的不同
            //sort的comparator是为了grid数组中的两两比较
            //filter中的comparator的是为了与目标数据的比较
            comparator: (valueA: any, valueB: any, nodeA: any, nodeB: any, isInverted: boolean) => {
                let v1Number = Number.parseFloat(valueA);
                let v2Number = Number.parseFloat(valueB);
                if (v1Number == v2Number) return 0;
                return (v1Number > v2Number) ? 1 : -1;
            }
        }
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
        const rand = Math.floor(Math.random() * 10000) / 100;
        let newRowData = [
            ...rowData,
            {
                id: maxId + 1,
                make: "M" + maxId,
                model: "C" + maxId,
                price: rand + '',
                price2: rand,
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
                    animateRows={true}
                    //默认不支持多列排序，需要用multiSortKey来指定
                    multiSortKey={'ctrl'}>
                </AgGridReact>
            </div>
        </div>
    );
};

export default App;