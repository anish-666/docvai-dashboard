import { ok, err, options } from './_util.js';
import { query } from '../../lib/db.js';
import { authTenantFromHeader } from '../../lib/auth.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  if (event.httpMethod !== 'GET') return err(405, { error:'METHOD_NOT_ALLOWED' });

  const tenantId = authTenantFromHeader(event.headers.authorization) || 't_demo';
  const rows = await query(
    `select 
       count(*)::int as total_calls, 
       sum(case when success then 1 else 0 end)::int as connected,
       coalesce(round(avg(duration_seconds)::numeric,2),0) as avg_duration
     from calls
     where tenant_id=$1`, [tenantId]
  );
  return ok(rows[0] || { total_calls: 0, connected: 0, avg_duration: 0 });
}
