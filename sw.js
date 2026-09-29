// Minimal service worker so notifications work on Android/iOS. No caching.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(function (list) {
    return list.length ? list[0].focus() : self.clients.openWindow('./');
  }));
});
