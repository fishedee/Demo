'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef, GetRowIdParams, Grid, GridOptions } from 'ag-grid-community';
import './style.css'
import getData from './getData';
import { Button } from 'antd';

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<React.CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'firstName' },
        { field: 'lastName' },
        { field: 'gender' },
        { field: 'age' },
        { field: 'mood' },
        { field: 'country' },
        { field: 'address', minWidth: 550 },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            //flex: 1,
            minWidth: 110,
            //全部单元格默认是可编辑的，数据会直接在rowData上进行修改
            editable: true,
            resizable: true,
            sortable: true,
        };
    }, []);

    const getAllData = useCallback(() => {
        console.log('allRowData', rowData);
        gridRef.current!.api.forEachNode((rowNode, index) => {
            console.log('node ' + index + " : " + JSON.stringify(rowNode.data) + " is in the grid");
        });

        // iterate only nodes that pass the filter
        //forEachNodeAfterFilter

        //iterate only nodes that pass the filter and ordered by the sort order
        //forEachNodeAfterFilterAndSort

        //iterate through every leaf node in the grid
        //forEachLeafNode
    }, [rowData]);

    const refreshAllData = useCallback(() => {
        //将Ag-Grid看成是渲染器，不存放数据相关操作
        setRowData(getData());
    }, [rowData]);

    const reverseData = useCallback(() => {
        let newData = [...rowData].reverse();
        setRowData(newData);
    }, [rowData]);
    const pushData = useCallback(() => {
        let maxId = -1;
        for (let i in rowData) {
            if (rowData[i].id > maxId) {
                maxId = rowData[i].id;
            }
        }
        let id = maxId + 1;
        let newData = [
            ...rowData,
            {
                id: id,
                firstName: 'Fish_' + id,
                lastName: 'Fish_' + id,
                gender: 'Male',
                age: id,
            }
        ];
        setRowData(newData);
    }, [rowData]);

    const popData = useCallback(() => {
        let newData = rowData.filter((single, index) => {
            return index != 0;
        })
        setRowData(newData);
    }, [rowData]);

    const removeSelected = useCallback(() => {
        const selectedRowNodes = gridRef.current!.api.getSelectedNodes();
        const selectedIds = selectedRowNodes.map(function (rowNode) {
            //id总是为string类型
            return rowNode.id;
        });
        const newData = rowData.filter((single) => {
            return selectedIds.indexOf(single.id + '') < 0;
        });
        setRowData(newData);
    }, [rowData]);

    const allSetAge = useCallback(() => {
        const newData = rowData.map((single) => {
            let age = Math.floor(Math.random() * 100);
            return {
                ...single,
                age: age,
            };
        })
        setRowData(newData);
    }, [rowData]);

    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data.id;
    }, []);
    return (
        <div style={containerStyle}>
            <div>
                <Button onClick={getAllData}>{'获取数据'}</Button>
                <Button onClick={refreshAllData}>{'重置全部数据'}</Button>
                <Button onClick={reverseData}>{'reverse数据'}</Button>
                <Button onClick={pushData}>{'push数据'}</Button>
                <Button onClick={popData}>{'pop数据'}</Button>
                <Button onClick={removeSelected}>{'删除选中行'}</Button>
                <Button onClick={allSetAge}>{'随机设置Age'}</Button>
            </div>
            <div className="grid-wrapper">
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        //需要设置getRowId，才能得到更好的刷新效果
                        getRowId={getRowId}
                        rowSelection={'multiple'}
                        animateRows={true}
                        //默认的Enter键进入或者退出编辑状态，并不会去转移光标

                        //鼠标单击进入编辑状态，但是会丢失导航能力，并不好用
                        singleClickEdit={true}
                        //当表格丢失焦点的时候，自动停止编辑并保存，这点非常有用
                        stopEditingWhenCellsLoseFocus={true}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;