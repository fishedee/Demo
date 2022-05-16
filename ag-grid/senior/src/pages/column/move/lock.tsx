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

const GridExample = () => {
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', dispaly: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'athlete',
            width: 200,
        },
        {
            //该列总是在最左边
            field: 'age', lockPosition: 'left', cellClass: 'locked-col',
            width: 500
        },
        { field: 'country', width: 500 },
        { field: 'year', width: 500 },
        {
            field: 'total',
            //该列总是在最右边
            lockPosition: 'right', cellClass: 'locked-col', width: 500
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    suppressDragLeaveHidesColumns={true}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;