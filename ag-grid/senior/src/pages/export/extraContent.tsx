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
    GridReadyEvent,
    ExcelCell,
    ExcelStyle,
} from 'ag-grid-community';


const getRows: () => ExcelCell[][] = () => [
    //第一个空行
    [],
    //第二个行
    [
        {
            styleId: 'coverHeading',
            data: {
                //数据
                value: 'Here is a comma, and a some "quotes".',
                //类型
                type: 'String'
            },
        },
    ],
    //第三个行
    [
        {
            data: {
                value:
                    'They are visible when the downloaded file is opened in Excel because custom content is properly escaped.',
                type: 'String',
            },
        },
    ],
    [
        {
            data: { value: 'this cell:', type: 'String' },
            //合并两列
            mergeAcross: 1
        },
        {
            styleId: 'coverText',
            data: {
                value: 'is empty because the first cell has mergeAcross=1',
                type: 'String',
            },
        },
    ],
    [],
];

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', flex: '1' }), []);
    const [rowData, setRowData] = useState<any[]>();

    const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
        {
            headerName: 'Group A',
            children: [
                { field: 'athlete', minWidth: 200 },
                { field: 'country', minWidth: 200 },
            ],
        },
        {
            headerName: 'Group B',
            children: [
                { field: 'sport', minWidth: 150 },
                { field: 'gold' },
                { field: 'silver' },
                { field: 'bronze' },
                { field: 'total' },
            ],
        },
    ]);
    const excelStyles = useMemo<ExcelStyle[]>(() => {
        return [
            {
                id: 'coverHeading',
                font: {
                    italic: true,
                    size: 26,
                    bold: true,
                    underline: 'Single',
                },
            },
            {
                id: 'coverText',
                font: {
                    size: 14,
                },
            },
        ];
    }, []);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            sortable: true,
            filter: true,
            resizable: true,
            minWidth: 100,
            flex: 1,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => {
                setRowData(data);
            });
    }, []);

    const onBtExport = useCallback(() => {
        //exportDataAsExcel直接导出
        gridRef.current!.api.exportDataAsExcel({
            sheetName: "表单名",
            prependContent: getRows(),
            appendContent: getRows(),
        });
        //getDataAsExcel返回Blob对象
        //gridRef.current!.api.getDataAsExcel();
    }, []);

    return (
        <div style={containerStyle}>
            <div>
                <button
                    onClick={onBtExport}
                    style={{ marginBottom: '5px', fontWeight: 'bold' }}
                >
                    Export to Excel
                </button>
            </div>
            <div className="grid-wrapper">
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                        excelStyles={excelStyles}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;