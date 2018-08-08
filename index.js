var s2 = require('bindings')('_s2geo');
module.exports = s2;

s2.S2LatLng.prototype.toGeoJSON = function() {
  return {
    type: 'Point',
    coordinates: [this.lng, this.lat]
  };
};

s2.S2LatLng.prototype.toArray = function() {
  return [this.lng, this.lat];
};

s2.S2Cell.prototype.toGeoJSON = function() {
  var vs = [];
  for (var i = 0; i < 4; i++) {
    vs.push(new s2.S2LatLng(this.getVertex(i)));
  }
  vs.push(new s2.S2LatLng(this.getVertex(0)));
  return {
    type: 'Polygon',
    coordinates: [
      vs.map(function(v) {
        return [v.lng, v.lat];
      })
    ]
  };
};

s2.S2LatLngRect.prototype.toGeoJSON = function() {
  var vs = [];
  for (var i = 0; i < 4; i++) {
    vs.push(this.getVertex(i));
  }
  vs.push(this.getVertex(0));
  return {
    type: 'Polygon',
    coordinates: [
      [
        vs.map(function(v) {
          return [v.lng, v.lat];
        })
      ]
    ]
  };
};

s2.S2Point.prototype.toArray = function() {
  return [this.x(), this.y(), this.z()];
};

s2.S2Point.prototype.toString = function() {
  return this.toArray().toString();
};

s2.id2LatLng = function (id) {
  return new s2.S2CellId(id.toString()).toLatLng();
};

s2.latLng2Id = function (lat, lng, level) {
  level = level || 30;
  return new s2.S2CellId(new s2.S2LatLng(lat, lng)).parent(level).id();
};