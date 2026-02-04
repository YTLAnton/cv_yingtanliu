# Bundle Optimization

## 1. Imports
- **Selective**: **STOP** importing full libraries (e.g., `import _ from 'lodash'`). Use path imports (`lodash/debounce`) or write native utils to save KB.
- **Tree Shaking**: Use ES Modules (`export`/`import {}`). Avoid CommonJS (`require`) which blocks unused code elimination.

## 2. Lazy Loading
- **Dynamic Import**: Use `import()` to load heavy modules (charts, huge logic) *only* on interaction (e.g., `onclick`). Don't block initial load.

## 3. Production
- **Minify**: Ensure production builds use Terser/Uglify (mangle variables, remove whitespace).
- **CDN**: Serve static assets via CDN. Fix versions to maximize browser caching.