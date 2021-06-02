import React, { Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';
import classname from 'classname';

export default class StandardTable extends React.Component {
  handleSelectedRowChange = (rows)=>{
    if( this.props.onSelectedRowChange ){
      let key = rows.length != 0 ? rows[0]:undefined
      this.props.onSelectedRowChange(key);
    }
  }

  onRowClick = (data)=>{
    if( this.props.onSelectedRowChange ){
      this.props.onSelectedRowChange(data[this.props.rowKey]);
    }
  }

  onRowDoubleClick = (data)=>{
    if( this.props.onRowDoubleClick ){
      this.props.onRowDoubleClick(data[this.props.rowKey]);
    }
  }

  handleTableChange = (pagination) => {
    this.props.onPaginactionChange({
      pageIndex:(pagination.current-1)*pagination.pageSize,
      pageSize:pagination.pageSize,
      count:pagination.total,
    });
  };

  onCellChange = (key,dataIndex,event)=>{
    let value = null;
    if( event && event.target ){
      value = event.target.value;
    }else{
      value = event;
    }
    let list = this.props.value;
    let newList = list.map((item)=>{
      if( item[this.props.rowKey] != key ){
        return item;
      }
      return {
        ...item,
        [dataIndex]:value,
      };
    })
    this.props.onChange(newList,key,dataIndex,value);
  }

  render() {
    const { value, paginaction , loading, columns, rowKey ,style ,selectedRow,onSelectedRowChange,getContainerRef} = this.props;

    let paginationProps = false;
    if( paginaction ){
      paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal:(total)=>{
          return '共'+total+'条'
        },
        current:paginaction.pageIndex/paginaction.pageSize+1,
        pageSize:paginaction.pageSize,
        total:paginaction.count,
      };
    }
    
    let rowSelection = null;
    if( onSelectedRowChange ){
      let selectedRows = [];
      if( selectedRow ){
        selectedRows = [selectedRow]
      }
      rowSelection = {
        selectedRowKeys:selectedRows,
        onChange: this.handleSelectedRowChange,
        type:'radio',
      };
    }

    let newColumns = [];
    for( let i in columns ){
      let newColumn = {...columns[i]};
      ((newColumn)=>{
        if( newColumn.render ){
          newColumn.oldRender = newColumn.render;
          newColumn.render = (text,record)=>{
            let element = newColumn.oldRender(text,record);
            if( React.isValidElement(element)){
              let newElement =  React.cloneElement(element,{
                value:text,
                onChange:this.onCellChange.bind(this,record[rowKey],newColumn.dataIndex)
              });
              return newElement;
            }else{
              return element;
            }
          }
        }
      })(newColumn);
      newColumns.push(newColumn);
    }

    return (
      <div className={classname(styles.standardTable,this.props.containerClassName)} ref={getContainerRef}>
        <Table
          style={style}
          className={this.props.className}
          size={"small"}
          bordered={true}
          loading={loading}
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={value}
          columns={newColumns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          onRow={(record)=>{
            let data = {
              onClick:this.onRowClick.bind(this,record),
              onDoubleClick:this.onRowDoubleClick,
            };
            if( this.props.onRow ){
              data = {
                ...data,
                ...this.props.onRow(record),
              } 
            }
            return data
          }}
        />
      </div>
    );
  }
}
