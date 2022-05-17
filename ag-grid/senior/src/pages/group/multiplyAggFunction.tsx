'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
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
    IAggFuncParams,
    ValueFormatterParams,
    ValueGetterParams,
} from 'ag-grid-community';

const numberFormatter: (params: ValueFormatterParams) => string = (
    params: ValueFormatterParams
) => {
    if (!params.value || params.value === 0) return '0';
    return '' + Math.round(params.value * 100) / 100;
};

function ratioValueGetter(params: ValueGetterParams) {
    if (!(params.node && params.node.group)) {
        // no need to handle group levels - calculated in the 'ratioAggFunc'
        return createValueObject(params.data.gold, params.data.silver);
    }
}

function ratioAggFunc(params: IAggFuncParams) {
    let goldSum = 0;
    let silverSum = 0;
    params.values.forEach((value) => {
        if (value && value.gold) {
            goldSum += value.gold;
        }
        if (value && value.silver) {
            silverSum += value.silver;
        }
    });
    return createValueObject(goldSum, silverSum);
}

function createValueObject(gold: number, silver: number) {
    return {
        gold: gold,
        silver: silver,
        //输出的时候才做除法操作
        toString: () => `${gold && silver ? gold / silver : 0}`,
    };
}

function ratioFormatter(params: ValueFormatterParams) {
    if (!params.value || params.value === 0) return '';
    return '' + Math.round(params.value * 100) / 100;
}

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'country',
            rowGroup: true,
            hide: true,
            //该列不允许在sideBar中进行手工调整
            suppressColumnsToolPanel: true,
        },
        {
            field: 'sport',
            rowGroup: true,
            hide: true,
            suppressColumnsToolPanel: true,
        },
        {
            field: 'year',
            pivot: true,
            hide: true,
            suppressColumnsToolPanel: true,
        },
        { field: 'gold', aggFunc: 'sum', valueFormatter: numberFormatter },
        { field: 'silver', aggFunc: 'sum', valueFormatter: numberFormatter },
        {
            headerName: 'Ratio',
            colId: 'goldSilverRatio',

            //多列聚合，首先要做的是，将多列数据转换为object数据
            valueGetter: ratioValueGetter,
            //然后，指定我们的聚合函数，注意聚合函数的输入和输出都是object
            aggFunc: ratioAggFunc,
            //最后将结果展示出来，将object，转换为string
            valueFormatter: ratioFormatter,
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 150,
            sortable: true,
            filter: true,
        };
    }, []);
    const autoGroupColumnDef = useMemo<ColDef>(() => {
        return {
            minWidth: 220,
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
                    autoGroupColumnDef={autoGroupColumnDef}
                    suppressAggFuncInHeader={true}
                    onGridReady={onGridReady}
                    sideBar={true}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;