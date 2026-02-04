---
name: vanilla-js-best-practices
description: Gateway to Vanilla JS performance & architecture. Covers Async Waterfalls, Bundling, DOM Perf, and React-to-Native patterns.
---

# Vanilla JS Best Practices

## ⚠️ Critical Priorities
1. **Async**: Eliminate waterfalls. Use `Promise.all` for parallel requests.
2. **Bundle**: Lazy load non-critical code (`import()`). No full-lib imports.
3. **DOM**: Batch updates (`DocumentFragment`). Separate Read/Write to avoid layout thrashing.

## 📚 Reference Map
Agent: Consult these files for implementation details.

- **Async / Network**: `references/async-patterns.md`
  - *Keywords*: Promise.all, Waterfall, Defer Await.
- **Size / Loading**: `references/bundle-optimization.md`
  - *Keywords*: Tree Shaking, Dynamic Import, CDN.
- **Rendering / Events**: `references/dom-performance.md`
  - *Keywords*: Reflow, Event Delegation, Debounce, Throttle, Virtual Scroll.
- **Architecture**: `references/advanced-patterns.md`
  - *Keywords*: Observable, Proxy, Memoization, Workers.

## ⚛️ React Mapping (Mental Model)
| React Concept | Vanilla JS Implementation |
|:---|:---|
| `useState` | Observable Store / Proxy Pattern |
| `useEffect` | Event Listeners / Lifecycle Hooks |
| `useMemo` | Memoization (Cache) |
| `Context` | Dependency Injection / Global Store |
| `Virtual DOM` | `DocumentFragment` / String Templating |

## ✅ Pre-Commit Checklist
- [ ] **Async**: Are independent promises running in parallel?
- [ ] **Import**: Are heavy libs lazy-loaded or tree-shaken?
- [ ] **DOM**: Is `appendChild` inside a loop avoided?
- [ ] **Events**: Are listeners delegated to parents?
- [ ] **Perf**: Are scroll/input handlers throttled/debounced?