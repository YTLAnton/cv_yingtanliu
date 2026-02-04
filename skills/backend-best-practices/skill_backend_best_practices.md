---
name: backend-best-practices
description: Gateway to backend standards. Covers API, DB, Security, and Performance via specific reference files.
---

# Backend Standards Gateway

## ⚠️ Critical Priority
1. **Security**: RLS MUST be enabled. No raw SQL strings.
2. **DB Design**: Use UUIDs. Index Foreign Keys. Use `NUMERIC` for money.
3. **Performance**: No N+1 queries. Use batch ops.

## 📚 Reference Map
Agent: Read the specific file below based on the task type.

- **DB Schema / SQL**: `references/database-design.md`
  - *Keywords*: UUID, Normalization, Indexing, Constraints, NUMERIC.
- **API Endpoints**: `references/api-design.md`
  - *Keywords*: RESTful, HTTP Status, Pydantic, Pagination.
- **Security / Auth**: `references/security.md`
  - *Keywords*: RLS (Row Level Security), Injection, Input Validation, Rate Limit.
- **Optimization**: `references/performance.md`
  - *Keywords*: N+1, Caching (Redis), Bulk Insert, Connection Pool.

## ✅ Pre-Commit Checklist
- [ ] **Security**: RLS enabled? No SQL Injection?
- [ ] **DB**: FKs indexed? UUIDs used?
- [ ] **Perf**: No N+1 loops? Batch inserts used?
- [ ] **API**: Input validation (Pydantic) active? Correct Status Codes?