(function(){
	var map;
	function init() {
		map = L.map('map', {
			center: [48.85, 2.35],
			zoom: 11,
			minZoom: 10,
			maxZoom: 16,
			layers: [
				L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
					minZoom: 0,
					maxZoom: 18,
					attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
				})
			],
			zoomControl: false
		});

		map.addControl(L.control.scale({
			imperial: false
		}));

		L.DomEvent.addListener(L.DomUtil.get('zoomIn'), 'click', function() { 
			map.zoomIn();
		});
		L.DomEvent.addListener(L.DomUtil.get('zoomOut'), 'click', function() { 
			map.zoomOut();
		});

		L.DomEvent.addListener(L.DomUtil.get('locate'), 'click', function() { 
			map.locate({
				setView: true,
				watch: false
			});
		});

		var locMarker = L.marker(map.getCenter());
		var locAccuracy = L.circle(map.getCenter(), 0, {
			weight: 0
		});
		map.addEventListener('locationfound', function(locEvent) {
			locMarker
				.setLatLng(locEvent.latlng)
				.addTo(map);
			locAccuracy
				.setLatLng(locEvent.latlng)
				.setRadius(locEvent.accuracy)
				.addTo(map);
		})
		map.locate({
			setView: true,
			watch: false
		});

		var pwConfs = L.marker([48.8191, 2.3196], {
			icon: L.icon({
				iconUrl: '../rsrc/icon_pw_pink.png',
				iconSize: [32, 32]
			})
		}).addTo(map)
			.bindPopup('Paris Web - Conférences', {
				offset: [0, -8],
				closeButton: false,
				className: 'squarePopup'
			});
	}

	document.addEventListener('DOMContentLoaded', init);
})();