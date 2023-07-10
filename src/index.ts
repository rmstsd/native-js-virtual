import { lossFrame } from './utils'
import Virtual from './virtual'

export function sleep(ms: number) {
  let t = Date.now()
  while (Date.now() - t < ms) {}
}

const container = document.querySelector('#root') as HTMLElement

const loseFunc = lossFrame(container, realTarget => {
  console.log('real realTarget', realTarget)
  vins.handleScroll(realTarget)
})

// document.addEventListener('scroll', loseFunc, { capture: true })

container.addEventListener(
  'scroll',
  evt => {
    // vins.handleScroll(container.scrollTop)
  },
  {
    capture: true
  }
)

requestAnimationFrame(function up() {
  vins.handleScroll(container.scrollTop)

  requestAnimationFrame(up)
})

const wrapperDom = document.createElement('div')
container.appendChild(wrapperDom)

const dataSources = Array.from({ length: 100 }, (_, idx) => ({ id: String(idx) }))

const keeps = 12
const estimateSize = 50

const dataKey = 'id'

const getUniqueIdFromDataSources = () => {
  const ids = dataSources.map(dataSource => dataSource[dataKey])

  return ids
}

const getRenderSlots = range => {
  sleep(1000)
  const slots = []
  const { start, end } = range

  for (let index = start; index <= end; index++) {
    const dataSourceItem = dataSources[index]

    const uniqueKey = dataSourceItem[dataKey]

    const itemDom = createItem(uniqueKey)

    itemDom.classList.add('item')
    itemDom.style.setProperty('height', `${estimateSize}px`)

    slots.push(itemDom)
  }
  return slots
}

const vins = new Virtual(
  {
    slotHeaderSize: 0,
    slotFooterSize: 0,
    keeps,
    estimateSize,
    buffer: 0, // Math.round(keeps / 3),
    uniqueIds: getUniqueIdFromDataSources()
  },
  range => {
    wrapperDom.innerHTML = ''

    const nvDoms = getRenderSlots(range)

    wrapperDom.append(...nvDoms)
    const { padFront, padBehind } = range
    const paddingStyle = {
      padding: false ? `0px ${padBehind}px 0px ${padFront}px` : `${padFront}px 0px ${padBehind}px`
    }
    wrapperDom.style.setProperty('padding', paddingStyle.padding)
  }
)

function createItem(uniqueKey) {
  // 创建 div 元素
  var div = document.createElement('div')
  div.style.display = 'flex'
  div.style.alignItems = 'center'
  div.setAttribute('index', uniqueKey)

  const dd = Array.from({ length: 10 }, () => {
    // 创建标题元素
    var title = document.createElement('h2')
    title.textContent = uniqueKey + ' 标题'
    title.style.color = 'blue'
    title.style.width = '200px'
    title.style.flexShrink = '0'

    // 创建副标题元素
    var subtitle = document.createElement('h3')
    subtitle.textContent = '副标题'
    subtitle.style.color = 'red'

    // 创建输入框元素
    var input1 = document.createElement('input')
    input1.type = 'text'
    input1.style.marginBottom = '10px'

    var input2 = document.createElement('input')
    input2.type = 'text'
    input2.style.marginBottom = '10px'

    var input3 = document.createElement('input')
    input3.type = 'text'
    input3.style.marginBottom = '10px'

    return [title, subtitle, input1, input2, input3]
  })

  // 将元素添加到 div 中
  div.append(...dd.flat(1))

  return div
}
