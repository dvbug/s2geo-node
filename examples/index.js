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

var latLngRect = new s2.S2LatLngRect(latLngLA, latLngNY);

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
var latLng1 = new s2.S2LatLng(40.039801,116.332296);
var latLng2 = new s2.S2LatLng(40.037801,116.332296);
var latLng3 = new s2.S2LatLng(40.039801,116.332096);
var latLng4 = new s2.S2LatLng(40.037801,116.332096);
var cid1 = new s2.S2CellId(latLng1).parent(17);
var cid2 = new s2.S2CellId(latLng1).parent(30);
var id = cid1.id();
console.log('id:', id);
// var neighbors = cid1.getAllNeighbors(20);
var neighbors = cid1.getEdgeNeighbors();
// var neighbors = cid1.getVertexNeighbors(20);
console.log("allNeighbors-lv20:", neighbors.length);
for(var i = 0; i < neighbors.length; i++) {
  console.log(neighbors[i].id())
}


console.log('toGeoJSON:',latLng1.toGeoJSON());
console.log('lng,lat:',latLng1.lng, latLng1.lat);
console.log('lngRadians,latRadians:',latLng1.lngRadians, latLng1.latRadians);
console.log('toString:',latLng1.toString());
console.log('toArray:',latLng1.toArray());

var s2cid = new s2.S2CellId(id.toString());
console.log('s2cid.id:', s2cid.id(), s2cid.level());
console.log('s2cid.toLatLng:', s2cid.toLatLng().toArray());

console.log('s2.id2LngLat:', s2.id2LatLng(cid2));
console.log('s2.latLng2Id-17:', s2.latLng2Id(latLng1.lat, latLng1.lng, 17));
console.log('s2.latLng2Id-30:', s2.latLng2Id(latLng1.lat, latLng1.lng, 30));
console.log('s2.latLng2Id-def:', s2.latLng2Id(latLng1.lat, latLng1.lng));

var rect = new s2.S2LatLngRect(latLng1, latLng4);
console.log('size:',rect.size());
console.log('geojson:',JSON.stringify(rect.toGeoJSON()));
console.log('rect.vertex:', rect.getVertex(0).toArray());
console.log('rect.vertex:', rect.getVertex(1).toArray());
console.log('rect.vertex:', rect.getVertex(2).toArray());
console.log('rect.vertex:', rect.getVertex(3).toArray());
var cell = new s2.S2Cell(cid1);
console.log('cell.vertex:', new s2.S2LatLng(cell.getVertex(0)).toArray());
console.log('cell.vertex:', new s2.S2LatLng(cell.getVertex(1)).toArray());
console.log('cell.vertex:', new s2.S2LatLng(cell.getVertex(2)).toArray());
console.log('cell.vertex:', new s2.S2LatLng(cell.getVertex(3)).toArray());

console.log('rect.contains(latlng):', rect.contains(latLng1));
console.log('rect.contains(latlng):', rect.contains(latLng2));
var rect2 = new s2.S2LatLngRect(latLng1, latLng4);
console.log('rect.contains(latlngrect):', rect.contains(rect2));
console.log('rect.contains(latlngrect):', rect.contains(latLngRect));