---
name: validate-dependencies
description: BlueMouse L9-L12. Validates Python imports. Counts usage, classifies Stdlib/3rd-party, and detects risky relative imports (circular dependency risk).
---

# Dependency Validation (L9-L12)

## Checklist

### L9: Import Count
- **Action**: Count all `import` and `from ... import` statements.
- **Result**: Report total count. (Info only)

### L10: Standard Library
- **Action**: Identify Python stdlib usage (e.g., `os`, `sys`, `json`, `datetime`, `typing`, `collections`).
- **Result**: List detected modules. (Info only)

### L11: Third-Party Libraries
- **Action**: Identify external dependencies (e.g., `fastapi`, `pandas`, `requests`, `sqlalchemy`, `pydantic`).
- **Result**: List detected packages. (Info only)

### L12: Circular Dependency Risk ⚠️
- **Action**: Scan for **relative imports** (AST level > 0).
- **Rule**:
  - `import x` / `from x import y` (Level 0): **PASS** (Absolute)
  - `from . import x` / `from ..y import z` (Level > 0): **FAIL** (Relative)
- **Failure**: Report "Detected relative imports. Risk of circular dependency."

## Output Format
```text
=== L9-L12 Dependencies ===
✅ L9: Found [N] imports.
✅ L10: Stdlib: [List...]
✅ L11: 3rd-Party: [List...]
✅/❌ L12: [Pass/Fail Message]