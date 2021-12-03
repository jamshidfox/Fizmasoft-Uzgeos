// Packaging/modules magic dance.
// prettier-ignore
/* eslint-disable */
(function (factory) {
    var L;
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        L = require('leaflet');
        module.exports = factory(L);
    } else {
        // Browser globals
        if (typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
}(function (L) {
"use strict";

L.Polyline._flat = L.LineUtil.isFlat || L.Polyline._flat || function (latlngs) {
    // true if it's a flat array of latlngs; false if nested
    return !L.Util.isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
};

/**
 * @fileOverview Leaflet Geometry utilities for distances and linear referencing.
 * @name L.GeometryUtil
 */

L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
    calculateLength: function(latlngs) {
        var pointsCount = latlngs.length,
            dist = 0.0, 
            prev;

        if (pointsCount < 2) return dist;

        latlngs.forEach(function(latlng) {
            if (prev) 
                dist += prev.distanceTo(latlng);
            prev = latlng;
        });

        return dist;
    },

    readableLength: function(length, unit) {
        var isMetric = (unit !== 'imperial'),
            result;

        if (isMetric) {
            // show metres when distance is < 1km, then show km
            if (length > 1000) {
                result = (length  / 1000).toFixed(2) + ' km';
            } else {
                result = Math.ceil(length) + ' m';
            }
        } else {
            length *= 1.09361;

            if (length > 1760) {
                result = (length / 1760).toFixed(2) + ' miles';
            } else {
                result = Math.ceil(length) + ' yd';
            }
        }

        return result;
    },

    geodesicArea: function (latLngs) {
        var pointsCount = latLngs.length,
            area = 0.0,
            d2r = Math.PI / 180,
            p1, p2;

        if (pointsCount < 3) return area;

        for (var i = 0; i < pointsCount; i++) {
            p1 = latLngs[i];
            p2 = latLngs[(i + 1) % pointsCount];
            area += ((p2.lng - p1.lng) * d2r) * (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
        }

        area = area * Math.pow(L.Projection.SphericalMercator.R, 2) / 2.0;
        
        return Math.abs(area);
    },
    
    readableArea: function (area, unit) {
        var isMetric = (unit !== 'imperial'),
            areaStr;

		if (isMetric) {
			if (area >= 10000) {
				areaStr = (area * 0.0001).toFixed(2) + ' ha';
			} else {
				areaStr = area.toFixed(2) + ' m&sup2;';
			}
		} else {
			area *= 0.836127; // Square yards in 1 meter

			if (area >= 3097600) { //3097600 square yards in 1 square mile
				areaStr = (area / 3097600).toFixed(2) + ' mi&sup2;';
			} else if (area >= 4840) {//48040 square yards in 1 acre
				areaStr = (area / 4840).toFixed(2) + ' acres';
			} else {
				areaStr = Math.ceil(area) + ' yd&sup2;';
			}
		}

		return areaStr;
	}
});

L.Polyline.include({
    length: function(){ 
        return L.GeometryUtil.calculateLength(this._latlngs);
    }
});

L.Polygon.include({
    area: function() {
        return L.GeometryUtil.geodesicArea(this._latlngs[0]);
    },

    length: function() {
        return L.GeometryUtil.calculateLength(this._latlngs[0]);
    }
});

L.Rectangle.include({
    area: function() {
        return L.GeometryUtil.geodesicArea(this._latlngs[0]);
    },

    length: function() {
        return L.GeometryUtil.calculateLength(this._latlngs[0]);
    }
});

L.Circle.include({
    area: function() {
        var r = this.getRadius(),
            res;

        res = Math.PI * Math.pow(r, 2);
        return res;
    },

    length: function() {
        var r = this.getRadius(),
            res;
            
        res = 2 * Math.PI * r;
        return res;
    }
});

}));
