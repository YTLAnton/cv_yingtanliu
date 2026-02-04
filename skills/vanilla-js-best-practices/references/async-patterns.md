# JS Async Patterns

## 1. Eliminate Waterfalls
- **Parallelism**: **STOP** using sequential `await` for independent tasks.
- **Pattern**: Initiate Promises immediately (`const p = fetch()`), then use `Promise.all([p1, p2])` to await them together. Reduces total time to `max(t1, t2)` instead of `t1 + t2`.

## 2. Defer Await
- **Early Start**: Call async functions as early as possible. Do synchronous work (e.g., UI loading state, analytics logging) *before* the `await` line.
- **Conditional**: Move `await` **inside** `if` blocks. Never fetch data that might be skipped by logic.

## 3. Fault Tolerance
- **AllSettled**: Use `Promise.allSettled()` when partial success is acceptable (e.g., dashboard widgets). `Promise.all()` fails fast on the first error.