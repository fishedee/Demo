'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    ICellEditorParams,
    RowEditingStartedEvent,
    RowEditingStoppedEvent,
} from 'ag-grid-community';
import getData from './data';

import numberEditor from './numberEditor';

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'name',
            editable: true,
            cellEditor: numberEditor,
            //Enter事件默认会被Ag-Grid处理掉，不会冒泡到触发位置
            //Enter事件默认会被Ag-Grid处理为进入和退出编辑状态的方法
            //但是当cellEditor本身也需要去处理Enter事件的时候，就会出现问题
            suppressKeyboardEvent: (params) => {
                if (!params.editing) return false
                if (params.event.key == 'Enter') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            field: 'age',
            editable: true,
            cellEditor: numberEditor,
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
        };
    }, []);

    const onRowEditingStarted = useCallback((event: RowEditingStartedEvent) => {
        console.log('never called - not doing row editing');
    }, []);

    const onRowEditingStopped = useCallback((event: RowEditingStoppedEvent) => {
        console.log('never called - not doing row editing');
    }, []);

    const onCellEditingStarted = useCallback((event: CellEditingStartedEvent) => {
        console.log('cellEditingStarted');
    }, []);

    const onCellEditingStopped = useCallback((event: CellEditingStoppedEvent) => {
        console.log('cellEditingStopped');
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onRowEditingStarted={onRowEditingStarted}
                    onRowEditingStopped={onRowEditingStopped}
                    onCellEditingStarted={onCellEditingStarted}
                    onCellEditingStopped={onCellEditingStopped}
                    singleClickEdit={true}
                //stopEditingWhenCellsLoseFocus={true}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;