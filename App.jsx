import { useState, useEffect, useRef } from "react";

const INITIAL_ROWS = [
  { id:1,  nombre:"Ivy",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:2,  nombre:"Wanda",           cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:3,  nombre:"Ale",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:4,  nombre:"Caro",            cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:5,  nombre:"Emy",             cancion:"Loba",      artista:"Shakira",   yt:"https://youtu.be/7VNJWoVgQVk?si=06mPsh5A4OipKOp0",  done:false },
  { id:6,  nombre:"Ivy",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:7,  nombre:"Wanda",           cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:8,  nombre:"Ale",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:9,  nombre:"Caro",            cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:10, nombre:"Emy",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:11, nombre:"Ivy",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:12, nombre:"Wanda",           cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:13, nombre:"Ale",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:14, nombre:"Caro",            cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:15, nombre:"Emy",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:16, nombre:"Ivy",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:17, nombre:"Wanda",           cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:18, nombre:"Ale",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:19, nombre:"Caro",            cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:20, nombre:"Emy",             cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:21, nombre:"Dúo (Ivy + Emy)", cancion:"You and I", artista:"Lady Gaga", yt:"https://youtu.be/X-oMv-qyhgo?si=ZxSHRTWSmFdBvON6",  done:false },
  { id:22, nombre:"Trío",            cancion:"",          artista:"",          yt:"",                                                   done:false },
  { id:23, nombre:"",                cancion:"",          artista:"",          yt:"",                                                   done:false },
];

const NC = {
  "Ivy":               { bg:"rgba(216,180,254,0.22)", border:"#d8b4fe", text:"#faf5ff" },
  "Wanda":             { bg:"rgba(249,168,212,0.25)", border:"#f9a8d4", text:"#fff0f6" },
  "Ale":               { bg:"rgba(110,231,183,0.22)", border:"#6ee7b7", text:"#f0fdf9" },
  "Caro":              { bg:"rgba(253,224,71,0.20)",  border:"#fde047", text:"#fefce8" },
  "Emy":               { bg:"rgba(253,164,175,0.22)", border:"#fda4af", text:"#fff1f2" },
  "Dúo (Ivy + Emy)":  { bg:"rgba(199,210,254,0.20)", border:"#c7d2fe", text:"#eef2ff" },
  "Trío":              { bg:"rgba(199,210,254,0.20)", border:"#c7d2fe", text:"#eef2ff" },
  "":                  { bg:"rgba(255,255,255,0.07)", border:"rgba(216,180,254,0.3)",  text:"#f3e8ff" },
};

const STORAGE_KEY = "karaoke-houston-v4";

const Petal = ({ style, color }) => (
  <svg width="52" height="52" viewBox="0 0 80 80" style={{...style,pointerEvents:"none"}} aria-hidden>
    {[0,60,120,180,240,300].map((deg,i)=>(
      <ellipse key={i}
        cx={40+16*Math.cos(deg*Math.PI/180)} cy={40+16*Math.sin(deg*Math.PI/180)}
        rx={9} ry={15} fill={i%2===0?color:"#f0abfc"} opacity={0.8}
        transform={`rotate(${deg},${40+16*Math.cos(deg*Math.PI/180)},${40+16*Math.sin(deg*Math.PI/180)})`}
      />
    ))}
    <circle cx={40} cy={40} r={9} fill="#fde68a"/>
    <circle cx={40} cy={40} r={4} fill="#fbbf24"/>
  </svg>
);

export default function KaraokeTracker() {
  const [rows, setRows]             = useState(INITIAL_ROWS);
  const [loaded, setLoaded]         = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const timerRef = useRef(null);

  useEffect(()=>{
    (async()=>{
      try{ const r=await window.storage.get(STORAGE_KEY); if(r?.value) setRows(JSON.parse(r.value)); }catch{}
      setLoaded(true);
    })();
  },[]);

  useEffect(()=>{
    if(!loaded) return;
    (async()=>{ try{ await window.storage.set(STORAGE_KEY,JSON.stringify(rows)); }catch{} })();
  },[rows,loaded]);

  const currentIdx = rows.findIndex(r=>!r.done);
  const doneCount  = rows.filter(r=>r.done).length;

  const update     = (id,field,val) => setRows(p=>p.map(r=>r.id===id?{...r,[field]:val}:r));
  const toggleDone = (id) => setRows(p=>p.map(r=>r.id===id?{...r,done:!r.done}:r));
  const deleteRow  = (id) => { setRows(p=>p.filter(r=>r.id!==id)); setConfirmDel(null); if(expandedId===id) setExpandedId(null); };

  const handleDelete = (e,id) => {
    e.stopPropagation();
    if(confirmDel===id){ deleteRow(id); return; }
    setConfirmDel(id);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(()=>setConfirmDel(null), 2500);
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(145deg,#160028 0%,#280048 40%,#360860 70%,#1a0035 100%)",
      fontFamily:"'Georgia',serif",
      padding:"0 0 80px",
      position:"relative",
      overflowX:"hidden",
    }}>
      {[
        {top:0,   left:0,   color:"#e879f9",rotate:10 },
        {top:0,   right:0,  color:"#c026d3",rotate:-20},
        {bottom:0,left:0,   color:"#f472b6",rotate:15 },
        {bottom:0,right:0,  color:"#a855f7",rotate:-10},
      ].map((f,i)=>(
        <div key={i} style={{position:"fixed",top:f.top,left:f.left,right:f.right,bottom:f.bottom,transform:`rotate(${f.rotate}deg)`,zIndex:0}}>
          <Petal color={f.color}/>
        </div>
      ))}

      <div style={{position:"relative",zIndex:1,maxWidth:740,margin:"0 auto",padding:"0 16px"}}>

        {/* Header */}
        <div style={{textAlign:"center",paddingTop:36,paddingBottom:24}}>
          <div style={{fontSize:36,marginBottom:6}}>🎤🌸🎶</div>
          <h1 style={{
            margin:0,
            fontFamily:"'Palatino Linotype','Palatino',serif",
            fontSize:"clamp(1.7rem,5vw,2.5rem)",fontWeight:700,
            background:"linear-gradient(90deg,#f0abfc,#fde68a,#f9a8d4)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            letterSpacing:"0.02em",lineHeight:1.2,
          }}>Karaoke Playlist</h1>
          <div style={{
            display:"inline-block",marginTop:10,padding:"5px 20px",borderRadius:20,
            border:"1.5px solid rgba(216,180,254,0.55)",background:"rgba(255,255,255,0.09)",
            color:"#f3e8ff",fontSize:"0.78rem",fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",
          }}>Houston Girls Trip 🤠</div>

          <div style={{marginTop:20,padding:"0 4px"}}>
            <div style={{display:"flex",justifyContent:"space-between",color:"#f3e8ff",fontSize:"0.77rem",fontWeight:700,marginBottom:7}}>
              <span>🎵 {doneCount} sung</span>
              <span>{rows.length-doneCount} remaining</span>
            </div>
            <div style={{height:7,borderRadius:99,background:"rgba(255,255,255,0.18)",overflow:"hidden"}}>
              <div style={{
                height:"100%",borderRadius:99,
                background:"linear-gradient(90deg,#c084fc,#f9a8d4)",
                width:`${(doneCount/Math.max(rows.length,1))*100}%`,
                transition:"width 0.5s ease",
              }}/>
            </div>
          </div>
        </div>

        {/* Col headers — no # column */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"20px 110px 1fr 1fr 32px 28px",
          gap:10,padding:"8px 12px",
          color:"#f3e8ff",fontSize:"0.68rem",fontWeight:800,
          letterSpacing:"0.1em",textTransform:"uppercase",
          borderBottom:"1.5px solid rgba(216,180,254,0.3)",
          marginBottom:8,
        }}>
          <span/>
          <span>Nombre</span>
          <span>Canción</span>
          <span>Artista</span>
          <span style={{textAlign:"center"}}>Link</span>
          <span/>
        </div>

        {/* Rows */}
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {rows.map((row,idx)=>{
            const isCurrent  = idx===currentIdx;
            const isExpanded = expandedId===row.id;
            const isConfirm  = confirmDel===row.id;
            const nc         = NC[row.nombre]??NC[""];

            return (
              <div key={row.id} style={{
                borderRadius:14,
                border:`1.5px solid ${isConfirm?"#f87171":isCurrent?"#f9a8d4":"rgba(216,180,254,0.2)"}`,
                background:isConfirm?"rgba(248,113,113,0.1)":row.done?"rgba(255,255,255,0.03)":isCurrent?"rgba(249,168,212,0.09)":"rgba(255,255,255,0.06)",
                opacity:row.done?0.5:1,
                transition:"all 0.25s",
                boxShadow:isCurrent?"0 0 18px rgba(249,168,212,0.2)":"none",
                overflow:"hidden",
              }}>

                {/* Collapsed row */}
                <div
                  onClick={()=>setExpandedId(p=>p===row.id?null:row.id)}
                  style={{
                    display:"grid",
                    gridTemplateColumns:"20px 110px 1fr 1fr 32px 28px",
                    gap:10,padding:"13px 12px",
                    alignItems:"center",
                    cursor:"pointer",
                  }}
                >
                  {/* Delete */}
                  <button
                    onClick={e=>handleDelete(e,row.id)}
                    title={isConfirm?"Tap again to confirm":"Delete row"}
                    style={{
                      background:"none",border:"none",padding:0,
                      color:isConfirm?"#f87171":"rgba(233,213,255,0.45)",
                      fontSize:"1.15rem",fontWeight:700,lineHeight:1,
                      cursor:"pointer",transition:"color 0.15s",
                      width:20,textAlign:"center",flexShrink:0,
                    }}
                    onMouseEnter={e=>{if(!isConfirm) e.currentTarget.style.color="#f87171";}}
                    onMouseLeave={e=>{if(!isConfirm) e.currentTarget.style.color="rgba(233,213,255,0.45)";}}
                  >×</button>

                  {/* Nombre badge */}
                  <div style={{
                    padding:"4px 10px",borderRadius:20,
                    background:nc.bg,border:`1.5px solid ${nc.border}`,color:nc.text,
                    fontSize:"0.74rem",fontWeight:800,
                    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                    textDecoration:row.done?"line-through":"none",
                  }}>
                    {isCurrent&&<span style={{marginRight:3}}>▶</span>}
                    {row.nombre||"—"}
                  </div>

                  {/* Canción */}
                  <div style={{
                    color:row.cancion?"#faf5ff":"rgba(233,213,255,0.38)",
                    fontSize:"0.86rem",fontWeight:row.cancion?700:400,
                    fontStyle:row.cancion?"normal":"italic",
                    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                  }}>
                    {row.cancion||"tap to add"}
                  </div>

                  {/* Artista */}
                  <div style={{
                    color:row.artista?"#f3e8ff":"rgba(233,213,255,0.38)",
                    fontSize:"0.83rem",fontWeight:row.artista?600:400,
                    fontStyle:row.artista?"normal":"italic",
                    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                  }}>
                    {row.artista||"—"}
                  </div>

                  {/* YT link — 🔗 or 🎵 */}
                  {row.yt
                    ? <a href={row.yt} target="_blank" rel="noreferrer"
                        onClick={e=>e.stopPropagation()}
                        style={{fontSize:"1.1rem",textDecoration:"none",textAlign:"center",display:"block",lineHeight:1}}
                        title="Open link">🔗</a>
                    : <span style={{color:"rgba(216,180,254,0.25)",fontSize:"0.8rem",textAlign:"center",display:"block"}}>🎵</span>
                  }

                  {/* Done checkbox — empty square, tick when done */}
                  <button
                    onClick={e=>{e.stopPropagation();toggleDone(row.id);}}
                    title={row.done?"Mark undone":"Mark done"}
                    style={{
                      width:26,height:26,borderRadius:7,
                      border:`2px solid ${row.done?"#86efac":"rgba(216,180,254,0.4)"}`,
                      background:row.done?"rgba(134,239,172,0.18)":"transparent",
                      color:row.done?"#86efac":"transparent",
                      cursor:"pointer",fontSize:"0.85rem",fontWeight:800,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      flexShrink:0,transition:"all 0.2s",
                    }}
                  >{row.done?"✓":""}</button>
                </div>

                {/* Expanded edit panel */}
                {isExpanded&&(
                  <div
                    onClick={e=>e.stopPropagation()}
                    style={{
                      padding:"0 12px 16px 12px",
                      borderTop:"1px solid rgba(216,180,254,0.18)",
                    }}
                  >
                    <div style={{paddingTop:14,display:"flex",flexDirection:"column",gap:12}}>

                      <label style={labelStyle}>
                        <span style={labelText}>🎵 Canción</span>
                        <textarea
                          autoFocus
                          value={row.cancion}
                          onChange={e=>update(row.id,"cancion",e.target.value)}
                          placeholder="Nombre de la canción…"
                          rows={2}
                          style={textareaStyle}
                        />
                      </label>

                      <label style={labelStyle}>
                        <span style={labelText}>🎤 Artista</span>
                        <textarea
                          value={row.artista}
                          onChange={e=>update(row.id,"artista",e.target.value)}
                          placeholder="Nombre del artista…"
                          rows={2}
                          style={textareaStyle}
                        />
                      </label>

                      <label style={labelStyle}>
                        <span style={labelText}>🔗 YouTube Link</span>
                        <input
                          value={row.yt}
                          onChange={e=>update(row.id,"yt",e.target.value)}
                          placeholder="https://youtu.be/…"
                          style={inputStyle}
                        />
                      </label>

                      <div style={{display:"flex",gap:10,marginTop:2}}>
                        <button
                          onClick={()=>setExpandedId(null)}
                          style={{
                            flex:1,padding:"11px",borderRadius:10,
                            border:"1.5px solid rgba(216,180,254,0.4)",
                            background:"transparent",
                            color:"#f3e8ff",fontSize:"0.84rem",fontWeight:700,cursor:"pointer",
                          }}
                        >Done ✓</button>
                        <button
                          onClick={()=>{ toggleDone(row.id); setExpandedId(null); }}
                          style={{
                            flex:1,padding:"11px",borderRadius:10,
                            border:`1.5px solid ${row.done?"#86efac":"rgba(134,239,172,0.5)"}`,
                            background:row.done?"rgba(134,239,172,0.15)":"transparent",
                            color:row.done?"#86efac":"#d1fae5",
                            fontSize:"0.84rem",fontWeight:700,cursor:"pointer",
                          }}
                        >{row.done?"↩ Unmark":"Mark as sung 🎤"}</button>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:26,justifyContent:"center"}}>
          {["Ivy","Wanda","Ale","Caro","Emy"].map(name=>{
            const c=NC[name];
            return(
              <div key={name} style={{padding:"4px 14px",borderRadius:20,background:c.bg,border:`1.5px solid ${c.border}`,color:c.text,fontSize:"0.74rem",fontWeight:800}}>
                {name}
              </div>
            );
          })}
        </div>

        <div style={{textAlign:"center",marginTop:14,color:"#e9d5ff",fontSize:"0.76rem",fontWeight:600}}>
          Tap row to expand · × to delete · Auto-saves 💜
        </div>
      </div>

      <style>{`
        textarea,input{font-family:'Georgia',serif;}
        textarea::placeholder,input::placeholder{color:rgba(233,213,255,0.4);}
        textarea:focus,input:focus{outline:none;border-color:#c084fc!important;box-shadow:0 0 0 2px rgba(192,132,252,0.2);}
        textarea{resize:vertical;}
        *{box-sizing:border-box;}
        button:active{transform:scale(0.97);}
      `}</style>
    </div>
  );
}

const labelStyle    = { display:"flex", flexDirection:"column", gap:5 };
const labelText     = { color:"#d8b4fe", fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase" };
const textareaStyle = {
  width:"100%", padding:"9px 12px", borderRadius:10,
  border:"2px solid rgba(192,132,252,0.4)",
  background:"rgba(255,255,255,0.09)",
  color:"#faf5ff", fontSize:"0.88rem", fontWeight:600, lineHeight:1.5,
};
const inputStyle = {
  width:"100%", padding:"9px 12px", borderRadius:10,
  border:"2px solid rgba(192,132,252,0.4)",
  background:"rgba(255,255,255,0.09)",
  color:"#faf5ff", fontSize:"0.84rem", fontWeight:600,
};
