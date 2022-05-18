'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    ColDef,
    ColGroupDef,
    GetDataPath,
    GetRowIdFunc,
    GetRowIdParams,
    Grid,
    GridOptions,
    ICellRendererComp,
    ICellRendererParams,
    RowNode,
} from 'ag-grid-community';
import { getData } from './data2';

declare var window: any;

function getNextId() {
    if (!window.nextId) {
        window.nextId = 15;
    } else {
        window.nextId++;
    }
    return window.nextId;
}

const FileCellRenderer: React.FC<ICellRendererParams> = (props) => {
    var icon = getFileIcon(props.value);
    const value = props.value;
    return (<div>
        {icon ? <span>
            <i className={icon}></i>
            <span className="filename"></span>{value}
        </span>
            : value}
    </div>);
}

//删除的时候，连子树都一起删除
function getRowsToRemove(node: RowNode) {
    var res: any[] = [];
    const children = node.childrenAfterGroup || [];
    for (var i = 0; i < children.length; i++) {
        res = res.concat(getRowsToRemove(children[i]));
    }
    // ignore nodes that have no data, i.e. 'filler groups'
    return node.data ? res.concat([node.data]) : res;
}

function isSelectionParentOfTarget(selectedNode: RowNode, targetNode: RowNode) {
    var children = selectedNode.childrenAfterGroup || [];
    for (var i = 0; i < children.length; i++) {
        if (targetNode && children[i].key === targetNode.key) return true;
        isSelectionParentOfTarget(children[i], targetNode);
    }
    return false;
}

//设置node的filePath，递归设置
function getRowsToUpdate(node: RowNode, parentPath: string[]) {
    var res: any[] = [];
    var newPath = parentPath.concat([node.key!]);
    if (node.data) {
        // groups without data, i.e. 'filler groups' don't need path updated
        node.data.filePath = newPath;
    }
    var children = node.childrenAfterGroup || [];
    for (var i = 0; i < children.length; i++) {
        var updatedChildRowData = getRowsToUpdate(children[i], newPath);
        res = res.concat(updatedChildRowData);
    }
    // ignore nodes that have no data, i.e. 'filler groups'
    return node.data ? res.concat([node.data]) : res;
}

function getFileIcon(name: string) {
    return endsWith(name, '.mp3') || endsWith(name, '.wav')
        ? 'far fa-file-audio'
        : endsWith(name, '.xls')
            ? 'far fa-file-excel'
            : endsWith(name, '.txt')
                ? 'far fa-file'
                : endsWith(name, '.pdf')
                    ? 'far fa-file-pdf'
                    : 'far fa-folder';
}

function endsWith(str: string | null, match: string | null) {
    var len;
    if (str == null || !str.length || match == null || !match.length) {
        return false;
    }
    len = str.length;
    return str.substring(len - match.length, len) === match;
}

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'dateModified',
            minWidth: 250,
            comparator: (d1, d2) => {
                return new Date(d1).getTime() < new Date(d2).getTime() ? -1 : 1;
            },
        },
        {
            field: 'size',
            aggFunc: 'sum',
            valueFormatter: (params) => {
                return params.value
                    ? Math.round(params.value * 10) / 10 + ' MB'
                    : '0 MB';
            },
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            filter: true,
            sortable: true,
            resizable: true,
        };
    }, []);
    const autoGroupColumnDef = useMemo<ColDef>(() => {
        return {
            headerName: 'Files',
            minWidth: 330,
            cellRendererParams: {
                suppressCount: true,
                //自定义一个FileCellRenderer
                innerRenderer: FileCellRenderer,
            },
        };
    }, []);
    const getDataPath = useCallback((data: any) => {
        return data.filePath;
    }, []);
    const getRowId = useCallback((params: GetRowIdParams) => {
        return params.data.id;
    }, []);

    const addNewGroup = useCallback(() => {
        //添加到一个固定的filePath位置
        var newGroupData = [
            {
                id: getNextId(),
                filePath: ['Music', 'wav', 'hit_' + new Date().getTime() + '.wav'],
                dateModified: 'Aug 23 2017 11:52:00 PM',
                size: 58.9,
            },
        ];
        gridRef.current!.api.applyTransaction({ add: newGroupData });
    }, []);

    const removeSelected = useCallback(() => {
        var selectedNode = gridRef.current!.api.getSelectedNodes()[0]; // single selection
        if (!selectedNode) {
            console.warn('No nodes selected!');
            return;
        }

        //删除该node以及node下面children的数据
        gridRef.current!.api.applyTransaction({
            remove: getRowsToRemove(selectedNode),
        });
    }, []);

    const moveSelectedNodeToTarget = useCallback((targetRowId: string) => {
        var selectedNode = gridRef.current!.api.getSelectedNodes()[0]; // single selection
        if (!selectedNode) {
            console.warn('No nodes selected!');
            return;
        }
        var targetNode = gridRef.current!.api.getRowNode(targetRowId)!;
        var invalidMove =
            selectedNode.key === targetNode.key ||
            isSelectionParentOfTarget(selectedNode, targetNode);
        if (invalidMove) {
            console.warn('Invalid selection - must not be parent or same as target!');
            return;
        }
        var rowsToUpdate = getRowsToUpdate(selectedNode, targetNode.data.filePath);
        gridRef.current!.api.applyTransaction({ update: rowsToUpdate });
    }, []);

    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <div style={{ marginBottom: '5px' }}>
                    <button onClick={addNewGroup}>Add New Group</button>
                    <button onClick={() => moveSelectedNodeToTarget('9')}>
                        Move Selected to 'stuff'
                    </button>
                    <button onClick={removeSelected}>Remove Selected</button>
                </div>

                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        autoGroupColumnDef={autoGroupColumnDef}
                        treeData={true}
                        animateRows={true}
                        groupDefaultExpanded={-1}
                        rowSelection={'single'}
                        getDataPath={getDataPath}
                        getRowId={getRowId}
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;