import { Table, Tag, Space ,Input} from 'antd';
import { useState } from 'react';

export default ()=>{
   let [data,setData] = useState([
      {
        key: '1',
        name: 'John Brown',
        age: 32,
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
      },
    ]); 
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text,record,index) => {
          const onChange = (newValue)=>{
              let newData = data.map((value,oldIndex)=>{
                if(oldIndex != index){
                  return value;
                }
                return {
                    ...value,
                    name:newValue.target.value,
                  }
              });
              setData(newData);
          }
          return (<Input value={text} onChange={onChange}/>);
        }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
    ];
    console.log('Table Render');
    console.log(data);
    return <Table columns={columns} dataSource={data} />;
};