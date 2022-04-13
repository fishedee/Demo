
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          width: 180,
          filter: 'agTextColumnFilter',
        },
        {
          field: 'age',
          width: 90,
          filter: 'agNumberColumnFilter',
        },
        { headerName: 'Country', field: 'country', width: 140 },
      ],
    },
    {
      headerName: 'Sports Results',
      //子列不能通过拖出来单独一列，必须父列存在
      marryChildren:true,
      children: [
          //任何时候都展示该列
        { field: 'sport', width: 140 },
        {
            //只有关闭group的时候才展示该列
          columnGroupShow: 'closed',
          field: 'total',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
            //只有打开group的时候才展示该列
          columnGroupShow: 'open',
          field: 'gold',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'silver',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'bronze',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);
  const gridRef = useRef<any>();

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds:any[] = [];
    gridRef.current.columnApi.getAllColumns().forEach((column:any) => {
      allColumnIds.push(column.getId());
    });
    //这个好用，可以在onGridReady里面自动做了，自动调整列宽
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
                <div className="ag-theme-alpine" style={{height: '80%', width: '80%'}}>

        <div className="button-bar">
          <button onClick={sizeToFit}>Size to Fit</button>
          <button onClick={() => autoSizeAll(false)}>Auto-Size All</button>
          <button onClick={() => autoSizeAll(true)}>
            Auto-Size All (Skip Header)
          </button>
        </div>
        <AgGridReact
            ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;