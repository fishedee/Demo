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
      {id:1,make: "Toyota", model: "Celica", price: '9.23'},
      {id:2,make: "Ford", model: "Mondeo", price:'31.2'},
      {id:3,make: "Porsche", model: "Boxter", price: '188.7'}
  ]);
  
  const [columnDefs] = useState([
      { field: 'make' },
      { field: 'model' },
      { field: 'price', comparator:bigDecimalCompare}
  ])

  const defaultColDef = useMemo(()=>{
      return {
        width:170,
        sortable:true,
        unSortIcon:true,
      };
  },[]);

  const add = ()=>{
      let newRowData = [
          ...rowData,
          {
              id:rowData.length+1,
              make:"M1",
              model:"C2",
              price:(rowData.length+1)+'',
          },
      ]
      setRowData(newRowData);
  }

  const getRowId:GetRowIdFunc = useCallback((props)=>{
        return props.data.id;
  },[]);
  const onGridReady  = useCallback((params)=>{
    console.log('grid ready');
  },[]);
  return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
          <Button onClick={add}>{'添加一行'}</Button>
        <div className="ag-theme-alpine" style={{height: '80%', width: '80%'}}>
            <AgGridReact
                getRowId={getRowId}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady }/>
        </div>
      </div>
  );
};

export default App;