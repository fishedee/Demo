import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import ProCard from '@ant-design/pro-card';
import {
    SearchOutlined,
    CheckCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import MonacoEditor from 'react-monaco-editor';
import { useEffect, useRef } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
var beautify = require('js-beautify').js;

const BasicEditor: React.FC<any> = (props) => {
    const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();
    const editorRef2 = useRef<monacoEditor.editor.IStandaloneCodeEditor>();
    const options = {
        selectOnLineNumbers: true,
    };
    useEffect(() => {
        editorRef.current?.focus();
    }, []);
    const encode = () => {
        const model = editorRef.current!.getModel();
        const value = model!.getValue();
        try {
            const newValue = beautify(value, {
                indent_size: 2,
                space_in_empty_paren: true,
            });
            editorRef2.current!.setValue(newValue);
        } catch (e) {
            alert(e);
        }
    };
    return (
        <div
            style={{
                border: '1px solid black',
                padding: '20px',
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100vh',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    flex: '1',
                    border: '1px solid black',
                    height: '100%',
                }}
            >
                <MonacoEditor
                    language="javascript"
                    theme="vs-dark"
                    defaultValue=""
                    options={options}
                    editorDidMount={(editor) => {
                        editorRef.current = editor;
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    height: '100%',
                    padding: '40px',
                }}
            >
                <Button type="primary" onClick={encode}>
                    {'编码 >'}
                </Button>
                <Button type="primary">{'< 解码'}</Button>
            </div>
            <div
                style={{
                    flex: '1',
                    border: '1px solid black',
                    height: '100%',
                }}
            >
                <MonacoEditor
                    language="javascript"
                    theme="vs-dark"
                    defaultValue={''}
                    options={options}
                    editorDidMount={(editor) => {
                        editorRef2.current = editor;
                    }}
                />
            </div>
        </div>
    );
};

export default BasicEditor;
