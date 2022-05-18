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
    GetDataPath,
    Grid,
    GridOptions,
} from 'ag-grid-community';
import { getData } from './data';

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        //显示数据只有jobTitle与employmentType两个列
        { field: 'jobTitle' },
        { field: 'employmentType' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
        };
    }, []);

    //自动生成的分组列，每个元素为dataPath里面的数据
    const autoGroupColumnDef = useMemo<ColDef>(() => {
        return {
            headerName: 'Organisation Hierarchy',
            minWidth: 300,
            cellRendererParams: {
                suppressCount: true,
            },
        };
    }, []);

    //返回数据的树形地址
    const getDataPath = useCallback((data: any) => {
        return data.orgHierarchy;
    }, []);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current!.api.setQuickFilter(
            (document.getElementById('filter-text-box') as any).value
        );
    }, []);

    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <div style={{ marginBottom: '5px' }}>
                    <input
                        type="text"
                        id="filter-text-box"
                        placeholder="Filter..."
                        onInput={onFilterTextBoxChanged}
                    />
                </div>

                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        //定义自动生成的列
                        autoGroupColumnDef={autoGroupColumnDef}
                        //打开treeData，getDataPath,getDataPath是返回每个row树形数据的地址
                        treeData={true}
                        animateRows={true}
                        //默认展开所有group
                        groupDefaultExpanded={-1}
                        getDataPath={getDataPath}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;