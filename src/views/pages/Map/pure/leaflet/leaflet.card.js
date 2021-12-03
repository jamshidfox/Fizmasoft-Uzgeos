/*eslint-disable*/

L.Control.Card = L.Control.extend({
  options: {
    position: "topright"
  },
  initialize: function (options) {
    L.setOptions(this, options)
    this._filled = 0
    this._max = 7
  },
  onAdd: function (map) {
    this._map = map
    this._container = L.DomUtil.create("div", "")
    this._container.style.cssText = `
          border-radius: 5px;
          background: transparent;
      `
    const div = L.DomUtil.create("div", "", this._container)
    div.style.cssText = `
      padding: 0;
      margin-right: 140px;
      width: 200px;
      height: 9000px;
      background: transparent;
      display: flex;
      `
    const imageArea1 = L.DomUtil.create("div", "", div)
    imageArea1.style.marginRight = "5px"
    const imageArea2 = L.DomUtil.create("div", "", div)
    this._imgDivs = []
    let imgDiv
    for (let i = 0; i < this._max; i++) {
      imgDiv = L.DomUtil.create("div", "", imageArea1)
      imgDiv.style.cssText = `
        height: 100px;
        width: 172px;
        border-radius: 5px;
        margin-top: 5px;
        border: 1px solid red;
       `
      this._imgDivs.push(imgDiv)
    }
    for (let i = 0; i < this._max; i++) {
      imgDiv = L.DomUtil.create("div", "", imageArea2)
      imgDiv.style.cssText = `
        height: 100px;
        width: 172px;
        border-radius: 5px;
        margin-top: 5px;
        border: 1px solid red;
        `
      this._imgDivs.push(imgDiv)
    }
    return this._container
  },
  insertImage: function (fromTopLeft, imageUrl) {
    let destiny
    if (this._filled >= this._max * 2) destiny = this._imgDivs[Math.floor(Math.random() * this._imgDivs.length)]
    else {
      destiny = this._imgDivs[this._filled]
      this._filled += 1
    }
    const destinyTopLeft = this._getLeftTop(destiny)
    const img = L.DomUtil.create("img", "", destiny)
    this._initialHeight = 12
    this._initialWidth = 20
    img.src = imageUrl
    img.style.cssText = `
        border: 1px solid red;
        position: fixed;
        top: ${fromTopLeft.top}px;
        left: ${fromTopLeft.left}px;
        border-radius: 5px;
        width: ${this._initialWidth}px;
        height: ${this._initialHeight}px;
    `
    // this._moveX(img, fromTopLeft, destinyTopLeft) first X inside Y
    this._move(img, fromTopLeft, destinyTopLeft, destiny)
  },
  _move: function (img, fromTopLeft, destinyTopLeft, destiny) {
    let xCurr = fromTopLeft.left
    let yCurr = fromTopLeft.top
    let height = this._initialHeight
    let width = this._initialWidth
    const destinyHeight = 98
    const destinyWidth = 170
    const xyChange = 2
    const time = setInterval(() => {
      if (xCurr >= destinyTopLeft.left - 5 && yCurr >= destinyTopLeft.top - 5 && height >= destinyHeight && width >= destinyWidth) {
        clearInterval(time)
        if (destiny.childElementCount > 1) {
          destiny.removeChild(destiny.firstChild)
        }
        img.style.cssText = `
               position: relative;
               border-radius: 5px;
               width: 170px;
               z-index: 45;
               height: 98px;
           `
      } else {
        if (height <= destinyHeight) {
          height += 0.3
          img.style.cssText = `
            position: fixed;
            z-index: 50;
            top: ${yCurr}px;
            left: ${xCurr}px;
            border-radius: 5px;
            width: ${width}px;
            height: ${height}px;
          `
        }
        if (width <= destinyWidth) {
          width += 0.5
          img.style.cssText = `
            position: fixed;
            z-index: 50;
            top: ${yCurr}px;
            left: ${xCurr}px;
            border-radius: 5px;
            width: ${width}px;
            height: ${height}px;
          `
        }
        if (xCurr !== destinyTopLeft.left) {
          xCurr > destinyTopLeft.left ? (xCurr -= xyChange) : (xCurr += xyChange)
          img.style.cssText = `
          position: fixed;
          z-index: 50;
          top: ${yCurr}px;
          left: ${xCurr}px;
          border-radius: 5px;
          width: ${width}px;
          height: ${height}px;
      `
        }
        if (yCurr !== destinyTopLeft.top) {
          yCurr > destinyTopLeft.top ? (yCurr -= xyChange) : (yCurr += xyChange)
          img.style.cssText = `
          position: fixed;
          z-index: 50;
          top: ${yCurr}px;
          left: ${xCurr}px;
          border-radius: 5px;
          width: ${width}px;
          height: ${height}px;
         `
        }
      }
    }, 1)
  },
  _moveX: function (img, fromTopLeft, destinyTopLeft) {
    // X - AXIS
    let xCurr = fromTopLeft.left
    const time = setInterval(() => {
      if (xCurr > destinyTopLeft.left) xCurr -= 1
      else xCurr += 1
      if (xCurr === destinyTopLeft.left) {
        clearInterval(time)
        this._moveY(img, fromTopLeft, destinyTopLeft)
      } else {
        img.style.cssText = `
        position: fixed;
        z-index: 50;
        top: ${fromTopLeft.top}px;
        left: ${xCurr}px;
        border-radius: 5px;
        width: 170px;
        height: 98px;
    `
      }
    })
  },
  _moveY: function (img, fromTopLeft, destinyTopLeft) {
    // Y - AXIS
    let yCurr = fromTopLeft.top
    const time2 = setInterval(() => {
      if (yCurr > destinyTopLeft.top) yCurr -= 1
      else yCurr += 1
      if (yCurr === destinyTopLeft.top) {
        clearInterval(time2)
        img.style.cssText = `
             position: relative;
             border-radius: 5px;
             width: 170px;
             z-index: 45;
             height: 98px;
         `
      } else {
        img.style.cssText = `
         position: fixed;
         z-index: 50;
         top: ${yCurr}px;
         left: ${destinyTopLeft.left}px;
         border-radius: 5px;
         width: 170px;
         height: 98px;
        `
      }
    }, 3)
  },
  _getLeftTop: function (el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
})
L.control.card = function (options) {
  return new L.Control.Card(options)
}
