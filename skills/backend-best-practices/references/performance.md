# Performance Best Practices

## 1. Query Optimization
- **N+1 Problem**: Use `JOIN` or eager loading (`.select("*, users(name)")`) instead of loops.
- **Selection**: Select only necessary columns (e.g., exclude `memo` in lists).
- **Batching**: Use batch inserts (`.insert([data1, data2])`) instead of loop inserts.
- **Aggregation**: Calculate sums/counts in DB (`SELECT SUM(amount) ... GROUP BY`), not in app code.

## 2. Caching Strategy
- **In-Memory**: Use `lru_cache` for pure functions or short-lived data (e.g., debt matrix).
- **Redis**: Use for cross-request caching (e.g., monthly stats). Set TTL (e.g., 1h).
- **Invalidation**: Clear cache on write (active invalidation) or rely on TTL.

## 3. Data Structures (Python)
- **Lookup**: Use `dict`/`set` for O(1) access. Avoid list scans (O(n)).
- **Generators**: Use `yield` for processing large datasets to save memory.
- **Counting**: Use `collections.Counter` or `defaultdict`.

## 4. System Optimization
- **Connection Pool**: Use `SQLAlchemy QueuePool` to reuse DB connections.
- **Async Tasks**: Offload heavy tasks (notifications, email) to `BackgroundTasks` or Celery.
- **Bulk Ops**: Always prefer bulk insert/update APIs over single-row operations.