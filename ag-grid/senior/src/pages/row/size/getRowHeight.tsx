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
    RowHeightParams,
} from 'ag-grid-community';

var swimmingHeight: number;

var groupHeight: number;

var russiaHeight: number;

function getData() {
    return [
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
            athlete: 'Yekaterina Lobaznyuk',
            age: 17,
            country: 'Russia',
            year: 2000,
            date: '01/10/2000',
            sport: 'Gymnastics',
            gold: 0,
            silver: 2,
            bronze: 1,
            total: 3,
        },
        {
            athlete: 'Ryan Lochte',
            age: 20,
            country: 'United States',
            year: 2004,
            date: '29/08/2004',
            sport: 'Swimming',
            gold: 1,
            silver: 1,
            bronze: 0,
            total: 2,
        },
        {
            athlete: 'Ericka Lorenz',
            age: 23,
            country: 'United States',
            year: 2004,
            date: '29/08/2004',
            sport: 'Waterpolo',
            gold: 0,
            silver: 0,
            bronze: 1,
            total: 1,
        },
        {
            athlete: 'Ericka Lorenz',
            age: 19,
            country: 'United States',
            year: 2000,
            date: '01/10/2000',
            sport: 'Waterpolo',
            gold: 0,
            silver: 1,
            bronze: 0,
            total: 1,
        },
        {
            athlete: 'Nikita Lobintsev',
            age: 23,
            country: 'Russia',
            year: 2012,
            date: '12/08/2012',
            sport: 'Swimming',
            gold: 0,
            silver: 0,
            bronze: 1,
            total: 1,
        },
        {
            athlete: 'Tatyana Logunova',
            age: 24,
            country: 'Russia',
            year: 2004,
            date: '29/08/2004',
            sport: 'Fencing',
            gold: 1,
            silver: 0,
            bronze: 0,
            total: 1,
        },
        {
            athlete: 'Tatyana Logunova',
            age: 20,
            country: 'Russia',
            year: 2000,
            date: '01/10/2000',
            sport: 'Fencing',
            gold: 1,
            silver: 0,
            bronze: 0,
            total: 1,
        },
        {
            athlete: 'Nelson Loyola',
            age: 32,
            country: 'Cuba',
            year: 2000,
            date: '01/10/2000',
            sport: 'Fencing',
            gold: 0,
            silver: 0,
            bronze: 1,
            total: 1,
        },
    ];
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'country', rowGroup: true },
        { field: 'athlete' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);

    const setSwimmingHeight = useCallback((height: number) => {
        //修改了高度以后，需要使用restRowHeights，能触发ag-grid调用getRowHeight来更新高度
        swimmingHeight = height;
        gridRef.current!.api.resetRowHeights();
    }, []);

    const setGroupHeight = useCallback((height: number) => {
        groupHeight = height;
        gridRef.current!.api.resetRowHeights();
    }, []);

    const setRussiaHeight = useCallback((height: number) => {
        // 对rowNode直接调用setRowHeight，并不能触发更新高度
        //1.要么是用resetRowHeights，触发的是getRowHeight的回调
        //2.要么是用onRowHeightChanged，手动批量通知ag-grid，它的rowNode中的rowHeight变更了
        russiaHeight = height;
        gridRef.current!.api.forEachNode(function (rowNode) {
            //使用rowNode的触发是一次性的，当下一次的getRowHeight的数据还是旧数据的话，依然会用旧数据的高度
            if (rowNode.data && rowNode.data.country === 'Russia') {
                rowNode.setRowHeight(height);
            }
        });
        gridRef.current!.api.onRowHeightChanged();
    }, []);

    //getRowHeight是一个回调，可以用来指定每个group，或者每一个行的高度
    const getRowHeight = useCallback(
        (params: RowHeightParams): number | undefined | null => {
            if (params.node.group && groupHeight != null) {
                //指定group的高度
                return groupHeight;
            } else if (
                params.data &&
                params.data.country === 'Russia' &&
                russiaHeight != null
            ) {
                //指定data为Russia的高度
                return russiaHeight;
            } else if (
                params.data &&
                params.data.sport === 'Swimming' &&
                swimmingHeight != null
            ) {
                //指定data为Swimming的高度
                return swimmingHeight;
            }
        },
        [groupHeight, russiaHeight, swimmingHeight]
    );

    return (
        <div style={containerStyle}>
            <div
                style={{
                    marginBottom: '5px',
                    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
                    fontSize: '13px',
                }}
            >
                <div>
                    Top Level Groups:
                    <button onClick={() => setGroupHeight(42)}>42px</button>
                    <button onClick={() => setGroupHeight(75)}>75px</button>
                    <button onClick={() => setGroupHeight(125)}>125px</button>
                </div>
                <div style={{ marginTop: '5px' }}>
                    Swimming Leaf Rows:
                    <button onClick={() => setSwimmingHeight(42)}>42px</button>
                    <button onClick={() => setSwimmingHeight(75)}>75px</button>
                    <button onClick={() => setSwimmingHeight(125)}>125px</button>
                </div>
                <div style={{ marginTop: '5px' }}>
                    Russia Leaf Rows:
                    <button onClick={() => setRussiaHeight(42)}>42px</button>
                    <button onClick={() => setRussiaHeight(75)}>75px</button>
                    <button onClick={() => setRussiaHeight(125)}>125px</button>
                </div>
            </div>

            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    groupDefaultExpanded={1}
                    getRowHeight={getRowHeight}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;