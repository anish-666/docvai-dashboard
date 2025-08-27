import React from 'react'
import { api } from '../lib/api.js'

export default function Agents(){
  const [items,setItems]=React.useState([])
  const [err,setErr]=React.useState('')
  React.useEffect(()=>{ api.agents().then(x=>setItems(x.items||[])).catch(e=>setErr(e.message)) },[])
  return (
    <div className="card">
      <h3>Agents</h3>
      {err && <div style={{color:'#ff9aa2', marginBottom:10}}>Error: {err}</div>}
      <table className="table">
        <thead><tr><th>ID</th><th>Name</th><th>Provider Agent ID</th><th>Active</th></tr></thead>
        <tbody>
          {items.map(a=>(
            <tr key={a.id}>
              <td>{a.id}</td><td>{a.name}</td><td>{a.provider_agent_id}</td><td>{String(a.active)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
