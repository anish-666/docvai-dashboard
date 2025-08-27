import React from 'react'
import { api } from '../lib/api.js'

export default function Outbound(){
  const [numbers,setNumbers]=React.useState('+91XXXXXXXXXX\n+91YYYYYYYYYY')
  const [caller,setCaller]=React.useState('+918035316096')
  const [agent,setAgent]=React.useState('8c87d6d3-e607-42d1-bf32-3c7058cab0c0')
  const [res,setRes]=React.useState(null)
  const [err,setErr]=React.useState('')
  const submit=async()=>{
    setErr(''); setRes(null)
    try{
      const payload = { callerId: caller, agentId: agent, numbers: numbers.split(/\s+/).filter(Boolean) }
      const r = await api.outbound(payload)
      setRes(r)
    }catch(e){ setErr(e.message) }
  }
  return (
    <div className="card">
      <h3>Outbound Calls (Batch)</h3>
      <div className="grid two">
        <div>
          <label>Caller ID</label>
          <input className="wide" value={caller} onChange={e=>setCaller(e.target.value)} />
          <label>Agent ID</label>
          <input className="wide" value={agent} onChange={e=>setAgent(e.target.value)} />
        </div>
        <div>
          <label>Numbers (one per line)</label>
          <textarea className="wide" rows={8} value={numbers} onChange={e=>setNumbers(e.target.value)} />
        </div>
      </div>
      <div style={{marginTop:12}}><button className="btn" onClick={submit}>Start Calls</button></div>
      {err && <div style={{marginTop:10, color:'#ff9aa2'}}>Error: {err}</div>}
      {res && <pre style={{marginTop:12, whiteSpace:'pre-wrap'}}>{JSON.stringify(res,null,2)}</pre>}
    </div>
  )
}
