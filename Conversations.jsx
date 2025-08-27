import React from 'react'
import { api } from '../lib/api.js'

export default function Conversations(){
  const [rows,setRows]=React.useState([])
  const [err,setErr]=React.useState('')
  React.useEffect(()=>{ api.conversations().then(setRows).catch(e=>setErr(e.message)) },[])
  return (
    <div className="card">
      <h3>Conversations</h3>
      {err && <div style={{color:'#ff9aa2', marginBottom:10}}>Error: {err}</div>}
      <table className="table">
        <thead><tr><th>ID</th><th>Started</th><th>Number</th><th>Agent</th><th>Status</th><th>Duration</th></tr></thead>
        <tbody>
          {rows.map(r =>
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.started_at}</td>
              <td>{r.customer_number}</td>
              <td>{r.agent_id}</td>
              <td>{r.status}</td>
              <td>{r.duration_seconds}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
