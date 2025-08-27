import { ok, err, options, parseJson } from './_util.js';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return options();
  if (event.httpMethod !== 'POST') return err(405, { error:'METHOD_NOT_ALLOWED' });

  const { numbers = [], agentId, callerId } = parseJson(event);
  if (!Array.isArray(numbers) || numbers.length === 0) return err(400, { error:'NO_NUMBERS' });

  const API_KEY = process.env.BOLNA_API_KEY;
  const PROVIDER_AGENT_ID = agentId || process.env.BOLNA_AGENT_ID;
  const CALLER = callerId || process.env.OUTBOUND_CALLER_ID;

  if (!API_KEY) return err(500, { error:'MISSING_BOLNA_API_KEY' });
  if (!PROVIDER_AGENT_ID) return err(400, { error:'MISSING_AGENT_ID' });
  if (!CALLER) return err(400, { error:'MISSING_CALLER_ID' });

  const endpoint = 'https://api.bolna.ai/v1/calls';

  const results = [];
  for (const to of numbers) {
    const payload = { agent_id: PROVIDER_AGENT_ID, to, from: CALLER };
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const text = await r.text();
    let body; try { body = JSON.parse(text); } catch { body = { raw:text }; }
    results.push({ to, status: r.status, body });
  }

  return ok({ ok:true, results });
}
