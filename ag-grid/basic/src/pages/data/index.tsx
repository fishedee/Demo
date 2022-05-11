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
    }, []);

    const refreshAllData = useCallback(() => {
        //setRowData没有Immutable的限制，可以传递不同或者相同的引用进去也能更新数据
        //但是这样做会导致可能会导致困惑，rowData里面的引用没有改变了，但是数据改变了
        //另外，从当前的rowData拿数据也会产生困惑
        //这其实是将Ag-Grid看成是数据容器，以命令的方式写入数据到数据容器中
        //只不过当Ag-Grid的数据引用与初始rowData保持一致的话，我们能更少地出现bug
        //gridRef.current!.api.setRowData(getData());

        //更好的做法是，坚持不更改rowData的引用传递进去
        rowData.splice(0, rowData.length);
        let newData = getData();
        for (let i in newData) {
            rowData.push(newData[i]);
        }
        gridRef.current!.api.setRowData(rowData);

        //另外一种办法是，坚持不是用api.setRowData，而是使用React的setRowData来设置数据，但是这样做需要Immutable的设置
        //看index2的实现
    }, []);

    const reverseData = useCallback(() => {
        rowData.reverse();
        gridRef.current!.api.setRowData(rowData);
    }, []);
    const pushData = useCallback(() => {
        let maxId = -1;
        for (let i in rowData) {
            if (rowData[i].id > maxId) {
                maxId = rowData[i].id;
            }
        }
        let id = maxId + 1;
        rowData.push({
            id: id,
            firstName: 'Fish_' + id,
            lastName: 'Fish_' + id,
            gender: 'Male',
            age: id,
        });
        gridRef.current!.api.setRowData(rowData);
    }, []);

    const popData = useCallback(() => {
        if (rowData.length != 0) {
            rowData.splice(0, 1);
        }
        gridRef.current!.api.setRowData(rowData);
    }, []);

    const removeSelected = useCallback(() => {
        const selectedRowNodes = gridRef.current!.api.getSelectedNodes();
        const selectedIds = selectedRowNodes.map(function (rowNode) {
            return rowNode.id;
        });
        selectedIds.forEach(single => {
            const delIndex = rowData.findIndex((data) => {
                return data.id == single;
            });
            if (delIndex != -1) {
                rowData.splice(delIndex, 1);
            }
        })
        gridRef.current!.api.setRowData(rowData);
    }, []);

    const allSetAge = useCallback(() => {
        //修改一个单元格的信息时，需要将整个row的引用改掉
        for (let i in rowData) {
            let single = rowData[i];
            rowData[i] = {
                ...single,
                age: Math.floor(Math.random() * 200)
            }
        }
        gridRef.current!.api.setRowData(rowData);
    }, []);

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