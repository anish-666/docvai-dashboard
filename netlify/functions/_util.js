export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

export function ok(body) {
  return { statusCode: 200, headers: corsHeaders(), body: JSON.stringify(body) };
}
export function created(body) {
  return { statusCode: 201, headers: corsHeaders(), body: JSON.stringify(body) };
}
export function err(code, body) {
  return { statusCode: code, headers: corsHeaders(), body: JSON.stringify(body) };
}
export function options() {
  return { statusCode: 200, headers: corsHeaders(), body: '' };
}

export function parseJson(event) {
  try { return event.body ? JSON.parse(event.body) : {}; }
  catch { return {}; }
}
