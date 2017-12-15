const log = console.log.bind(console)

let d = false // 初始化鼠标按下事件
let offX, offY, moveX = 437, moveY = 293, edW, edH
let movePoint = []
let resizePoint = []

const main = document.querySelector('.main')
const edit = document.createElement('div')
const editArea = document.createElement('div')    // 小方块
const editRotate = document.createElement('div')  // 小方块外拖拽按钮

const mainLeft = main.offsetLeft
const mainTop = main.offsetTop

/**
 * 批量添加attribute
 **/
const setAttr = (el, attrs) => {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

// 上、右、左、下、右上、左上、右下、左下
const editDir = ['t', 'r', 'l', 'b', 'tr', 'tl', 'br', 'bl']

// 添加 className
setAttr(edit, {
  'class': 'edit',
  'style': 'width:150px;height:150px;transform:translate(437px, 293px);'
})
setAttr(editArea, {
  'class': 'edit-area'
})
setAttr(editRotate, {
  'class': 'edit-rotate'
})

main.onmousedown = (e) => {
  main.append(edit)
  edit.appendChild(editArea)
  editArea.appendChild(editRotate)
}

for (var i = 0; i < editDir.length; i++) {
  const editResize = document.createElement('div')

  setAttr(editResize, {
    'class': 'edit-resize edit-resize-' + editDir[i],
    'edit-dir': editDir[i]
  })
  edit.appendChild(editResize)

  resizePoint.push(editResize)
}

// log(window.getComputedStyle(editArea, '::before'))

editArea.onmousedown = (e) => {
  d = true
  offX = e.offsetX
  offY = e.offsetY
}

editArea.onmousemove = (e) => {
  if (d) {
    moveX = e.pageX - offX - mainLeft
    moveY = e.pageY - offY - mainTop

    edit.style.transform = 'translate('+ moveX +'px, '+ moveY +'px)'
  }
}

editArea.onmouseup = (e) => {
  d = false
}

for (let i = 0; i < resizePoint.length; i++) {
  resizePoint[i].onmousedown = (e) => {
    d = true
    edW = parseInt(edit.style.width)
    edH = parseInt(edit.style.height)
  }
  resizePoint[i].onmousemove = (e) => {
    if (d) {
      const tr = e.target.getAttribute('edit-dir') === 'tr'
      const br = e.target.getAttribute('edit-dir') === 'br'
      const tl = e.target.getAttribute('edit-dir') === 'tl'
      const bl = e.target.getAttribute('edit-dir') === 'bl'
      const t = e.target.getAttribute('edit-dir') === 't'
      const b = e.target.getAttribute('edit-dir') === 'b'
      const l = e.target.getAttribute('edit-dir') === 'l'
      const r = e.target.getAttribute('edit-dir') === 'r'
      movePoint.push({
        x: e.pageX,
        y: e.pageY
      })

      if (movePoint.length > 1) {
        let moveTX = movePoint[movePoint.length - 1].x - movePoint[movePoint.length - 2].x
        let moveTY = movePoint[movePoint.length - 1].y - movePoint[movePoint.length - 2].y
        let mouseOffLeft = e.pageX - mainLeft
        let mouseOffTop = e.pageY - mainTop

        if (r) {
          edit.style.width = ((e.pageX - mainLeft) - moveX) + 'px'
        }

        if (l) {
          edit.style.width = (edW - (mouseOffLeft - moveX)) + 'px'
          edit.style.transform = 'translate('+ (e.pageX - mainLeft) +'px, '+ moveY +'px)'
        }

        if (t) {
          edit.style.height = (edH - (mouseOffTop - moveY)) + 'px'
          edit.style.transform = 'translate('+ moveX +'px, '+ (e.pageY - mainTop) +'px)'
        }

        if (b) {
          edit.style.height = ((e.pageY - mainTop) - moveY) + 'px'
        }

        if (tr) {
          edit.style.width = ((e.pageX - mainLeft) - moveX) + 'px'
          edit.style.height = (edH - (mouseOffTop - moveY)) + 'px'
          edit.style.transform = 'translate('+ moveX +'px, '+ (e.pageY - mainTop) +'px)'
        }

        if (tl) {
          edit.style.height = (edH - (mouseOffTop - moveY)) + 'px'
          edit.style.transform = 'translate('+ moveX +'px, '+ (e.pageY - mainTop) +'px)'
          edit.style.width = (edW - (mouseOffLeft - moveX)) + 'px'
          edit.style.transform = 'translate('+ (e.pageX - mainLeft) +'px, '+ moveY +'px)'
        }

        if (br) {
          edit.style.width = ((e.pageX - mainLeft) - moveX) + 'px'
          edit.style.height = ((e.pageY - mainTop) - moveY) + 'px'
        }

        if (bl) {
          edit.style.height = ((e.pageY - mainTop) - moveY) + 'px'
          edit.style.width = (edW - (mouseOffLeft - moveX)) + 'px'
          edit.style.transform = 'translate('+ (e.pageX - mainLeft) +'px, '+ moveY +'px)'
        }
      }
    }
  }
  resizePoint[i].onmouseup = (e) => {
    d = false
    movePoint = []

    offX = e.offsetX
    offY = e.offsetY

    edW = parseInt(edit.style.width)
    edH = parseInt(edit.style.height)

    // moveX = e.pageX - offX - mainLeft
    // moveY = e.pageY - offY - mainTop
    // log(moveX)
  }
}