import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import './antd.min.css'
import App from './app'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

ReactDom.render(
	(<LocaleProvider locale={zhCN}>
		<App/>
	</LocaleProvider>),
	document.getElementById('root')
);