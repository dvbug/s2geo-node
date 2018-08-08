var s2 = require('../');

var kEarthCircumferenceMeters = 1000 * 40075.017;

function EarthMetersToRadians(meters) {
  return (2 * Math.PI) * (meters / kEarthCircumferenceMeters);
}


var origin = new s2.S2CellId(new s2.S2LatLng(44.0378862, 10.0458712));

console.log(origin.parent(15).id());
console.log(origin.parent(15).child_end().id());

var latlng = new s2.S2LatLng(44.0378862, 10.0458712);
console.log(latlng.normalized().lat);
console.log(latlng.normalized().lng);

var origin = new s2.S2CellId(new s2.S2LatLng(37.7879938 ,-122.4074374));
console.dir(origin.parent(15).children());

var los_angeles = {lat: 34.0522, long: 118.2437}
var new_york = {lat: 40.7128, long: 74.0059}
var latLngLA = new s2.S2LatLng(los_angeles.lat, los_angeles.long);
var latLngNY = new s2.S2LatLng(new_york.lat, new_york.long);

var latLngRect = new s2.S2LatLngRect(latLngLA.toPoint(), latLngNY.toPoint());

var region = new s2.S2RegionCoverer();
var minLevel = 5;
var maxLevel = 10;
var maxCells = 20;
var levelMod = 2;
var results = region.getCovering(latLngRect, minLevel, maxLevel, maxCells, levelMod);

console.log("getCovering with latLngRect")
for(var i = 0; i < results.length; i++)
{
  console.log(results[i].id() + "," + results[i].rangeMin().id() + "," + results[i].rangeMax().id())
}

var radius_meters = 1000000;
var radius_radians = EarthMetersToRadians(radius_meters)
var axis_height = (radius_radians * radius_radians) / 2;
var cap = new s2.S2Cap(latLngLA.normalized().toPoint(), axis_height);
results = region.getCovering(cap, minLevel, maxLevel, maxCells, levelMod);
console.log("getCovering with cap")
for(var i = 0; i < results.length; i++)
{
  console.log(results[i].id() + "," + results[i].rangeMin().id() + "," + results[i].rangeMax().id())
}


console.log("getCovering with cell")
for(var i = 0; i < results.length; i++)
{
  console.log(results[i].id() + "," + results[i].rangeMin().id() + "," + results[i].rangeMax().id())
}

console.log("getNeighbors with cellid");
var cid1 = new s2.S2CellId(new s2.S2LatLng(40.039801,116.332296)).parent(17);
// var neighbors = cid1.getAllNeighbors(20);
var neighbors = cid1.getEdgeNeighbors();
// var neighbors = cid1.getVertexNeighbors(20);
console.log("allNeighbors-lv20:", neighbors.length);
for(var i = 0; i < neighbors.length; i++) {
  console.log(neighbors[i].id())
}

var latLng1 = new s2.S2LatLng(40.039801,116.332296);
console.log('toGeoJSON:',latLng1.toGeoJSON());
console.log('lng,lat:',latLng1.lng, latLng1.lat);
console.log('lngRadians,latRadians:',latLng1.lngRadians, latLng1.latRadians);
console.log('toString:',latLng1.toString());
console.log('toArray:',latLng1.toArray());
