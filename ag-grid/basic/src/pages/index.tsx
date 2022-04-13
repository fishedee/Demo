import styles from './index.less';

import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const App:React.FC<any> = () => {
  const [rowData] = useState([
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
  ]);
  
  const [columnDefs] = useState([
      { field: 'make' },
      { field: 'model' },
      { field: 'price' }
  ])

  return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <div className="ag-theme-alpine" style={{height: '80%', width: '80%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
      </div>
  );
};

export default App;