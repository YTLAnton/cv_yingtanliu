---
name: generate-commit-msg
description: Generates Traditional Chinese commit messages following Conventional Commits based on git changes.
---

# Generate Commit Message

## Process
1. **Analyze**: Read `git diff`/`git status`. Focus on *functional logic* (PM view) over code syntax.
2. **Draft**: Create a single-line summary in Traditional Chinese (繁體中文).

## Formatting Rules
- **Pattern**: `[Type] Point1、Point2與Point3`
- **Constraints**:
  - 5-10 chars per point.
  - Sort by importance (High -> Low).
  - Use `、` for separation, `與` for the last item.
  - No emojis. Professional tone. Specific descriptions only.

## Type Definitions
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (whitespace, indentation)
- `refactor`: Code restructuring (no logic change)
- `chore`: Build process/auxiliary tools