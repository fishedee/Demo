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
    SideBarDef,
} from 'ag-grid-community';

function getData() {
    var latinSentence =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.';
    var latinWords = latinSentence.split(' ');

    var rowData = [];

    function generateRandomSentence(row: any, col: any) {
        var wordCount = ((row + 1) * (col + 1) * 733 * 19) % latinWords.length;
        var parts = [];
        for (var i = 0; i < wordCount; i++) {
            parts.push(latinWords[i]);
        }
        var sentence = parts.join(' ');
        return sentence + '.';
    }

    // create 100 rows
    for (var i = 0; i < 100; i++) {
        var item = {
            rowNumber: 'Row ' + i,
            autoA: generateRandomSentence(i, 1),
            autoB: generateRandomSentence(i, 2),
            autoC: generateRandomSentence(i, 3),
        };
        rowData.push(item);
    }

    return rowData;
}

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            headerName: 'Row #',
            field: 'rowNumber',
            width: 120,
        },
        {
            field: 'autoA',
            width: 300,
            //设置wrapText，会产生一个white-space: normal的CSS属性
            wrapText: true,
            //设置autoHeight，行高与内容高度有关
            autoHeight: true,
            headerName: 'A) Auto Height',
        },
        {
            width: 300,
            field: 'autoB',
            //只设置了wrapText，但是没有autoHeight，因此仅有一行高度
            wrapText: true,
            headerName: 'B) Normal Height',
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            sortable: true,
            resizable: true,
        };
    }, []);
    const sideBar = useMemo<
        SideBarDef | string | string[] | boolean | null
    >(() => {
        return {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    toolPanelParams: {
                        suppressRowGroups: true,
                        suppressValues: true,
                        suppressPivots: true,
                        suppressPivotMode: true,
                        suppressSideButtons: true,
                        suppressColumnFilter: true,
                        suppressColumnSelectAll: true,
                        suppressColumnExpandAll: true,
                    },
                },
            ],
            defaultToolPanel: 'columns',
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        // in this example, the CSS styles are loaded AFTER the grid is created,
        // so we put this in a timeout, so height is calculated after styles are applied.
        setTimeout(function () {
            //初始化数据是空的，生成数据是后续加载的
            setRowData(getData());
        }, 500);
    }, []);

    /**
     * 自动高度的缺点是：
     * 鼠标拖动垂直滚动条会有滞后，因为行高的计算需要在展示内容的时候动态计算出来，不能在屏幕外计算出来（虚拟滚动的特性）
     * 显示数据会有回跳，因为行高是动态计算的，默认为一行，当前面行的高度发生变化了，当前行的数据就会往下跳
     * 无法开启列的虚拟滚动，对于大量列的场景不适用
     * 自动行高消耗较大的计算资源，切勿在所有列中设置autoHeight
     * pinnedRow的动态行哥不能马上执行
     */
    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    sideBar={sideBar}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;