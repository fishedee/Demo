import React from 'react'
import Enzyme, { shallow ,render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import {Button,ButtonList} from './ui';

Enzyme.configure({ adapter: new Adapter() })


test('test1',()=>{
    //浅渲染
    const MyButton = shallow(<Button title={'按钮啊'}/>);

    //拿出text
    const buttonText = MyButton.text();

    expect(buttonText).toEqual('按钮啊');
})


test('test2',()=>{

    const myClick = jest.fn();
    //浅渲染
    const MyButton = shallow(<Button title={'按钮啊'} onClick={myClick}/>);

    //模拟事件点击
    MyButton.simulate('click');

    // 期望调用了这个方法
    expect(myClick).toHaveBeenLastCalledWith();
})

test('test3',()=>{
      //浅渲染
      const app = shallow(<ButtonList title="12" list={[
          {
              title:'button1',
          },
          {
              title:'button2',
          }
      ]}/>);

      //拿出text
      const buttonLength = app.find('button').length;
  
      expect(buttonLength).toEqual(0);
})

test('test4',()=>{
    //深渲染，只渲染为html
    const app = render(<ButtonList title="12" list={[
        {
            title:'button1',
        },
        {
            title:'button2',
        }
    ]}/>);

    //拿出text
    const buttonLength = app.find('button').length;

    expect(buttonLength).toEqual(2);
})

test('test5',()=>{
    //深渲染，只渲染为html
    const app = render(<ButtonList title="12" list={[
        {
            title:'button1',
        },
        {
            title:'button2',
        }
    ]}/>);

    expect(toJson(app)).toMatchSnapshot();
})