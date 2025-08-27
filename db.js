import pg from 'pg';
const { Pool } = pg;

let pool;
export function getPool() {
  if (!pool) {
    const cs = process.env.DATABASE_URL;
    if (!cs) throw new Error('DATABASE_URL not set');
    pool = new Pool({
      connectionString: cs,
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

export async function query(sql, params) {
  const p = getPool();
  const res = await p.query(sql, params);
  return res.rows;
}
