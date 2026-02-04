---
name: backend-best-practices
description: Backend development standards including API design, DB schema, security, and performance.
---

# Backend Best Practices

## Core Principles
Follow these standards for all backend tasks. Refer to specific guides in `references/` based on context.

### 1. API Design
**Context**: Creating or modifying endpoints.
**Source**: `references/api-design.md`
**Key Rules**:
- **RESTful**: Resource-oriented URLs (`GET /api/transactions`). No verbs in paths.
- **Status Codes**: Use standard codes (`201 Created`, `400 Bad Request`, `403 Forbidden`).
- **Validation**: Use **Pydantic** schemas. Validate types, ranges, and business logic.
- **Pagination**: Mandatory for lists. Use `page`/`page_size` query params.
- **Errors**: Return standardized JSON error responses with `code` and `message`.

### 2. Database Design
**Context**: Modifying Schema or SQL queries.
**Source**: `references/database-design.md` (If available)
**Key Rules**:
- Use descriptive table/column names (snake_case).
- Always define Primary Keys (UUID preferred) and Foreign Keys.
- Add indexes on frequently queried columns.

### 3. Security
**Context**: Auth, permissions, or data access.
**Source**: `references/security.md` (If available)
**Key Rules**:
- Validate current user permissions for **every** write operation.
- Never return sensitive data (passwords, tokens) in API responses.
- Sanitize inputs to prevent Injection.

## Usage
- **Do not** guess implementation details.
- **Read** the relevant reference file before writing code.