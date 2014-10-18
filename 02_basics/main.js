(function(){
	function init() {
		var map = L.map('map', {
			center: [48.8191, 2.3196],
			zoom: 15,
			minZoom: 10,
			maxZoom: 16,
			layers: [
				L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
					attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
					subdomains: 'abcd',
					minZoom: 0,
					maxZoom: 20
				})
			]
		});

		map.addControl(L.control.scale({
			imperial: false
		}));


		var pwConfs = L.marker([48.8191, 2.3196], {
			icon: L.icon({
				iconUrl: '../rsrc/icon_pw_blue.png',
				iconSize: [32, 32]
			})
		}).addTo(map).bindPopup('Image marker', {
			offset: [0, -8]
		});


		var pwWorkshops = L.circleMarker([48.7887, 2.3637], {
			color: '#48b9df',
			weight: 5,
			fillColor: '#ef509d',
			fillOpacity: 1
		}).addTo(map).bindPopup('Circle marker');


		var pwApero = L.marker([48.861133, 2.349045], {
			icon: L.divIcon({
				className: 'cssMarker',
				html: '♥',
				iconSize: [32, 32],
				iconAnchor: [16, 16]
			})
		}).addTo(map).bindPopup('CSS marker', {
			offset: [0, -8]
		});

		var polyline = L.polyline([], {
			weight: 10,
			opacity: 0.5,
			color: '#ef509d'
		}).addTo(map).bindPopup('Les popups marchent aussi');

		map.on('click', function(clickEvt) {
			polyline.addLatLng(clickEvt.latlng);
		});
	}

	document.addEventListener('DOMContentLoaded', init);
})();