# DOM & Event Performance

## 1. DOM Manipulation
- **Batching**: **STOP** appending inside loops. Use `DocumentFragment` or build a single HTML string (`innerHTML`) to trigger exactly **one** reflow.
- **Layout Thrashing**: Separate **Read** (e.g., `offsetWidth`) and **Write** (e.g., `style.width`) phases. Never mix them in a loop (forces synchronous layout).
- **Styles**: Toggle `classList` instead of setting individual `.style` properties.

## 2. Event Handling
- **Delegation**: Attach **one** listener to the parent (using `e.target.closest()`) instead of **N** listeners on children.
- **Frequency**:
  - Use **Debounce** for inputs (search/typing).
  - Use **Throttle** for continuous events (scroll/resize).
- **Passive**: Always use `{ passive: true }` for `touchstart`/`wheel` to unblock main thread scrolling.

## 3. Rendering
- **Animation**: Use `requestAnimationFrame` for visual updates. **STOP** using `setInterval`.
- **Large Lists**: Implement **Virtual Scrolling** (render visible window only).
- **CSS**: Use `content-visibility: auto` to skip rendering for off-screen content.