import { useMemo, useState } from 'react'
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, GraduationCap, Users, BookOpen, Settings, Search, Bell,
  ChevronDown, Plus, ArrowUpRight, ArrowDownRight, MoreHorizontal, Download,
  Filter, CalendarDays, CircleHelp, Menu, X, Mail, MapPin, Globe2, Heart,
  ArrowLeft, Pencil, Trash2, UserRound, Check, Sparkles
} from 'lucide-react'
import { initialStudents } from './data'

const pageTitles = { '/': 'Dashboard', '/students': 'Students', '/about': 'About Campusly' }

function App() {
  const [students, setStudents] = useState(() => {
    try { return JSON.parse(localStorage.getItem('campusly-students')) || initialStudents }
    catch { return initialStudents }
  })
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const saveStudents = (next) => {
    setStudents(next)
    localStorage.setItem('campusly-students', JSON.stringify(next))
  }
  const title = pageTitles[location.pathname] || 'Page not found'

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><GraduationCap size={22}/></div><span>campusly</span><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-links">
        <NavLink to="/" end onClick={() => setMobileOpen(false)}><LayoutDashboard size={18}/>Dashboard</NavLink>
        <NavLink to="/students" onClick={() => setMobileOpen(false)}><Users size={18}/>Students<span className="nav-count">{students.length}</span></NavLink>
        <NavLink to="/about" onClick={() => setMobileOpen(false)}><BookOpen size={18}/>About</NavLink>
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><strong>Need a hand?</strong><p>Visit our help center for tips and answers.</p><button onClick={() => window.location.href='mailto:support@campusly.example'}>Get support <ArrowUpRight size={14}/></button></div>
        <div className="profile-mini"><div className="avatar avatar-admin">JD</div><div className="profile-info"><strong>Jordan Davis</strong><span>Administrator</span></div><MoreHorizontal size={19}/></div>
      </div>
    </aside>
    {mobileOpen && <div className="scrim" onClick={() => setMobileOpen(false)} />}
    <main className="main-area">
      <header className="topbar">
        <div className="top-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{title}</strong></div></div>
        <div className="top-actions"><div className="search-top"><Search size={16}/><input placeholder="Search anything..." onKeyDown={e => { if(e.key==='Enter') window.location.href='/students' }}/><kbd>⌘ K</kbd></div><button className="icon-button notification"><Bell size={18}/><i/></button><div className="top-divider"/><div className="top-user"><div className="avatar avatar-admin">JD</div><ChevronDown size={15}/></div></div>
      </header>
      <div className="page-wrap">
        <Routes>
          <Route path="/" element={<Dashboard students={students}/>} />
          <Route path="/students" element={<Students students={students} saveStudents={saveStudents}/>} />
          <Route path="/about" element={<About/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      <footer className="footer"><span>© 2025 Campusly. Made for better learning.</span><span><a href="/about">About</a><a href="mailto:support@campusly.example">Support</a><span className="footer-status"><i/> All systems normal</span></span></footer>
    </main>
  </div>
}

function PageHeading({eyebrow, title, subtitle, action}) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>
}
function Dashboard({students}) {
  const active = students.filter(s=>s.status==='Active').length
  const courses = [...new Set(students.map(s=>s.course))].length
  const recent = [...students].slice(0,5)
  return <>
    <PageHeading eyebrow="OVERVIEW" title="Good morning, Jordan 👋" subtitle="Here's what's happening across your campus today." action={<button className="button button-primary" onClick={()=>window.location.href='/students'}><Plus size={17}/> Manage students</button>}/>
    <div className="welcome-banner"><div className="banner-copy"><div className="banner-tag"><Sparkles size={13}/> YOUR CAMPUS AT A GLANCE</div><h2>Every student has a story.<br/><em>Help them write it.</em></h2><p>Keep your student community organised, engaged, and moving forward.</p><a href="/students">Explore student directory <ArrowUpRight size={15}/></a></div><div className="banner-art"><div className="art-circle circle-one"/><div className="art-circle circle-two"/><div className="art-card art-card-main"><div className="art-card-top"><span>STUDENT SUCCESS</span><span className="art-dot"/></div><div className="art-graph"><span style={{height:'35%'}}/><span style={{height:'52%'}}/><span style={{height:'44%'}}/><span style={{height:'72%'}}/><span style={{height:'61%'}}/><span style={{height:'88%'}}/><span style={{height:'100%'}}/></div><div className="art-card-bottom"><strong>+18.6%</strong><span>this semester</span></div></div><div className="floating-avatar float-a">OR</div><div className="floating-avatar float-b">PB</div><div className="floating-note"><span>✦</span> Learning together</div></div></div>
    <div className="section-title-row"><div><h2>Campus overview</h2><p>Your key numbers, all in one place.</p></div><div className="date-chip"><CalendarDays size={15}/> Academic year 2025–26</div></div>
    <div className="stats-grid">
      <StatCard icon={<Users size={19}/>} label="Total students" value={students.length.toLocaleString()} change="+12.8%" positive note="vs. last semester" tone="purple"/>
      <StatCard icon={<GraduationCap size={19}/>} label="Active students" value={active.toLocaleString()} change="+8.2%" positive note="vs. last semester" tone="green"/>
      <StatCard icon={<BookOpen size={19}/>} label="Courses offered" value={courses.toString()} change="+2 new" positive note="this academic year" tone="orange"/>
      <StatCard icon={<UserRound size={19}/>} label="Pending review" value={students.filter(s=>s.status==='Pending').length.toString()} change="Needs attention" positive={false} note="student applications" tone="blue"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel recent-panel"><div className="panel-heading"><div><h3>Recently added students</h3><p>A quick look at your latest records.</p></div><a href="/students" className="text-link">View all <ArrowUpRight size={14}/></a></div><StudentTable students={recent} compact/></section>
      <section className="panel activity-panel"><div className="panel-heading"><div><h3>Campus activity</h3><p>Highlights from your workspace.</p></div><button className="dots-button"><MoreHorizontal size={19}/></button></div><div className="activity-list"><Activity icon="user" color="purple" title="New student registered" detail="Olivia Rhye joined Computer Science" time="2 hours ago"/><Activity icon="book" color="orange" title="Course enrollment updated" detail="Business Administration · 24 students" time="Yesterday"/><Activity icon="check" color="green" title="Profile review completed" detail="12 student profiles approved" time="2 days ago"/><Activity icon="calendar" color="blue" title="Semester schedule published" detail="Fall semester dates are now live" time="3 days ago"/></div><button className="activity-more">See all activity <ArrowUpRight size={14}/></button></section>
    </div>
  </>
}
function StatCard({icon,label,value,change,positive,note,tone}) {
  return <div className="stat-card"><div className="stat-top"><div className={`stat-icon ${tone}`}>{icon}</div><button className="dots-button"><MoreHorizontal size={18}/></button></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-foot"><span className={positive?'trend-up':'trend-down'}>{positive?<ArrowUpRight size={13}/>:<ArrowDownRight size={13}/>} {change}</span><span>{note}</span></div></div>
}
function Activity({icon,color,title,detail,time}) {
  const Icon = icon==='user'?UserRound:icon==='book'?BookOpen:icon==='check'?Check:CalendarDays
  return <div className="activity-item"><div className={`activity-icon ${color}`}><Icon size={16}/></div><div className="activity-copy"><strong>{title}</strong><span>{detail}</span><small>{time}</small></div></div>
}
function Students({students,saveStudents}) {
  const [query,setQuery]=useState('')
  const [filter,setFilter]=useState('All')
  const [modal,setModal]=useState(false)
  const [editing,setEditing]=useState(null)
  const filtered=useMemo(()=>students.filter(s=>(filter==='All'||s.status===filter)&&`${s.name} ${s.email} ${s.course}`.toLowerCase().includes(query.toLowerCase())),[students,filter,query])
  const openAdd=()=>{setEditing(null);setModal(true)}
  const exportCsv=()=>{const rows=[['Name','Email','Course','Year','Status'],...filtered.map(s=>[s.name,s.email,s.course,s.year,s.status])];const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='campusly-students.csv';a.click();URL.revokeObjectURL(a.href)}
  const remove=(id)=>{if(window.confirm('Delete this student record?'))saveStudents(students.filter(s=>s.id!==id))}
  const submit=(data)=>{if(editing)saveStudents(students.map(s=>s.id===editing.id?{...editing,...data}:s));else saveStudents([{...data,id:Date.now(),initials:data.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase(),color:'lavender',joined:new Date().toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric'})},...students]);setModal(false)}
  return <>
    <PageHeading eyebrow="DIRECTORY" title="Students" subtitle="Manage your student records and keep your campus connected." action={<button className="button button-primary" onClick={openAdd}><Plus size={17}/> Add student</button>}/>
    <div className="student-summary"><div><span className="summary-number">{students.length}</span><span className="summary-label">Total records</span></div><div className="summary-divider"/><div><span className="summary-number">{students.filter(s=>s.status==='Active').length}</span><span className="summary-label">Active students</span></div><div className="summary-divider"/><div><span className="summary-number">{students.filter(s=>s.status==='Pending').length}</span><span className="summary-label">Pending review</span></div></div>
    <section className="panel directory-panel"><div className="directory-toolbar"><div className="filter-tabs">{['All','Active','Pending','Inactive'].map(x=><button key={x} className={filter===x?'selected':''} onClick={()=>setFilter(x)}>{x}<span>{x==='All'?students.length:students.filter(s=>s.status===x).length}</span></button>)}</div><div className="table-actions"><div className="table-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search students..."/></div><button className="button button-secondary" onClick={exportCsv}><Download size={15}/> Export</button></div></div><StudentTable students={filtered} onEdit={s=>{setEditing(s);setModal(true)}} onDelete={remove}/><div className="table-bottom"><span>Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students</span><div className="pagination"><button disabled>Previous</button><button className="current-page">1</button><button disabled>Next</button></div></div></section>
    {modal&&<StudentModal initial={editing} onClose={()=>setModal(false)} onSubmit={submit}/>}
  </>
}
function StudentTable({students,onEdit,onDelete,compact=false}) {
  return <div className="table-scroll"><table className="student-table"><thead><tr><th>STUDENT</th><th>COURSE</th><th>YEAR</th><th>STATUS</th>{!compact&&<th>DATE JOINED</th>}{!compact&&<th/>}</tr></thead><tbody>{students.length===0?<tr><td colSpan="6" className="empty-state">No students found. Try changing your search or filter.</td></tr>:students.map(s=><tr key={s.id}><td><div className="student-cell"><div className={`avatar avatar-${s.color}`}>{s.initials}</div><div><strong>{s.name}</strong><span>{s.email}</span></div></div></td><td>{s.course}</td><td>{s.year}</td><td><span className={`status status-${s.status.toLowerCase()}`}><i/>{s.status}</span></td>{!compact&&<td className="joined-date">{s.joined}</td>}{!compact&&<td><div className="row-actions"><button title="Edit student" onClick={()=>onEdit?.(s)}><Pencil size={15}/></button><button title="Delete student" onClick={()=>onDelete?.(s.id)}><Trash2 size={15}/></button></div></td>}</tr>)}</tbody></table></div>
}
function StudentModal({initial,onClose,onSubmit}) {
  const [form,setForm]=useState({name:initial?.name||'',email:initial?.email||'',course:initial?.course||'Computer Science',year:initial?.year||'Year 1',status:initial?.status||'Active'})
  const update=e=>setForm({...form,[e.target.name]:e.target.value})
  const submit=e=>{e.preventDefault();onSubmit(form)}
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><form className="student-modal" onSubmit={submit}><div className="modal-head"><div><span className="eyebrow">STUDENT RECORD</span><h2>{initial?'Edit student':'Add a student'}</h2><p>Fill in the details below to {initial?'update this':'create a'} student profile.</p></div><button type="button" className="icon-button" onClick={onClose}><X size={18}/></button></div><label>Full name<input name="name" value={form.name} onChange={update} placeholder="e.g. Alex Morgan" required/></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="alex@campus.edu" required/></label><label>Course<select name="course" value={form.course} onChange={update}>{['Computer Science','Business Admin','Graphic Design','Psychology','Mathematics','Physics'].map(x=><option>{x}</option>)}</select></label><div className="form-two"><label>Academic year<select name="year" value={form.year} onChange={update}>{[1,2,3,4].map(x=><option>Year {x}</option>)}</select></label><label>Status<select name="status" value={form.status} onChange={update}>{['Active','Pending','Inactive'].map(x=><option>{x}</option>)}</select></label></div><div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{initial?'Save changes':'Add student'}</button></div></form></div>
}
function About() {
  return <><PageHeading eyebrow="OUR STORY" title="About Campusly" subtitle="A little about the platform bringing your campus community together." action={<span className="version-pill"><span/> Version 1.0</span>}/><div className="about-hero"><div className="about-orb"><GraduationCap size={55}/></div><div className="eyebrow">MADE FOR EDUCATION</div><h2>Less admin. More <em>possibility.</em></h2><p>Campusly is a simple, thoughtful student management experience designed to help education teams spend less time organising information and more time supporting people.</p></div><div className="about-cards"><div className="about-card"><div className="about-card-icon purple"><Users size={20}/></div><h3>One clear picture</h3><p>Bring student information into one organised space, so your team can find what they need without the busywork.</p></div><div className="about-card"><div className="about-card-icon orange"><Sparkles size={20}/></div><h3>Simple by design</h3><p>Friendly layouts and focused tools make everyday student administration feel refreshingly straightforward.</p></div><div className="about-card"><div className="about-card-icon green"><Heart size={20}/></div><h3>People come first</h3><p>Good education starts with connection. Campusly helps keep student details clear and accessible.</p></div></div><section className="panel about-details"><div><span className="eyebrow">THE PLATFORM</span><h3>Everything starts with a connected campus.</h3><p>Use the dashboard to understand your student community, the directory to manage individual records, and this page to learn more about the platform.</p></div><div className="about-facts"><div><Users size={18}/><span><strong>Student directory</strong><small>Searchable student records</small></span></div><div><LayoutDashboard size={18}/><span><strong>At-a-glance dashboard</strong><small>Useful campus summaries</small></span></div><div><Globe2 size={18}/><span><strong>Built for the web</strong><small>Responsive on desktop and mobile</small></span></div></div></section></>
}
function NotFound() {
  const navigate=useNavigate()
  return <div className="not-found"><div className="not-found-art"><span>4</span><div className="lost-cap"><GraduationCap size={54}/></div><span>4</span></div><div className="eyebrow">ERROR 404 · PAGE NOT FOUND</div><h1>Looks like you've<br/>lost your way.</h1><p>The page you're looking for doesn't exist, may have moved, or the URL might be incorrect.</p><div className="not-found-actions"><button className="button button-primary" onClick={()=>navigate('/')}><ArrowLeft size={16}/> Back to dashboard</button><button className="button button-secondary" onClick={()=>navigate('/students')}>Browse students</button></div><span className="error-hint">If you typed the address, double-check the spelling.</span></div>
}

export default App
