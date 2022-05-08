'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    CellValueChangedEvent,
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    ValueGetterParams,
    ValueParserParams,
    ValueSetterParams,
} from 'ag-grid-community';

function getData() {
    var rowData = [];
    var firstNames = ['Niall', 'John', 'Rob', 'Alberto', 'Bas', 'Dimple', 'Sean'];
    var lastNames = [
        'Pink',
        'Black',
        'White',
        'Brown',
        'Smith',
        'Smooth',
        'Anderson',
    ];

    for (var i = 0; i < 100; i++) {
        rowData.push({
            a: Math.floor(Math.random() * 100),
            b: Math.floor(Math.random() * 100),
            firstName: firstNames[i % firstNames.length],
            lastName: lastNames[i % lastNames.length],
        });
    }

    return rowData;
}

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            headerName: 'Name',
            //getter从data中拉取
            valueGetter: function (params: ValueGetterParams) {
                return params.data.firstName + ' ' + params.data.lastName;
            },
            //从输入数据中拉取data
            valueSetter: function (params: ValueSetterParams) {
                var fullName = params.newValue;
                var nameSplit = fullName.split(' ');
                var newFirstName = nameSplit[0];
                var newLastName = nameSplit[1];
                var data = params.data;
                if (data.firstName !== newFirstName || data.lastName !== newLastName) {
                    data.firstName = newFirstName;
                    data.lastName = newLastName;
                    // return true to tell grid that the value has changed, so it knows
                    // to update the cell
                    return true;
                } else {
                    // return false, the grid doesn't need to update
                    return false;
                }
            },
        },

        {
            headerName: 'FirstName',
            field: 'firstName',
        },

        {
            headerName: 'LastName',
            field: 'lastName',
        },
        {
            headerName: 'Age',
            field: 'age',
            valueParser: function (params: ValueParserParams) {
                return Number.parseInt(params.data);
            }
        },
        {
            headerName: 'B',
            valueGetter: function (params: ValueGetterParams) {
                return params.data.b;
            },
            valueSetter: function (params: ValueSetterParams) {
                var newValInt = parseInt(params.newValue);
                var valueChanged = params.data.b !== newValInt;
                if (valueChanged) {
                    params.data.b = newValInt;
                }
                return valueChanged;
            },
        },
        {
            headerName: 'C.X',
            valueGetter: function (params: ValueGetterParams) {
                if (params.data.c) {
                    return params.data.c.x;
                } else {
                    return undefined;
                }
            },
            valueSetter: function (params: ValueSetterParams) {
                if (!params.data.c) {
                    params.data.c = {};
                }
                params.data.c.x = params.newValue;
                return true;
            },
        },
        {
            headerName: 'C.Y',
            valueGetter: function (params: ValueGetterParams) {
                if (params.data.c) {
                    return params.data.c.y;
                } else {
                    return undefined;
                }
            },
            valueSetter: function (params: ValueSetterParams) {
                if (!params.data.c) {
                    params.data.c = {};
                }
                params.data.c.y = params.newValue;
                return true;
            },
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            resizable: true,
            editable: true,
        };
    }, []);

    const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
        console.log('Data after change is', event.data);
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onCellValueChanged={onCellValueChanged}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;