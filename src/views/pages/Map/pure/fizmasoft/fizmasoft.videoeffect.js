/*eslint-disable*/

import F from "./fizmasoft"
import "../leaflet/leaflet.reactCard"
import default_img from "../../../../../assets/background/car_default.jpg"
import styled from "styled-components"
import "../leaflet/leaflet.card"

const Div = styled.div`
  height: 475px;
  img {
    height: 98px;
    width: 170px;
    border-radius: 5px;
    margin-top: 5px;
    z-index: 99999999999;
    object-fit: cover;
  }

  .sparkling {
    position: fixed;
    animation: spark 1s 50;
    top: ${(props) => props.top + "px"};
    left: ${(props) => props.left + "px"};
  }

  @keyframes spark {
    from {
      opacity: 0;
      width: 80px;
      height: 45px;
    }
    to {
      opacity: 1;
      height: 90px;
      width: 160px;
      right: 0;
      position: static;
    }
  }
`

F.VideoEffect = F.Class.extend({
  options: {
    jsxContent: [default_img, default_img, default_img, default_img, default_img, default_img, default_img],
    current: 0
  },
  initialize: function (options) {
    F.setOptions(this, options)
  },

  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._card = L.control.card()
    this._card.addTo(this._map)
    return this
  },

  _getContent: function (img = default_img, topleft) {
    const top = topleft?.top
    const left = topleft?.left
    this.options.jsxContent.shift()
    this.options.jsxContent.push(img)
    return (
      <Div top={top} left={left}>
        {this.options.jsxContent.map((item, index) => {
          if (index === 6) {
            this.options.jsxContent[index] = img
            return <img src={item} key={index} className="sparkling" />
          }
          return <img src={item} key={index} className="" />
        })}
      </Div>
    )
  },
  imageToCard: function (url, bounds, latlng) {
    this._sparklingMarker(latlng)
    const i = L.imageOverlay(url, bounds).addTo(this._fg)
    const topleft = this._getLeftTop(i._image)
    this._fg.removeLayer(i)
    this._card.insertImage(topleft, url)
  },
  _getLeftTop: function (el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  },
  remove: function () {
    this._card.remove()
  },
  _sparklingMarker: function (latLng) {
    var icon = L.divIcon({
      iconSize: [30, 30],
      iconAnchor: [10, 10],
      popupAnchor: [10, 0],
      shadowSize: [0, 0],
      className: "animated-icon"
    })
    var ll = L.latLng(latLng[0], latLng[1])
    var marker = L.marker(ll, {
      icon: icon
    })

    marker.addTo(this._fg)
    setTimeout(() => {
      marker.removeFrom(this._fg)
    }, 500)
  }
})

F.videoEffect = function (options) {
  return new F.VideoEffect(options)
}
