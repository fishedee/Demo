import getLodop from './lodop';
import { Modal } from 'antd';
import React from 'react';
import { LodopError, LodopLoadingError, LodopNotInstallError } from './lodopError';

const getAntdLodop = () => {
    try {
        let result = getLodop();
        return result;
    } catch (e) {
        if (e instanceof LodopLoadingError) {
            Modal.warning({
                content: '正在加载打印组件中，请稍候重试',
            });
        } else if (e instanceof LodopNotInstallError) {
            const showElement = (
                <div>
                    <p>
                        {'Web打印服务CLodop未安装启动，点击这里'}
                        <a href="/clodop-4.145.zip" target="_blank">
                            {'下载执行安装'}
                        </a>
                    </p>
                    <p>
                        {'若此前已安装过，可'}
                        <a href="CLodop.protocol:setup" target="_self">
                            {'点这里直接再次启动'}
                        </a>
                    </p>
                </div>
            );
            Modal.error({
                content: showElement,
            });
        }
        throw e;
    }
};

export default getAntdLodop;