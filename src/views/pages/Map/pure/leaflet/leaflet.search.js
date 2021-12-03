/*eslint-disable*/

L.Control.Search = L.Control.extend({
  options: {
    placeholder: "Search",
    searchValue: "",
    position: "topright",
    searchCallback: (val) => {}
  },
  initialize: function (options) {
    L.setOptions(this, options)
    this._filled = 0
    this._max = 7
  },
  onAdd: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._Content = L.DomUtil.create("div", "search-bar")
    this._searchContainer = L.DomUtil.create("div", "search-box", this._Content)
    this._dropDown = L.DomUtil.create("div", "drop-down-content", this._Content)
    this._dropDown.style.display = "none"

    L.DomUtil.create("i", " search-icon fa fa-search", this._searchContainer)
    this._inputSearch = L.DomUtil.create("input", "input-search", this._searchContainer)
    this._inputSearch.setAttribute("placeholder", this.options.placeholder)

    ////////Events
    L.DomEvent.on(this._searchContainer, "keyup", this._setFounds, this)
    L.DomEvent.disableScrollPropagation(this._Content)
    L.DomEvent.disableClickPropagation(this._Content)

    return this._Content
  },
  _setFounds: async function (e) {
    if (e.target.value.trim() === "") {
      this._fg.clearLayers()
      this._dropDown.style.display = "none"
      return
    }
    this._dropDown.style.display = "block"
    const founds = (await this.options.searchCallback(e.target.value)) || {}
    this._dropDown.innerHTML = ""
    let item
    founds.streets?.forEach((content) => {
      item = L.DomUtil.create("div", "dropdown-item", this._dropDown)
      item.innerHTML = content.name_ru
      item.geometry = content.geometry
      L.DomUtil.create("i", " search-icon fa fa-wave-square", item)
      L.DomEvent.on(item, "click", this._foundItemClciked, this)
    })
    founds.mahallas?.forEach((content) => {
      item = L.DomUtil.create("div", "dropdown-item", this._dropDown)
      item.innerHTML = content.name
      item.geometry = content.geometry
      L.DomUtil.create("i", " search-icon fa fa-draw-polygon", item)
      L.DomEvent.on(item, "click", this._foundItemClciked, this)
    })
    founds.objects?.forEach((content) => {
      item = L.DomUtil.create("div", "dropdown-item", this._dropDown)
      item.innerHTML = content.name_ru
      item.geometry = content.geometry
      L.DomUtil.create("i", " search-icon fa fa-map-marker-alt", item)
      L.DomEvent.on(item, "click", this._foundItemClciked, this)
    })
  },

  _foundItemClciked: function (e) {
    this._inputSearch.value = e.target.innerText
    this._fg.clearLayers()
    const geometry = L.geoJSON(e.target.geometry, {
      style: function () {
        return { color: "#7367F0" }
      }
    })
      .bindPopup(e.target.innerText)
      .addTo(this._fg)
    this._map.flyToBounds(geometry.getBounds())
  }
})
L.control.search = function (options) {
  return new L.Control.Search(options)
}
