import './index.css'

// 列表元素高度
const ITEM_HEIGHT = 31
// 列表元素个数
const ITEM_COUNT = 500

window.onload = function () {
    const container = document.querySelector('#container')
    console.log(container,container.clientHeight);
    const containerHeight = container.clientHeight
    const list = document.querySelector('#list')
    // 一屏可以渲染下的元素个数
    const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT)
    const placeholder = document.querySelector('#content-placeholder')
    placeholder.style.height = ITEM_COUNT * ITEM_HEIGHT + 'px'
    // 首次渲染
    list.appendChild(renderNodes(0, visibleCount))
    container.addEventListener('scroll', function() {
        // 使用 translate3d 将可视列表调整到屏幕正中的位置
        list.style.webkitTransform = `translate3d(0, ${container.scrollTop - container.scrollTop % ITEM_HEIGHT}px, 0)`
        list.innerHTML = ''
        // 计算可视区域列表的起始元素的 index
        const firstIndex = Math.floor(container.scrollTop / ITEM_HEIGHT)
        list.appendChild(renderNodes(firstIndex, firstIndex + visibleCount))
    })
}

function renderNodes(from, to) {
    const fragment = document.createDocumentFragment()
    for (let i = from; i < to; i++) {
        const el = document.createElement('li')
        el.innerHTML = i + 1
        fragment.appendChild(el)
    }
    return fragment
}