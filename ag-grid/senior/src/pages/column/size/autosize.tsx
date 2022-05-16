import React, { useCallback, useMemo, useRef, useState } from 'react';
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
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<React.CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete', width: 150, suppressSizeToFit: true },
        {
            field: 'age',
            headerName: 'Age of Athlete',
            width: 90,
            minWidth: 50,
            maxWidth: 150,
        },
        { field: 'country', width: 120 },
        { field: 'year', width: 90 },
        { field: 'date', width: 110 },
        { field: 'sport', width: 110 },
        { field: 'gold', width: 100 },
        { field: 'silver', width: 100 },
        { field: 'bronze', width: 100 },
        { field: 'total', width: 100 },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            resizable: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const sizeToFit = useCallback(() => {
        //根据屏幕宽度，调整列宽，刚好为屏幕宽度
        gridRef.current!.api.sizeColumnsToFit();
    }, []);

    const autoSizeAll = useCallback((skipHeader: boolean) => {
        //根据数据内容长度，调整列宽，使得每列的内容都能显示得到，skipHeader为true代表不考虑列头名称的宽度
        const allColumnIds: string[] = [];
        gridRef.current!.columnApi.getAllColumns()!.forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current!.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }, []);

    return (
        <div style={containerStyle}>
            <div className="button-bar">
                <button onClick={sizeToFit}>Size to Fit</button>
                <button onClick={() => autoSizeAll(false)}>Auto-Size All</button>
                <button onClick={() => autoSizeAll(true)}>
                    Auto-Size All (Skip Header)
                </button>
            </div>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;