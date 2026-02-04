---
name: validate-syntax
description: BlueMouse L1-L4. Validates Python syntax (compile), AST structure (defs exist), Formatting (indent/tabs), and Naming (PEP 8).
---

# Syntax Validation (L1-L4)

## Checklist

### L1: Syntax Check
- **Action**: Run `compile(code, '<string>', 'exec')`.
- **Rule**: Must compile without `SyntaxError`.
- **Failure**: Report specific syntax error message and line number.

### L2: AST Structure
- **Action**: Parse AST. Check for `FunctionDef` or `ClassDef` nodes.
- **Rule**: Code must contain at least one function or class definition.
- **Failure**: "Missing function or class definition".

### L3: Formatting (Indentation)
- **Action**: Scan every line.
- **Rule**:
  1. **No Tab characters** (`\t`) allowed anywhere.
  2. Leading spaces must be a **multiple of 4**.
- **Failure**: "Found Tab characters" or "Indentation not multiple of 4".

### L4: Naming Conventions (PEP 8)
- **Action**: Check AST node names against regex.
- **Rule**:
  - **Functions**: `snake_case` (`^[a-z_][a-z0-9_]*$`).
  - **Classes**: `PascalCase` (`^[A-Z][a-zA-Z0-9]*$`).
- **Failure**: "Invalid name [Name] (expected [Snake/Pascal])."

## Output Format
```text
=== L1-L4 Syntax ===
✅/❌ L1: Syntax: [Msg]
✅/❌ L2: AST: [Msg]
✅/❌ L3: Format: [Msg]
✅/❌ L4: Naming: [Msg]