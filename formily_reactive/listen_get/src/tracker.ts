import { observable, Tracker } from '@formily/reactive'

// Tracker是一个更为底层的方法
// 首次触发需要手动调用track，与函数，来执行
// 当数据变化后，回调自己，开发者可以在回调继续注册Tracker，也可以放弃注册
export default function testTracker() {
    const obs = observable({
        aa: 11,
    })

    const view = () => {
        console.log('view go!!!')
        console.log(obs.aa)
    }

    const tracker = new Tracker(() => {
        // 收到数据变化的通知
        console.log('tracker other')

        // 再次执行view，并收集依赖
        tracker.track(view)
    })

    // 首次执行view，并收集依赖
    console.log('tracker first')
    tracker.track(view)

    obs.aa = 22

    tracker.dispose()
}
