"use strict";

var isOnline;
var version = 170;
var cachePrefix = 'Javascript-Algorithms-Cache';
var cacheName = `${cachePrefix}-${version}`;
var urlToCache = [// css
'./assets/style.css', // js
'./script/initSw.js', // html
'/'];
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("fetch", onFetch);
self.addEventListener("activate", async evt => {
  evt.waitUntil(_waitUntil());

  async function _waitUntil() {
    await clearOutOldCaches();
    await cacheFiles();
    await clients.claim();
  }
});
main().catch(e => {
  console.error(e);
});

async function main() {
  await cacheFiles();
}

async function clearOutOldCaches() {
  var allCaches = await caches.keys();
  var oldCachesTobeDeleted = allCaches.filter(appCache => {
    var currentCache = appCache.match(cachePrefix);

    if (currentCache) {
      var cacheVersion = appCache.match(/\d+/g);
      return cacheVersion && version !== +cacheVersion[0];
    }
  });
  return Promise.all(oldCachesTobeDeleted.map(oldCache => caches.delete(oldCache)));
}

async function cacheFiles(hardRefresh = false) {
  var verstionedCache = await caches.open(cacheName);
  return Promise.all(urlToCache.map(async url => {
    var res;

    try {
      // from cache:
      if (!hardRefresh) {
        res = await verstionedCache.match(url);

        if (res) {
          return res;
        }
      } // Hard fetch


      var fetchOption = {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache'
      };
      res = await fetch(url, fetchOption);

      if (res.ok) {
        await verstionedCache.put(url, res);
      }
    } catch (e) {
      debugger;
    }
  }));
}

async function onFetch(evt) {
  evt.respondWith(_router(evt.request));

  async function _router(request) {
    var url = new URL(request.url);
    var reqUrl = url.pathname;
    var versionCache = await caches.open(cacheName);

    if (url.origin == location.origin) {
      var res = await versionCache.match(reqUrl);

      if (res && res.ok) {
        return res.clone();
      }
    }

    try {
      var fetchOption = {
        method: 'GET',
        credentials: 'omit',
        cache: 'no-cache'
      };
      res = await fetch(url, fetchOption);

      if (res && res.ok) {
        return res;
      }

      return _badRequest();
    } catch (e) {
      return _badRequest();
    }
  }

  function _badRequest() {
    return new Response('', {
      status: 404,
      statusText: 'Not found'
    });
  }
}