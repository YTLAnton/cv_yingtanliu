# JS Advanced Patterns

## 1. State & Reactivity
- **Observable**: Use `Store` pattern with `subscribe`/`notify` for global state management.
- **Proxy**: Use `Proxy` to trap `set` operations for automatic UI updates (Reactivity).

## 2. Architecture
- **Dependency Injection**: Inject dependencies (API, Services) into factory functions. Enhances modularity and testing.
- **Indexing**: Convert Arrays to `Map` (`id` -> `item`) for **O(1)** lookups. **STOP** using `find()` (O(n)) inside loops.

## 3. Performance
- **Memoization**: Cache results of expensive functions based on arguments (`JSON.stringify(args)` as key).
- **Web Workers**: Offload heavy logic (stats, large data processing) to background threads. Keep Main Thread free.

## 4. Network
- **Dedupe**: Cache fetch requests with short TTL to prevent redundant calls.
- **Abort**: Use `AbortController` to cancel stale requests (e.g., search typeahead).