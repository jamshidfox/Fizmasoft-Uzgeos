import L from "leaflet"
// prettier-ignore
/* eslint-disable */
L.Control.Ruler = L.Control.extend({
    options: {
        rulerOn: false,
        position: 'topleft',
        circleMarker: {
            color: '#5f58c4',
            radius: 2
        },
        lineStyle: {
            color: '#5f58c4',
            dashArray: '1,6'
        }
    },

    onAdd: function() {
        this._container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

        this._button = L.DomUtil.create('a', '', this._container);
        this._button.style.display = 'none'
        this._button.className = 'fa fa-ruler';
        this._button.href = '#';
        this._button.setAttribute("role", "button");
        
        L.DomEvent.disableClickPropagation(this._container);
        L.DomEvent.on(this._container, 'click', this._toggleMeasure, this);
        
        this._selected = false;
        this._defaultCursor = this._map._container.style.cursor;
        this._allLayers = L.layerGroup().addTo(this._map);

        return this._container;
    },

    clickBtn: function() {
        this._container.click()
        this.options.rulerOn = !this.options.rulerOn
    },

    onRemove: function() {
        L.DomEvent.off(this._container, 'click', this._toggleMeasure, this);
    },

    _toggleMeasure: function() {
        this._selected = !this._selected;

        if (this._selected) {
            this._map.doubleClickZoom.disable();

            this._button.classList.add("leaflet-selected");

            L.DomEvent.on(this._map._container, 'keydown', this._escape, this);
            
            this._clickedPoints = [];

            this._tempLine = undefined;
            this._tempPoint = undefined;
            this._temp = L.featureGroup().addTo(this._allLayers);
            this._pointLayer = L.featureGroup().addTo(this._allLayers);
            this._polylineLayer = L.featureGroup().addTo(this._allLayers);
            
            this._map._container.style.cursor = 'pointer';

            this._map.on('click', this._clicked, this);
            
            if (!L.Browser.touch) {
                this._map.on('mousemove', this._moving, this);
            }
        } else {
            this._stop();

            L.DomEvent.off(this._map._container, 'keydown', this._escape, this);

            this._button.classList.remove("leaflet-selected");

            this._allLayers.clearLayers();
        }
    },

    _stop: function() {
        this._map.doubleClickZoom.enable();

        this._map._container.style.cursor = this._defaultCursor;

        this._map.off('click', this._clicked, this);

        if (!L.Browser.touch) {
            this._map.off('mousemove', this._moving, this);
        }
        
        this._temp.clearLayers();
        this._tempPoint = undefined;
        this._tempLine = undefined;
    },

    _clicked: function(e) {
        var cm = L.circleMarker(e.latlng, this.options.circleMarker).addTo(this._pointLayer);
        this._clickedPoints.push(e.latlng);
        if (this._clickedPoints.length > 1) {
            L.polyline(this._clickedPoints.slice(this._clickedPoints.length-2), this.options.lineStyle).addTo(this._polylineLayer);

            cm.bindTooltip(L.GeometryUtil.readableLength(L.GeometryUtil.calculateLength(this._clickedPoints)), {permanent: true, className: 'result-tooltip'});
        }
    },

    _delete: function() {
        if (this._clickedPoints.length > 1) {
            var index = this._clickedPoints.length - 1;

            this._pointLayer.removeLayer(this._pointLayer.getLayers()[index]);
            this._polylineLayer.removeLayer(this._polylineLayer.getLayers()[index - 1]);
            this._clickedPoints.pop();

            this._moving({
                latlng: this._tempPoint.getLatLng()
            });
        }
    },

    _moving: function(e) {
        if (this._tempPoint == undefined)
            this._tempPoint = L.circleMarker(e.latlng, this.options.circleMarker).addTo(this._temp);
        else
            this._tempPoint.setLatLng(e.latlng);

        if (this._clickedPoints.length > 0) {

            if (this._tempLine == undefined)
                this._tempLine = L.polyline(this._clickedPoints.slice(this._clickedPoints.length-2), this.options.lineStyle).addTo(this._temp);
            else 
                this._tempLine.setLatLngs([this._clickedPoints[this._clickedPoints.length-1], e.latlng]);

            if (this._tempPoint.getTooltip() == undefined)
                this._tempPoint.bindTooltip(L.GeometryUtil.readableLength(L.GeometryUtil.calculateLength(this._clickedPoints.concat([e.latlng]))), { permanent: true, className: 'moving-tooltip'});
            else
                this._tempPoint.setTooltipContent(L.GeometryUtil.readableLength(L.GeometryUtil.calculateLength(this._clickedPoints.concat([e.latlng]))));
        }
    },

    _escape: function(e) {
        if (e.keyCode == 27) { // Escape
            if (this._tempPoint != undefined && this._clickedPoints.length > 1) {
                this._stop();
            } else {
                // this._toggleMeasure();
            }
        } else if (e.keyCode == 46) { // Delete
            this._delete();
        }
    }
});

L.control.ruler = function (options) {
  return new L.Control.Ruler(options)
}
