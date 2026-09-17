/* Cajón POSCA — service worker
   Estrategia: el "cascarón" de la app (HTML, CSS, JS, manifest, iconos) se
   precachea en la instalación y se sirve desde caché (funciona sin red).
   Las fuentes de Google se cachean la primera vez que se descargan.
   Cada despliegue cambia VERSION → nuevo caché → la app avisa «Actualizar». */
var VERSION = "1.1.0";
var SHELL = "posca-shell-" + VERSION;
var FONTS = "posca-fonts";
var ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=" + VERSION,
  "./app.js?v=" + VERSION,
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) { return c.addAll(ASSETS); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL && k !== FONTS) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

function isFont(url) {
  return url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  if (isFont(url)) {
    e.respondWith(
      caches.open(FONTS).then(function (c) {
        return c.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req).then(function (res) {
            if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
            return res;
          }).catch(function () { return hit || Response.error(); });
        });
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  /* navegaciones: siempre el index cacheado (app de una sola página) */
  if (req.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then(function (hit) {
        return hit || fetch(req);
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req, { ignoreSearch: false }).then(function (hit) {
      if (hit) return hit;
      return caches.match(req, { ignoreSearch: true }).then(function (loose) {
        return loose || fetch(req).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(SHELL).then(function (c) { c.put(req, copy); });
          }
          return res;
        });
      });
    })
  );
});
