'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    GetRowIdFunc,
    GetRowIdParams,
    Grid,
    GridOptions,
    GridReadyEvent,
    RowDragMoveEvent,
} from 'ag-grid-community';

function getData() {
    return [
        {
            athlete: 'Michael Phelps',
            age: 23,
            country: 'United States',
            year: 2008,
            date: '24/08/2008',
            sport: 'Swimming',
            gold: 8,
            silver: 0,
            bronze: 0,
            total: 8,
        },
        {
            athlete: 'Michael Phelps',
            age: 19,
            country: 'United States',
            year: 2004,
            date: '29/08/2004',
            sport: 'Swimming',
            gold: 6,
            silver: 0,
            bronze: 2,
            total: 8,
        },
        {
            athlete: 'Michael Phelps',
            age: 27,
            country: 'United States',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 4,
            silver: 2,
            bronze: 0,
            total: 6,
        },
        {
            athlete: 'Natalie Coughlin',
            age: 25,
            country: 'United States',
            year: 2008,
            date: '24/08/2008',
            sport: 'Swimming',
            gold: 1,
            silver: 2,
            bronze: 3,
            total: 6,
        },
        {
            athlete: 'Aleksey Nemov',
            age: 24,
            country: 'Russia',
            year: 2000,
            date: '01/10/2000',
            sport: 'Gymnastics',
            gold: 2,
            silver: 1,
            bronze: 3,
            total: 6,
        },
        {
            athlete: 'Alicia Coutts',
            age: 24,
            country: 'Australia',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 1,
            silver: 3,
            bronze: 1,
            total: 5,
        },
        {
            athlete: 'Missy Franklin',
            age: 17,
            country: 'United States',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 4,
            silver: 0,
            bronze: 1,
            total: 5,
        },
        {
            athlete: 'Ryan Lochte',
            age: 27,
            country: 'United States',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 2,
            silver: 2,
            bronze: 1,
            total: 5,
        },
        {
            athlete: 'Allison Schmitt',
            age: 22,
            country: 'United States',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 3,
            silver: 1,
            bronze: 1,
            total: 5,
        },
        {
            athlete: 'Natalie Coughlin',
            age: 21,
            country: 'United States',
            year: 2004,
            date: '29/08/2004',
            sport: 'Swimming',
            gold: 2,
            silver: 2,
            bronze: 1,
            total: 5,
        },
        {
            athlete: 'Ian Thorpe',
            age: 17,
            country: 'Australia',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 3,
            silver: 2,
            bronze: 0,
            total: 5,
        },
        {
            athlete: 'Dara Torres',
            age: 33,
            country: 'United States',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 2,
            silver: 0,
            bronze: 3,
            total: 5,
        },
        {
            athlete: 'Cindy Klassen',
            age: 26,
            country: 'Canada',
            year: 2006,
            date: '26/02/2006',
            sport: 'Speed Skating',
            gold: 1,
            silver: 2,
            bronze: 2,
            total: 5,
        },
        {
            athlete: 'Nastia Liukin',
            age: 18,
            country: 'United States',
            year: 2008,
            date: '24/08/2008',
            sport: 'Gymnastics',
            gold: 1,
            silver: 3,
            bronze: 1,
            total: 5,
        },
        {
            athlete: 'Marit Bjørgen',
            age: 29,
            country: 'Norway',
            year: 2010,
            date: '28/02/2010',
            sport: 'Cross Country Skiing',
            gold: 3,
            silver: 1,
            bronze: 1,
            total: 5,
        },
        {
            athlete: 'Sun Yang',
            age: 20,
            country: 'China',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 2,
            silver: 1,
            bronze: 1,
            total: 4,
        },
        {
            athlete: 'Kirsty Coventry',
            age: 24,
            country: 'Zimbabwe',
            year: 2008,
            date: '24/08/2008',
            sport: 'Swimming',
            gold: 1,
            silver: 3,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Libby Lenton-Trickett',
            age: 23,
            country: 'Australia',
            year: 2008,
            date: '24/08/2008',
            sport: 'Swimming',
            gold: 2,
            silver: 1,
            bronze: 1,
            total: 4,
        },
        {
            athlete: 'Ryan Lochte',
            age: 24,
            country: 'United States',
            year: 2008,
            date: '24/08/2008',
            sport: 'Swimming',
            gold: 2,
            silver: 0,
            bronze: 2,
            total: 4,
        },
        {
            athlete: 'Inge de Bruijn',
            age: 30,
            country: 'Netherlands',
            year: 2004,
            date: '29/08/2004',
            sport: 'Swimming',
            gold: 1,
            silver: 1,
            bronze: 2,
            total: 4,
        },
        {
            athlete: 'Petria Thomas',
            age: 28,
            country: 'Australia',
            year: 2004,
            date: '29/08/2004',
            sport: 'Swimming',
            gold: 3,
            silver: 1,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Ian Thorpe',
            age: 21,
            country: 'Australia',
            year: 2004,
            date: '29/08/2004',
            sport: 'Swimming',
            gold: 2,
            silver: 1,
            bronze: 1,
            total: 4,
        },
        {
            athlete: 'Inge de Bruijn',
            age: 27,
            country: 'Netherlands',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 3,
            silver: 1,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Gary Hall Jr.',
            age: 25,
            country: 'United States',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 2,
            silver: 1,
            bronze: 1,
            total: 4,
        },
        {
            athlete: 'Michael Klim',
            age: 23,
            country: 'Australia',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 2,
            silver: 2,
            bronze: 0,
            total: 4,
        },
        {
            athlete: "Susie O'Neill",
            age: 27,
            country: 'Australia',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 1,
            silver: 3,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Jenny Thompson',
            age: 27,
            country: 'United States',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 3,
            silver: 0,
            bronze: 1,
            total: 4,
        },
        {
            athlete: 'Pieter van den Hoogenband',
            age: 22,
            country: 'Netherlands',
            year: 2000,
            date: '01/10/2000',
            sport: 'Swimming',
            gold: 2,
            silver: 0,
            bronze: 2,
            total: 4,
        },
        {
            athlete: 'An Hyeon-Su',
            age: 20,
            country: 'South Korea',
            year: 2006,
            date: '26/02/2006',
            sport: 'Short-Track Speed Skating',
            gold: 3,
            silver: 0,
            bronze: 1,
            total: 4,
        },
        {
            athlete: 'Aliya Mustafina',
            age: 17,
            country: 'Russia',
            year: 2012,
            date: '12/08/2012',
            sport: 'Gymnastics',
            gold: 1,
            silver: 1,
            bronze: 2,
            total: 4,
        },
        {
            athlete: 'Shawn Johnson',
            age: 16,
            country: 'United States',
            year: 2008,
            date: '24/08/2008',
            sport: 'Gymnastics',
            gold: 1,
            silver: 3,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Dmitry Sautin',
            age: 26,
            country: 'Russia',
            year: 2000,
            date: '01/10/2000',
            sport: 'Diving',
            gold: 1,
            silver: 1,
            bronze: 2,
            total: 4,
        },
        {
            athlete: 'Leontien Zijlaard-van Moorsel',
            age: 30,
            country: 'Netherlands',
            year: 2000,
            date: '01/10/2000',
            sport: 'Cycling',
            gold: 3,
            silver: 1,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Petter Northug Jr.',
            age: 24,
            country: 'Norway',
            year: 2010,
            date: '28/02/2010',
            sport: 'Cross Country Skiing',
            gold: 2,
            silver: 1,
            bronze: 1,
            total: 4,
        },
        {
            athlete: 'Ole Einar Bjørndalen',
            age: 28,
            country: 'Norway',
            year: 2002,
            date: '24/02/2002',
            sport: 'Biathlon',
            gold: 4,
            silver: 0,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Janica Kostelic',
            age: 20,
            country: 'Croatia',
            year: 2002,
            date: '24/02/2002',
            sport: 'Alpine Skiing',
            gold: 3,
            silver: 1,
            bronze: 0,
            total: 4,
        },
        {
            athlete: 'Nathan Adrian',
            age: 23,
            country: 'United States',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 2,
            silver: 1,
            bronze: 0,
            total: 3,
        },
        {
            athlete: 'Yannick Agnel',
            age: 20,
            country: 'France',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 2,
            silver: 1,
            bronze: 0,
            total: 3,
        },
        {
            athlete: 'Brittany Elmslie',
            age: 18,
            country: 'Australia',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 1,
            silver: 2,
            bronze: 0,
            total: 3,
        },
    ];
}

var immutableStore: any[] = getData();

var sortActive = false;

var filterActive = false;

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'athlete', rowDrag: true },
        { field: 'country' },
        { field: 'year', width: 100 },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 170,
            sortable: true,
            filter: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        // add id to each item, needed for immutable store to work
        immutableStore.forEach(function (data, index) {
            data.id = index;
        });
        setRowData(immutableStore);
    }, []);

    // listen for change on sort changed
    const onSortChanged = useCallback(() => {
        var colState = gridRef.current!.columnApi.getColumnState() || [];
        sortActive = colState.some((c) => c.sort);
        // suppress row drag if either sort or filter is active
        var suppressRowDrag = sortActive || filterActive;
        console.log(
            'sortActive = ' +
            sortActive +
            ', filterActive = ' +
            filterActive +
            ', allowRowDrag = ' +
            suppressRowDrag
        );
        //有sort或者有filter都需要禁止行拖动
        gridRef.current!.api.setSuppressRowDrag(suppressRowDrag);
    }, [filterActive]);

    // listen for changes on filter changed
    const onFilterChanged = useCallback(() => {
        filterActive = gridRef.current!.api.isAnyFilterPresent();
        // suppress row drag if either sort or filter is active

        //有sort或者有filter都需要禁止行拖动
        var suppressRowDrag = sortActive || filterActive;
        console.log(
            'sortActive = ' +
            sortActive +
            ', filterActive = ' +
            filterActive +
            ', allowRowDrag = ' +
            suppressRowDrag
        );
        gridRef.current!.api.setSuppressRowDrag(suppressRowDrag);
    }, [filterActive]);

    const onRowDragMove = useCallback(
        (event: RowDragMoveEvent) => {
            var movingNode = event.node;
            var overNode = event.overNode;
            var rowNeedsToMove = movingNode !== overNode;
            if (rowNeedsToMove) {
                // the list of rows we have is data, not row nodes, so extract the data
                var movingData = movingNode.data;
                var overData = overNode!.data;
                var fromIndex = immutableStore.indexOf(movingData);
                var toIndex = immutableStore.indexOf(overData);
                console.log('move data', fromIndex, toIndex);
                var newStore = immutableStore.slice();
                moveInArray(newStore, fromIndex, toIndex);
                immutableStore = newStore;
                gridRef.current!.api.setRowData(newStore);
                gridRef.current!.api.clearFocusedCell();
            }
            function moveInArray(arr: any[], fromIndex: number, toIndex: number) {
                var element = arr[fromIndex];
                //这个性能较差
                arr.splice(fromIndex, 1);
                arr.splice(toIndex, 0, element);
            }
        },
        [immutableStore]
    );

    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data.id;
    }, []);

    /*
    * unmanage的性能较差，不太建议使用
    */
    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    getRowId={getRowId}
                    onGridReady={onGridReady}
                    onSortChanged={onSortChanged}
                    onFilterChanged={onFilterChanged}
                    onRowDragMove={onRowDragMove}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;