import ProCard from "@ant-design/pro-card";
import { Button } from 'antd';
import axios from "axios";

const AxiosExcelTest: React.FC<any> = (props) => {
    const getFileName = (headers: any): string => {
        const disposition = headers['content-disposition'];
        if (typeof disposition != 'string') {
            return '';
        }
        const nameIndex = disposition.indexOf('=');
        const name = disposition.substring(nameIndex + 1);
        return decodeURIComponent(name);
    }
    const axoisDownload = async () => {
        let response = await axios({
            method: 'GET',
            url: '/api/excel/get4',
            responseType: 'arraybuffer',
        });
        const aEle = document.createElement("a"); // 创建a标签
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        aEle.href = href;
        const name = getFileName(response.headers);
        aEle.download = name;
        document.body.appendChild(aEle);
        aEle.click(); // 点击下载
        document.body.removeChild(aEle); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
    }
    return (
        <div>
            <ProCard
                bordered={true}
                title="a标签触发">
                <a href="/api/excel/get4" target='_blank'>{'下载Excel'}</a>
            </ProCard>
            <ProCard
                bordered={true}
                title="window.open触发">
                <Button onClick={() => {
                    const url = "/api/excel/get4";
                    window.open(url);
                }}>{'下载Excel'}</Button>
            </ProCard>
            <ProCard
                bordered={true}
                title="axios触发">
                <Button onClick={axoisDownload}>{'下载Excel'}</Button>
            </ProCard>
        </div>
    );
}

export default AxiosExcelTest;