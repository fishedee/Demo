import { SmileOutlined, HeartOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout';

const IconMap = {
    smile: <SmileOutlined />,
    heart: <HeartOutlined />,
};

export default [
    {
        path: '/',
        name: 'welcome',
        icon: 'smile', //以字符串来标记icon
        children: [
            {
                path: '/welcome',
                name: 'one',
                icon: 'smile',
                children: [
                    {
                        path: '/welcome/welcome',
                        name: 'two',
                        icon: 'smile',
                        exact: true,
                    },
                ],
            },
        ],
    },
    {
        path: '/demo',
        name: 'demo',
        icon: 'heart',
    },
];

export const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    //做icon转换，从字符串到实际的icon
    menus.map(({ icon, children, ...item }) => ({
        ...item,
        icon: icon && IconMap[icon as string],
        children: children && loopMenuItem(children),
    }));
