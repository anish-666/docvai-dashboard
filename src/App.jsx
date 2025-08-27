import React from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Overview from './pages/Overview.jsx'
import Conversations from './pages/Conversations.jsx'
import Campaigns from './pages/Campaigns.jsx'
import Agents from './pages/Agents.jsx'
import Outbound from './pages/Outbound.jsx'

function Guard({ children }){
  const nav = useNavigate()
  React.useEffect(()=>{
    const t = localStorage.getItem('token')
    if(!t) nav('/login')
  },[])
  return children
}

export default function App(){
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  return (
    <div>
      <nav>
        <strong style={{color:'#fff'}}>Docvai Dashboard</strong>
        <NavLink to="/overview">Overview</NavLink>
        <NavLink to="/conversations">Conversations</NavLink>
        <NavLink to="/campaigns">Campaigns</NavLink>
        <NavLink to="/agents">Agents</NavLink>
        <NavLink to="/outbound">Outbound</NavLink>
        <div style={{marginLeft:'auto'}}>
          {token ? <button className="btn" onClick={()=>{localStorage.removeItem('token'); location.href='/login'}}>Sign out</button>
                  : <NavLink to="/login">Sign in</NavLink>}
        </div>
      </nav>

      <div style={{maxWidth:1100, margin:'20px auto', padding:'0 16px'}}>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/overview" element={<Guard><Overview/></Guard>} />
          <Route path="/conversations" element={<Guard><Conversations/></Guard>} />
          <Route path="/campaigns" element={<Guard><Campaigns/></Guard>} />
          <Route path="/agents" element={<Guard><Agents/></Guard>} />
          <Route path="/outbound" element={<Guard><Outbound/></Guard>} />
          <Route path="*" element={<Login/>} />
        </Routes>
      </div>
    </div>
  )
}
