// lib/db.js
import postgres from 'postgres';

let sql;

/**
 * Neon serverless client (works great on Netlify Functions).
 * Reuse the client across invocations to avoid connection overhead.
 */
export function getClient() {
  if (!sql) {
    const cs = process.env.DATABASE_URL;
    if (!cs) throw new Error('DATABASE_URL not set');
    sql = postgres(cs, {
      ssl: 'require',         // Neon requires SSL
      max: 1,                 // keep tiny in serverless
      prepare: false          // avoid prepare cache across cold starts
    });
  }
  return sql;
}

export async function query(text, params = []) {
  const db = getClient();
  // postgres package supports parameterized queries via tagged template,
  // but we also accept [text, params] style for minimal change:
  if (params.length === 0) {
    const rows = await db.unsafe(text);
    return rows;
  } else {
    // Convert $1, $2 … params into template values:
    // Build a template tag array dynamically
    const parts = text.split(/\$\d+/g);
    let tpl = [parts[0]];
    for (let i = 1; i < parts.length; i++) tpl.push(parts[i]);
    const rows = await db(tpl, ...params);
    return rows;
  }
}
