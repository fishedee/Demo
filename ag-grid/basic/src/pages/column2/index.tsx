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
    GridReadyEvent,
} from 'ag-grid-community';
import { Button } from 'antd';

const GridExample = () => {
    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>();
    const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
        // using default ColDef
        { field: 'athlete' },
        { field: 'sport' },
        // using number column type
        { field: 'age', type: 'numberColumn' },
        { field: 'year', type: 'numberColumn' },
        // using date and non-editable column types
        { field: 'date', type: ['dateColumn', 'nonEditableColumn'], width: 220 },
        { headerName: 'Gold', field: 'gold' },
        { headerName: 'Silver', field: 'silver' },
        { headerName: 'Bronze', field: 'bronze' },
        {
            headerName: 'Total',
            field: 'total',
            columnGroupShow: 'closed',
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            // set the default column width
            width: 150,
            // make every column editable
            editable: true,
            // make every column use 'text' filter by default
            filter: 'agTextColumnFilter',
            // enable floating filters by default
            floatingFilter: true,
            // make columns resizable
            resizable: true,
            sortable: true,
        };
    }, []);
    const defaultColGroupDef = useMemo<Partial<ColGroupDef>>(() => {
        return {
        };
    }, []);
    const columnTypes = useMemo<{
        [key: string]: ColDef;
    }>(() => {
        return {
            numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
            nonEditableColumn: { editable: false },
            dateColumn: {
                // specify we want to use the date filter
                filter: 'agDateColumnFilter',
                // add extra parameters for the date filter
                filterParams: {
                    // provide comparator function
                    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        const dateParts = cellValue.split('/');
                        const day = Number(dateParts[0]);
                        const month = Number(dateParts[1]) - 1;
                        const year = Number(dateParts[2]);
                        const cellDate = new Date(year, month, day);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    },
                },
            },
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data: any[]) => setRowData(data));
    }, []);

    const toggleSport = () => {
        console.log(columnDefs);
        let sportIndex = columnDefs.findIndex((single: any) => {
            return single.field == 'sport';
        });
        let newColumnDefs: any;
        if (sportIndex != -1) {
            newColumnDefs = columnDefs.filter((single: any) => {
                return single.field != 'sport';
            });
        } else {
            newColumnDefs = [
                ...columnDefs,
                { field: 'sport' },
            ];
        }
        //将本地的ColumnDef获取了，然后用React的方式设置进去，这个方法也是可以的
        setColumnDefs(newColumnDefs);

        //这种方法不好的地方在于，当以UI方式进行Table分组、筛选或者调整顺序以后，AgGrid并没有对本地的ColumnDef进行修改。
        //也就是说，setColumnDefs总是拿着陈旧的数据在修改
        //而且，使用filter的方式直接删除列，会丢失原来列的状态信息
    }

    const toggleSport2 = () => {
        //getColumnDefs是列信息里面经过最终合并后的数据，它反应的是最新的列信息数据
        const oldColumnDefs = gridRef.current!.api.getColumnDefs()!;
        console.log('columnDefs ', oldColumnDefs);
        let newColumnDefs = oldColumnDefs.map((single: any) => {
            if (single.field == 'sport') {
                return {
                    ...single,
                    hide: !single.hide,
                }
            } else {
                return single;
            }
        });
        /*
        * columnDefs的数据
        * aggFunc: null
        * colId: "athlete"
        * editable: true
        * field: "athlete"
        * filter: "agTextColumnFilter"
        * floatingFilter: true
        * hide: undefined
        * pinned: null
        * pivot: false
        * pivotIndex: null
        * resizable: true
        * rowGroup: false
        * rowGroupIndex: null
        * sort: null
        * sortIndex: null
        * sortable: true
        * width: 150
        */
        //以命令的方式写入列信息，使用hide的方式，不会丢失原来列的状态信息
        gridRef.current!.api.setColumnDefs(newColumnDefs);
    }


    const toggleSport3 = () => {
        //columnState比columnDefs少的内容有：
        //editable，sortable，filter，floatFilter等等

        /*columnState数据
        * aggFunc: null
        * colId: "athlete"
        * flex: null
        * hide: false
        * pinned: null
        * pivot: false
        * pivotIndex: null
        * rowGroup: false
        * rowGroupIndex: null
        * sort: null
        * sortIndex: null
        * width: 150
        */
        const savedState = gridRef.current!.columnApi.getColumnState();
        console.log('columnState ', savedState);
        savedState.forEach(single => {
            if (single.colId == 'sport') {
                single.hide = !single.hide;
            }
        })
        gridRef.current!.columnApi.applyColumnState({
            state: savedState
        });
    }

    const gridRef = useRef<AgGridReact>(null);
    return (
        <div style={containerStyle}>
            <div>
                <Button onClick={toggleSport}>{'Toggle Sport列'}</Button>
                <Button onClick={toggleSport2}>{'Toggle Sport列2'}</Button>
                <Button onClick={toggleSport3}>{'Toggle Sport列3'}</Button>
            </div>
            <div style={{ flex: '1', boxSizing: 'border-box' }}>
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        defaultColGroupDef={defaultColGroupDef}
                        columnTypes={columnTypes}
                        onGridReady={onGridReady}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;