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
    ValueGetterParams,
} from 'ag-grid-community';

const athleteColumn = {
    headerName: 'Athlete',
    valueGetter: function (params: ValueGetterParams) {
        return params.data.athlete;
    },
};

function getColDefsMedalsIncluded() {
    return [
        //3.没有colId，也没有field的时候，使用object引用来标识这个列
        athleteColumn,
        //1，优先使用colId来标识这个列
        {
            colId: 'myAgeCol',
            headerName: 'Age',
            valueGetter: function (params: ValueGetterParams) {
                return params.data.age;
            },
        },
        //4，都不匹配的时候，ag-grid会认为这个是一个新的列，所以每次都会进行刷新
        {
            headerName: 'Country',
            headerClass: 'country-header',
            valueGetter: function (params: ValueGetterParams) {
                return params.data.country;
            },
        },
        //2，没有colId的时候，使用field来标识这个列
        { field: 'sport' },
        { field: 'year' },
        { field: 'date' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ];
}

function getColDefsMedalsExcluded() {
    return [
        athleteColumn,
        {
            colId: 'myAgeCol',
            headerName: 'Age',
            valueGetter: function (params: ValueGetterParams) {
                return params.data.age;
            },
        },
        {
            headerName: 'Country',
            headerClass: 'country-header',
            valueGetter: function (params: ValueGetterParams) {
                return params.data.country;
            },
        },
        { field: 'sport' },
        { field: 'year' },
        { field: 'date' },
        //标识了这个列以后，ag-grid对属性的合并规则是：
        //如果新属性的值为undefined，那么原来的属性值就保留，
        //如果新属性的值为null，那么原来的属性值就要清除，例如清除sort，清除group等等
        //如果新属性的值为具体值（非undefined且非null），那么原来的属性值就要被覆盖。
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
        };
    }, []);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(
        getColDefsMedalsIncluded()
    );

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const onBtExcludeMedalColumns = useCallback(() => {
        gridRef.current!.api.setColumnDefs(getColDefsMedalsExcluded());
    }, []);

    const onBtIncludeMedalColumns = useCallback(() => {
        gridRef.current!.api.setColumnDefs(getColDefsMedalsIncluded());
    }, []);

    return (
        <div style={containerStyle}>
            <div className="test-header">
                <button onClick={onBtIncludeMedalColumns}>
                    Include Medal Columns
                </button>
                <button onClick={onBtExcludeMedalColumns}>
                    Exclude Medal Columns
                </button>
            </div>

            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;