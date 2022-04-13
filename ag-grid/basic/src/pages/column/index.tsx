import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {Button} from 'antd';
import { GetRowIdFunc } from 'ag-grid-community';

const bigDecimalCompare = (v1:string,v2:string)=>{
    let v1Number = Number.parseFloat(v1);
    let v2Number = Number.parseFloat(v2);
    return v1Number-v2Number;
}
const App:React.FC<any> = () => {
  const [rowData,setRowData] = useState([
      {id:1,make: "Toyota", model: "Celica", price: '9.23',date:'2022-01-02'},
      {id:2,make: "Ford", model: "Mondeo", price:'31.2',date:'2021-01-02'},
      {id:3,make: "Porsche", model: "Boxter", price: '188.7',date:'2022-03-02'}
  ]);
  
  const [columnDefs] = useState([
      //headerName是名称
      { headerName:'品牌',field: 'make' },
      { headerName:'型号',field: 'model',pinned:true },
      //定义col的ID，以及类型
      { colId:'price1',headerName:'价格',field: 'price',type:'numberColumn'},
      { headerName:'日期',field: 'date',type:'dateColumn'},
      { colId:'price2',headerName:'价格2',field: 'price',type:'numberColumn',pinned:'right'},
  ])

  const defaultColDef = useMemo(()=>{
      return {
        width:170,
        //可调宽度
        resizable: true,
        filter: 'agTextColumnFilter',
        //单独一行来做filter
        floatingFilter:true,
      };
  },[]);

  const columnTypes = useMemo(() => {
    return {
        //定义数字类型
      numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
      //定义日期类型
      dateColumn: {
        // specify we want to use the date filter
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
          // provide comparator function
          comparator: (prevValue:any, cellValue:any) => {
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split('-');
            const day = Number(dateParts[2]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[0]);
            const cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < prevValue) {
              return -1;
            } else if (cellDate > prevValue) {
              return 1;
            } else {
              return 0;
            }
          },
        },
      },
    };
  }, []);
  const getRowId:GetRowIdFunc = useCallback((props)=>{
        return props.data.id;
  },[]);
  const onGridReady  = useCallback((params)=>{
    console.log('grid ready');
  },[]);
  return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <div className="ag-theme-alpine" style={{height: '80%', width: '80%'}}>
            <AgGridReact
                getRowId={getRowId}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                columnTypes={columnTypes}
                onGridReady={onGridReady }/>
        </div>
      </div>
  );
};

export default App;