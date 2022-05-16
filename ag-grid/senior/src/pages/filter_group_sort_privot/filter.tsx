import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';
import { FilterChangedEvent } from 'ag-grid-community';

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'athlete',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'age',
            maxWidth: 100,
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'country',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'date',
            filter: 'agNumberColumnFilter',
            maxWidth: 100,
        },
        {
            field: 'year',
            filter: 'agDateColumnFilter',
            filterParams: {
                //agDateColumnFilter需要一个comparator配置，因为要对输入数据与内容数据进行比较
                comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
                    let left = moment(filterLocalDateAtMidnight);
                    let right = moment(cellValue, 'YYYY');
                    let result = left.year() - right.year();
                    if (result < 0) {
                        return 1;
                    } else if (result > 0) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
                //默认inRange不包含两个边界点，需要指定这个选项
                inRangeInclusive: true,
            },
            width: 100,
        },
        { field: 'sport' },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: 'agNumberColumnFilter' },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            minWidth: 150,
            //所有列均可筛选
            filter: true,
            //要一个固定行，输入filter数据
            floatingFilter: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    const clearFilter = () => {
        gridRef.current!.api.setFilterModel(null);
    }

    const getFilter = () => {
        const filterModel = gridRef.current!.api.getFilterModel();
        console.log('filterModel', filterModel);
    }

    const onFilterChanged = useCallback((params: FilterChangedEvent) => {
        console.log('filter Changed', params);
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <div>
                <Button onClick={clearFilter}>{'清除筛选'}</Button>
                <Button onClick={getFilter}>{'获取筛选数据'}</Button>
            </div>
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    onFilterChanged={onFilterChanged}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;