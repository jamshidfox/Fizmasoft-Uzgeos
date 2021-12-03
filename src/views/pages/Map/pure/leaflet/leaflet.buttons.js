/*eslint-disable*/

L.Control.Buttons = L.Control.extend({
  options: {
    position: "topleft"
  },

  initialize: function (buttons, options) {
    this.buttons = buttons
    L.setOptions(this, Object.assign({}, options, this.options))
    return this
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create("div", "leaflet-control-buttons")
    L.DomEvent.disableClickPropagation(this._container)
    // L.DomEvent.disableContextMenuPropagation(this._container)

    var g
    for (var i = 0; i < this.buttons.length; i++) {
      g = this._addGroup()
      for (var u = 0; u < this.buttons[i].length; u++) {
        this._addButton(this.buttons[i][u], g)
      }
    }
    return this._container
  },

  onRemove: function () {
    return this
  },

  _addGroup: function () {
    var group = L.DomUtil.create("div", "leaflet-control-buttons-group leaflet-bar leaflet-control", this._container)
    return group
  },

  _addButton: function (btn, g) {
    if (btn.display === false) return

    var cls = "leaflet-control-buttons-item "

    if (btn.disabled === true) {
      cls += "leaflet-disabled "
    }

    var button = L.DomUtil.create("a", cls, g)

    if (typeof btn.iconCls === "string") {
      let icon = L.DomUtil.create("i", btn.iconCls)
      if (btn.iconColor) {
        icon.style.color = btn.iconColor
      }
      button.appendChild(icon)
    } else {
      button.innerHTML = btn.icon
    }

    var tootltip = L.DomUtil.create("span", "leaflet-control-buttons-tooltip", button)
    tootltip.innerHTML = btn.title

    if (L.Browser.mobile) tootltip.style.left = "35px"

    button.role = "button"
    button.href = `#`
    button.id = btn.id

    button.setAttribute("role", "button")
    // button.setAttribute("title", btn.title);
    // button.setAttribute("area-label", btn.title);

    if (btn.selected === true) {
      btn.selected = false
      this._onClick.call({ prop: btn, element: button, defaultClass: button.childNodes[0].classList.value }, {})
    }

    if (typeof btn.callback === "function" && !btn.disabled) {
      L.DomEvent.on(button, "click", this._onClick, { prop: btn, element: button, defaultClass: button.childNodes[0].classList.value })
    }
  },

  _onClick: function (e) {
    if (this.prop.toggle !== false) {
      e.args = this
      this.element.childNodes[0].className = "fas fa-spinner fa-spin"

      var _onDone = function (e) {
        var that = e

        if (this.args !== undefined) that = this.args

        that.element.childNodes[0].className = that.defaultClass
      }

      var _onAbort = function () {
        that = this.args
        that.element.childNodes[0].className = that.defaultClass
        that.element.classList.remove("leaflet-selected")
        that.prop.selected = false
      }

      this.element.classList.toggle("leaflet-selected")
      this.prop.selected = !this.prop.selected

      if (this.prop.async === true) {
        e.done = _onDone
        e.abort = _onAbort
      } else {
        _onDone(this)
      }
    }

    this.prop.callback.call(this.element, e, this.prop.selected)

    if (typeof e.preventDefault === "function") e.preventDefault()
  }
})

L.control.buttons = function (buttons, options) {
  return new L.Control.Buttons(buttons, options)
}
