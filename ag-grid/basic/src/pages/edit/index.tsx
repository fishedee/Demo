'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';
import './style.css'

function getData() {
    return [
        {
            firstName: 'Bob',
            lastName: 'Harrison',
            gender: 'Male',
            address:
                '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Mary',
            lastName: 'Wilson',
            gender: 'Female',
            age: 11,
            address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
            mood: 'Sad',
            country: 'Ireland',
        },
        {
            firstName: 'Zahid',
            lastName: 'Khan',
            gender: 'Male',
            age: 12,
            address:
                '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Jerry',
            lastName: 'Mane',
            gender: 'Male',
            age: 12,
            address:
                '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Bob',
            lastName: 'Harrison',
            gender: 'Male',
            address:
                '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Mary',
            lastName: 'Wilson',
            gender: 'Female',
            age: 11,
            address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
            mood: 'Sad',
            country: 'Ireland',
        },
        {
            firstName: 'Zahid',
            lastName: 'Khan',
            gender: 'Male',
            age: 12,
            address:
                '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Jerry',
            lastName: 'Mane',
            gender: 'Male',
            age: 12,
            address:
                '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Bob',
            lastName: 'Harrison',
            gender: 'Male',
            address:
                '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Mary',
            lastName: 'Wilson',
            gender: 'Female',
            age: 11,
            address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
            mood: 'Sad',
            country: 'Ireland',
        },
        {
            firstName: 'Zahid',
            lastName: 'Khan',
            gender: 'Male',
            age: 12,
            address:
                '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Jerry',
            lastName: 'Mane',
            gender: 'Male',
            age: 12,
            address:
                '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Bob',
            lastName: 'Harrison',
            gender: 'Male',
            address:
                '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Mary',
            lastName: 'Wilson',
            gender: 'Female',
            age: 11,
            address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
            mood: 'Sad',
            country: 'Ireland',
        },
        {
            firstName: 'Zahid',
            lastName: 'Khan',
            gender: 'Male',
            age: 12,
            address:
                '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Jerry',
            lastName: 'Mane',
            gender: 'Male',
            age: 12,
            address:
                '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Bob',
            lastName: 'Harrison',
            gender: 'Male',
            address:
                '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Mary',
            lastName: 'Wilson',
            gender: 'Female',
            age: 11,
            address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
            mood: 'Sad',
            country: 'Ireland',
        },
        {
            firstName: 'Zahid',
            lastName: 'Khan',
            gender: 'Male',
            age: 12,
            address:
                '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Jerry',
            lastName: 'Mane',
            gender: 'Male',
            age: 12,
            address:
                '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Bob',
            lastName: 'Harrison',
            gender: 'Male',
            address:
                '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Mary',
            lastName: 'Wilson',
            gender: 'Female',
            age: 11,
            address: '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
            mood: 'Sad',
            country: 'Ireland',
        },
        {
            firstName: 'Zahid',
            lastName: 'Khan',
            gender: 'Male',
            age: 12,
            address:
                '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
            mood: 'Happy',
            country: 'Ireland',
        },
        {
            firstName: 'Jerry',
            lastName: 'Mane',
            gender: 'Male',
            age: 12,
            address:
                '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
            mood: 'Happy',
            country: 'Ireland',
        },
    ];
}

function getPinnedTopData() {
    return [
        {
            firstName: '##',
            lastName: '##',
            gender: '##',
            address: '##',
            mood: '##',
            country: '##',
        },
    ];
}

function getPinnedBottomData() {
    return [
        {
            firstName: '##',
            lastName: '##',
            gender: '##',
            address: '##',
            mood: '##',
            country: '##',
        },
    ];
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
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
            //全部单元格默认是可编辑的
            editable: true,
            resizable: true,
        };
    }, []);
    const pinnedTopRowData = useMemo<any[]>(() => {
        return getPinnedTopData();
    }, []);
    const pinnedBottomRowData = useMemo<any[]>(() => {
        return getPinnedBottomData();
    }, []);

    const onBtStopEditing = useCallback(() => {
        gridRef.current!.api.stopEditing();
    }, []);

    const onBtStartEditing = useCallback(
        (key?: string, char?: string, pinned?: string) => {
            gridRef.current!.api.setFocusedCell(0, 'lastName', pinned);
            gridRef.current!.api.startEditingCell({
                rowIndex: 0,
                colKey: 'lastName',
                // set to 'top', 'bottom' or undefined
                //哪些，顶部行，还是尾部行，还是中行
                rowPinned: pinned,
                //进入编辑状态的键盘Key，Delete是删除当前单元格后进入
                key: key,
                //进入单元格状态的默认数据
                charPress: char,
            });
        },
        []
    );

    const onBtNextCell = useCallback(() => {

        //移到前一个
        gridRef.current!.api.tabToNextCell();
    }, []);

    const onBtPreviousCell = useCallback(() => {
        //移到后一个
        gridRef.current!.api.tabToPreviousCell();
    }, []);

    const onBtWhich = useCallback(() => {
        //获取当前的编辑单元格
        var cellDefs = gridRef.current!.api.getEditingCells();
        if (cellDefs.length > 0) {
            var cellDef = cellDefs[0];
            console.log(
                'editing cell is: row = ' +
                cellDef.rowIndex +
                ', col = ' +
                cellDef.column.getId() +
                ', floating = ' +
                cellDef.rowPinned
            );
        } else {
            console.log('no cells are editing');
        }
    }, []);

    //AgGrid的分为选择和编辑状态
    //选择状态可以使用上下左右，Tab键，ShiftTab键移动光标，Enter键会进入编辑状态，输入Del或者字母数字会直接进入编辑状态并修改内容
    //编辑状态不能导航，可以输入数据，Enter键输入多一次会退出编辑状态
    //鼠标单击会进入选择状态
    //鼠标双击会进入编辑状态
    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <div
                    style={{
                        marginBottom: '5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <button onClick={() => onBtStartEditing(undefined)}>
                            edit (0)
                        </button>
                        <button onClick={() => onBtStartEditing('Delete')}>
                            edit (0, Delete)
                        </button>
                        <button onClick={() => onBtStartEditing(undefined, 'T')}>
                            edit (0, 'T')
                        </button>
                        <button
                            onClick={() => onBtStartEditing(undefined, undefined, 'top')}
                        >
                            edit (0, Top)
                        </button>
                        <button
                            onClick={() => onBtStartEditing(undefined, undefined, 'bottom')}
                        >
                            edit (0, Bottom)
                        </button>
                    </div>
                    <div>
                        <button onClick={onBtStopEditing}>stop ()</button>
                        <button onClick={onBtNextCell}>next ()</button>
                        <button onClick={onBtPreviousCell}>previous ()</button>
                    </div>
                    <div>
                        <button onClick={onBtWhich}>which ()</button>
                    </div>
                </div>
                <div className="grid-wrapper">
                    <div style={gridStyle} className="ag-theme-alpine">
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            //设置的是数组，多行
                            pinnedTopRowData={pinnedTopRowData}
                            pinnedBottomRowData={pinnedBottomRowData}
                            //默认的Enter键进入或者退出编辑状态，并不会去转移光标

                            //输入Enter键的时候转移到下一行的光标
                            enterMovesDown={true}
                            //输入Enter键的时候转移到下一行的光标，即使当前单元格处于编辑状态
                            enterMovesDownAfterEdit={false}
                            //鼠标单击进入编辑状态，但是会丢失导航能力，并不好用
                            //singleClickEdit={true}
                            //当表格丢失焦点的时候，自动停止编辑并保存，这点非常有用
                            stopEditingWhenCellsLoseFocus={true}
                        ></AgGridReact>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GridExample;