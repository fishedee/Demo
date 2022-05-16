'use strict';

import React, { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    GridReadyEvent,
} from 'ag-grid-community';

function getColumnDefsA() {
    return [
        { field: 'athlete', headerName: 'A Athlete' },
        { field: 'age', headerName: 'A Age' },
        { field: 'country', headerName: 'A Country' },
        { field: 'sport', headerName: 'A Sport' },
        { field: 'year', headerName: 'A Year' },
        { field: 'date', headerName: 'A Date' },
        { field: 'gold', headerName: 'A Gold' },
        { field: 'silver', headerName: 'A Silver' },
        { field: 'bronze', headerName: 'A Bronze' },
        { field: 'total', headerName: 'A Total' },
    ];
}

function getColumnDefsB() {
    return [
        { field: 'gold', headerName: 'B Gold' },
        { field: 'silver', headerName: 'B Silver' },
        { field: 'bronze', headerName: 'B Bronze' },
        { field: 'total', headerName: 'B Total' },
        { field: 'athlete', headerName: 'B Athlete' },
        { field: 'age', headerName: 'B Age' },
        { field: 'country', headerName: 'B Country' },
        { field: 'sport', headerName: 'B Sport' },
        { field: 'year', headerName: 'B Year' },
        { field: 'date', headerName: 'B Date' },
    ];
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            initialWidth: 100,
            sortable: true,
            resizable: true,
            filter: true,
        };
    }, []);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(getColumnDefsA());

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const setColsA = useCallback(() => {
        gridRef.current!.api.setColumnDefs(getColumnDefsA());
    }, []);

    const setColsB = useCallback(() => {
        gridRef.current!.api.setColumnDefs(getColumnDefsB());
    }, []);

    const clearColDefs = useCallback(() => {
        gridRef.current!.api.setColumnDefs([]);
    }, []);

    return (
        <div style={containerStyle}>
            <div className="test-header">
                <button onClick={setColsA}>Column Set A</button>
                <button onClick={setColsB}>Column Set B</button>
                <button onClick={clearColDefs}>Clear</button>
            </div>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    //默认情况下，setColumnDefs不仅会考虑列状态本身，还会考虑列的顺序
                    //如果，我们在调用setColumnDefs告知ag-grid，只需要考虑列状态，不需要列顺序，那么就打开maintainColumnOrder的开关就可以了
                    //maintainColumnOrder={true}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;