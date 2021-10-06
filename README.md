# hugo-mod-jslibs-dist

Thin Hugo Module wrappers around some popular JS libs' distribution source code.

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

