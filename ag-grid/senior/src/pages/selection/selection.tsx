'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
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
    RowNode,
} from 'ag-grid-community';

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'athlete', minWidth: 150,
            //把该列加入一个选择框，方便进行勾选操作，特别是在多选操作的时候
            checkboxSelection: true,
            //头部是否有一个勾选全部的按钮
            headerCheckboxSelection: true,
            //当数据进入筛选模式的时候，勾选全部是指勾选所有数据，还是只勾选筛选后的数据
            //headerCheckboxSelectionFilteredOnly: true,
        },
        { field: 'age', maxWidth: 90 },
        { field: 'country', minWidth: 150 },
        { field: 'year', maxWidth: 90 },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 100,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const onSelectionChanged = useCallback(() => {
        //selection changed的事件
        //getSelectedRows来获取选中数据
        //getSelectedNodes来获取选中的Node
        var selectedRows = gridRef.current!.api.getSelectedRows();
        var selectedRowsString = '';
        var maxToShow = 5;
        selectedRows.forEach(function (selectedRow, index) {
            if (index >= maxToShow) {
                return;
            }
            if (index > 0) {
                selectedRowsString += ', ';
            }
            selectedRowsString += selectedRow.athlete;
        });
        if (selectedRows.length > maxToShow) {
            var othersCount = selectedRows.length - maxToShow;
            selectedRowsString +=
                ' and ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
        }
        (document.querySelector(
            '#selectedRows'
        ) as any).innerHTML = selectedRowsString;
    }, []);

    //设置该行是否可以被选择
    const isRowSelectable = useCallback((rowNode: RowNode) => {
        return rowNode.data.age > 25;
    }, []);


    const selectAllAmerican = useCallback(() => {
        //通过node的setSelected来设置选中行
        gridRef.current!.api.forEachNode(function (node) {
            node.setSelected(node.data.country === 'United States');
        });
    }, []);

    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <div className="example-header">
                    Selection:
                    <span id="selectedRows"></span>
                </div>
                <button onClick={selectAllAmerican}>Select All American</button>


                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        //rowSelection默认为单选，可以设置为多选
                        rowSelection={'multiple'}
                        onGridReady={onGridReady}
                        isRowSelectable={isRowSelectable}
                        onSelectionChanged={onSelectionChanged}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;