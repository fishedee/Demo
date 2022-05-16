'use strict';

import React, { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    GridReadyEvent,
    SideBarDef,
} from 'ag-grid-community';

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'sport' },
        { field: 'year' },
        { field: 'date' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            sortable: true,
            resizable: true,
            width: 150,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
        };
    }, []);
    const sideBar = useMemo<
        SideBarDef | string | string[] | boolean | null
    >(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const onBtSortAthlete = useCallback(() => {
        //setColumnDefs，每次都要传入所有列，没有传入的列看成被删掉了
        //applyColumnState，可以只传入一个列，没有传入的列看成保持不变
        /*columnState数据
       * aggFunc: null
       * colId: "athlete"
       * flex: null
       * hide: false
       * pinned: null
       * pivot: false
       * pivotIndex: null
       * rowGroup: false
       * rowGroupIndex: null
       * sort: null
       * sortIndex: null
       * width: 150
       */
        //只对athlete列，设置为升序排列
        gridRef.current!.columnApi.applyColumnState({
            state: [{ colId: 'athlete', sort: 'asc' }],
        });
    }, []);

    const onBtSortCountryThenSportClearOthers = useCallback(() => {
        //对country，sport组合为升序排列
        //defaultState用来设置其他列，表示为其他列的排序去掉
        gridRef.current!.columnApi.applyColumnState({
            state: [
                { colId: 'country', sort: 'asc', sortIndex: 0 },
                { colId: 'sport', sort: 'asc', sortIndex: 1 },
            ],
            defaultState: { sort: null },
        });
    }, []);

    const onBtClearAllSorting = useCallback(() => {
        //所有列的排序去掉
        gridRef.current!.columnApi.applyColumnState({
            defaultState: { sort: null },
        });
    }, []);

    const onBtRowGroupCountryThenSport = useCallback(() => {
        //对country，sport列组合为分组
        //将其他列设置为不分组
        gridRef.current!.columnApi.applyColumnState({
            state: [
                { colId: 'country', rowGroupIndex: 0 },
                { colId: 'sport', rowGroupIndex: 1 },
            ],
            defaultState: { rowGroup: false },
        });
    }, []);

    const onBtRemoveCountryRowGroup = useCallback(() => {
        //对country列的分组去掉
        gridRef.current!.columnApi.applyColumnState({
            state: [{ colId: 'country', rowGroup: false }],
        });
    }, []);

    const onBtClearAllRowGroups = useCallback(() => {
        //对所有列的分组去掉
        gridRef.current!.columnApi.applyColumnState({
            defaultState: { rowGroup: false },
        });
    }, []);

    const onBtOrderColsMedalsFirst = useCallback(() => {
        //applyColumnState默认传入的列，不对顺序进行操作
        //对grid的列顺序要与state顺序一致的时候，需要指定applyOrder
        gridRef.current!.columnApi.applyColumnState({
            state: [
                { colId: 'gold' },
                { colId: 'silver' },
                { colId: 'bronze' },
                { colId: 'total' },
                { colId: 'athlete' },
                { colId: 'age' },
                { colId: 'country' },
                { colId: 'sport' },
                { colId: 'year' },
                { colId: 'date' },
            ],
            applyOrder: true,
        });
    }, []);

    const onBtOrderColsMedalsLast = useCallback(() => {
        //另外一个列排序
        gridRef.current!.columnApi.applyColumnState({
            state: [
                { colId: 'athlete' },
                { colId: 'age' },
                { colId: 'country' },
                { colId: 'sport' },
                { colId: 'year' },
                { colId: 'date' },
                { colId: 'gold' },
                { colId: 'silver' },
                { colId: 'bronze' },
                { colId: 'total' },
            ],
            applyOrder: true,
        });
    }, []);

    const onBtHideMedals = useCallback(() => {
        //设置hide属性
        gridRef.current!.columnApi.applyColumnState({
            state: [
                { colId: 'gold', hide: true },
                { colId: 'silver', hide: true },
                { colId: 'bronze', hide: true },
                { colId: 'total', hide: true },
            ],
        });
    }, []);

    const onBtShowMedals = useCallback(() => {
        //设置hide属性
        gridRef.current!.columnApi.applyColumnState({
            state: [
                { colId: 'gold', hide: false },
                { colId: 'silver', hide: false },
                { colId: 'bronze', hide: false },
                { colId: 'total', hide: false },
            ],
        });
    }, []);

    return (
        <div style={containerStyle}>
            <div className="test-header">
                <table>
                    <tbody>
                        <tr>
                            <td>Sort:</td>
                            <td>
                                <button onClick={onBtSortAthlete}>Sort Athlete</button>
                                <button onClick={onBtSortCountryThenSportClearOthers}>
                                    Sort Country, then Sport - Clear Others
                                </button>
                                <button onClick={onBtClearAllSorting}>
                                    Clear All Sorting
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Column Order:</td>
                            <td>
                                <button onClick={onBtOrderColsMedalsFirst}>
                                    Show Medals First
                                </button>
                                <button onClick={onBtOrderColsMedalsLast}>
                                    Show Medals Last
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Column Visibility:</td>
                            <td>
                                <button onClick={onBtHideMedals}>Hide Medals</button>
                                <button onClick={onBtShowMedals}>Show Medals</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Row Group:</td>
                            <td>
                                <button onClick={onBtRowGroupCountryThenSport}>
                                    Group Country then Sport
                                </button>
                                <button onClick={onBtRemoveCountryRowGroup}>
                                    Remove Country
                                </button>
                                <button onClick={onBtClearAllRowGroups}>
                                    Clear All Groups
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    sideBar={sideBar}
                    rowGroupPanelShow={'always'}
                    pivotPanelShow={'always'}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;