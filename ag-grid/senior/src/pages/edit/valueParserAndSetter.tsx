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
            //从输入数据中拉取data，返回true代表有所改变，返回false代表没有改变
            //valueSetter解决的是数据如何保存原始数据的问题，需要保存到数据的哪些字段中
            //valueGetter是valueSetter的逆过程，从原始数据中提取数据
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
            //默认的输入数据为string，需要用parser转换为number
            //valueParser主要解决的是数据如何获取的问题，从editorValue返回到value
            //valueFormatter是valueParser的过程，它描述的是从value到showValue的转换
            valueParser: function (params: ValueParserParams) {
                return Number.parseInt(params.newValue);
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