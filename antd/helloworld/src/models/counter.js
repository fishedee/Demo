import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { incCounter, getCounter } from '../services/api';

export default {
  namespace: 'counter',

  state: 0,

  effects: {
    *inc( {payload} , { call ,put}) {
       let counter = yield call(incCounter,payload);
       yield put({
        type: 'save',
        payload:counter,
      });
      message.success('提交成功');
    },
  },

  reducers: {
    save(state, action) {
      return action.payload;
    },
  },
};
