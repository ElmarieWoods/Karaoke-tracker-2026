import { useState, useEffect, useRef } from 'react'

const STORAGE_KEY = 'karaoke-houston-v9'
const NAMES = ['Ivy', 'Wanda', 'Ale', 'Caro', 'Emy']

const INITIAL_ROWS = [
  { id:1,  nombre:'Ivy',   cancion:'', artista:'', yt:'', done:false },
  { id:2,  nombre:'Wanda', cancion:'', artista:'', yt:'', done:false },
  { id:3,  nombre:'Ale',   cancion:'', artista:'', yt:'', done:false },
  { id:4,  nombre:'Caro',  cancion:'', artista:'', yt:'', done:false },
  { id:5,  nombre:'Emy',   cancion:'Loba', artista:'Shakira', yt:'https://youtu.be/7VNJWoVgQVk?si=06mPsh5A4OipKOp0', done:false },
  { id:6,  nombre:'Ivy',   cancion:'', artista:'', yt:'', done:false },
  { id:7,  nombre:'Wanda', cancion:'', artista:'', yt:'', done:false },
  { id:8,  nombre:'Ale',   cancion:'', artista:'', yt:'', done:false },
  { id:9,  nombre:'Caro',  cancion:'', artista:'', yt:'', done:false },
  { id:10, nombre:'Emy',   cancion:'', artista:'', yt:'', done:false },
  { id:11, nombre:'Ivy',   cancion:'', artista:'', yt:'', done:false },
  { id:12, nombre:'Wanda', cancion:'', artista:'', yt:'', done:false },
  { id:13, nombre:'Ale',   cancion:'', artista:'', yt:'', done:false },
  { id:14, nombre:'Caro',  cancion:'', artista:'', yt:'', done:false },
  { id:15, nombre:'Emy',   cancion:'', artista:'', yt:'', done:false },
  { id:16, nombre:'Ivy',   cancion:'', artista:'', yt:'', done:false },
  { id:17, nombre:'Wanda', cancion:'', artista:'', yt:'', done:false },
  { id:18, nombre:'Ale',   cancion:'', artista:'', yt:'', done:false },
  { id:19, nombre:'Caro',  cancion:'', artista:'', yt:'', done:false },
  { id:20, nombre:'Emy',   cancion:'', artista:'', yt:'', done:false },
  { id:21, nombre:'',      cancion:'', artista:'', yt:'', done:false },
]

const NC = {
  Ivy:   { bg:'rgba(160,110,185,0.14)', border:'#a06eb9', text:'#52336e' },
  Wanda: { bg:'rgba(185,105,125,0.14)', border:'#b9697d', text:'#72283a' },
  Ale:   { bg:'rgba(95,155,125,0.14)',  border:'#5f9b7d', text:'#1e5e42' },
  Caro:  { bg:'rgba(185,145,75,0.14)',  border:'#b9914b', text:'#624010' },
  Emy: { bg:'rgba(100,130,185,0.14)', border:'#6482b9', text:'#1e3872' },
  '':    { bg:'rgba(140,74,90,0.07)',   border:'rgba(140,74,90,0.25)', text:'#6a3040' },
}

let nextId = 500

function FlowerCorner({ pos }) {
  const isRight  = pos.includes('right')
  const isBottom = pos.includes('bottom')
  const tx = isRight ? 'scaleX(-1)' : 'none'
  return (
    <svg width={88} height={120} viewBox="0 0 160 220"
      style={{ position:'fixed', zIndex:0, pointerEvents:'none', opacity:0.55,
        top:isBottom?'auto':0, bottom:isBottom?0:'auto',
        left:isRight?'auto':0, right:isRight?0:'auto', transform:tx }}
      aria-hidden="true">
      <path d="M 30 220 Q 45 160 60 120 Q 75 80 90 50" stroke="#7a9e78" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <path d="M 30 220 Q 20 170 35 140 Q 50 110 40 80" stroke="#7a9e78" strokeWidth="1.2" fill="none" opacity="0.5"/>
      <ellipse cx="55" cy="140" rx="18" ry="8" fill="#8aaa80" opacity="0.5" transform="rotate(-30 55 140)"/>
      <ellipse cx="70" cy="100" rx="14" ry="6" fill="#9abb90" opacity="0.45" transform="rotate(20 70 100)"/>
      <ellipse cx="40" cy="160" rx="16" ry="7" fill="#7a9e78" opacity="0.4" transform="rotate(-50 40 160)"/>
      <g transform="translate(88 48) rotate(15)">
        {[0,72,144,216,288].map((a,i)=><ellipse key={i} cx={10*Math.cos(a*Math.PI/180)} cy={10*Math.sin(a*Math.PI/180)} rx="7" ry="12" fill={i%2===0?'#9b7fc0':'#b99dd4'} opacity="0.82" transform={`rotate(${a} ${10*Math.cos(a*Math.PI/180)} ${10*Math.sin(a*Math.PI/180)})`}/>)}
        <circle cx="0" cy="0" r="6" fill="#f5d76e" opacity="0.9"/><circle cx="0" cy="0" r="3" fill="#e8b84b"/>
      </g>
      <g transform="translate(30 75) rotate(-10)">
        {[0,72,144,216,288].map((a,i)=><ellipse key={i} cx={8*Math.cos(a*Math.PI/180)} cy={8*Math.sin(a*Math.PI/180)} rx="6" ry="10" fill={i%2===0?'#c07890':'#d4a0b0'} opacity="0.78" transform={`rotate(${a} ${8*Math.cos(a*Math.PI/180)} ${8*Math.sin(a*Math.PI/180)})`}/>)}
        <circle cx="0" cy="0" r="5" fill="#f5e17a" opacity="0.9"/>
      </g>
      <g transform="translate(55 168) rotate(5)">
        {[0,60,120,180,240,300].map((a,i)=><ellipse key={i} cx={7*Math.cos(a*Math.PI/180)} cy={7*Math.sin(a*Math.PI/180)} rx="5" ry="9" fill="#ede0f0" opacity="0.72" transform={`rotate(${a} ${7*Math.cos(a*Math.PI/180)} ${7*Math.sin(a*Math.PI/180)})`}/>)}
        <circle cx="0" cy="0" r="4" fill="#f5e17a" opacity="0.85"/>
      </g>
      <ellipse cx="78" cy="22" rx="5" ry="9" fill="#b899cc" opacity="0.62" transform="rotate(-20 78 22)"/>
    </svg>
  )
}

function AddModal({ onClose, onAdd }) {
  const [selected, setSelected] = useState([])
  const [cancion,  setCancion]  = useState('')
  const [artista,  setArtista]  = useState('')
  const [yt,       setYt]       = useState('')
  const [kbOffset, setKbOffset] = useState(0)

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const fn = () => setKbOffset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop))
    vv.addEventListener('resize', fn)
    vv.addEventListener('scroll', fn)
    return () => { vv.removeEventListener('resize', fn); vv.removeEventListener('scroll', fn) }
  }, [])

  const toggle = n => setSelected(p => p.includes(n) ? p.filter(x=>x!==n) : [...p,n])
  const nombre = selected.join(' + ')
  const submit = () => { if (!selected.length) return; onAdd({id:nextId++,nombre,cancion,artista,yt,done:false}); onClose() }

  const inS = { width:'100%',padding:'13px 16px',borderRadius:12,border:'1.5px solid rgba(140,74,90,0.25)',background:'rgba(255,255,255,0.75)',color:'#3d1f28',fontSize:'17px',minHeight:'48px',fontFamily:"'Lato',sans-serif",boxSizing:'border-box' }
  const lbS = { color:'#8c4a5a',fontSize:'13px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase' }
  const btn = { flex:1,minHeight:'50px',borderRadius:12,fontSize:'17px',fontWeight:600,cursor:'pointer',fontFamily:"'Lato',sans-serif" }

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:100,background:'rgba(50,15,22,0.28)',backdropFilter:'blur(5px)',display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
      <div onClick={e=>e.stopPropagation()} style={{width:'100%',maxWidth:'100vw',background:'#f7dde0',borderRadius:'22px 22px 0 0',boxShadow:'0 -6px 32px rgba(100,35,48,0.14)',marginBottom:kbOffset,transition:'margin-bottom 0.15s ease',maxHeight:'88dvh',display:'flex',flexDirection:'column',overflow:'hidden',boxSizing:'border-box'}}>
        <div style={{padding:'14px 0 4px',flexShrink:0}}>
          <div style={{width:36,height:4,borderRadius:99,background:'rgba(140,74,90,0.3)',margin:'0 auto'}}/>
        </div>
        <div style={{padding:'8px 24px 14px',flexShrink:0,borderBottom:'1px solid rgba(140,74,90,0.1)'}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:'#5e1e2e',fontSize:'22px',fontWeight:700,textAlign:'center'}}>Add a Song 🎤</h2>
        </div>
        <div style={{overflowY:'auto',overflowX:'hidden',flex:1,padding:'20px 24px 48px',WebkitOverflowScrolling:'touch',boxSizing:'border-box',width:'100%'}}>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <span style={lbS}>Who's singing?</span>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {NAMES.map(name => {
                  const nc = NC[name]; const on = selected.includes(name)
                  return <button key={name} onClick={()=>toggle(name)} style={{padding:'8px 18px',borderRadius:20,cursor:'pointer',border:`2px solid ${on?nc.border:'rgba(140,74,90,0.2)'}`,background:on?nc.bg:'rgba(255,255,255,0.5)',color:on?nc.text:'#8c4a5a',fontSize:'16px',fontWeight:on?700:400,minHeight:'44px',fontFamily:"'Lato',sans-serif",transition:'all 0.15s'}}>{name}</button>
                })}
              </div>
              {selected.length > 0 && <div style={{fontSize:'14px',color:'#8c4a5a',fontStyle:'italic'}}>Singing: {nombre}</div>}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              <span style={lbS}>Canción</span>
              <input autoFocus value={cancion} onChange={e=>setCancion(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder="Nombre de la canción…" style={inS}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              <span style={lbS}>Artista</span>
              <input value={artista} onChange={e=>setArtista(e.target.value)} placeholder="Nombre del artista…" style={inS}/>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              <span style={lbS}>YouTube Link</span>
              <input value={yt} onChange={e=>setYt(e.target.value)} placeholder="https://youtu.be/…" style={inS}/>
            </div>
            <div style={{display:'flex',gap:10,marginTop:4}}>
              <button onClick={onClose} style={{...btn,border:'1.5px solid rgba(140,74,90,0.28)',background:'transparent',color:'#8c4a5a'}}>Cancel</button>
              <button onClick={submit} style={{...btn,flex:2,border:'none',background:selected.length?'#8c4a5a':'rgba(140,74,90,0.3)',color:'#f7dde0',cursor:selected.length?'pointer':'not-allowed',boxShadow:selected.length?'0 4px 14px rgba(140,74,90,0.3)':'none'}}>Add to Playlist ✦</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const saved = localStorage.getItem(STORAGE_KEY)
  const [rows,       setRows]       = useState(saved ? JSON.parse(saved) : INITIAL_ROWS)
  const [expandedId, setExpandedId] = useState(null)
  const [showAdd,    setShowAdd]    = useState(false)

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(rows)) }, [rows])

  const currentIdx = rows.findIndex(r => !r.done)
  const doneCount  = rows.filter(r => r.done).length
  const update     = (id,f,v) => setRows(p=>p.map(r=>r.id===id?{...r,[f]:v}:r))
  const toggleDone = id => setRows(p=>p.map(r=>r.id===id?{...r,done:!r.done}:r))
  const deleteRow  = id => { setRows(p=>p.filter(r=>r.id!==id)); setConfirmDel(null); if(expandedId===id) setExpandedId(null) }
  const addRow     = row => setRows(p=>[...p,row])

  const shuffleRows = () => {
    setRows(prev => {
      // Separate done and undone rows
      const done   = prev.filter(r => r.done)
      const undone = prev.filter(r => !r.done)

      // Smart shuffle: no same nombre back-to-back
      const shuffle = arr => {
        const a = [...arr]
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]]
        }
        return a
      }

      let attempts = 0
      let shuffled = shuffle(undone)
      while (attempts < 50) {
        let ok = true
        for (let i = 1; i < shuffled.length; i++) {
          if (shuffled[i].nombre && shuffled[i].nombre === shuffled[i-1].nombre) { ok = false; break }
        }
        if (ok) break
        shuffled = shuffle(undone)
        attempts++
      }

      return [...done, ...shuffled]
    })
  }

  const handleDelete = (e,id) => {
    e.stopPropagation()
    deleteRow(id)
  }

  const G = 16
  const GRID = '32px auto 1fr 1fr 44px 44px'
  const fieldS = {width:'100%',padding:'12px 14px',borderRadius:10,border:'1.5px solid rgba(140,74,90,0.2)',background:'rgba(255,255,255,0.6)',color:'#3d1f28',fontSize:'17px',lineHeight:1.5,minHeight:'48px',fontFamily:"'Lato',sans-serif"}
  const lbT = {color:'#8c4a5a',fontSize:'13px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}

  return (
    <div style={{minHeight:'100vh',minHeight:'100dvh',background:'#f7dde0',paddingBottom:120,position:'relative',overflowX:'hidden',fontFamily:"'Lato',sans-serif",color:'#3d1f28'}}>
      {['top-left','top-right','bottom-left','bottom-right'].map(pos=><FlowerCorner key={pos} pos={pos}/>)}

      <div style={{position:'relative',zIndex:1,maxWidth:680,margin:'0 auto',overflow:'hidden'}}>
        {/* Header */}
        <div style={{textAlign:'center',padding:`48px ${G}px 28px`}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2.2rem,9vw,3.2rem)',fontWeight:700,color:'#5e1e2e',letterSpacing:'0.05em',lineHeight:1.1,textTransform:'uppercase'}}>Girl's<br/>Weekend</h1>
          <div style={{display:'inline-block',marginTop:16,padding:'10px 36px',borderRadius:5,background:'#8c4a5a',color:'#f7dde0',fontFamily:"'Playfair Display',serif",fontSize:'17px',fontStyle:'italic',fontWeight:700}}>Houston Girls Trip 🤠</div>
          <div style={{marginTop:22,padding:`0 ${G}px`}}>
            <div style={{display:'flex',justifyContent:'space-between',color:'#6a2a38',fontSize:'15px',fontWeight:600,fontStyle:'italic',marginBottom:7}}>
              <span>{doneCount} sung</span><span>{rows.length-doneCount} remaining</span>
            </div>
            <div style={{height:5,borderRadius:99,background:'rgba(140,74,90,0.14)',overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:99,background:'#8c4a5a',opacity:0.65,width:`${(doneCount/Math.max(rows.length,1))*100}%`,transition:'width 0.5s'}}/>
            </div>
          </div>
          <button onClick={shuffleRows} style={{marginTop:14,display:'flex',alignItems:'center',gap:6,background:'transparent',border:'1.5px solid rgba(140,74,90,0.3)',borderRadius:20,padding:'7px 18px',color:'#8c4a5a',fontSize:'14px',fontWeight:600,cursor:'pointer',fontFamily:"'Lato',sans-serif",margin:'14px auto 0'}}>
            🔀 Shuffle Order
          </button>
        </div>

        {/* Col headers */}
        <div style={{display:'grid',gridTemplateColumns:GRID,gap:12,padding:`0 ${G}px 10px`,color:'#6a2a38',fontSize:'12px',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',borderBottom:'1px solid rgba(140,74,90,0.16)',marginBottom:2}}>
          <span/><span>Nombre</span><span>Canción</span><span>Artista</span><span style={{textAlign:'center'}}>YT</span><span/>
        </div>

        {/* Rows */}
        {rows.map((row,idx) => {
          const isCurrent=idx===currentIdx, isExpanded=expandedId===row.id
          const nc=NC[row.nombre]||NC['']
          return (
            <div key={row.id} style={{background:isCurrent?'rgba(140,74,90,0.06)':'transparent',borderRadius:isCurrent?10:0,opacity:row.done?0.4:1,transition:'opacity 0.2s',overflow:'hidden',width:'100%'}}>
              <div onClick={()=>setExpandedId(p=>p===row.id?null:row.id)} style={{display:'grid',gridTemplateColumns:GRID,gap:12,padding:`14px ${G}px`,minHeight:'60px',alignItems:'center',cursor:'pointer'}}>
                <button onClick={e=>handleDelete(e,row.id)}
                  onMouseEnter={e=>{e.currentTarget.style.color='#c03050'}}
                  onMouseLeave={e=>{e.currentTarget.style.color='rgba(140,74,90,0.28)'}}
                  style={{background:'none',border:'none',padding:0,color:'rgba(140,74,90,0.28)',fontSize:'22px',fontWeight:300,lineHeight:1,cursor:'pointer',transition:'color 0.15s',minHeight:'44px',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
                <div style={{padding:'5px 12px',borderRadius:20,background:nc.bg,border:`1px solid ${nc.border}`,color:nc.text,fontSize:'14px',fontWeight:700,whiteSpace:'normal',wordBreak:'break-word',textDecoration:row.done?'line-through':'none',width:'fit-content',alignSelf:'center'}}>
                  {isCurrent&&<span style={{marginRight:4,fontSize:'10px'}}>▶</span>}{row.nombre||'—'}
                </div>
                <div style={{color:row.cancion?'#2a0e18':'rgba(50,15,22,0.42)',fontSize:'17px',fontWeight:row.cancion?700:400,fontStyle:row.cancion?'normal':'italic',whiteSpace:'normal',wordBreak:'break-word'}}>{row.cancion||'add song'}</div>
                <div style={{color:row.artista?'#3d1520':'rgba(50,15,22,0.42)',fontSize:'16px',fontWeight:400,fontStyle:'italic',whiteSpace:'normal',wordBreak:'break-word'}}>{row.artista||'—'}</div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'44px',width:'44px'}}>
                  {row.yt?<a href={row.yt} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:'20px',textDecoration:'none',lineHeight:1}}>🔗</a>:<span style={{color:'rgba(140,74,90,0.2)',fontSize:'18px'}}>🎵</span>}
                </div>
                <button onClick={e=>{e.stopPropagation();toggleDone(row.id)}} style={{width:'44px',height:'44px',borderRadius:8,border:`2px solid ${row.done?'#5a8e62':'rgba(140,74,90,0.25)'}`,background:row.done?'rgba(90,142,98,0.12)':'transparent',color:row.done?'#2e6635':'transparent',cursor:'pointer',fontSize:'17px',fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s'}}>{row.done?'✓':''}</button>
              </div>
              <div style={{height:1,background:'rgba(140,74,90,0.1)',margin:`0 ${G}px`}}/>
              {isExpanded&&(
                <div onClick={e=>e.stopPropagation()} style={{padding:`16px ${G}px 20px`,background:'rgba(255,255,255,0.3)',overflow:'hidden',boxSizing:'border-box',width:'100%',maxWidth:'100%',contain:'layout'}}>
                  <div style={{display:'flex',flexDirection:'column',gap:14,overflowX:'hidden',width:'100%'}}>
                    <label style={{display:'flex',flexDirection:'column',gap:6}}><span style={lbT}>🎵 Canción</span><textarea autoFocus value={row.cancion} onChange={e=>update(row.id,'cancion',e.target.value)} placeholder="Nombre de la canción…" rows={2} style={fieldS}/></label>
                    <label style={{display:'flex',flexDirection:'column',gap:6}}><span style={lbT}>🎤 Artista</span><textarea value={row.artista} onChange={e=>update(row.id,'artista',e.target.value)} placeholder="Nombre del artista…" rows={2} style={fieldS}/></label>
                    <label style={{display:'flex',flexDirection:'column',gap:6}}><span style={lbT}>🔗 YouTube Link</span><input value={row.yt} onChange={e=>update(row.id,'yt',e.target.value)} placeholder="https://youtu.be/…" style={fieldS}/></label>
                    <div style={{display:'flex',gap:10,marginTop:4}}>
                      <button onClick={()=>setExpandedId(null)} style={{flex:1,minHeight:'50px',borderRadius:10,border:'1.5px solid rgba(140,74,90,0.25)',background:'transparent',color:'#8c4a5a',fontSize:'17px',fontWeight:600,cursor:'pointer',fontFamily:"'Lato',sans-serif"}}>Close</button>
                      <button onClick={()=>{toggleDone(row.id);setExpandedId(null)}} style={{flex:1,minHeight:'50px',borderRadius:10,border:`1.5px solid ${row.done?'#5a8e62':'rgba(90,142,98,0.4)'}`,background:row.done?'rgba(90,142,98,0.12)':'transparent',color:row.done?'#2e6635':'#3a6e42',fontSize:'17px',fontWeight:600,cursor:'pointer',fontFamily:"'Lato',sans-serif"}}>{row.done?'↩ Unmark':'Mark as sung 🎤'}</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Legend */}
        <div style={{display:'flex',flexWrap:'wrap',gap:8,margin:`28px ${G}px 0`,justifyContent:'center'}}>
          {NAMES.map(name=>{const c=NC[name];return<div key={name} style={{padding:'6px 16px',borderRadius:20,background:c.bg,border:`1px solid ${c.border}`,color:c.text,fontSize:'15px',fontWeight:700}}>{name}</div>})}
        </div>
        <p style={{textAlign:'center',marginTop:14,paddingBottom:8,color:'rgba(80,20,35,0.45)',fontSize:'14px',fontStyle:'italic'}}>Tap to expand · × to delete · auto-saves</p>
      </div>

      {/* FAB */}
      <div style={{position:'fixed',bottom:50,left:0,right:0,display:'flex',justifyContent:'center',zIndex:50,pointerEvents:'none'}}>
        <button onClick={()=>setShowAdd(true)}
          onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
          onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
          style={{pointerEvents:'all',width:56,height:56,borderRadius:'50%',border:'none',background:'#8c4a5a',color:'#f7dde0',fontSize:'28px',lineHeight:1,cursor:'pointer',boxShadow:'0 4px 20px rgba(140,74,90,0.38)',display:'flex',alignItems:'center',justifyContent:'center',transition:'transform 0.2s'}}>+</button>
      </div>

      {showAdd&&<AddModal onClose={()=>setShowAdd(false)} onAdd={addRow}/>}
    </div>
  )
}
