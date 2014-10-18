(function() {
  var geoJSON = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [
          2.3557519912719727,
          48.83096687198519
        ],
        [
          2.3573827743530273,
          48.82616406891579
        ],
        [
          2.3594856262207027,
          48.81912854406289
        ],
        [
          2.3620176315307617,
          48.81926982937922
        ],
        [
          2.3645496368408203,
          48.820032763205894
        ],
        [
          2.3691415786743164,
          48.82158685174687
        ]
      ]
    }
  };
  var geoJSON_point = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [
        2.3557519912719727,
        48.83096687198519
      ]
    }
  };

  function init() {
    // Provide your access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmJlY3F1ZXQiLCJhIjoieGZqTzZsZyJ9.boUXwiILkBMs4SGBwQ1vWQ';
    // Create a map in the div #map
    var map = new mapboxgl.Map({
      container: 'map',
      //style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v4.json',
      zoom: 12,
      center: [48.85, 2.35],
      bearing: 90
    });
    
    mapboxgl.util.getJSON('https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v4.json', function (err, style) {
      if (err) throw err;
      style.layers.push({
        "id": "route",
        "source": "route",
        "render": {
          "$type": "LineString",
          "line-join": "round",
          "line-cap": "round"
        },
        "style": {
          "line-color": "#888",
          "line-width": 5
        },
        "type": "line"
      });
      
      style.layers.push({
        "id": "marker",
        "source": "",
        "render": {
          "$type": "Point",
          "icon-image": "../rsrc/icon_pw_blue.png"
        },
        "style": {
          //"icon-image"
        }
      });

      map.setStyle(style);
    });
    
    map.addSource('route', new mapboxgl.GeoJSONSource({data: geoJSON}));
    map.addSource('marker', new mapboxgl.GeoJSONSource({data: geoJSON_point}))

    map.addControl(new mapboxgl.Navigation());
  }
  
  window.addEventListener('DOMContentLoaded', init);
})();

