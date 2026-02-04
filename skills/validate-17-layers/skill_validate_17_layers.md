---
name: validate-17-layers
description: BlueMouse 17-Layer Validation. Comprehensive Python check covering syntax, types, security (secrets/eval), and performance (complexity).
---

# 17-Layer Validation Checklist

## G1: Syntax & Structure (L1-L4)
1. **L1 Syntax**: `compile()` source without errors.
2. **L2 AST**: Must define `FunctionDef` or `ClassDef`.
3. **L3 Format**: No tabs (`\t`); indent must be 4-space multiples.
4. **L4 Naming**: Functions `snake_case`; Classes `PascalCase`.

## G2: Signatures (L5-L8)
5. **L5 Params**: Function args exist.
6. **L6 Return**: Function has explicit `return` node.
7. **L7 Typing**: Hint coverage ≥80% AND has return type.
8. **L8 Docs**: Docstring length > 10 chars.

## G3: Dependencies (L9-L12)
9. **L9 Imports**: Count total imports.
10. **L10 Stdlib**: Identify standard libs (`os`, `sys`, `json`).
11. **L11 3rd-Party**: Identify external libs (`pandas`, `fastapi`).
12. **L12 Cycles**: **FAIL** if relative imports (`from ..x`) detected.

## G4: Logic & Security (L13-L17)
13. **L13 Consistency**: Global type coverage ≥70%.
14. **L14 Logic**: Contains control flow (`if`/`for`/`while`).
15. **L15 Errors**: **FAIL** on empty `except:` or `pass`-only handlers.
16. **L16 Security**:
   - **FAIL**: `eval()`, `exec()`, `pickle`.
   - **FAIL**: Hardcoded secrets (regex `api_key=|password=`).
17. **L17 Perf**: **FAIL** if loop nesting depth ≥ 3.

## Output Format
Calculate `Score = (Passed Layers / 17) * 100`. Report in format:

```text
=== 17-Layer Report (Score: X/100) ===
✅/❌ L[N] [Name]: [Details]
...
Top Suggestions:
1. Fix L[N] by ...