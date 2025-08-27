// same-origin; Netlify proxies /api/* → functions
const BASE = ''

async function req(path, opts = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type':'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}), ...(opts.headers||{}) };
  const r = await fetch(`${BASE}/api${path}`, { ...opts, headers });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  const ct = r.headers.get('content-type') || '';
  return ct.includes('application/json') ? r.json() : r.text();
}

export const api = {
  base: BASE,
  login: (email, password) => req('/auth-login', { method:'POST', body: JSON.stringify({email,password}) }),
  agents: () => req('/agents'),
  conversations: () => req('/conversations'),
  analyticsSummary: () => req('/analytics-summary'),
  campaignsList: () => req('/campaigns'),
  campaignsCreate: (payload) => req('/campaigns', { method:'POST', body: JSON.stringify(payload) }),
  outbound: (payload) => req('/calls-outbound', { method:'POST', body: JSON.stringify(payload) }),
  status: () => req('/status'),
}
