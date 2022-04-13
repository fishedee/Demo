
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        //对country列进行分组rowGroup为true，分组后该列不消失hide为false
        { field: 'country', rowGroup: true, hide: false },
        { field: 'athlete', rowGroup: true, hide: false },
        { field: 'year' },
        //分组后的合并函数
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
        { field: 'age' },
        { field: 'date' },
        { field: 'sport' },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            resizable: true,
        };
    }, []);
    const groupRowRendererParams = useMemo(() => {
        return {
            //rowGroup没有默认的sum操作，需要手动定义，这个比较麻烦
            //innerRenderer
            suppressCount: false,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <div className="ag-theme-alpine" style={{ height: '80%', width: '80%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    //生成的分组列
                    groupRowRendererParams={groupRowRendererParams}
                    groupDisplayType={'groupRows'}
                    //分组后，分组列数据是否保留，hide为false的话不需要设置这一个
                    //showOpenedGroup={true}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;