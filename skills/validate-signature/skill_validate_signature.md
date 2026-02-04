---
name: validate-signature
description: BlueMouse L5-L8. Validates function signatures. Checks Parameters, explicit Return, Type Hints (≥80% + Return Type), and Docstrings (>10 chars).
---

# Signature Validation (L5-L8)

## Checklist

### L5: Parameters
- **Action**: Inspect function arguments.
- **Rule**: Must have parameters (or match specific inputs if defined in a spec).
- **Failure**: "Parameter mismatch" or "No parameters defined".

### L6: Return Statement
- **Action**: Scan AST for explicit `return` nodes.
- **Rule**: Function must not rely on implicit `None` return (unless intended void).
- **Failure**: "Missing explicit return statement".

### L7: Type Hints
- **Action**: Calculate annotation coverage.
- **Rule**:
  1. Argument Coverage ≥ **80%**.
  2. Return Type annotation **MUST** exist.
- **Failure**: "Type coverage [N]% (<80%)" or "Missing return type hint".

### L8: Docstring
- **Action**: Extract docstring via `ast.get_docstring`.
- **Rule**: Content length must be **> 10 characters**.
- **Failure**: "Docstring missing or too short (≤10 chars)".

## Output Format
```text
=== L5-L8 Signature ===
✅/❌ L5: Params: [Msg]
✅/❌ L6: Return: [Msg]
✅/❌ L7: Types: [Msg]
✅/❌ L8: Docs: [Msg]