(function(){
	var map;
	var markers = [];
	
	function init() {
		map = L.map('map', {
			center: [48.85, 2.35],
			zoom: 11,
			minZoom: 10,
			maxZoom: 16,
			layers: [
				L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
					attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
					subdomains: '1234'
				})
			]
		});

		var loadButton = createButton('ctrls', '', 'load', function() {
			loadMarkers();
			loadButton.setAttribute('disabled', 'disabled');
		});
	}

	function loadMarkers() {
		var dataUrl = 'http://data.iledefrance.fr/api/records/1.0/search?dataset=stations_et_espaces_autolib&rows=10000';
		getJSON({url: dataUrl, type: 'jsonp'}, function(result) {
			var records = result.records;
			for(var i=0, l=records.length; i<l; i++) {
				markers.push(createStationMarker(records[i]).addTo(map));	
			}

			createButton('ctrls', '', 'cluster', function() {
				cluster();
			});
		});
	}
	
	function cluster() {
		var clusters = L.markerClusterGroup().addTo(map);
		markers.forEach(function(m) {
			map.removeLayer(m);
			clusters.addLayer(m);
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