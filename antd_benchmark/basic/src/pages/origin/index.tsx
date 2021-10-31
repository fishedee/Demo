import { Button, Dropdown, Menu, Space, Tag ,Input,Table} from 'antd';
import {
    SearchOutlined,
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import {useState,useEffect,ChangeEvent} from 'react';

type DataSourceType = {
    id:number;
    age:number;
    name:string;
    name2:string;
    name3:string;
    name4:string;
    name5:string;
}

const OriginTable:React.FC<any> = (props)=>{
    const [data,setData] = useState<DataSourceType[]>([]);
    useEffect(()=>{
        let result:DataSourceType[] = [];
        for(let i = 0 ;i != 100;i++){
            result.push({
                id:i,
                age:i+100,
                name:'name_'+i,
                name2:'name2_'+i,
                name3:'name3_'+i,
                name4:'name4_'+i,
                name5:'name5_'+i,
            });
        }
        setData(result);
    },[]);
    const setName = (index:number,name:string,value:ChangeEvent<HTMLInputElement>)=>{
        const newData = data.map((single,singleIndex)=>{
            if( index != singleIndex ){
                return single;
            }
            return {
                ...single,
                [name]:value.target.value,
            }
        });
        setData(newData);
    }
    console.log('render top origin');
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id', 
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '名字显示',
            dataIndex: 'name',
            key: 'name2',
        },
        {
            title: '名字',
            dataIndex: 'name',
            key: 'name',
            render:(value:any,row:any,index:any)=>{
                return (<Input value={value} onChange={setName.bind(null,index,'name')}/>);
            }
        },
        {
            title: '名字2',
            dataIndex: 'name2',
            key: 'name2',
            render:(value:any,row:any,index:any)=>{
                return (<Input value={value} onChange={setName.bind(null,index,'name2')}/>);
            }
        },
        {
            title: '名字3',
            dataIndex: 'name3',
            key: 'name3',
            render:(value:any,row:any,index:any)=>{
                return (<Input value={value} onChange={setName.bind(null,index,'name3')}/>);
            }
        },
        {
            title: '名字4',
            dataIndex: 'name4',
            key: 'name4',
            render:(value:any,row:any,index:any)=>{
                return (<Input value={value} onChange={setName.bind(null,index,'name4')}/>);
            }
        },
        {
            title: '名字5',
            dataIndex: 'name5',
            key: 'name5',
            render:(value:any,row:any,index:any)=>{
                return (<Input value={value} onChange={setName.bind(null,index,'name5')}/>);
            }
        },
    ];

    return ( <Table
        pagination={false}
        rowKey={'id'}
        columns={columns}
        dataSource={data}
    />);
}

export default OriginTable;
