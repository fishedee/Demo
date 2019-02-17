import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {subscribe} from 'subscribe-ui-event'

const VISIBLE_SLICE_COUNT = 3

const getSlices = (data, sliceSize) => {
  const slices = []
  for (let i = 0, amount = data.length; amount >= 0; i++, amount -= sliceSize) {
    slices.push({
      startIndex: sliceSize * i,
      amount: amount > sliceSize ? sliceSize : amount,
    })
  }
  return slices
}

export default class InfiniteLoader extends Component {
  static propTypes = {
    template: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    keyProp: PropTypes.string,
    onLoad: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isDrained: PropTypes.bool,
    placeholders: PropTypes.shape({
      loading: PropTypes.element,
      drained: PropTypes.element,
    }),
    getContainer: PropTypes.func,
    // sliced list
    // slice 的粒度
    sliceSize: PropTypes.number,
    // slice 切换的边界条件（距离 containerEL ${sliceThreshold}px）
    sliceThreshold: PropTypes.number,
  }

  static defaultProps = {
    keyProp: 'id',
    placeholders: {},
    sliceSize: 30,
    sliceThreshold: 30,
  }

  state = {
    prevProps: {
      data: [],
    },
    slices: [],
    currentSliceIndex: 0,
    topSpaces: [],
  }

  static getDerivedStateFromProps(props, state) {
    const {prevProps} = state
    const {data, sliceSize} = props
    const {data: prevData} = prevProps

    const slices = getSlices(data, sliceSize)

    // 数据源没有变化
    if (prevData === data) {
      return null
    }

    // 数据源切换或者被裁减了
    if (
      (prevData[0] && data[0] && prevData[0] !== data[0]) ||
      data.length < prevData.length
    ) {
      return {
        slices,
        currentSliceIndex: 0,
        topSpaces: [],
        prevProps: {
          data,
        },
      }
    }

    // 记录数据源
    return {
      slices,
      prevProps: {
        data,
      },
    }
  }

  componentDidMount() {
    const {isDrained} = this.props

    this.bindScrollHandler()

    if (this.shouldOptimize) {
      this.bindBoundaryEls()
    }

    if (isDrained) return

    this.startObserve()
  }

  componentDidUpdate(prevProps) {
    const {data: oldData, isDrained: wasDrained} = prevProps
    const {isLoading, isDrained, data} = this.props

    if (oldData.length > data.length) {
      this.containerEl.scrollTop = 0
    }

    if (this.shouldOptimize) {
      this.bindBoundaryEls()
    } else {
      this.unbindBoundaryEls()
    }

    if (isLoading) return

    if (isDrained) {
      this.stopObserve()
      return
    }

    if (wasDrained && !isDrained) {
      this.startObserve()
      return
    }

    if (oldData.length < data.length) {
      this.mayLoadMore()
    }
  }

  componentWillUnmount() {
    this.stopObserve()
    this.unbindBoundaryEls()
    this.unbindScrollHandler()
  }

  get shouldOptimize() {
    const {slices} = this.state
    return slices.length > VISIBLE_SLICE_COUNT
  }

  get visibleData() {
    const {data} = this.props
    if (!this.shouldOptimize) {
      return data
    }

    if (this.shouldOptimize) {
      const {slices, currentSliceIndex} = this.state
      const visibleSlices = slices.slice(
        currentSliceIndex,
        currentSliceIndex + VISIBLE_SLICE_COUNT
      )
      const startIndex = visibleSlices[0].startIndex
      const amount = visibleSlices.reduce(
        (amount, slice) => slice.amount + amount,
        0
      )
      return data.slice(startIndex, startIndex + amount)
    }
  }

  get containerEl() {
    const {getContainer} = this.props
    return (getContainer && getContainer(this.rootEl)) || document.body
  }

  topBoundary = null
  bottomBoundary = null

  bindBoundaryEls = () => {
    const {slices, currentSliceIndex} = this.state
    const nodeList = this.listEl.childNodes
    this.topBoundary = nodeList[slices[currentSliceIndex].amount]
    this.bottomBoundary =
      nodeList[
        slices[currentSliceIndex].amount +
          slices[currentSliceIndex + 1].amount -
          1
      ]
  }

  unbindBoundaryEls = () => {
    this.topBoundary = null
    this.bottomBoundary = null
  }

  bindScrollHandler = () => {
    console.log("bindScroll",this.containerEl);
    this.subscriber = subscribe('scroll', this.handleScroll, {
      useRAF: true,
      target: this.containerEl,
    })
  }

  unbindScrollHandler = () => {
    if (this.subscriber) {
      this.subscriber.unsubscribe()
    }
  }

  processing = false

  handleScroll = () => {
    console.log("handleScroll");
    if (!this.shouldOptimize || this.processing) {
      return
    }

    if (!this.topBoundary || !this.bottomBoundary) {
      return
    }

    const {sliceThreshold} = this.props
    const {slices, currentSliceIndex, topSpaces} = this.state

    const topBoundaryLoc = this.topBoundary.getBoundingClientRect().top
    const bottomBoundaryLoc = this.bottomBoundary.getBoundingClientRect().top

    const containerTop = this.containerEl.getBoundingClientRect().top

    if (
      bottomBoundaryLoc < containerTop + sliceThreshold &&
      currentSliceIndex + VISIBLE_SLICE_COUNT < slices.length
    ) {
      this.processing = true
      const startY = this.listEl.firstChild.getBoundingClientRect().top
      const topSpace = topBoundaryLoc - startY
      this.setState(
        {
          currentSliceIndex: currentSliceIndex + 1,
          topSpaces: topSpaces.concat(topSpace),
        },
        () => {
          this.bindBoundaryEls()
          this.processing = false
        }
      )
      return
    }

    const containerHeight = this.containerEl.clientHeight

    if (
      topBoundaryLoc > containerTop + containerHeight - sliceThreshold &&
      currentSliceIndex > 0
    ) {
      this.processing = true
      this.setState(
        {
          currentSliceIndex: currentSliceIndex - 1,
          topSpaces: topSpaces.slice(0, topSpaces.length - 1),
        },
        () => {
          this.bindBoundaryEls()
          this.processing = false
        }
      )
    }
  }

  mayLoadMore = () => {
    const {top: containerY} = this.containerEl.getBoundingClientRect()
    const containerHeight = this.containerEl.clientHeight
    const {top: placeholderY} = this.placeholderEl.getBoundingClientRect()
    if (placeholderY <= containerHeight + containerY) {
      const {onLoad} = this.props
      onLoad()
    }
  }

  handleObserve = ([entry]) => {
    if (!entry.isIntersecting) return

    const {isLoading, isDrained, onLoad} = this.props
    if (isLoading || isDrained) return

    onLoad()
  }

  startObserve = () => {
    if (!this.placeholderEl) return
    // 销毁已经存在的 Observer
    this.stopObserve()

    this.observer = new IntersectionObserver(this.handleObserve)
    this.observer.observe(this.placeholderEl)
  }

  stopObserve = () => {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = undefined
    }
  }

  renderItem = (data, index) => {
    const {template: Template, keyProp} = this.props
    return <Template data={data} index={index} key={data[keyProp]} />
  }

  render() {
    const {className, placeholders, isDrained} = this.props
    const {topSpaces} = this.state
    return (
      <div className={className} ref={el => (this.rootEl = el)}>
        <div
          ref={el => (this.listEl = el)}
          style={{
            paddingTop: `${topSpaces.reduce(
              (total, curr) => curr + total,
              0
            )}px`,
          }}
        >
          {this.visibleData.map(this.renderItem)}
        </div>
        {!isDrained && (
          <div ref={el => (this.placeholderEl = el)}>
            {placeholders.loading}
          </div>
        )}
        {isDrained && placeholders.drained}
      </div>
    )
  }
}