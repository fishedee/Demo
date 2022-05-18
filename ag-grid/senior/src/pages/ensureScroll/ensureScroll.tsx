
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from 'antd';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

const IdRenderer: React.FC<ICellRendererParams> = (props) => {
    return (<span>{props.rowIndex + 1}</span>);
}
const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'id',
            cellRenderer: IdRenderer,
        },
        {
            //打开了enableRowGroup才能放入groupPanel中
            field: 'country',
            width: 300,
        },
        {
            field: 'athlete', enableRowGroup: true,
            width: 300,
        },
        {
            field: 'year', enableRowGroup: true,
            width: 300,
        },
        {
            field: 'sport',
            filter: 'agTextColumnFilter',
        },
        { field: 'gold', aggFunc: 'sum', width: 300 },
        { field: 'silver', aggFunc: 'sum', width: 300 },
        { field: 'bronze', aggFunc: 'sum', width: 300 },
        { field: 'total', aggFunc: 'sum', width: 300 },
        { field: 'age', width: 300 },
        { field: 'date', width: 300 },

    ]);
    const defaultColDef = useMemo(() => {
        return {
            minWidth: 150,
            resizable: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    const gridRef = useRef<AgGridReact>(null);
    const jumpRow = () => {
        gridRef.current!.api.ensureIndexVisible(100, 'middle');
    }
    const jumpCol = () => {
        gridRef.current!.api.ensureColumnVisible('age');
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
            <div>
                <Button onClick={jumpRow}>{'跳转到第100行'}</Button>
                <Button onClick={jumpCol}>{'跳转age列'}</Button>
            </div>
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    animateRows={true}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;