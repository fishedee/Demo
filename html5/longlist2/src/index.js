import './index.css'

// 列表元素高度
const ITEM_HEIGHT = 31
// 列表元素个数
const ITEM_COUNT = 500

window.onload = function () {
    const container = document.querySelector('#container')
    const containerHeight = container.clientHeight
    const list = document.querySelector('#list')
    // 一屏可以渲染下的元素个数
    const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT)
    const placeholder = document.querySelector('#content-placeholder')
    // 首次渲染
    const refreshList = function(from ,to){
    	list.innerHTML = '';
    	list.appendChild(renderNodes(from, to))
    	let centerCount = to-from;
    	let paddingTop = from*ITEM_HEIGHT;
    	let paddingBottom = (ITEM_COUNT - to )*ITEM_HEIGHT;
    	list.style.paddingTop = paddingTop + 'px';
    	list.style.paddingBottom = paddingBottom+'px';
    }
    
    refreshList(0,visibleCount);
    container.addEventListener('scroll', function() {
        const firstIndex = Math.floor(container.scrollTop / ITEM_HEIGHT)
        refreshList(firstIndex, firstIndex + visibleCount);
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