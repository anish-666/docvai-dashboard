import { ok, created, err, options, parseJson } from './_util.js';
import { query } from '../../lib/db.js';
import { authTenantFromHeader } from '../../lib/auth.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  const tenantId = authTenantFromHeader(event.headers.authorization) || 't_demo';

  if (event.httpMethod === 'GET') {
    const rows = await query(
      `select id, name, created_at, status, total, completed
       from campaigns where tenant_id=$1 order by created_at desc limit 50`, [tenantId]
    );
    return ok(rows);
  }

  if (event.httpMethod === 'POST') {
    const { name='New Campaign', total=0 } = parseJson(event);
    const rows = await query(
      `insert into campaigns (tenant_id, name, status, total, completed)
       values ($1,$2,'queued',$3,0)
       returning id, name, created_at, status, total, completed`,
      [tenantId, name, total]
    );
    return created(rows[0]);
  }

  return err(405, { error:'METHOD_NOT_ALLOWED' });
}
