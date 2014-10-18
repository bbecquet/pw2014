(function() {
	var map;
	var nb = 100;

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

		var cssIcons = [
			L.divIcon({ className: 'cssMarker green' }),
			L.divIcon({ className: 'cssMarker orange' }),
			L.divIcon({ className: 'cssMarker red' })
		];
		var mapBounds = map.getBounds();
		var south = mapBounds.getSouth()
		var latRange = mapBounds.getNorth() - south;
		var west = mapBounds.getWest();
		var lngRange = mapBounds.getEast() - west;
		for(var i=0;i<nb;i++) {
			L.marker([Math.random() * latRange + south, Math.random() * lngRange + west], {
				icon: cssIcons[Math.floor(Math.random() * 3)]
			}).addTo(map);
		}

		var switches = document.getElementsByClassName('modeSwitch');
		for(var i=0, l=switches.length; i<l; i++){
			switches[i].addEventListener('click', function(evt) {
				evt.target.classList.toggle('active');
				document.body.classList.toggle(evt.target.dataset['mode']);
			});
		}
	}

	document.addEventListener('DOMContentLoaded', init);
})();