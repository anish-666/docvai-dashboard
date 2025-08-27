import { ok, err, options, parseJson } from './_util.js';
import { parseDemoUsers, makeToken } from '../../lib/auth.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  if (event.httpMethod !== 'POST') return err(405, { error: 'METHOD_NOT_ALLOWED' });

  const { email, password } = parseJson(event);
  const users = parseDemoUsers();
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return err(401, { error: 'INVALID_CREDENTIALS' });

  const token = makeToken(u.tenantId, u.email);
  return ok({ token, tenantId: u.tenantId, email: u.email });
}
