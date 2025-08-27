// lib/db.js
import postgres from 'postgres';

let sql;

export function getClient() {
  if (!sql) {
    const cs = process.env.DATABASE_URL;
    if (!cs) throw new Error('DATABASE_URL not set');
    sql = postgres(cs, {
      ssl: 'require',  // Neon needs SSL
      max: 1,
      prepare: false
    });
  }
  return sql;
}

export async function query(text, params = []) {
  const db = getClient();
  // Use the driver’s supported API:
  // - sql.unsafe(text)                    -> runs raw
  // - sql.unsafe(text, [p1, p2, ...])     -> parameterized
  return params.length ? db.unsafe(text, params) : db.unsafe(text);
}
