---
name: validate-logic
description: BlueMouse L13-L17. Deep validation of Python code. Checks Type Hint coverage, Logic flow, Error handling (anti-patterns), Security (secrets/eval), and Loop complexity.
---

# Logic Validation (L13-L17)

## Checklist

### L13: Type Hint Coverage
- **Action**: Calc `%` of functions with return types or argument annotations.
- **Rule**: Pass if Coverage ≥ 70%.
- **Failure**: Report coverage %.

### L14: Logic Structure (Info)
- **Action**: Check for presence of `if`/`for`/`while`.
- **Result**: Report "Structured" (has control flow) or "Simple" (linear).

### L15: Error Handling ⚠️
- **Action**: Scan `try-except` blocks.
- **Rule**: **FAIL** if handler is empty or contains only `pass`.
- **Anti-Pattern**: `except: pass` (Swallows errors).
- **Pass**: Proper error logging or re-raising.

### L16: Security Scan 🔒
- **Action**:
  1. Detect Dangerous Funcs: `eval()`, `exec()`, `pickle`, `__import__`.
  2. Detect Secrets (Regex): `api_key=`, `password=`, `token=`, `aws_access_key=`.
- **Rule**: **FAIL** on any detection.
- **Failure**: List detected risks.

### L17: Performance (Complexity) ⚡
- **Action**: Calculate max loop nesting depth.
- **Rule**: **FAIL** if Depth ≥ 3 (O(n³)).
- **Pass**: Depth 0-2.
- **Failure**: "Nested loops too deep (Depth [N]). Optimize algorithm."

## Output Format
```text
=== L13-L17 Logic ===
✅/❌ L13: Type Coverage: [N]%
✅ L14: Logic: [Structured/Simple]
✅/❌ L15: Error Handling: [Pass/Fail Msg]
✅/❌ L16: Security: [Pass/Fail Msg]
✅/❌ L17: Complexity: [Pass/Fail Msg]