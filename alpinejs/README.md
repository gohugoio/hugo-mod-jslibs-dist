This module mounts [AlpineJS](https://github.com/alpinejs/alpine)'s `packages/.../dist` folders.

See [Releases](https://github.com/gohugoio/hugo-mod-jslibs-dist/releases) for version information. We use the [Semver Pair](https://github.com/bep/semverpair) versioning scheme.

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

Note that this works great in combination with [Turbo](https://github.com/gohugoio/hugo-mod-jslibs/tree/master/turbo), but you would need to set up something like [these listeners](https://gist.github.com/bep/a9809f0cb119e44e8ddbe37dd1e58b50) to make it work properly.
