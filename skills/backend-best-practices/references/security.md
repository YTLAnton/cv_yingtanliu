# Security Best Practices ⚠️

## 1. Row Level Security (RLS) - CRITICAL
- **Mandatory**: Every table (`users`, `transactions`) MUST have `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`.
- **Policies**: Define explicit `SELECT`/`INSERT`/`UPDATE`/`DELETE` policies.
- **Verification**: Use `auth.uid()` to restrict access to own data.
- **Forbidden**: Never leave `USING (true)` (allow all) in production.

## 2. Input Validation (Pydantic)
- **Role**: Gatekeeper. All endpoints must use Pydantic models.
- **Rules**:
  - `...` (Required)
  - `regex` (Format, e.g., `^U[0-9]+$`)
  - `gt`/`lt` (Ranges)
  - `max_length` (Buffer overflow prevention)
- **Custom Validators**: Use `@validator` for complex logic (e.g., sum checks, duplicates).

## 3. Injection Prevention
- **SQL**: Use Parameterized Queries (`WHERE id = %s`) or ORM methods (`.eq()`). **NEVER** use f-strings to build SQL.
- **XSS**: Sanitize text inputs (strip HTML tags, limit length).

## 4. Rate Limiting
- **Implementation**: Use `slowapi` or similar middleware.
- **Limits**: Set reasonable caps (e.g., `10/minute` for creation endpoints) to prevent DDoS/Spam.