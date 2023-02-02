import { MutableRefObject, useLayoutEffect } from "react";
import useDataRef from "../../useDataRef";
import { useManualRefresh } from "../../useManualRefresh";
import './basic.css';

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

class Model {
    public startMouseMove = new Point(0, 0);
    public startBoundMove = new Point(0, 0);
    public bound = new Point(20, 20);
    public active = false;
    public divRef: MutableRefObject<HTMLDivElement | null> = { current: null };

    public manualRefresh = () => { };

    public onMouseDown = (e: React.MouseEvent) => {
        this.startMouseMove = new Point(
            e.clientX,
            e.clientY,
        )
        this.startBoundMove = this.bound;
        this.active = true;
        this.manualRefresh();

        //init事件
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    public onMouseMove = (ev: MouseEvent) => {
        //clientX与clientY是相对于浏览器内部的x,y
        console.log('client x,y', ev.clientX, ev.clientY);
        //screenX与screenY是相对于整个屏幕的x,y
        console.log('screen x,y', ev.screenX, ev.screenY);
        //boundingClientRect可以算出包含wrapper滚动条后的位置
        const boundRect = this.divRef.current!.getBoundingClientRect();
        console.log('bounding x,y', boundRect.x, boundRect.y);
        console.log('mouse point in bounding x,y', ev.clientX - boundRect.x, ev.clientY - boundRect.y);
        const point = new Point(ev.clientX, ev.clientY);
        const diff = point.sub(this.startMouseMove);

        this.bound = this.startBoundMove.add(diff);
        console.log('bound', this.bound);
        this.manualRefresh();
    }
    public onMouseUp = (ev: MouseEvent) => {
        this.active = false;
        this.manualRefresh();
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
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
            onDragStart={(e) => {
                //避免与mouseMove冲突
                e.stopPropagation();
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                e.nativeEvent.stopPropagation();
            }}
            ref={model.divRef}
            style={{ margin: '10px', position: 'absolute', width: '2000px', height: '2000px', border: '1px solid black' }}>
            <div
                className="moveTarget"
                onMouseDown={model.onMouseDown}
                style={{
                    border: model.active ? '1px solid blue' : '1px solid grey',
                    position: 'absolute',
                    width: '80px',
                    height: '50px',
                    top: model.bound.y + 'px',
                    left: model.bound.x + 'px'
                }}>拖动我试一下</div>
        </div>
    );
}

export default Page;