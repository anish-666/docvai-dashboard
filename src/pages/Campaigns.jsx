import React from 'react'
import { api } from '../lib/api.js'

export default function Campaigns(){
  const [rows,setRows]=React.useState([])
  const [name,setName]=React.useState('New Campaign')
  const [total,setTotal]=React.useState(0)
  const [err,setErr]=React.useState('')
  const load = ()=> api.campaignsList().then(setRows).catch(e=>setErr(e.message))
  React.useEffect(()=>{ load() },[])

  const create=async()=>{
    try{
      await api.campaignsCreate({ name, total: Number(total)||0 })
      await load()
      setName('New Campaign'); setTotal(0)
    }catch(e){ setErr(e.message) }
  }

  return (
    <div className="grid two">
      <div className="card">
        <h3>Create Campaign</h3>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} />
        <label>Total</label>
        <input value={total} onChange={e=>setTotal(e.target.value)} />
        <div style={{marginTop:12}}><button className="btn" onClick={create}>Create</button></div>
        {err && <div style={{marginTop:10, color:'#ff9aa2'}}>Error: {err}</div>}
      </div>
      <div className="card">
        <h3>Recent Campaigns</h3>
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Status</th><th>Total</th><th>Completed</th><th>Created</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.name}</td><td>{r.status}</td>
                <td>{r.total}</td><td>{r.completed}</td><td>{r.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
