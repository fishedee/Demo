import { MutableRefObject, useLayoutEffect } from "react";
import useDataRef from "../../useDataRef";
import { useManualRefresh } from "../../useManualRefresh";
import { Dropdown, MenuProps } from 'antd';

class Point {
    public readonly x: number;
    public readonly y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public sub(r: Point): Point {
        return new Point(this.x - r.x, this.y - r.y);
    }

    public add(r: Point): Point {
        return new Point(this.x + r.x, this.y + r.y);
    }
}

const menuItems: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
    },
    {
        label: '2nd menu item',
        key: '2',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];


class Model {
    public showPoint = new Point(0, 0);
    public showMenu = false;
    public divRef: MutableRefObject<HTMLDivElement | null> = { current: null };
    public manualRefresh = () => { };

    public onContextMenu = (ev: React.MouseEvent) => {
        if (this.showMenu == true) {
            this.closeContextMenu();
            setTimeout(() => {
                this.onContextMenu(ev);
            }, 100);
            return;
        }
        const boundRect = this.divRef.current!.getBoundingClientRect();
        this.showPoint = new Point(ev.clientX - boundRect.x, ev.clientY - boundRect.y);
        this.showMenu = true;
        this.manualRefresh();

        //initEvent
        window.addEventListener('click', this.closeContextMenu);
        window.addEventListener('contextmenu', this.closeContextMenu);
    }

    private closeContextMenu = () => {
        if (!this.showMenu) {
            return;
        }
        window.removeEventListener('contextmenu', this.closeContextMenu);

        this.showMenu = false;
        this.manualRefresh();
    }
}

const Page: React.FC<any> = (props) => {
    const { manualRefresh } = useManualRefresh();
    const model = useDataRef(() => {
        const result = new Model();
        result.manualRefresh = manualRefresh;
        return result;
    }).current;
    useLayoutEffect(() => {
        return () => {
            model.manualRefresh = () => { };
        }
    }, []);
    return (
        <div
            ref={model.divRef}
            onContextMenu={(e) => {

                e.preventDefault();
                e.nativeEvent.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                model.onContextMenu(e);
            }}
            style={{ margin: '10px', position: 'absolute', width: '2000px', height: '2000px', border: '1px solid black' }}>
            {model.showMenu ? <Dropdown menu={{ items: menuItems }} open={true} >
                <div style={{
                    position: 'absolute',
                    left: model.showPoint.x + "px",
                    top: model.showPoint.y + "px",
                }}>
                </div></Dropdown > : null}
        </div>
    );
}

export default Page;