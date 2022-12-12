'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef, ColGroupDef, GetRowIdParams, Grid, GridOptions, ICellRendererParams,
    ValueGetterParams
} from 'ag-grid-community';
import './style.css'
import getData from './getData';
import { Button } from 'antd';

const RowIndexRender: React.FC<ICellRendererParams> = (props) => {
    const rowIndex = props.rowIndex + 1;
    console.log('RowIndexRender');
    return <span>{rowIndex}</span>
}

const AllNameRender: React.FC<ICellRendererParams> = (props) => {
    console.log('allNameRender');
    const data = props.data;
    const allName = 'AllName:[' + data.firstName + " " + data.lastName + "]";
    return <span>{allName}</span>
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<React.CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            colId: 'checkbox',
            checkboxSelection: true,
            width: 100,
        },
        {
            //无脏检查
            headerName: '行号（错误示范）',
            colId: 'rowId1',
            cellRenderer: RowIndexRender,
        },
        {
            //valueGetter作脏检查
            headerName: '行号（valueGetter作脏检查，错误示范）',
            colId: 'rowId2',
            valueGetter: (params: ValueGetterParams) => {
                console.log('checkRender', params);
                return params.node?.rowIndex;
            },
            cellRenderer: RowIndexRender,
        },
        { field: 'firstName', sortable: true, editable: true },
        { field: 'lastName', sortable: true, editable: true },
        {
            //原数据没有allName字段，自动脏检查会失败
            colId: 'all1',
            headerName: '全名（错误示范）',
            field: 'allName',
            cellRenderer: AllNameRender,
        },
        {
            //用valueGetter来反馈ag-grid，脏检查使用的是valueGetter反馈的结果
            colId: 'all2',
            headerName: '全名（valueGetter作脏检查）',
            valueGetter: (params: ValueGetterParams) => {
                const data = params.data;
                return data.firstName + "_" + data.lastName;
            },
            cellRenderer: AllNameRender,
        },
        {
            //用valueGetter和equals来反馈ag-grid，脏检查使用的是equals反馈的结果
            colId: 'all3',
            headerName: '全名（equals作脏检查，错误示范）',
            valueGetter: (params: ValueGetterParams) => {
                const data = params.data;
                return data;
            },
            equals: (left: any, right: any) => {
                //left与right的类型来自于field，或者valueGetter的结果
                if (left.firstName != right.firstName) {
                    return false;
                }
                if (left.lastName != right.lastName) {
                    return false;
                }
                return true;
            },
            cellRenderer: AllNameRender,
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            //flex: 1,
            minWidth: 110,
            resizable: true,
        };
    }, []);

    const getAllData = useCallback(() => {
        let rowData: any[] = [];
        gridRef.current!.api.forEachNode((rowNode, index) => {
            rowData.push(rowNode.data);
        });
        return rowData;
    }, []);

    const refreshAllData = useCallback(() => {
        const allData = getData();
        gridRef.current!.api.setRowData(allData);
    }, []);

    const setLastNameInPlace = useCallback(() => {
        const rows = gridRef.current!.api.getSelectedRows();
        rows.forEach(single => {
            single.lastName = 'jj';
        })
        gridRef.current!.api.applyTransaction({
            update: rows,
        });
    }, []);

    const setLastNameNoInPlace = useCallback(() => {
        const rows = gridRef.current!.api.getSelectedRows();
        let updatedRows = rows.map(single => {
            return {
                ...single,
                lastName: 'jj',
            }
        })
        gridRef.current!.api.applyTransaction({
            update: updatedRows,
        });
    }, []);

    const refreshForce = useCallback(() => {
        gridRef.current!.api.refreshCells({
            force: true,
        });
    }, []);

    const refreshNotForce = useCallback(() => {
        gridRef.current!.api.refreshCells({
        });
    }, []);

    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data.id;
    }, []);
    return (
        <div style={containerStyle}>
            <div>
                <Button onClick={getAllData}>{'获取数据'}</Button>
                <Button onClick={refreshAllData}>{'重置全部数据'}</Button>
                <Button onClick={setLastNameInPlace}>{'原地选中行设置lastName（错误示范）'}</Button>
                <Button onClick={setLastNameNoInPlace}>{'非原地选中行设置lastName'}</Button>
                <Button onClick={refreshForce}>{'强制刷新'}</Button>
                <Button onClick={refreshNotForce}>{'非强制刷新'}</Button>
            </div>
            <div className="grid-wrapper">
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={refreshAllData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        getRowId={getRowId}
                        rowSelection={'multiple'}
                        animateRows={true}
                        singleClickEdit={true}
                        stopEditingWhenCellsLoseFocus={true}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;