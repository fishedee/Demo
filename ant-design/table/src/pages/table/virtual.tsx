import ProCard from '@ant-design/pro-card';
import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { Table, Space } from 'antd';
import './virtual.css';

function VirtualTable(props: Parameters<typeof Table>[0]) {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);
    //tableWidth就是table自身的宽度
    console.log('Table Width', tableWidth);

    const widthColumnCount = columns!.filter(({ width }) => !width).length;

    //对于没有设置tableWidth的column，将tableWidth平均分配给每一个列，就如B,C,D列平均分了table的宽度
    //注意，其他A，E，F列自身有宽度，不参与tableWidth的分配
    const mergedColumns = columns!.map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor(tableWidth / widthColumnCount),
        };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
        const obj = {};
        Object.defineProperty(obj, 'scrollLeft', {
            get: () => null,
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft });
                }
            },
        });

        return obj;
    });

    const resetVirtualGrid = () => {
        //每次table
        gridRef.current.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: true,
        });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList: CustomizeScrollBody<any> = (
        rawData: object[],
        { scrollbarSize, ref, onScroll }: any,
    ) => {
        //ref是为了提供给Table组件一个机会，可以让Table组件来控制scrollLeft
        ref.current = connectObject;
        //计算大概的整体高度
        const totalHeight = rawData.length * 54;

        return (
            <Grid
                ref={gridRef}
                className="virtual-grid"
                columnCount={mergedColumns.length}
                columnWidth={(index: number) => {
                    //最后一列的行款要减去scrollbar的宽度
                    const { width } = mergedColumns[index];
                    return totalHeight > scroll!.y! &&
                        index === mergedColumns.length - 1
                        ? (width as number) - scrollbarSize - 1
                        : (width as number);
                }}
                //视图的高度
                height={scroll!.y as number}
                //行的总数量
                rowCount={rawData.length}
                //每行的高度
                rowHeight={() => 54}
                //实际的宽度
                width={tableWidth}
                //用户触发的onScroll
                onScroll={({ scrollLeft }: { scrollLeft: number }) => {
                    //回调Table组件的onScroll，告诉Table组件，Scroll发生变动了
                    onScroll({ scrollLeft });
                }}
            >
                {({
                    columnIndex,
                    rowIndex,
                    style,
                }: {
                    columnIndex: number;
                    rowIndex: number;
                    style: React.CSSProperties;
                }) => (
                    <div
                        className={classNames('virtual-table-cell', {
                            'virtual-table-cell-last':
                                columnIndex === mergedColumns.length - 1,
                        })}
                        style={style}
                    >
                        {
                            //直接渲染的每一个数据，实在过于暴力，连column.render都没有去调用
                            //列的fixed，与嵌套,checkedbox等等全部功能丢掉了
                            (rawData[rowIndex] as any)[
                                (mergedColumns as any)[columnIndex].dataIndex
                            ]
                        }
                    </div>
                )}
            </Grid>
        );
    };

    return (
        <ResizeObserver
            onResize={({ width }) => {
                //每次TableWidth发生变化的时候，就重置Grid组件
                setTableWidth(width);
            }}
        >
            <Table
                {...props}
                className="virtual-table"
                columns={mergedColumns}
                pagination={false}
                components={{
                    //header沿用原来的数据
                    //body就是用了新的元素去覆盖它
                    //覆盖了整个body的元素，而不是简单做了一个wrapper
                    body: renderVirtualList,
                }}
            />
        </ResizeObserver>
    );
}

// Usage
const columns = [
    { title: 'A', dataIndex: 'key', width: 150 },
    { title: 'B', dataIndex: 'key' },
    { title: 'C', dataIndex: 'key' },
    { title: 'D', dataIndex: 'key' },
    { title: 'E', dataIndex: 'key', width: 200 },
    { title: 'F', dataIndex: 'key', width: 100 },
];

const data = Array.from({ length: 100000 }, (_, key) => ({ key }));
export default () => {
    return (
        <Space
            style={{
                background: 'rgb(240, 242, 245)',
                padding: '20px',
                display: 'flex',
            }}
            direction="vertical"
            size={20}
        >
            <ProCard title="虚拟列表" bordered headerBordered>
                <VirtualTable
                    columns={columns}
                    dataSource={data}
                    bordered
                    scroll={{ y: 300 }}
                />
            </ProCard>
        </Space>
    );
};
