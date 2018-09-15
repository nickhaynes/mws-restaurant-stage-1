var currentCache = 'restaurantReviews-v1';

self.addEventListener('install', function(evt) {
	console.log('installing!');

	evt.waitUntil(
		caches.open(currentCache).then(function(cache) {
			return cache.addAll([
				'/',
				'js/main.js',
				'js/restaurant_info.js',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg',
				'data/restaurants.json',
				'css/styles.css',
				'index.html',
				'restaurant.html'
			])
			.catch(function(error) {
				console.log('Failed to open the cache - ', error);
			});
		})
	);
});

self.addEventListener('activate', function(evt) {
	console.log('activating!');

	evt.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurantReviews-') &&
						   cacheName != currentCache;
				}).map(function(cacheName) {
					return cache.delete(cacheName);
					console.log('deleting!');
				})
			);
		})
	);
});

self.addEventListener('fetch', function (evt) {
	console.log('fetching!');

	evt.respondWith(
		caches.open(currentCache).then(function(cache) {
			return cache.match(evt.request).then(function(response) {
				return response || fetch(evt.request). then(function(response) {
					cache.put(evt.request, response.clone());
					return response;
				});
			});
		})
	);
})