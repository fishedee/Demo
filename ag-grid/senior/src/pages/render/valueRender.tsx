'use strict';

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    ICellRendererParams,
    RowEditingStartedEvent,
    RowEditingStoppedEvent,
} from 'ag-grid-community';
import GenderRenderer from './genderRenderer';
import MoodRenderer from './moodRenderer';

const ValueRender: React.FC<ICellRendererParams> = (props) => {
    console.log('value', props.value);
    console.log('title', (props as any).title);
    console.log('ctx', props.context);
    console.log('data', props.data);
    console.log('rowIndex', props.rowIndex);
    return (<div style={{ background: 'blue', color: 'white' }}>{props.value}</div>);
}

const SortingHeader = memo((props: any) => {

    const [sortState, setSortState] = useState<string>();

    const onClick = useCallback(() => {
        props.progressSort();
    }, []);

    useEffect(() => {
        const listener = () => {
            if (props.column.isSortAscending()) {
                setSortState('ASC');
            } else if (props.column.isSortDescending()) {
                setSortState('DESC');
            } else {
                setSortState(undefined);
            }
        };

        props.column.addEventListener('sortChanged', listener);

        return () => props.column.removeEventListener('sortChanged', listener);;
    }, []);

    return (
        <span className="my-header" onClick={onClick}>
            <img style={{ width: '30px', height: '30px' }} src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" />
            {props.displayName} {sortState}
        </span>
    );
});


const GridExample = () => {
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>([
        { value: 14, type: 'age' },
        { value: 'female', type: 'gender' },
        { value: 'Happy', type: 'mood' },
        { value: 21, type: 'age' },
        { value: 'male', type: 'gender' },
        { value: 'Sad', type: 'mood' },
    ]);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'value',
            //指定该列的行头render
            headerComponent: SortingHeader,
            //对该列使用一个指定的render
            cellRenderer: ValueRender,
            cellRendererParams: {
                title: "Fish",
            }
        },
        {
            headerName: 'Rendered Value',
            field: 'value',
            cellRendererSelector: (params: ICellRendererParams) => {
                //根据cell的值不同，采用不用的Render
                const moodDetails = {
                    component: MoodRenderer,
                };
                const genderDetails = {
                    component: GenderRenderer,
                    params: { values: ['Male', 'Female'] },
                };
                if (params.data.type === 'gender') return genderDetails;
                else if (params.data.type === 'mood') return moodDetails;
                else return undefined;
            },
        },
        { field: 'type' },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    context={{
                        'Name': "Cat",
                    }}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample;