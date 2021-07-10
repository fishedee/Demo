import { useCallback ,useState} from 'react';
import styles from './index.less';
import axios from 'axios';

type Todo = {
  id:number
  title:string
}
export default function IndexPage() {
  let [userIds,setUserIds] = useState<number []>([]);
  let getUserIds = useCallback(async()=>{
      let data = await axios('/api/users');
      setUserIds(data.data.users)
  },[]);
  let [todos,setTodos] = useState<Todo []>([]);
  let getTodos = useCallback(async()=>{
      let data = await axios('/myapi/todos');
      setTodos(data.data)
  },[]);
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button onClick={getUserIds}>拉user数据</button>
      <div>
        <h2>userId数据</h2>
        <div>{userIds}</div>
      </div>
      <button onClick={getTodos}>拉todos</button>
      <div>
        <h2>todos数据</h2>
        <div>{todos.map((item)=>(<li key={item.id}>{item.title}</li>))}</div>
      </div>
    </div>
  );
}
