(function(){
	function init() {
		var map = L.map('map', {
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

		map.addControl(L.control.scale({
			imperial: false
		}));

		var locMarker = L.marker(map.getCenter());
		var locAccuracy = L.circle(map.getCenter(), 0);
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
	}

	document.addEventListener('DOMContentLoaded', init);
})();