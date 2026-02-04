# Database Design Best Practices

## 1. Normalization
- **Default**: 3NF to avoid duplication.
- **Denormalization**: Only for proven high-freq read performance (e.g., caching `payer_name` in `transactions` to avoid joins). Use triggers to maintain consistency.

## 2. Indexing
- **Mandatory**: Foreign Keys, High-frequency `WHERE`/`ORDER BY` columns.
- **Avoid**: Low cardinality columns (e.g., `currency='NTD'`), rarely queried fields.
- **Composite**: For specific query patterns (e.g., `(user_id, date DESC)`).

## 3. Data Types
- **Money**: `NUMERIC(10, 2)`. Never `FLOAT`.
- **Time**: `TIMESTAMP WITH TIME ZONE`.
- **ID**: `UUID` preferred.
- **JSON**: `JSONB` for indexing support.

## 4. Constraints
- **Validation**: Use `CHECK` (e.g., `amount > 0`, email regex).
- **Referential**: Always define FKs with appropriate `ON DELETE` rules.
- **Uniqueness**: Use `UNIQUE` constraints to enforce business logic (e.g., one friendship pair per user couple).

## 5. ID Strategy (Security)
- **Rule**: Use **UUID** for all internal resources (`transactions`, `logs`) to prevent enumeration attacks.
- **Exception**: User-facing IDs (e.g., `U123`) allowed for UX/legacy compat, but back them with internal UUIDs.
- **Perf**: Use **UUIDv7** (time-sortable) if possible for better index locality.