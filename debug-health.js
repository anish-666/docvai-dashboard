import { ok, options } from './_util.js';
import { query } from '../../lib/db.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  let db = 'unknown';
  try { await query('select 1'); db = 'connected'; }
  catch (e) { db = `db-error: ${e.message}`; }
  return ok({
    env: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
      BOLNA_API_KEY: !!process.env.BOLNA_API_KEY,
      BOLNA_AGENT_ID: !!process.env.BOLNA_AGENT_ID,
      OUTBOUND_CALLER_ID: !!process.env.OUTBOUND_CALLER_ID,
    },
    db
  });
}
