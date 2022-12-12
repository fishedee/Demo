import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';
import { ColDef, FilterChangedEvent, ValueGetterFunc, ValueGetterParams } from 'ag-grid-community';

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'athlete',
            filter: 'agTextColumnFilter',
        },
        {
            colId: 'age2',
            field: 'age',
            maxWidth: 100,
            filter: 'agNumberColumnFilter',
        },
        {
            field: 'country',
            filter: 'agTextColumnFilter',
        },
        {
            //显示为country2，filter的数据为age
            colId: 'country2',
            field: 'country(以age来刷新)',
            filter: 'agNumberColumnFilter',
            filterValueGetter: (params: ValueGetterParams) => {
                return params.data.age;
            }
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
        /*
        filterModel是object类型，key为colId，不是field，value为filter配置
        搜索age为19的rows
        {
            "age2": {
                "filterType": "number",
                "type": "equals",
                "filter": 19
            }
        }
        */
        /*
        搜索age为19岁和2岁的rows
        {
            "age2": {
                "filterType": "number",
                "operator": "AND",
                "condition1": {
                    "filterType": "number",
                    "type": "equals",
                    "filter": 19
                },
                "condition2": {
                    "filterType": "number",
                    "type": "equals",
                    "filter": 2
                }
            }
        }
        */
        /*
        搜索age为19至80的rows
        {
            "age2": {
                "filterType": "number",
                "type": "inRange",
                "filter": 19,
                "filterTo": 80
            }
        }
          */
        /*
        搜索age为19，country包含United的rows
       {
           "age2": {
               "filterType": "number",
               "type": "equals",
               "filter": 19
           },
           "country": {
               "filterType": "text",
               "type": "contains",
               "filter": "United"
           }
       }
       */
        console.log('filterModel', filterModel);
    }
    const setFilter = useCallback(() => {
        gridRef.current!.api.setFilterModel({
            "age2": {
                "filterType": "number",
                "type": "equals",
                "filter": 19
            }
        });
    }, []);
    const addRows = useCallback(() => {
        let rows = [];
        gridRef.current!.api.forEachNode(single => {
            rows.push(single.data);
        });
        rows.push({
            athlete: 'FishGold',
            age: 19,
            country: new Date().toLocaleString(),
        });
        gridRef.current!.api.setRowData(rows);
    }, []);
    const onFilterChanged = useCallback((params: FilterChangedEvent) => {
        console.log('filter Changed', params);
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <div>
                <Button onClick={clearFilter}>{'清除筛选'}</Button>
                <Button onClick={getFilter}>{'获取筛选数据'}</Button>
                <Button onClick={setFilter}>{'剔除其他条件，只搜索19岁的群众'}</Button>
                <Button onClick={addRows}>{'添加19岁的数据'}</Button>
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