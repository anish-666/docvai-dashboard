import React from 'react'
import { api } from '../lib/api.js'

export default function Overview(){
  const [data,setData]=React.useState(null)
  const [err,setErr]=React.useState('')

  React.useEffect(()=>{
    api.analyticsSummary().then(setData).catch(e=>setErr(e.message))
  },[])

  return (
    <div className="grid three">
      <div className="card">
        <div className="small">Total Calls</div>
        <div style={{fontSize:32, fontWeight:700}}>{data?.total_calls ?? '—'}</div>
      </div>
      <div className="card">
        <div className="small">Connected</div>
        <div style={{fontSize:32, fontWeight:700}}>{data?.connected ?? '—'}</div>
      </div>
      <div className="card">
        <div className="small">Avg Duration (sec)</div>
        <div style={{fontSize:32, fontWeight:700}}>{data?.avg_duration ?? '—'}</div>
      </div>
      {err && <div className="card" style={{gridColumn:'1/-1', color:'#ff9aa2'}}>Error: {err}</div>}
    </div>
  )
}
