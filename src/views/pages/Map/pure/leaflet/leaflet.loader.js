/* eslint-disable */
/*prettier-ignore*/
L.Control.Loader = L.Control.extend({
    options: {

    },

    onAdd: function (map) {
        this.container = L.DomUtil.create('div', 'leaflet-control');

        this.loaderContainer = L.DomUtil.create('div', 'leaflet-loader-container', this._map._container);
        this.loaderBG = L.DomUtil.create('div', 'leaflet-loader-background', this.loaderContainer);
        this.loader = L.DomUtil.create('div', 'leaflet-loader', this.loaderBG);

        for (i=0; i<3; i++) {
            L.DomUtil.create('div', '', this.loader);
        }

        this._map.dragging.disable();
        this._map.touchZoom.disable();
        this._map.doubleClickZoom.disable();
        this._map.scrollWheelZoom.disable();
        this._map.contextmenu.disable();

        return this.container;
    },

    hide: function () {
        this.loaderBG.style.animation ="hideLoader 1s";
        this.loaderBG.style.webkitAnimationName ="hideLoader 1s";
        this.loaderBG.style.opacity ="0";
        
        var _this =this;
        
        setTimeout(function (){_this.loaderContainer.style.display ="none";},500);

        this._map.dragging.enable();
        this._map.touchZoom.enable();
        this._map.doubleClickZoom.enable();
        this._map.scrollWheelZoom.enable();
        this._map.contextmenu.enable();
    }
});

L.Map.include({
  spin: function (state, options) {
    if (!!state) {
      // start spinning !
      if (!this._spinner) {
        this._spinner = new L.Control.Loader(options).addTo(this)
        this._spinning = 0
      }
      this._spinning++
    } else {
      this._spinning--
      if (this._spinning <= 0) {
        // end spinning !
        if (this._spinner) {
          this._spinner.hide()
          this._spinner = null
        }
      }
    }
  }
})
