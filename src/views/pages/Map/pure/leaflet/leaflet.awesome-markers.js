// prettier-ignore
/* eslint-disable */
/*
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt
  http://leafletjs.com
  https://github.com/lvoogdt
*/

/*global L*/

(function (window, document, undefined) {
    "use strict";
    /*
     * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
     */

    L.AwesomeMarkers = {};

    L.AwesomeMarkers.version = '2.0.1';

    L.AwesomeMarkers.Icon = L.Icon.extend({
        options: {
            iconSize: [35, 45],
            iconAnchor:   [15, 40],
            popupAnchor: [0, -32],
            tooltipAnchor: [18, -25],
            shadowAnchor: [10, 12],
            shadowSize: [36, 16],
            className: 'awesome-marker',
            prefix: 'fa',
            spinClass: 'fa-spin',
            extraClasses: 'awesome-marker-icon',
            icon: 'home',
            markerColor: 'blue',
            iconColor: 'white',
            html: undefined
        },

        initialize: function (options) {
            options = L.Util.setOptions(this, options);
        },

        createIcon: function () {
            var div = document.createElement('div'),
                options = this.options;

            if (options.html) {
                div.innerHTML = `<div style='position: absolute; left: 4px; top: 4px; width: 22px; height: 22px; text-align: center; font-size: 16px;'><i style="color: ${options.iconColor}" class="${options.extraClasses} awesome-marker-html">${options.html}</i></div>`;
            } else if (options.icon) {
                div.innerHTML = this._createInner();
            }  

            if (options.bgPos) {
                div.style.backgroundPosition =
                    (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            this._setIconStyles(div, options.markerColor);
            
            return div;
        },

        _createInner: function() {
            var iconClass, iconSpinClass = "", iconColorStyle = "", options = this.options;

            if(options.icon.slice(0, options.prefix.length+1) === options.prefix + "-") {
                iconClass = options.icon;
            } else {
                iconClass = options.prefix + "-" + options.icon;
            }

            if(options.spin && typeof options.spinClass === "string") {
                iconSpinClass = options.spinClass;
            }

            if(options.iconColor) {
                iconColorStyle = "style='color: " + options.iconColor + "' ";
            }
            
            return "<div style='position: absolute; left: 4px; top: 4px; width: 22px; height: 22px; text-align: center; font-size: 16px;'><i " + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + iconClass + " " + iconSpinClass + "'></i></div>";
        },

        _setIconStyles: function (img, name) {
            var options = this.options,
                size = L.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']),
                anchor;

            if (name === 'shadow') {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
                img.className = 'awesome-marker-shadow '+options.className;
            } else {
                anchor = L.point(options.iconAnchor);
                img.className = `fa fa-map-marker `+options.className;
                img.style.color = name;
            }

            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }

            if (anchor) {
                img.style.left = (-anchor.x) + 'px';
                img.style.top  = (-anchor.y) + 'px';
            }

            if (size) {
                img.style.width  = size.x + 'px';
                img.style.height = size.y + 'px';
            }
        },

        createShadow: function () {
            var div = document.createElement('div');

            this._setIconStyles(div, 'shadow');
            return div;
      }
    });
        
    L.AwesomeMarkers.icon = function (options) {
        return new L.AwesomeMarkers.Icon(options);
    };

}(this, document));
