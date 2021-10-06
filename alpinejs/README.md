This module mounts [AlpineJS](https://github.com/alpinejs/alpine)'s `packages/.../dist` folders.

See [Releases](https://github.com/gohugoio/hugo-mod-jslibs-dist/releases) for version information. The version scheme used is Alpine's version with the patch number multiplied with 100, e.g. `v3.4.2` becomes `alpinejs/v3.4.200`.

The `packages` folder is mounted in `assets/jslibs/alpinejs/v3`.

That means that you can just import it into your Hugo config:

```toml
[[module.imports]]
path = "github.com/gohugoio/hugo-mod-jslibs-dist/alpinejs/v3"
```

And then use it in your JS files:

```js
import Alpine from 'jslibs/alpinejs/v3/alpinejs/dist/module.esm.js';
import intersect from 'jslibs/alpinejs/v3/intersect/dist/module.esm.js';
import persist from 'jslibs/alpinejs/v3/persist/dist/module.esm.js';

// Set up and start Alpine.
(function() {
	// Register AlpineJS plugins.
	Alpine.plugin(intersect);
	Alpine.plugin(persist);

    // Start Alpine.
    Alpine.start();
	
})();

```
