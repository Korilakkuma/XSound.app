(()=>{"use strict";const e=globalThis.self,s="xsound.app-cache-v2.1.1",t="/",n=[t,`${t}index.html`,`${t}manifest.json`,`${t}register.js`,`${t}assets/app.css`,`${t}assets/app.css.map`,`${t}assets/app.js`,`${t}assets/app.js.map`,`${t}assets/vendor.js`,`${t}assets/vendor.js.map`];e.addEventListener("install",(s=>{s.waitUntil(e.skipWaiting())}),!1),e.addEventListener("fetch",(e=>{if(!(n.some((s=>e.request.url.includes(s)))||e.request.url.startsWith("http")||e.request.url.endsWith(".wav")||e.request.url.endsWith(".mp3")||e.request.url.endsWith(".png")||e.request.url.endsWith(".txt")))return;if(e.request.url.includes("chrome-extension"))return;const t=caches.match(e.request).then((t=>{if(t)return t;const n=e.request.clone();return fetch(n).then((t=>{const n=t.clone();return caches.open(s).then((s=>{s.put(e.request,n)})).catch((e=>{})),t})).catch((e=>new Response))})).catch((e=>new Response));e.respondWith(t)}),!1),e.addEventListener("activate",(e=>{const t=caches.keys().then((e=>Promise.all(e.filter((e=>e!==s)).map((e=>caches.delete(e)))))).catch((e=>{}));e.waitUntil(t)}),!1)})();