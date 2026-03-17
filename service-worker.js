self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("kg-app").then(cache => {
            return cache.addAll([
                "https://loytheloy-boop.github.io/Calcolo-Kg/",
                "https://loytheloy-boop.github.io/Calcolo-Kg/index.html",
                "https://loytheloy-boop.github.io/Calcolo-Kg/style.css",
                "https://loytheloy-boop.github.io/Calcolo-Kg/app.js"
            ]);
        })
    );
});
