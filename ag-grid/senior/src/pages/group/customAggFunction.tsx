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
    IAggFunc,
    IAggFuncParams,
    SideBarDef,
} from 'ag-grid-community';

function oneTwoThreeFunc(params: IAggFuncParams) {
    // this is just an example, rather than working out an aggregation,
    // we just return 123 each time, so you can see in the example 22 is the result
    return 123;
}

function xyzFunc(params: IAggFuncParams) {
    // this is just an example, rather than working out an aggregation,
    // we just return 22 each time, so you can see in the example 22 is the result
    return 'xyz';
}

// sum function has no advantage over the built in sum function.
// it's shown here as it's the simplest form of aggregation and
// showing it can be good as a starting point for understanding
// hwo the aggregation functions work.
function sumFunction(params: IAggFuncParams) {
    let result = 0;
    params.values.forEach((value) => {
        if (typeof value === 'number') {
            result += value;
        }
    });
    return result;
}

// min and max agg function. the leaf nodes are just numbers, like any other
// value. however the function returns an object with min and max, thus the group
// nodes all have these objects.
function minAndMaxAggFunction(params: IAggFuncParams) {
    // this is what we will return
    const result = {
        min: null,
        max: null,
        //聚合函数，可以返回一个类型，但是要定义toString方法
        // because we are returning back an object, this would get rendered as [Object,Object]
        // in the browser. we could get around this by providing a valueFormatter, OR we could
        // get around it in a customer cellRenderer, however this is a trick that will also work
        // with clipboard.
        toString: function () {
            return '(' + this.min + '..' + this.max + ')';
        },
    };
    // update the result based on each value
    params.values.forEach((value) => {
        const groupNode =
            value !== null && value !== undefined && typeof value === 'object';
        const minValue = groupNode ? value.min : value;
        const maxValue = groupNode ? value.max : value;
        // value is a number, not a 'result' object,
        // so this must be the first group
        result.min = min(minValue, result.min);
        result.max = max(maxValue, result.max);
    });
    return result;
}

// the average function is tricky as the multiple levels require weighted averages
// for the non-leaf node aggregations.
function avgAggFunction(params: IAggFuncParams) {
    // the average will be the sum / count
    let sum = 0;
    let count = 0;
    params.values.forEach((value) => {
        const groupNode =
            value !== null && value !== undefined && typeof value === 'object';
        if (groupNode) {
            //在聚合函数中，判断是否为分组的方法
            // we are aggregating groups, so we take the
            // aggregated values to calculated a weighted average
            sum += value.avg * value.count;
            count += value.count;
        } else {
            // skip values that are not numbers (ie skip empty values)
            if (typeof value === 'number') {
                sum += value;
                count++;
            }
        }
    });
    // avoid divide by zero error
    let avg = null;
    if (count !== 0) {
        avg = sum / count;
    }
    // the result will be an object. when this cell is rendered, only the avg is shown.
    // however when this cell is part of another aggregation, the count is also needed
    // to create a weighted average for the next level.
    const result = {
        count: count,
        avg: avg,
        // the grid by default uses toString to render values for an object, so this
        // is a trick to get the default cellRenderer to display the avg value
        toString: function () {
            return `${this.avg}`;
        },
    };
    return result;
}

function roundedAvgAggFunction(params: IAggFuncParams) {
    const result = avgAggFunction(params);
    if (result.avg) {
        result.avg = Math.round(result.avg * 100) / 100;
    }
    return result;
}

// similar to Math.min() except handles missing values, if any value is missing, then
// it returns the other value, or 'null' if both are missing.
function min(a: any, b: any) {
    const aMissing = typeof a !== 'number';
    const bMissing = typeof b !== 'number';
    if (aMissing && bMissing) {
        return null;
    } else if (aMissing) {
        return b;
    } else if (bMissing) {
        return a;
    } else if (a > b) {
        return b;
    } else {
        return a;
    }
}

// similar to Math.max() except handles missing values, if any value is missing, then
// it returns the other value, or 'null' if both are missing.
function max(a: any, b: any) {
    const aMissing = typeof a !== 'number';
    const bMissing = typeof b !== 'number';
    if (aMissing && bMissing) {
        return null;
    } else if (aMissing) {
        return b;
    } else if (bMissing) {
        return a;
    } else if (a < b) {
        return b;
    } else {
        return a;
    }
}

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
        // this column uses min and max func
        { headerName: 'minMax(age)', field: 'age', aggFunc: minAndMaxAggFunction },
        // here we use an average func and specify the function directly
        {
            headerName: 'avg(age)',
            field: 'age',
            //指定默认的聚合函数
            aggFunc: avgAggFunction,
            //是否允许用户在sideBar自定义执行聚合函数
            enableValue: true,
            minWidth: 200,
        },
        {
            headerName: 'roundedAvg(age)',
            field: 'age',
            aggFunc: roundedAvgAggFunction,
            enableValue: true,
            minWidth: 200,
        },
        // here we use a custom sum function that was registered with the grid,
        // which overrides the built in sum function
        {
            headerName: 'sum(gold)',
            field: 'gold',
            aggFunc: 'sum',
            enableValue: true,
        },
        // and these two use the built in sum func
        {
            headerName: 'abc(silver)',
            field: 'silver',
            aggFunc: '123',
            enableValue: true,
        },
        {
            headerName: 'xyz(bronze)',
            field: 'bronze',
            aggFunc: 'xyz',
            enableValue: true,
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 150,
            filter: true,
            sortable: true,
            resizable: true,
        };
    }, []);
    const autoGroupColumnDef = useMemo<ColDef>(() => {
        return {
            headerName: 'Athlete',
            field: 'athlete',
            minWidth: 250,
        };
    }, []);
    //定义自己的分组函数，分组函数只能对单列进行操作
    const aggFuncs = useMemo<{
        [key: string]: IAggFunc;
    }>(() => {
        return {
            // this overrides the grids built in sum function
            sum: sumFunction,
            // this adds another function called 'abc'
            '123': oneTwoThreeFunc,
            // and again xyz
            xyz: xyzFunc,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));

        // we could also register functions after the grid is created,
        // however because we are providing the columns in the grid options,
        // it will be to late (eg remove 'xyz' from aggFuncs, and you will
        // see the grid complains).
        params.api.addAggFunc('xyz', xyzFunc);
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    enableRangeSelection={true}
                    //默认在HeaderName中包含了聚合函数的名称，可以指定用这个来显示原名称
                    suppressAggFuncInHeader={true}
                    //定义自己的聚合函数，用户可以在sideBar中选择
                    aggFuncs={aggFuncs}
                    sideBar={true}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;