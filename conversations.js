import { ok, err, options } from './_util.js';
import { query } from '../../lib/db.js';
import { authTenantFromHeader } from '../../lib/auth.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  if (event.httpMethod !== 'GET') return err(405, { error:'METHOD_NOT_ALLOWED' });
  const tenantId = authTenantFromHeader(event.headers.authorization) || 't_demo';
  const rows = await query(
    `select id, started_at, customer_number, agent_id, status, duration_seconds
     from conversations where tenant_id=$1
     order by started_at desc limit 50`, [tenantId]
  );
  return ok(rows);
}
