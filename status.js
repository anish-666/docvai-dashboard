import { ok, options } from './_util.js';
export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  return ok({ ok: true, route: 'status', ts: new Date().toISOString() });
}
