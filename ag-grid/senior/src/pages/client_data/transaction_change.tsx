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
    RowNodeTransaction,
} from 'ag-grid-community';
import getData from './getData2';

let newCount = 1;

function createNewRowData() {
    const newData = {
        make: 'Toyota ' + newCount,
        model: 'Celica ' + newCount,
        price: 35000 + newCount * 17,
        zombies: 'Headless',
        style: 'Little',
        clothes: 'Airbag',
    };
    newCount++;
    return newData;
}

function printResult(res: RowNodeTransaction) {
    console.log('---------------------------------------');
    if (res.add) {
        res.add.forEach(function (rowNode) {
            console.log('Added Row Node', rowNode);
        });
    }
    if (res.remove) {
        res.remove.forEach(function (rowNode) {
            console.log('Removed Row Node', rowNode);
        });
    }
    if (res.update) {
        res.update.forEach(function (rowNode) {
            console.log('Updated Row Node', rowNode);
        });
    }
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ flex: '1', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
        { field: 'zombies' },
        { field: 'style' },
        { field: 'clothes' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
        };
    }, []);

    const getRowData = useCallback(() => {
        const rowData: any[] = [];
        gridRef.current!.api.forEachNode(function (node) {
            rowData.push(node.data);
        });
        console.log('Row Data:');
        console.table(rowData);
    }, []);

    const clearData = useCallback(() => {
        gridRef.current!.api.setRowData([]);
    }, []);

    const addItems = useCallback((addIndex: number | undefined) => {
        const newItems = [
            createNewRowData(),
            createNewRowData(),
            createNewRowData(),
        ];
        //添加行
        const res = gridRef.current!.api.applyTransaction({
            add: newItems,
            //addIndex为undefined的时候，就是尾部插入的意思
            addIndex: addIndex,
        })!;
        printResult(res);
    }, []);

    const updateItems = useCallback(() => {
        // update the first 2 items
        const itemsToUpdate: any[] = [];
        gridRef.current!.api.forEachNodeAfterFilterAndSort(function (
            rowNode,
            index
        ) {
            // only do first 2
            if (index >= 2) {
                return;
            }
            const data = rowNode.data;
            data.price = Math.floor(Math.random() * 20000 + 20000);
            itemsToUpdate.push(data);
        });
        //对于数据update，优先使用rowId来判断行，没有rowId就用对象引用来判断行，都没有的话就看成没有相同行
        const res = gridRef.current!.api.applyTransaction({
            //更新行
            update: itemsToUpdate,
        })!;
        printResult(res);
    }, []);

    const onRemoveSelected = useCallback(() => {
        const selectedData = gridRef.current!.api.getSelectedRows();
        //删除行
        const res = gridRef.current!.api.applyTransaction({
            remove: selectedData,
        })!;
        printResult(res);
    }, []);

    return (
        <div style={containerStyle}>
            <div style={{ marginBottom: '4px' }}>
                <button onClick={() => addItems(undefined)}>Add Items</button>
                <button onClick={() => addItems(2)}>Add Items addIndex=2</button>
                <button onClick={updateItems}>Update Top 2</button>
                <button onClick={onRemoveSelected}>Remove Selected</button>
                <button onClick={getRowData}>Get Row Data</button>
                <button onClick={clearData}>Clear Data</button>
            </div>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={'multiple'}
                    animateRows={true}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;