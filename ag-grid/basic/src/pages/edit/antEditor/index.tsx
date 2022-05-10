'use strict';

import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

import nameSelect from './nameSelect2';
import numberEditor from './numberEditor';
import dateSelect from './dateSelect';
const ModeContext = createContext<{ mode: () => AgGridReact | null }>({ mode: () => null });
export {
    ModeContext
}
const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'name',
            editable: true,
            cellEditor: nameSelect,
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
        {
            field: 'birthday',
            editable: true,
            cellEditor: dateSelect,
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,

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
        console.log('cellEditingStopped', event.node.data);
    }, []);
    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <ModeContext.Provider value={{
                    mode: () => {
                        const ref = gridRef.current!;
                        const go = () => {
                            ref.api.stopEditing();
                            ref.api.tabToNextCell();
                            let cell = ref.api.getFocusedCell();
                            if (cell) {
                                ref.api.startEditingCell({
                                    rowIndex: cell.rowIndex,
                                    colKey: cell.column.getId(),
                                });
                            }
                        }
                        setTimeout(go, 0);
                        return ref;
                    }
                }}>

                    <AgGridReact
                        className='my-grid'
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onRowEditingStarted={onRowEditingStarted}
                        onRowEditingStopped={onRowEditingStopped}
                        onCellEditingStarted={onCellEditingStarted}
                        onCellEditingStopped={onCellEditingStopped}
                        singleClickEdit={true}
                        stopEditingWhenCellsLoseFocus={true}
                    ></AgGridReact>
                </ModeContext.Provider>
            </div>
        </div>
    );
};

export default GridExample;