(function(){
	var map;
	var autolib;
	
	function init() {
		map = L.map('map', {
			center: [48.85, 2.35],
			zoom: 15,
			minZoom: 12,
			maxZoom: 16,
			layers: [
				L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
					attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
					subdomains: '1234'
				})
			]
		});

		var oldBounds = null;
		map.on('moveend', function() {
			var newBounds = map.getBounds();
			if(oldBounds == null || !oldBounds.contains(newBounds)) {
				loadMarkers(oldBounds = newBounds.pad(0.5));
			}
		});

		map.fireEvent('moveend');
	}

	function formatLatLng(ll) {
		return '(' + ll.lat + ',' + ll.lng + ')';
	}

	function formatBounds(bounds) {
		return formatLatLng(bounds.getSouthWest()) + ',' +
			formatLatLng(bounds.getNorthWest()) + ',' +
			formatLatLng(bounds.getNorthEast()) + ',' +
			formatLatLng(bounds.getSouthEast());
	}

	function loadMarkers(bounds) {
		var dataUrl = 'http://data.iledefrance.fr/api/records/1.0/search?dataset=stations_et_espaces_autolib&format=geojson&rows=10000&geofilter.polygon=';
		dataUrl += formatBounds(bounds);

		getJSON({url: dataUrl, type: 'jsonp'}, function(result) {
			if(autolib != null) {
				map.removeLayer(autolib);
			}
			autolib = L.geoJson(result).addTo(map);
		});
	}
	
	var stationIcon = L.divIcon({
		className: 'autolib station',
	});

	var espaceIcon = L.divIcon({
		className: 'autolib espace',
	});

	function createStationMarker(station) {
		return L.marker([
				station.geometry.coordinates[1],
				station.geometry.coordinates[0]
			 ], {
				icon: station.fields.type_de_station == 'Espace' ? espaceIcon : stationIcon
			})
			.bindPopup('<b>' + station.fields.nom_de_la_station + '</b><br/>' + station.fields.nombre_total_de_places + ' places');
	}

	document.addEventListener('DOMContentLoaded', init);
})();