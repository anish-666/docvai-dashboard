import { ok, err, options } from './_util.js';
import { query } from '../../lib/db.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  if (event.httpMethod !== 'GET') return err(405, { error:'METHOD_NOT_ALLOWED' });
  const rows = await query('select id, tenant_id, name, provider_agent_id, active from agents limit 50');
  return ok({ items: rows });
}
