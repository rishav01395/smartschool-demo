import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen,
  CalendarDays, Check, CheckCheck, ChevronDown, ChevronLeft, ChevronRight,
  CircleDollarSign, ClipboardCheck, Clock3, Download, Ellipsis, FileText, Filter,
  GraduationCap, House, IndianRupee, LayoutDashboard, Menu, MoreHorizontal,
  Pencil, Plus, Printer, Search, Settings, SlidersHorizontal, Sparkles, UserRound,
  Users, Wallet, X, Trash2, Eye, CalendarPlus, Megaphone, ShieldCheck, BookMarked,
} from 'lucide-react';

const NAV = [
  { group: 'OVERVIEW', items: [['Dashboard', LayoutDashboard], ['Students', GraduationCap], ['Teachers', Users], ['Attendance', ClipboardCheck]] },
  { group: 'ACADEMICS', items: [['Homework', BookOpen], ['Timetable', CalendarDays], ['Exams & results', FileText], ['Classes & sections', House]] },
  { group: 'SCHOOL', items: [['Fee management', Wallet], ['Notices', Megaphone], ['Events & holidays', CalendarPlus], ['Reports', Activity], ['Settings', Settings]] },
];
const today = new Date().toISOString().slice(0, 10);
const seed = {
  students: [
    { id: 1, name: 'Aarav Sharma', admission: 'BFPS-2401', className: 'Class 8', section: 'A', parent: 'Rohan Sharma', phone: '+91 98765 43210', email: 'rohan.sharma@email.com', status: 'Active', joined: '2024-04-08' },
    { id: 2, name: 'Ananya Patel', admission: 'BFPS-2402', className: 'Class 7', section: 'B', parent: 'Meera Patel', phone: '+91 98123 45670', email: 'meera.patel@email.com', status: 'Active', joined: '2024-04-08' },
    { id: 3, name: 'Vihaan Gupta', admission: 'BFPS-2403', className: 'Class 9', section: 'A', parent: 'Amit Gupta', phone: '+91 98901 23456', email: 'amit.gupta@email.com', status: 'Active', joined: '2024-04-09' },
    { id: 4, name: 'Saanvi Reddy', admission: 'BFPS-2404', className: 'Class 6', section: 'A', parent: 'Kiran Reddy', phone: '+91 98450 12345', email: 'kiran.reddy@email.com', status: 'Active', joined: '2024-04-10' },
    { id: 5, name: 'Arjun Mehta', admission: 'BFPS-2405', className: 'Class 8', section: 'B', parent: 'Nisha Mehta', phone: '+91 98200 56789', email: 'nisha.mehta@email.com', status: 'Active', joined: '2024-04-10' },
    { id: 6, name: 'Diya Nair', admission: 'BFPS-2406', className: 'Class 5', section: 'A', parent: 'Anil Nair', phone: '+91 99450 23456', email: 'anil.nair@email.com', status: 'Active', joined: '2024-04-11' },
    { id: 7, name: 'Kabir Singh', admission: 'BFPS-2407', className: 'Class 10', section: 'B', parent: 'Pooja Singh', phone: '+91 98111 22334', email: 'pooja.singh@email.com', status: 'Active', joined: '2024-04-12' },
    { id: 8, name: 'Myra Joshi', admission: 'BFPS-2408', className: 'Class 7', section: 'A', parent: 'Sonal Joshi', phone: '+91 98222 34567', email: 'sonal.joshi@email.com', status: 'Active', joined: '2024-04-12' },
    { id: 9, name: 'Reyansh Das', admission: 'BFPS-2409', className: 'Class 6', section: 'B', parent: 'Suman Das', phone: '+91 98333 45678', email: 'suman.das@email.com', status: 'Active', joined: '2024-04-15' },
  ],
  teachers: [
    { id: 1, name: 'Priya Menon', subject: 'Mathematics', classes: '6–8', phone: '+91 98470 12345', email: 'priya.menon@brightfuture.edu', status: 'Full-time' },
    { id: 2, name: 'Rahul Verma', subject: 'Science', classes: '8–10', phone: '+91 98710 23456', email: 'rahul.verma@brightfuture.edu', status: 'Full-time' },
    { id: 3, name: 'Sneha Kapoor', subject: 'English', classes: '5–7', phone: '+91 98100 34567', email: 'sneha.kapoor@brightfuture.edu', status: 'Full-time' },
    { id: 4, name: 'Vikram Rao', subject: 'Social Studies', classes: '6–9', phone: '+91 99000 45678', email: 'vikram.rao@brightfuture.edu', status: 'Full-time' },
    { id: 5, name: 'Aditi Kulkarni', subject: 'Computer Science', classes: '7–10', phone: '+91 98220 56789', email: 'aditi.k@brightfuture.edu', status: 'Part-time' },
  ],
  homework: [
    { id: 1, title: 'Fractions & Decimals — Practice Set 4', className: 'Class 8', subject: 'Mathematics', due: '2026-10-12', description: 'Complete questions 1–15 from your workbook, pages 42–44.' },
    { id: 2, title: 'The Solar System', className: 'Class 7', subject: 'Science', due: '2026-10-13', description: 'Create a labelled diagram of the solar system in your science journal.' },
    { id: 3, title: 'A Letter to My Future Self', className: 'Class 6', subject: 'English', due: '2026-10-15', description: 'Write a thoughtful letter of 250–300 words.' },
    { id: 4, title: 'Linear Equations Worksheet', className: 'Class 9', subject: 'Mathematics', due: '2026-10-16', description: 'Solve all problems and show your working clearly.' },
  ],
  notices: [
    { id: 1, title: 'Annual Sports Day — Save the Date', category: 'Event', priority: 'High', date: '2026-10-08', body: 'Our annual Sports Day will be held on 24 October. More details to follow.', published: true },
    { id: 2, title: 'Term 2 examination schedule', category: 'Academic', priority: 'Normal', date: '2026-10-06', body: 'The Term 2 examination schedule is now available for all classes.', published: true },
    { id: 3, title: 'Parent–teacher meetings', category: 'General', priority: 'Normal', date: '2026-10-03', body: 'Meetings are scheduled for Saturday, 17 October. Please book a slot with your class teacher.', published: true },
  ],
  events: [
    { id: 1, title: 'Parent–teacher meeting', date: '2026-10-17', type: 'School event', place: 'Classrooms' },
    { id: 2, title: 'Annual Sports Day', date: '2026-10-24', type: 'School event', place: 'School grounds' },
    { id: 3, title: 'Diwali break begins', date: '2026-11-08', type: 'Holiday', place: 'School closed' },
    { id: 4, title: 'Children’s Day celebration', date: '2026-11-14', type: 'Celebration', place: 'Main auditorium' },
  ],
  classes: [
    { id: 1, className: 'Class 5', sections: 2, students: 56, teacher: 'Sneha Kapoor' },
    { id: 2, className: 'Class 6', sections: 2, students: 62, teacher: 'Vikram Rao' },
    { id: 3, className: 'Class 7', sections: 2, students: 58, teacher: 'Sneha Kapoor' },
    { id: 4, className: 'Class 8', sections: 2, students: 64, teacher: 'Priya Menon' },
    { id: 5, className: 'Class 9', sections: 2, students: 61, teacher: 'Rahul Verma' },
    { id: 6, className: 'Class 10', sections: 2, students: 59, teacher: 'Aditi Kulkarni' },
  ],
  fees: [
    { id: 1, student: 'Aarav Sharma', admission: 'BFPS-2401', className: 'Class 8', total: 42000, paid: 42000 },
    { id: 2, student: 'Ananya Patel', admission: 'BFPS-2402', className: 'Class 7', total: 38000, paid: 20000 },
    { id: 3, student: 'Vihaan Gupta', admission: 'BFPS-2403', className: 'Class 9', total: 46000, paid: 46000 },
    { id: 4, student: 'Saanvi Reddy', admission: 'BFPS-2404', className: 'Class 6', total: 36000, paid: 12000 },
    { id: 5, student: 'Arjun Mehta', admission: 'BFPS-2405', className: 'Class 8', total: 42000, paid: 28000 },
    { id: 6, student: 'Diya Nair', admission: 'BFPS-2406', className: 'Class 5', total: 34000, paid: 34000 },
    { id: 7, student: 'Kabir Singh', admission: 'BFPS-2407', className: 'Class 10', total: 48000, paid: 24000 },
  ],
  attendance: {},
  marks: [
    { id: 1, student: 'Aarav Sharma', className: 'Class 8', exam: 'Mid-term 2026', subject: 'Mathematics', score: 88, outOf: 100 },
    { id: 2, student: 'Aarav Sharma', className: 'Class 8', exam: 'Mid-term 2026', subject: 'Science', score: 92, outOf: 100 },
    { id: 3, student: 'Ananya Patel', className: 'Class 7', exam: 'Mid-term 2026', subject: 'Mathematics', score: 94, outOf: 100 },
    { id: 4, student: 'Vihaan Gupta', className: 'Class 9', exam: 'Mid-term 2026', subject: 'Science', score: 81, outOf: 100 },
    { id: 5, student: 'Saanvi Reddy', className: 'Class 6', exam: 'Mid-term 2026', subject: 'English', score: 91, outOf: 100 },
  ],
  settings: { schoolName: 'Bright Future Public School', address: '24, Lake View Road, Bengaluru, Karnataka 560001', phone: '+91 80 4567 8900', session: '2026–2027', email: 'hello@brightfuture.edu' },
};

const readStore = () => {
  try {
    const saved = localStorage.getItem('smartschool-demo-v1');
    return saved ? { ...seed, ...JSON.parse(saved) } : seed;
  } catch {
    return seed;
  }
};
const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
const shortDate = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—';
const initials = (name = '') => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
const classOptions = ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

function App() {
  const [data, setData] = useState(readStore);
  const [page, setPage] = useState('Dashboard');
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [savedReceipt, setSavedReceipt] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => { localStorage.setItem('smartschool-demo-v1', JSON.stringify(data)); }, [data]);
  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (searchInputRef.current) searchInputRef.current.focus();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(timer);
  }, [toast]);
  const update = (key, value) => setData((previous) => ({ ...previous, [key]: value }));
  const notify = (message) => setToast(message);
  const openPage = (name) => { setPage(name); setMobileNav(false); setSearch(''); setSearchOpen(false); };
  const dashboardAttendance = useMemo(() => {
    const savedToday = Object.entries(data.attendance)
      .filter(([key]) => key.startsWith(`${today}|`))
      .flatMap(([, records]) => Object.values(records));
    if (savedToday.length) {
      return {
        present: savedToday.filter((status) => status === 'Present' || status === 'Late').length,
        total: savedToday.length,
      };
    }
    return { present: Math.round(data.students.length * 0.94), total: data.students.length };
  }, [data.attendance, data.students.length]);

  function resetDemo() {
    if (!window.confirm('Reset all local demo changes and restore the sample data?')) return;
    setData(seed);
    setSavedReceipt(null);
    setProfileOpen(false);
    notify('Demo data has been reset.');
  }

  const query = globalSearch.trim().toLowerCase();
  const searchMatches = query ? [
    ...data.students.filter((student) => `${student.name} ${student.admission} ${student.className}`.toLowerCase().includes(query)).slice(0, 4).map((student) => ({ id: `student-${student.id}`, name: student.name, detail: `${student.admission} · ${student.className}`, page: 'Students', search: student.name, type: 'Student' })),
    ...data.teachers.filter((teacher) => `${teacher.name} ${teacher.subject}`.toLowerCase().includes(query)).slice(0, 3).map((teacher) => ({ id: `teacher-${teacher.id}`, name: teacher.name, detail: `${teacher.subject} · Teacher`, page: 'Teachers', search: teacher.name, type: 'Teacher' })),
    ...NAV.flatMap((section) => section.items).filter(([name]) => name.toLowerCase().includes(query)).slice(0, 3).map(([name]) => ({ id: `page-${name}`, name, detail: 'Open school workspace', page: name, type: 'Page' })),
  ].slice(0, 7) : [];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark"><GraduationCap size={22} strokeWidth={2.1} /></div>
          <div className="brand-copy"><strong>smart<span>school</span></strong><small>School management</small></div>
          <button className="icon-button sidebar-close" aria-label="Close menu" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>
        <button className="school-switcher" onClick={() => openPage('Settings')}>
          <div className="school-emblem">BF</div>
          <div className="school-switch-copy"><strong>{data.settings.schoolName}</strong><span>Academic session {data.settings.session}</span></div>
          <ChevronDown size={15} />
        </button>
        <nav className="side-nav">
          {NAV.map((section) => (
            <div key={section.group} className="nav-section">
              <div className="nav-label">{section.group}</div>
              {section.items.map(([name, Icon]) => (
                <button key={name} className={`nav-item ${page === name ? 'active' : ''}`} onClick={() => openPage(name)}>
                  <Icon size={18} strokeWidth={1.9} /><span>{name}</span>
                  {name === 'Notices' && <span className="nav-count">{data.notices.length}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><Sparkles size={16} /></div><strong>Need a hand?</strong><p>Explore the demo and see how SmartSchool fits your school.</p><button onClick={() => notify('Your school success team will be in touch in this demo.')}>Explore guide <ArrowRight size={14} /></button></div>
          <div className="sidebar-footer"><span className="online-dot" /> All systems operational <span className="version-tag">v1.0</span></div>
        </div>
      </aside>
      {mobileNav && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}

      <main className="main-shell">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button menu-toggle" aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu size={20} /></button><div className="breadcrumb"><span>School workspace</span><ChevronRight size={14} /><strong>{page}</strong></div></div>
          <div className="topbar-actions">
            <div className="global-search">
              <Search size={16} /><input ref={searchInputRef} value={globalSearch} onChange={(event) => { setGlobalSearch(event.target.value); setSearchOpen(true); }} onFocus={() => setSearchOpen(true)} onKeyDown={(event) => { if (event.key === 'Escape') setSearchOpen(false); }} placeholder="Search anything..." />
              <kbd>⌘ K</kbd>
              {searchOpen && globalSearch && <div className="search-popover">{searchMatches.length ? searchMatches.map((match) => <button key={match.id} onClick={() => { openPage(match.page); if (match.search) setSearch(match.search); setGlobalSearch(''); }}><span className={match.type === 'Page' ? 'search-result-icon' : ''}>{match.type === 'Page' ? <Search size={14} /> : <Avatar name={match.name} size="small" />}</span><span><strong>{match.name}</strong><small>{match.detail}</small></span><ArrowRight size={14} /></button>) : <div className="search-empty">No matching records or pages found.</div>}</div>}
            </div>
            <span className="demo-pill"><span /> DEMO MODE</span>
            <div className="popover-wrap"><button className={`icon-button notification-button ${notificationsOpen ? 'is-open' : ''}`} aria-label="Notifications" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}><Bell size={18} /><i /></button>
              {notificationsOpen && <div className="popover notification-popover"><div className="popover-title"><div><strong>Notifications</strong><span>Recent school updates</span></div><button className="text-button" onClick={() => notify('All notifications marked as read.')}>Mark all read</button></div>
                <div className="notification-row"><span className="notify-icon blue"><CalendarDays size={16} /></span><span><strong>Sports Day is coming up</strong><small>Annual Sports Day · 24 Oct</small><em>2 hours ago</em></span></div>
                <div className="notification-row"><span className="notify-icon green"><IndianRupee size={16} /></span><span><strong>Fee collection update</strong><small>Collection is on track this month.</small><em>Yesterday</em></span></div>
                <div className="notification-foot">Demo notifications · No messages are sent externally</div></div>}
            </div>
            <div className="popover-wrap"><button className="profile-trigger" onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}><div className="profile-avatar">AD</div><span><strong>Admin</strong><small>School owner</small></span><ChevronDown size={14} /></button>
              {profileOpen && <div className="popover profile-popover"><div className="profile-popover-head"><div className="profile-avatar">AD</div><span><strong>School administrator</strong><small>admin@brightfuture.edu</small></span></div><button onClick={() => { openPage('Settings'); setProfileOpen(false); }}><Settings size={16} /> School settings</button><button className="reset-action" onClick={resetDemo}><ShieldCheck size={16} /> Reset demo data</button><div className="profile-foot">SmartSchool demo · 2026</div></div>}
            </div>
          </div>
        </header>
        <section className="content-area" onClick={() => { if (searchOpen && !globalSearch) setSearchOpen(false); }}>
          {page === 'Dashboard' && <Dashboard data={data} attendance={dashboardAttendance} onNavigate={openPage} />}
          {page === 'Students' && <Students data={data} update={update} search={search} setSearch={setSearch} notify={notify} setModal={setModal} />}
          {page === 'Teachers' && <Teachers data={data} update={update} search={search} setSearch={setSearch} notify={notify} setModal={setModal} />}
          {page === 'Attendance' && <Attendance data={data} update={update} notify={notify} />}
          {page === 'Homework' && <Homework data={data} update={update} notify={notify} setModal={setModal} />}
          {page === 'Timetable' && <Timetable data={data} />}
          {page === 'Exams & results' && <Exams data={data} update={update} notify={notify} setModal={setModal} />}
          {page === 'Fee management' && <Fees data={data} update={update} notify={notify} setModal={setModal} setReceipt={setSavedReceipt} />}
          {page === 'Notices' && <Notices data={data} update={update} notify={notify} setModal={setModal} />}
          {page === 'Events & holidays' && <Events data={data} update={update} notify={notify} setModal={setModal} />}
          {page === 'Classes & sections' && <Classes data={data} update={update} notify={notify} setModal={setModal} />}
          {page === 'Reports' && <Reports data={data} attendance={dashboardAttendance} />}
          {page === 'Settings' && <SettingsPage data={data} update={update} notify={notify} />}
        </section>
        <footer className="app-footer"><span>© 2026 SmartSchool</span><span>Built for better school days <span className="footer-heart">✦</span></span><span><span className="online-dot" /> Demo environment</span></footer>
      </main>

      {modal && <Modal config={modal} close={() => setModal(null)} save={(value) => { modal.onSave(value); setModal(null); }} />}
      {savedReceipt && <Receipt receipt={savedReceipt} onClose={() => setSavedReceipt(null)} school={data.settings.schoolName} />}
      {toast && <div className="toast"><span className="toast-check"><Check size={15} /></span>{toast}<button aria-label="Dismiss" onClick={() => setToast('')}><X size={15} /></button></div>}
    </div>
  );
}

export default App;

function Avatar({ name, size = '' }) {
  const colors = ['lavender', 'peach', 'mint', 'sky', 'rose', 'gold'];
  const color = colors[(name || '').length % colors.length];
  return <div className={`avatar ${color} ${size}`}>{initials(name)}</div>;
}
function PageHeader({ eyebrow, title, subtitle, action, icon: Icon }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{Icon && <Icon size={24} />} {title}</h1><p>{subtitle}</p></div>{action && <div className="heading-action">{action}</div>}</div>;
}
function Button({ children, variant = 'primary', icon: Icon, onClick, type = 'button', className = '', disabled = false }) {
  return <button type={type} disabled={disabled} className={`button button-${variant} ${className}`} onClick={onClick}>{Icon && <Icon size={16} />}{children}</button>;
}
function Card({ children, className = '', title, sub, action }) {
  return <section className={`card ${className}`}>{(title || action) && <div className="card-heading"><div>{title && <h3>{title}</h3>}{sub && <p>{sub}</p>}</div>{action}</div>}{children}</section>;
}
function StatusBadge({ children, tone }) {
  const label = children || '—';
  const className = tone || String(label).toLowerCase().replace(/[^a-z]/g, '');
  return <span className={`status-badge ${className}`}>{label}</span>;
}
function SearchBox({ value, onChange, placeholder = 'Search...' }) {
  return <label className="search-box"><Search size={16} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}
function Select({ value, onChange, options, label, className = '' }) {
  return <label className={`select-wrap ${className}`}>{label && <span>{label}</span>}<select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => typeof option === 'string' ? <option key={option}>{option}</option> : <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown size={14} /></label>;
}
function EmptyState({ title, text, action }) {
  return <div className="empty-state"><div className="empty-icon"><FileText size={22} /></div><strong>{title}</strong><p>{text}</p>{action}</div>;
}
function StatCard({ label, value, change, icon: Icon, tone = 'blue', note }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={19} /></span></div><div className="stat-value">{value}</div><div className="stat-bottom">{change && <span className="change-chip"><ArrowUpRight size={13} /> {change}</span>}<span>{note}</span></div></div>;
}
function Modal({ config, close, save }) {
  const [values, setValues] = useState(config.initial || {});
  const [error, setError] = useState('');
  const change = (key, value) => setValues((previous) => ({ ...previous, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    const required = (config.fields || []).filter((field) => field.required);
    const missing = required.find((field) => !String(values[field.name] ?? '').trim());
    if (missing) { setError(`${missing.label} is required.`); return; }
    if (config.validate) {
      const message = config.validate(values);
      if (message) { setError(message); return; }
    }
    setError('');
    save(values);
  };
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className="modal-card"><div className="modal-header"><div><span className="modal-kicker">{config.kicker || 'SCHOOL WORKSPACE'}</span><h2>{config.title}</h2><p>{config.description || 'Add the details below to keep your school records up to date.'}</p></div><button className="icon-button" onClick={close} aria-label="Close dialog"><X size={18} /></button></div>
    <form onSubmit={submit}><div className="modal-fields">{(config.fields || []).map((field) => <label key={field.name} className={`form-field ${field.full ? 'full' : ''}`}><span>{field.label}{field.required && <i> *</i>}</span>{field.type === 'textarea' ? <textarea value={values[field.name] || ''} placeholder={field.placeholder || ''} rows={field.rows || 3} onChange={(event) => change(field.name, event.target.value)} /> : field.type === 'select' ? <select value={values[field.name] || ''} onChange={(event) => change(field.name, event.target.value)}><option value="">Select {field.label.toLowerCase()}</option>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : <input type={field.type || 'text'} min={field.min} max={field.max} step={field.step} placeholder={field.placeholder || ''} value={values[field.name] ?? ''} onChange={(event) => change(field.name, event.target.value)} />}</label>)}</div>
      {error && <div className="form-error">{error}</div>}<div className="modal-actions"><button type="button" className="button button-ghost" onClick={close}>Cancel</button><Button type="submit" icon={Check}>{config.submitLabel || 'Save changes'}</Button></div></form></div></div>;
}

function Dashboard({ data, attendance, onNavigate }) {
  const [range, setRange] = useState('This week');
  const feesCollected = data.fees.reduce((sum, fee) => sum + fee.paid, 0);
  const pending = data.fees.reduce((sum, fee) => sum + fee.total - fee.paid, 0);
  const attendancePercent = Math.round(attendance.present / Math.max(attendance.total, 1) * 100);
  const week = [
    { day: 'Mon', value: 88 }, { day: 'Tue', value: 94 }, { day: 'Wed', value: 91 }, { day: 'Thu', value: 96 }, { day: 'Fri', value: attendancePercent }, { day: 'Sat', value: 72 }, { day: 'Sun', value: 12 },
  ];
  return <>
    <div className="welcome-banner">    <div className="welcome-copy"><span className="welcome-chip"><span className="online-dot" /> FRIDAY, OCTOBER 9, 2026</span><h2>Good morning, Admin <span>✦</span></h2><p>Here’s what’s happening at Bright Future Public School today.</p></div><div className="banner-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-cap"><GraduationCap size={42} /></div><span className="art-star star-one">✦</span><span className="art-star star-two">✧</span></div><div className="banner-date"><CalendarDays size={16} /> Academic year {data.settings.session}</div></div>
    <PageHeader eyebrow="YOUR SCHOOL AT A GLANCE" title="Dashboard" subtitle="A clear view of the things that matter, all in one place." action={<Button icon={ArrowDownRight} variant="secondary" onClick={() => onNavigate('Reports')}>View reports</Button>} />
    <div className="stat-grid">
      <StatCard label="Total students" value={data.students.length.toLocaleString()} change="+8.2%" note="vs. last term" icon={GraduationCap} />
      <StatCard label="Teaching staff" value={data.teachers.length.toLocaleString()} change="+2 this year" note="across all grades" icon={Users} tone="purple" />
      <StatCard label="Classes & sections" value={`${data.classes.length} / ${data.classes.reduce((sum, item) => sum + Number(item.sections || 0), 0)}`} note="active this session" icon={BookOpen} tone="orange" />
      <StatCard label="Attendance today" value={`${attendancePercent}%`} change={`${attendance.present} present`} note={`${attendance.total} students marked`} icon={ClipboardCheck} tone="green" />
      <StatCard label="Fees collected" value={money(feesCollected)} change="This term" note={`${money(pending)} pending`} icon={CircleDollarSign} tone="cyan" />
    </div>
    <div className="dashboard-grid">
      <Card className="attendance-chart-card" title="Attendance overview" sub="Daily attendance trend" action={<Select value={range} onChange={setRange} options={['This week', 'Last week', 'This month']} />}>
        <div className="chart-legend"><span><i className="legend-dot indigo" /> Present</span><span><i className="legend-dot pale" /> Target 90%</span><span className="chart-summary"><strong>{attendancePercent}%</strong> today</span></div>
        <div className="attendance-chart"><div className="y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-plot"><div className="chart-gridline line-100" /><div className="chart-gridline line-75" /><div className="chart-gridline line-50" /><div className="chart-gridline line-25" /><div className="target-line"><span>90%</span></div><div className="bars">{week.map((entry, index) => <div className="bar-column" key={entry.day}><div className={`bar-track ${index === 4 ? 'current-day' : ''}`}><div className="bar-fill" style={{ height: `${entry.value}%` }} title={`${entry.value}%`} /></div><span>{entry.day}</span></div>)}</div></div></div>
      </Card>
      <Card className="fee-chart-card" title="Fee collection" sub="Collection against term fees" action={<button className="more-button" onClick={() => onNavigate('Fee management')}><Ellipsis size={18} /></button>}>
        <div className="fee-donut-wrap"><div className="donut" style={{ '--progress': `${Math.min(Math.round(feesCollected / Math.max(feesCollected + pending, 1) * 100), 100)}%` }}><div><strong>{Math.round(feesCollected / Math.max(feesCollected + pending, 1) * 100)}%</strong><span>collected</span></div></div><div className="donut-details"><div><span><i className="legend-dot indigo" /> Collected</span><strong>{money(feesCollected)}</strong></div><div><span><i className="legend-dot pale" /> Pending</span><strong>{money(pending)}</strong></div><button onClick={() => onNavigate('Fee management')}>View fee records <ArrowRight size={14} /></button></div></div>
        <div className="fee-chart-foot"><span>Term 2 · 2026</span><span className="mini-trend"><ArrowUpRight size={13} /> 12.4% from last month</span></div>
      </Card>
    </div>
    <div className="dashboard-grid lower-grid">
      <Card title="Recent notices" sub="The latest from your school" action={<button className="text-button" onClick={() => onNavigate('Notices')}>All notices <ArrowRight size={14} /></button>}>
        <div className="notice-list">{data.notices.slice(0, 3).map((notice) => <div className="notice-row" key={notice.id}><div className={`notice-icon ${notice.priority === 'High' ? 'notice-hot' : ''}`}><Megaphone size={17} /></div><div className="notice-body"><div><strong>{notice.title}</strong><StatusBadge>{notice.priority}</StatusBadge></div><span>{notice.category} <i>·</i> {shortDate(notice.date)}</span></div><ChevronRight size={16} className="muted-chevron" /></div>)}</div>
      </Card>
      <Card title="Upcoming events" sub="Coming up at Bright Future" action={<button className="text-button" onClick={() => onNavigate('Events & holidays')}>School calendar <ArrowRight size={14} /></button>}>
        <div className="event-list">{data.events.slice(0, 3).map((event) => <div className="event-row" key={event.id}><div className="event-date"><strong>{new Date(`${event.date}T00:00:00`).getDate()}</strong><span>{new Date(`${event.date}T00:00:00`).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()}</span></div><div><strong>{event.title}</strong><span><Clock3 size={13} /> {event.place} <i>·</i> {event.type}</span></div><ChevronRight size={16} className="muted-chevron" /></div>)}</div>
      </Card>
    </div>
    <div className="bottom-dashboard-grid">
      <Card title="Recent activity" sub="A little school admin, at a glance"><div className="activity-list">
        <ActivityItem icon={UserRound} tone="blue" title="New student enrolled" text="Mira Thomas · Class 6A" time="Today, 9:42 am" />
        <ActivityItem icon={IndianRupee} tone="green" title="Fee payment recorded" text="Aarav Sharma · Term 2" time="Today, 9:15 am" />
        <ActivityItem icon={ClipboardCheck} tone="purple" title="Attendance submitted" text="Class 8 · Priya Menon" time="Today, 8:30 am" />
      </div></Card>
      <Card className="quick-actions-card" title="Quick actions" sub="Get the little things done faster"><div className="quick-actions">
        {[[Plus, 'Add student', 'Students'], [ClipboardCheck, 'Take attendance', 'Attendance'], [IndianRupee, 'Record a fee', 'Fee management'], [Megaphone, 'Post a notice', 'Notices']].map(([Icon, title, target]) => <button key={title} onClick={() => onNavigate(target)}><span><Icon size={17} /></span><strong>{title}</strong><ArrowUpRight size={15} /></button>)}
      </div></Card>
    </div>
  </>;
}
function ActivityItem({ icon: Icon, tone, title, text, time }) {
  return <div className="activity-item"><div className={`activity-icon ${tone}`}><Icon size={15} /></div><div><strong>{title}</strong><span>{text}</span></div><time>{time}</time></div>;
}

function Students({ data, update, search, setSearch, notify, setModal }) {
  const [classFilter, setClassFilter] = useState('All classes');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [sort, setSort] = useState('Name A–Z');
  const [pageNo, setPageNo] = useState(1);
  const [profile, setProfile] = useState(null);
  const pageSize = 7;
  let list = data.students.filter((student) => {
    const query = search.toLowerCase();
    return (!query || `${student.name} ${student.admission} ${student.parent} ${student.phone}`.toLowerCase().includes(query))
      && (classFilter === 'All classes' || student.className === classFilter)
      && (statusFilter === 'All statuses' || student.status === statusFilter);
  });
  list = [...list].sort((a, b) => sort === 'Name Z–A' ? b.name.localeCompare(a.name) : sort === 'Newest' ? b.id - a.id : a.name.localeCompare(b.name));
  const pages = Math.max(1, Math.ceil(list.length / pageSize));
  const current = list.slice((pageNo - 1) * pageSize, pageNo * pageSize);
  const form = (student) => setModal({
    title: student ? 'Edit student details' : 'Add a new student', kicker: 'STUDENT RECORD',
    initial: student || { name: '', admission: `BFPS-${2400 + data.students.length + 1}`, className: 'Class 5', section: 'A', parent: '', phone: '', email: '', status: 'Active', joined: today },
    fields: [{ name: 'name', label: 'Student full name', required: true, placeholder: 'e.g. Aanya Kapoor' }, { name: 'admission', label: 'Admission number', required: true }, { name: 'className', label: 'Class', type: 'select', options: classOptions, required: true }, { name: 'section', label: 'Section', type: 'select', options: ['A', 'B', 'C'], required: true }, { name: 'parent', label: 'Parent / guardian', required: true }, { name: 'phone', label: 'Parent contact', required: true, placeholder: '+91 98765 43210' }, { name: 'email', label: 'Email address', type: 'email' }, { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }],
    validate: (values) => !/^\+?[\d\s-]{8,}$/.test(values.phone) ? 'Enter a valid parent contact number.' : '',
    onSave: (values) => { update('students', student ? data.students.map((item) => item.id === student.id ? { ...item, ...values } : item) : [{ ...values, id: Date.now(), joined: today }, ...data.students]); notify(student ? 'Student record updated.' : 'Student added successfully.'); },
  });
  return <>
    <PageHeader eyebrow="PEOPLE & RECORDS" title="Students" subtitle="Manage student profiles, enrollment and family contacts." action={<Button icon={Plus} onClick={() => form(null)}>Add student</Button>} />
    <div className="mini-stats"><span><strong>{data.students.length}</strong> students enrolled</span><span><i className="online-dot" /> <strong>{data.students.filter((s) => s.status === 'Active').length}</strong> active students</span><span className="mini-stat-right">Academic year {data.settings.session}</span></div>
    <Card className="table-card"><div className="table-toolbar"><SearchBox value={search} onChange={(value) => { setSearch(value); setPageNo(1); }} placeholder="Search name, admission no. or parent..." /><Select value={classFilter} onChange={setClassFilter} options={['All classes', ...classOptions]} /><Select value={statusFilter} onChange={setStatusFilter} options={['All statuses', 'Active', 'Inactive']} /><Select value={sort} onChange={setSort} options={['Name A–Z', 'Name Z–A', 'Newest']} /><button className="toolbar-filter" onClick={() => { setClassFilter('All classes'); setStatusFilter('All statuses'); setSearch(''); }}><SlidersHorizontal size={15} /> Reset</button></div>
      {current.length ? <><div className="table-scroll"><table><thead><tr><th>STUDENT</th><th>ADMISSION NO.</th><th>CLASS</th><th>PARENT / GUARDIAN</th><th>CONTACT</th><th>STATUS</th><th></th></tr></thead><tbody>{current.map((student) => <tr key={student.id}><td><button className="person-cell" onClick={() => setProfile(student)}><Avatar name={student.name} /><span><strong>{student.name}</strong><small>Joined {shortDate(student.joined)}</small></span></button></td><td><span className="mono-text">{student.admission}</span></td><td><span className="class-tag">{student.className} · {student.section}</span></td><td>{student.parent}</td><td><span className="contact-text">{student.phone}</span></td><td><StatusBadge>{student.status}</StatusBadge></td><td><div className="row-actions"><button title="View profile" onClick={() => setProfile(student)}><Eye size={15} /></button><button title="Edit student" onClick={() => form(student)}><Pencil size={15} /></button></div></td></tr>)}</tbody></table></div><Pagination count={list.length} page={pageNo} pages={pages} setPage={setPageNo} pageSize={pageSize} /></> : <EmptyState title="No students found" text="Try a different search or add a new student record." action={<Button icon={Plus} onClick={() => form(null)}>Add student</Button>} />}
    </Card>
    {profile && <StudentProfile student={profile} onClose={() => setProfile(null)} fees={data.fees.find((fee) => fee.admission === profile.admission)} />}
  </>;
}
function Pagination({ count, page, pages, setPage, pageSize }) {
  return <div className="pagination"><span>Showing <strong>{count ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, count)}</strong> of <strong>{count}</strong> records</span><div><button disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Previous page"><ChevronLeft size={16} /></button><span>Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage(page + 1)} aria-label="Next page"><ChevronRight size={16} /></button></div></div>;
}
function StudentProfile({ student, onClose, fees }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="profile-drawer"><div className="drawer-top"><span>STUDENT PROFILE</span><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="student-profile-head"><Avatar name={student.name} /><div><h2>{student.name}</h2><span>{student.admission} · {student.className} {student.section}</span><StatusBadge>{student.status}</StatusBadge></div></div><div className="profile-section"><h3>Student information</h3><InfoRow label="Admission date" value={shortDate(student.joined)} /><InfoRow label="Class & section" value={`${student.className} · ${student.section}`} /><InfoRow label="Academic session" value="2026–2027" /></div><div className="profile-section"><h3>Parent / guardian</h3><InfoRow label="Name" value={student.parent} /><InfoRow label="Phone" value={student.phone} /><InfoRow label="Email" value={student.email || 'Not provided'} /></div><div className="profile-section"><h3>Fee overview</h3><InfoRow label="Total fee" value={fees ? money(fees.total) : 'No fee record'} /><InfoRow label="Paid this term" value={fees ? money(fees.paid) : '—'} /><InfoRow label="Balance" value={fees ? money(fees.total - fees.paid) : '—'} /></div></div></div>;
}
function InfoRow({ label, value }) { return <div className="info-row"><span>{label}</span><strong>{value}</strong></div>; }

function Teachers({ data, update, search, setSearch, notify, setModal }) {
  const [subject, setSubject] = useState('All subjects');
  const list = data.teachers.filter((teacher) => (!search || `${teacher.name} ${teacher.subject} ${teacher.email}`.toLowerCase().includes(search.toLowerCase())) && (subject === 'All subjects' || teacher.subject === subject));
  const form = (teacher) => setModal({
    title: teacher ? 'Edit teacher profile' : 'Add a teacher', kicker: 'STAFF DIRECTORY',
    initial: teacher || { name: '', subject: 'Mathematics', classes: '', phone: '', email: '', status: 'Full-time' },
    fields: [{ name: 'name', label: 'Teacher full name', required: true }, { name: 'subject', label: 'Primary subject', type: 'select', options: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science', 'Art', 'Physical Education'], required: true }, { name: 'classes', label: 'Classes taught', required: true, placeholder: 'e.g. 6–8' }, { name: 'phone', label: 'Phone number', required: true }, { name: 'email', label: 'Email address', type: 'email', required: true }, { name: 'status', label: 'Employment type', type: 'select', options: ['Full-time', 'Part-time'] }],
    onSave: (values) => { update('teachers', teacher ? data.teachers.map((item) => item.id === teacher.id ? { ...item, ...values } : item) : [{ ...values, id: Date.now() }, ...data.teachers]); notify(teacher ? 'Teacher profile updated.' : 'Teacher added to the directory.'); },
  });
  return <>
    <PageHeader eyebrow="PEOPLE & RECORDS" title="Teachers" subtitle="Your school’s teaching team, all in one place." action={<Button icon={Plus} onClick={() => form(null)}>Add teacher</Button>} />
    <div className="stat-grid compact-stats"><StatCard label="Teaching staff" value={data.teachers.length} note="across all subjects" icon={Users} /><StatCard label="Subjects covered" value={new Set(data.teachers.map((t) => t.subject)).size} note="core curriculum" icon={BookOpen} tone="purple" /><StatCard label="Full-time staff" value={data.teachers.filter((t) => t.status === 'Full-time').length} note="active this year" icon={ShieldCheck} tone="green" /></div>
    <Card className="table-card"><div className="table-toolbar"><SearchBox value={search} onChange={setSearch} placeholder="Search teachers..." /><Select value={subject} onChange={setSubject} options={['All subjects', ...new Set(data.teachers.map((teacher) => teacher.subject))]} /><span className="toolbar-spacer" /><span className="toolbar-result">{list.length} teachers</span></div>
      {list.length ? <div className="table-scroll"><table><thead><tr><th>TEACHER</th><th>SUBJECT</th><th>CLASSES</th><th>CONTACT</th><th>EMAIL</th><th>TYPE</th><th></th></tr></thead><tbody>{list.map((teacher) => <tr key={teacher.id}><td><div className="person-cell"><Avatar name={teacher.name} /><span><strong>{teacher.name}</strong><small>Faculty member</small></span></div></td><td><span className="subject-label"><i />{teacher.subject}</span></td><td>{teacher.classes}</td><td><span className="contact-text">{teacher.phone}</span></td><td><span className="contact-text">{teacher.email}</span></td><td><StatusBadge>{teacher.status}</StatusBadge></td><td><div className="row-actions"><button title="Edit teacher" onClick={() => form(teacher)}><Pencil size={15} /></button></div></td></tr>)}</tbody></table></div> : <EmptyState title="No teachers found" text="Try another subject or add a teacher to your directory." action={<Button icon={Plus} onClick={() => form(null)}>Add teacher</Button>} />}
    </Card>
    <div className="tip-banner"><Sparkles size={17} /><span><strong>A great school starts with a great team.</strong> Keep staff contact details and class assignments up to date.</span></div>
  </>;
}

function Attendance({ data, update, notify }) {
  const [className, setClassName] = useState('Class 8');
  const [section, setSection] = useState('A');
  const [date, setDate] = useState(today);
  const students = data.students.filter((student) => student.className === className && student.section === section);
  const key = `${date}|${className}|${section}`;
  const savedStatuses = data.attendance[key] || {};
  const [statuses, setStatuses] = useState(savedStatuses);
  useEffect(() => setStatuses(data.attendance[`${date}|${className}|${section}`] || {}), [data.attendance, date, className, section]);
  const setStatus = (id, status) => setStatuses((previous) => ({ ...previous, [id]: status }));
  const tally = ['Present', 'Absent', 'Late'].reduce((result, status) => ({ ...result, [status]: Object.values(statuses).filter((value) => value === status).length }), {});
  const marked = tally.Present + tally.Absent + tally.Late;
  const presentRate = students.length ? Math.round(tally.Present / students.length * 100) : 0;
  return <>
    <PageHeader eyebrow="DAILY CLASSROOM ROUTINE" title="Attendance" subtitle="Take a quick register and keep your class records up to date." action={<span className="demo-note"><ShieldCheck size={15} /> Local demo records</span>} />
    <div className="attendance-controls card"><div className="control-selects"><Select label="CLASS" value={className} onChange={setClassName} options={classOptions} /><Select label="SECTION" value={section} onChange={setSection} options={['A', 'B', 'C']} /><label className="select-wrap"><span>DATE</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label></div><div className="attendance-control-actions"><Button variant="secondary" icon={CheckCheck} onClick={() => setStatuses(Object.fromEntries(students.map((student) => [student.id, 'Present'])))}>Mark all present</Button><Button icon={Check} onClick={() => { update('attendance', { ...data.attendance, [key]: statuses }); notify(`Attendance saved for ${className} ${section}.`); }}>Save attendance</Button></div></div>
    <div className="attendance-summary-grid"><StatCard label="Class strength" value={students.length} note={`${className} · Section ${section}`} icon={Users} /><StatCard label="Present" value={tally.Present} note="students checked in" icon={Check} tone="green" /><StatCard label="Absent" value={tally.Absent} note="students not present" icon={X} tone="orange" /><StatCard label="Attendance rate" value={`${presentRate}%`} note={`${marked} of ${students.length} marked`} icon={ClipboardCheck} tone="purple" /></div>
    <Card className="table-card attendance-table-card" title="Class register" sub={`${className} · Section ${section} · ${new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`} action={<span className="register-progress">{marked}/{students.length} marked</span>}>
      {students.length ? <div className="table-scroll"><table><thead><tr><th>STUDENT</th><th>ADMISSION NO.</th><th>MARK ATTENDANCE</th></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td><div className="person-cell"><Avatar name={student.name} /><span><strong>{student.name}</strong><small>{student.parent}</small></span></div></td><td><span className="mono-text">{student.admission}</span></td><td><div className="attendance-toggle">{['Present', 'Absent', 'Late'].map((status) => <button key={status} className={`${status.toLowerCase()} ${statuses[student.id] === status ? 'selected' : ''}`} onClick={() => setStatus(student.id, status)}>{status === 'Present' ? <Check size={13} /> : status === 'Absent' ? <X size={13} /> : <Clock3 size={13} />}{status}</button>)}</div></td></tr>)}</tbody></table></div> : <EmptyState title="No students in this section" text="Choose another class or section, or add students to this class." />}
      {students.length > 0 && <div className="attendance-foot"><span><i className="legend-dot green-dot" /> Present <strong>{tally.Present}</strong></span><span><i className="legend-dot orange-dot" /> Absent <strong>{tally.Absent}</strong></span><span><i className="legend-dot blue-dot" /> Late <strong>{tally.Late}</strong></span><span className="attendance-hint">{students.length - marked} not marked yet</span></div>}
    </Card>
  </>;
}

function Homework({ data, update, notify, setModal }) {
  const [classFilter, setClassFilter] = useState('All classes');
  const [subject, setSubject] = useState('All subjects');
  const [search, setSearch] = useState('');
  const list = data.homework.filter((item) => (classFilter === 'All classes' || item.className === classFilter) && (subject === 'All subjects' || item.subject === subject) && (!search || `${item.title} ${item.subject}`.toLowerCase().includes(search.toLowerCase())));
  const add = () => setModal({ title: 'Create homework', kicker: 'ACADEMIC PLANNER', initial: { title: '', className: 'Class 8', subject: 'Mathematics', due: '', description: '' }, fields: [{ name: 'title', label: 'Homework title', required: true, full: true }, { name: 'className', label: 'Class', type: 'select', options: classOptions, required: true }, { name: 'subject', label: 'Subject', type: 'select', options: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'], required: true }, { name: 'due', label: 'Due date', type: 'date', required: true }, { name: 'description', label: 'Instructions', type: 'textarea', full: true, required: true }], onSave: (values) => { update('homework', [{ ...values, id: Date.now() }, ...data.homework]); notify('Homework added to the class planner.'); } });
  return <>
    <PageHeader eyebrow="ACADEMIC PLANNER" title="Homework" subtitle="Keep assignments clear, organized and easy to follow." action={<Button icon={Plus} onClick={add}>Create homework</Button>} />
    <div className="homework-summary"><div><div className="homework-summary-icon"><BookOpen size={19} /></div><div><span>ACTIVE ASSIGNMENTS</span><strong>{data.homework.length}</strong></div></div><div><div className="homework-summary-icon due"><Clock3 size={19} /></div><div><span>DUE THIS WEEK</span><strong>{data.homework.filter((item) => item.due <= '2026-10-16').length}</strong></div></div><div className="homework-summary-message"><Sparkles size={17} /> Learning, one assignment at a time.</div></div>
    <div className="toolbar standalone-toolbar"><SearchBox value={search} onChange={setSearch} placeholder="Find an assignment..." /><Select value={classFilter} onChange={setClassFilter} options={['All classes', ...classOptions]} /><Select value={subject} onChange={setSubject} options={['All subjects', ...new Set(data.homework.map((item) => item.subject))]} /></div>
    {list.length ? <div className="homework-grid">{list.map((item, index) => <article className="homework-card card" key={item.id}><div className="homework-card-top"><span className={`subject-icon subject-${index % 4}`}><BookOpen size={18} /></span><button className="more-button" onClick={() => setModal({ title: 'Edit homework', kicker: 'ACADEMIC PLANNER', initial: item, fields: [{ name: 'title', label: 'Homework title', required: true }, { name: 'className', label: 'Class', type: 'select', options: classOptions, required: true }, { name: 'subject', label: 'Subject', type: 'select', options: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'], required: true }, { name: 'due', label: 'Due date', type: 'date', required: true }, { name: 'description', label: 'Instructions', type: 'textarea', full: true, required: true }], onSave: (values) => { update('homework', data.homework.map((hw) => hw.id === item.id ? { ...hw, ...values } : hw)); notify('Homework updated.'); } })}><Ellipsis size={18} /></button></div><span className="homework-subject">{item.subject} <i>·</i> {item.className}</span><h3>{item.title}</h3><p>{item.description}</p><div className="homework-card-foot"><span><CalendarDays size={14} /> Due {shortDate(item.due)}</span><StatusBadge tone={item.due < today ? 'absent' : 'active'}>{item.due < today ? 'Past due' : 'Assigned'}</StatusBadge></div></article>)}</div> : <Card><EmptyState title="No homework matches" text="Try changing your filters, or create a new assignment." action={<Button icon={Plus} onClick={add}>Create homework</Button>} /></Card>}
  </>;
}

const timetableSlots = ['08:30 – 09:15', '09:15 – 10:00', '10:15 – 11:00', '11:00 – 11:45', '12:30 – 01:15', '01:15 – 02:00'];
const timetableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timetableSubjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Computer Science', 'Physical Education', 'Art', 'Library'];
function Timetable({ data }) {
  const [className, setClassName] = useState('Class 8');
  const schedule = useMemo(() => timetableDays.map((day, dayIndex) => timetableSlots.map((slot, slotIndex) => {
    const subjects = timetableSubjects;
    const subject = subjects[(dayIndex * 2 + slotIndex * 3 + className.charAt(className.length - 1)) % subjects.length];
    const teacher = data.teachers.find((item) => item.subject === subject)?.name || data.teachers[(dayIndex + slotIndex) % data.teachers.length]?.name || 'Staff';
    return { day, slot, subject, teacher, break: slotIndex === 3 };
  })), [className, data.teachers]);
  return <>
    <PageHeader eyebrow="ACADEMIC PLANNER" title="Timetable" subtitle="A balanced week for curious minds and busy classrooms." action={<Button variant="secondary" icon={Printer} onClick={() => window.print()}>Print timetable</Button>} />
    <div className="timetable-top"><div className="class-pills">{classOptions.map((item) => <button className={className === item ? 'selected' : ''} key={item} onClick={() => setClassName(item)}>{item.replace('Class ', 'Class ')}</button>)}</div><span><span className="online-dot" /> Section A · Academic session {data.settings.session}</span></div>
    <Card className="timetable-card"><div className="timetable-scroll"><table className="timetable-table"><thead><tr><th>TIME</th>{timetableDays.map((day) => <th key={day}>{day.toUpperCase()}</th>)}</tr></thead><tbody>{timetableSlots.map((slot, index) => <tr key={slot}><th><strong>{slot.split(' – ')[0]}</strong><span>{slot.split(' – ')[1]}</span></th>{timetableDays.map((day, dayIndex) => { const cell = schedule[dayIndex][index]; return <td key={`${day}-${slot}`}>{index === 3 ? <div className="break-cell"><span>BREAK</span><small>Refresh & recharge</small></div> : <div className={`subject-block subject-bg-${(dayIndex + index) % 5}`}><strong>{cell.subject}</strong><span>{cell.teacher}</span></div>}</td>; })}</tr>)}</tbody></table></div><div className="timetable-foot"><span><Clock3 size={14} /> Morning assembly: 8:15 – 8:30 AM</span><span>Lunch break: 11:45 AM – 12:30 PM</span></div></Card>
    <div className="tip-banner"><BookMarked size={17} /><span><strong>Teacher assignments are for demo purposes.</strong> Use the class selector to see the timetable for each grade.</span></div>
  </>;
}

function Exams({ data, update, notify, setModal }) {
  const [selected, setSelected] = useState('Mid-term 2026');
  const [className, setClassName] = useState('All classes');
  const [student, setStudent] = useState(null);
  const exams = [...new Set(data.marks.map((mark) => mark.exam))];
  const list = data.marks.filter((mark) => mark.exam === selected && (className === 'All classes' || mark.className === className));
  const people = [...new Set(list.map((mark) => mark.student))];
  const addMarks = () => setModal({ title: 'Add examination marks', kicker: 'EXAM RESULTS', initial: { student: data.students[0]?.name || '', className: data.students[0]?.className || 'Class 5', exam: selected, subject: 'Mathematics', score: '', outOf: 100 }, fields: [{ name: 'student', label: 'Student', type: 'select', options: data.students.map((item) => item.name), required: true }, { name: 'className', label: 'Class', type: 'select', options: classOptions, required: true }, { name: 'exam', label: 'Examination', required: true }, { name: 'subject', label: 'Subject', type: 'select', options: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'], required: true }, { name: 'score', label: 'Marks scored', type: 'number', min: 0, required: true }, { name: 'outOf', label: 'Maximum marks', type: 'number', min: 1, required: true }], validate: (values) => Number(values.score) > Number(values.outOf) ? 'Marks scored cannot exceed the maximum marks.' : '', onSave: (values) => { update('marks', [...data.marks, { ...values, id: Date.now(), score: Number(values.score), outOf: Number(values.outOf) }]); notify('Examination marks saved.'); } });
  return <>
    <PageHeader eyebrow="ASSESSMENT & PROGRESS" title="Exams & results" subtitle="A thoughtful view of student performance, one result at a time." action={<Button icon={Plus} onClick={addMarks}>Add marks</Button>} />
    <div className="exam-tabs">{['Mid-term 2026', 'Unit Test 1', 'Final examination'].map((exam) => <button key={exam} className={selected === exam ? 'active' : ''} onClick={() => setSelected(exam)}>{exam}</button>)}<div className="exam-tab-rule" /></div>
    <div className="exam-summary-row"><div><span className="exam-summary-icon"><FileText size={17} /></span><span><strong>{people.length}</strong><small>Students with marks</small></span></div><div><span className="exam-summary-icon purple"><BookOpen size={17} /></span><span><strong>{new Set(list.map((mark) => mark.subject)).size}</strong><small>Subjects recorded</small></span></div><div className="exam-summary-end"><Select value={className} onChange={setClassName} options={['All classes', ...classOptions]} /></div></div>
    <Card className="table-card" title="Subject-wise marks" sub={`${selected} · Individual subject scores`}><div className="table-scroll"><table><thead><tr><th>STUDENT</th><th>CLASS</th><th>SUBJECT</th><th>MARKS SCORED</th><th>GRADE</th><th></th></tr></thead><tbody>{list.map((mark) => <tr key={mark.id}><td><button className="person-cell" onClick={() => setStudent(mark.student)}><Avatar name={mark.student} /><span><strong>{mark.student}</strong><small>View overall result</small></span></button></td><td>{mark.className}</td><td><span className="subject-label"><i />{mark.subject}</span></td><td><strong>{mark.score}</strong><span className="marks-denom"> / {mark.outOf}</span><div className="marks-progress"><span style={{ width: `${mark.score / mark.outOf * 100}%` }} /></div></td><td><Grade score={mark.score / mark.outOf * 100} /></td><td><button className="table-icon-button" title="Edit marks" onClick={() => setModal({ title: 'Edit examination marks', kicker: 'EXAM RESULTS', initial: mark, fields: [{ name: 'score', label: 'Marks scored', type: 'number', min: 0, required: true }, { name: 'outOf', label: 'Maximum marks', type: 'number', min: 1, required: true }], validate: (values) => Number(values.score) > Number(values.outOf) ? 'Marks scored cannot exceed the maximum marks.' : '', onSave: (values) => { update('marks', data.marks.map((item) => item.id === mark.id ? { ...item, score: Number(values.score), outOf: Number(values.outOf) } : item)); notify('Marks updated.'); } })}><Pencil size={15} /></button></td></tr>)}</tbody></table></div>{!list.length && <EmptyState title="No marks recorded yet" text="Add subject marks to start building student result records." action={<Button icon={Plus} onClick={addMarks}>Add marks</Button>} />}</Card>
    {student && <StudentResult student={student} marks={data.marks.filter((mark) => mark.student === student && mark.exam === selected)} exam={selected} onClose={() => setStudent(null)} />}
  </>;
}
function Grade({ score }) { const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : score >= 50 ? 'C' : 'Needs support'; return <span className={`grade-badge ${score >= 80 ? 'grade-excellent' : score >= 60 ? 'grade-good' : 'grade-low'}`}>{grade}</span>; }
function StudentResult({ student, marks, exam, onClose }) {
  const total = marks.reduce((sum, mark) => sum + Number(mark.score), 0);
  const outOf = marks.reduce((sum, mark) => sum + Number(mark.outOf), 0);
  const percent = outOf ? Math.round(total / outOf * 100) : 0;
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="result-card"><div className="drawer-top"><span>STUDENT RESULT</span><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="result-person"><Avatar name={student} /><span><h2>{student}</h2><small>{exam} · Academic session 2026–27</small></span></div><div className="result-score"><div><span>OVERALL RESULT</span><strong>{percent}%</strong><Grade score={percent} /></div><div><span>TOTAL MARKS</span><strong>{total}<small> / {outOf}</small></strong></div></div><div className="result-subjects"><h3>Subject breakdown</h3>{marks.length ? marks.map((mark) => <div key={mark.id}><span>{mark.subject}</span><strong>{mark.score} / {mark.outOf}</strong><Grade score={mark.score / mark.outOf * 100} /></div>) : <p>No subject marks are available for this student yet.</p>}</div><div className="result-disclaimer"><ShieldCheck size={15} /> Sample results for demonstration only.</div></div></div>;
}

function Fees({ data, update, notify, setModal, setReceipt }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All statuses');
  const total = data.fees.reduce((sum, fee) => sum + fee.total, 0);
  const paid = data.fees.reduce((sum, fee) => sum + fee.paid, 0);
  const outstanding = total - paid;
  const list = data.fees.filter((fee) => { const status = fee.paid >= fee.total ? 'Paid' : fee.paid > 0 ? 'Partial' : 'Pending'; return (!search || `${fee.student} ${fee.admission} ${fee.className}`.toLowerCase().includes(search.toLowerCase())) && (filter === 'All statuses' || status === filter); });
  const record = (fee) => setModal({ title: 'Record a fee payment', kicker: 'DEMO PAYMENT RECORD', description: `Record a payment for ${fee.student}. This does not process a real payment.`, initial: { amount: Math.max(fee.total - fee.paid, 0), method: 'Bank transfer', date: today, reference: '' }, fields: [{ name: 'amount', label: 'Amount received (₹)', type: 'number', min: 1, required: true }, { name: 'method', label: 'Payment method', type: 'select', options: ['Cash', 'Bank transfer', 'UPI', 'Cheque'], required: true }, { name: 'date', label: 'Payment date', type: 'date', required: true }, { name: 'reference', label: 'Reference / note', placeholder: 'Optional reference number' }], validate: (values) => Number(values.amount) <= 0 ? 'Enter an amount greater than zero.' : Number(values.amount) > fee.total - fee.paid ? `The remaining balance is ${money(fee.total - fee.paid)}.` : '', onSave: (values) => { const amount = Number(values.amount); const updated = { ...fee, paid: fee.paid + amount }; update('fees', data.fees.map((item) => item.id === fee.id ? updated : item)); setReceipt({ ...values, amount, student: fee.student, admission: fee.admission, className: fee.className, remaining: Math.max(fee.total - updated.paid, 0), receiptNo: `DEMO-${String(Date.now()).slice(-6)}` }); notify('Demo payment recorded. A receipt preview is ready.'); } });
  return <>
    <PageHeader eyebrow="SCHOOL FINANCE" title="Fee management" subtitle="A clear view of fee collection and what’s still outstanding." action={<span className="demo-note"><ShieldCheck size={15} /> DEMO ONLY · No real payments</span>} />
    <div className="fee-stats-grid"><StatCard label="Total fees due" value={money(total)} note="For listed demo records" icon={Wallet} /><StatCard label="Collected to date" value={money(paid)} change="Term 2" note="Recorded demo payments" icon={CircleDollarSign} tone="green" /><StatCard label="Pending balance" value={money(outstanding)} note={`${data.fees.filter((fee) => fee.paid < fee.total).length} students with a balance`} icon={Clock3} tone="orange" /><StatCard label="Collection rate" value={`${total ? Math.round(paid / total * 100) : 0}%`} note="Based on demo records" icon={Activity} tone="purple" /></div>
    <Card className="table-card fee-table-card"><div className="card-heading"><div><h3>Student fee records</h3><p>Term 2 · Academic session {data.settings.session}</p></div><span className="fee-mini-total">Total due <strong>{money(total)}</strong></span></div><div className="table-toolbar"><SearchBox value={search} onChange={setSearch} placeholder="Search student or admission no..." /><Select value={filter} onChange={setFilter} options={['All statuses', 'Paid', 'Partial', 'Pending']} /><span className="toolbar-spacer" /><span className="toolbar-result">{list.length} records</span></div>
      {list.length ? <div className="table-scroll"><table><thead><tr><th>STUDENT</th><th>CLASS</th><th>TOTAL FEE</th><th>PAID</th><th>BALANCE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{list.map((fee) => { const balance = Math.max(fee.total - fee.paid, 0); const status = balance === 0 ? 'Paid' : fee.paid ? 'Partial' : 'Pending'; return <tr key={fee.id}><td><div className="person-cell"><Avatar name={fee.student} /><span><strong>{fee.student}</strong><small>{fee.admission}</small></span></div></td><td>{fee.className}</td><td>{money(fee.total)}</td><td className="paid-amount">{money(fee.paid)}</td><td className={balance ? 'balance-amount' : ''}>{money(balance)}</td><td><StatusBadge>{status}</StatusBadge></td><td>{balance ? <button className="record-payment" onClick={() => record(fee)}><Plus size={13} /> Record payment</button> : <span className="fully-paid-label"><Check size={14} /> Complete</span>}</td></tr>; })}</tbody></table></div> : <EmptyState title="No matching fee records" text="Try adjusting the search or status filter." />}
      <div className="fee-table-note"><ShieldCheck size={15} /> DEMO MODE — Recording here updates local sample data only; no real payment is processed.</div>
    </Card>
  </>;
}
function Receipt({ receipt, onClose, school }) {
  return <div className="modal-backdrop"><div className="receipt-modal"><div className="receipt-head"><div className="receipt-mark"><GraduationCap size={22} /></div><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="receipt-content"><span className="receipt-demo">DEMO RECEIPT · NOT A TAX INVOICE</span><h2>Payment receipt</h2><p>{school}</p><div className="receipt-paid"><Check size={19} /><div><strong>{money(receipt.amount)}</strong><span>Demo payment recorded</span></div></div><div className="receipt-lines"><InfoRow label="Receipt no." value={receipt.receiptNo} /><InfoRow label="Student" value={receipt.student} /><InfoRow label="Admission no." value={receipt.admission} /><InfoRow label="Class" value={receipt.className} /><InfoRow label="Payment method" value={receipt.method} /><InfoRow label="Payment date" value={shortDate(receipt.date)} /><InfoRow label="Reference" value={receipt.reference || '—'} /><InfoRow label="Balance remaining" value={money(receipt.remaining)} /></div><div className="receipt-watermark">DEMO</div></div><div className="receipt-actions"><Button variant="secondary" icon={Printer} onClick={() => window.print()}>Print receipt</Button><Button onClick={onClose}>Done</Button></div></div></div>;
}

function Notices({ data, update, notify, setModal }) {
  const [filter, setFilter] = useState('All notices');
  const [search, setSearch] = useState('');
  const list = data.notices.filter((notice) => (filter === 'All notices' || (filter === 'Published' ? notice.published : !notice.published)) && (!search || `${notice.title} ${notice.body}`.toLowerCase().includes(search.toLowerCase())));
  const edit = (notice) => setModal({ title: notice ? 'Edit notice' : 'Create announcement', kicker: 'SCHOOL COMMUNICATIONS', initial: notice || { title: '', category: 'General', priority: 'Normal', date: today, body: '', published: false }, fields: [{ name: 'title', label: 'Notice title', required: true, full: true }, { name: 'category', label: 'Category', type: 'select', options: ['General', 'Academic', 'Event', 'Urgent'], required: true }, { name: 'priority', label: 'Priority', type: 'select', options: ['Normal', 'High', 'Urgent'], required: true }, { name: 'date', label: 'Publication date', type: 'date', required: true }, { name: 'body', label: 'Message', type: 'textarea', full: true, required: true }], onSave: (values) => { update('notices', notice ? data.notices.map((item) => item.id === notice.id ? { ...item, ...values } : item) : [{ ...values, id: Date.now(), published: false }, ...data.notices]); notify(notice ? 'Notice updated.' : 'Notice saved as a draft.'); } });
  const publish = (notice) => { update('notices', data.notices.map((item) => item.id === notice.id ? { ...item, published: !item.published } : item)); notify(notice.published ? 'Notice moved to drafts.' : 'Notice published in this demo. No notifications were sent.'); };
  const remove = (notice) => { if (!window.confirm(`Delete “${notice.title}”?`)) return; update('notices', data.notices.filter((item) => item.id !== notice.id)); notify('Notice deleted.'); };
  return <>
    <PageHeader eyebrow="SCHOOL COMMUNICATIONS" title="Notices & announcements" subtitle="Keep families and staff in the loop with clear, timely updates." action={<Button icon={Plus} onClick={() => edit(null)}>Create notice</Button>} />
    <div className="notice-summary-grid"><div><span className="notice-summary-icon"><Megaphone size={17} /></span><span><strong>{data.notices.length}</strong><small>Total notices</small></span></div><div><span className="notice-summary-icon published"><Check size={17} /></span><span><strong>{data.notices.filter((n) => n.published).length}</strong><small>Published</small></span></div><div><span className="notice-summary-icon draft"><FileText size={17} /></span><span><strong>{data.notices.filter((n) => !n.published).length}</strong><small>Drafts</small></span></div><span className="notice-disclaimer"><ShieldCheck size={14} /> Publishing is simulated. No notifications are sent.</span></div>
    <div className="toolbar standalone-toolbar notices-toolbar"><SearchBox value={search} onChange={setSearch} placeholder="Search notices..." /><div className="filter-tabs">{['All notices', 'Published', 'Drafts'].map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? 'selected' : ''}>{item}</button>)}</div><span className="toolbar-spacer" /><span className="toolbar-result"><Filter size={14} /> {list.length} notices</span></div>
    {list.length ? <div className="notice-cards">{list.map((notice) => <article className="notice-card card" key={notice.id}><div className="notice-card-top"><span className={`notice-category-icon ${notice.category.toLowerCase()}`}><Megaphone size={17} /></span><div><StatusBadge>{notice.priority}</StatusBadge><StatusBadge tone={notice.published ? 'active' : 'draft'}>{notice.published ? 'Published' : 'Draft'}</StatusBadge></div><div className="notice-more-actions"><button title="Edit notice" onClick={() => edit(notice)}><Pencil size={15} /></button><button title="Delete notice" onClick={() => remove(notice)}><Trash2 size={15} /></button></div></div><h3>{notice.title}</h3><p>{notice.body}</p><div className="notice-card-foot"><span>{notice.category} <i>·</i> {shortDate(notice.date)}</span><button onClick={() => publish(notice)}>{notice.published ? 'Move to drafts' : 'Publish in demo'} <ArrowRight size={14} /></button></div></article>)}</div> : <Card><EmptyState title="No notices in this view" text="Create an announcement for your school community." action={<Button icon={Plus} onClick={() => edit(null)}>Create notice</Button>} /></Card>}
  </>;
}

function Events({ data, update, notify, setModal }) {
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [selectedDate, setSelectedDate] = useState('2026-10-09');
  const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const startOffset = (monthStart.getDay() + 6) % 7;
  const monthName = month.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const eventDayMap = new Set(data.events.filter((item) => item.date.startsWith(`${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`)).map((item) => Number(item.date.slice(-2))));
  const selectedEvents = data.events.filter((item) => item.date === selectedDate);
  const addEvent = () => setModal({ title: 'Add a school event', kicker: 'SCHOOL CALENDAR', initial: { title: '', date: selectedDate, type: 'School event', place: '' }, fields: [{ name: 'title', label: 'Event name', required: true }, { name: 'date', label: 'Date', type: 'date', required: true }, { name: 'type', label: 'Event type', type: 'select', options: ['School event', 'Holiday', 'Celebration', 'Exam'], required: true }, { name: 'place', label: 'Location / note', required: true }], onSave: (values) => { update('events', [...data.events, { ...values, id: Date.now() }].sort((a, b) => a.date.localeCompare(b.date))); notify('Event added to the school calendar.'); } });
  return <>
    <PageHeader eyebrow="SCHOOL LIFE" title="Events & holidays" subtitle="Plan the moments that bring your school community together." action={<Button icon={Plus} onClick={addEvent}>Add event</Button>} />
    <div className="events-layout"><Card className="calendar-card"><div className="calendar-heading"><div><span>YOUR SCHOOL CALENDAR</span><h2>{monthName}</h2></div><div className="calendar-nav"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Previous month"><ChevronLeft size={17} /></button><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Next month"><ChevronRight size={17} /></button></div></div><div className="calendar-grid">{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => <span className="calendar-weekday" key={day}>{day}</span>)}{Array.from({ length: startOffset }, (_, index) => <span key={`blank-${index}`} />)}{Array.from({ length: days }, (_, index) => { const day = index + 1; const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; return <button key={day} onClick={() => setSelectedDate(key)} className={`${selectedDate === key ? 'selected' : ''} ${eventDayMap.has(day) ? 'has-event' : ''}`}>{day}{eventDayMap.has(day) && <i />}</button>; })}</div><div className="calendar-legend"><span><i className="legend-dot indigo" /> School event</span><span><i className="legend-dot orange-dot" /> Holiday</span><span className="calendar-today" onClick={() => { setMonth(new Date()); setSelectedDate(today); }}>Today</span></div></Card>
      <div className="event-side"><Card className="selected-day-card"><div className="selected-day-heading"><span>SELECTED DAY</span><strong>{new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</strong></div>{selectedEvents.length ? selectedEvents.map((event) => <div className="selected-event" key={event.id}><i className={event.type === 'Holiday' ? 'holiday-dot' : ''} /><div><strong>{event.title}</strong><span>{event.place}</span><small>{event.type}</small></div></div>) : <p className="no-event">A little breathing room — no events on this day.</p>}<Button variant="secondary" icon={Plus} onClick={addEvent}>Add event to this day</Button></Card>
      <Card title="Upcoming events" sub="Your next school moments"><div className="upcoming-event-list">{data.events.filter((event) => event.date >= today && event.type !== 'Holiday').slice(0, 4).map((event) => <div className="upcoming-event-row" key={event.id}><div className="event-date"><strong>{new Date(`${event.date}T00:00:00`).getDate()}</strong><span>{new Date(`${event.date}T00:00:00`).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()}</span></div><div><strong>{event.title}</strong><span>{event.place} · {event.type}</span></div></div>)}</div></Card>
      <Card title="Holiday list" sub="Upcoming school closures"><div className="upcoming-event-list">{data.events.filter((event) => event.type === 'Holiday' && event.date >= today).map((event) => <div className="upcoming-event-row" key={event.id}><div className="event-date holiday-date"><strong>{new Date(`${event.date}T00:00:00`).getDate()}</strong><span>{new Date(`${event.date}T00:00:00`).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()}</span></div><div><strong>{event.title}</strong><span>{event.place}</span></div></div>)}{!data.events.some((event) => event.type === 'Holiday' && event.date >= today) && <p className="no-event">No upcoming holidays have been added yet.</p>}</div></Card></div></div>
    <div className="tip-banner holiday-tip"><CalendarDays size={17} /><span><strong>Planning ahead makes all the difference.</strong> Holidays and school events are sample data and can be edited locally.</span></div>
  </>;
}

function Classes({ data, update, notify, setModal }) {
  const [query, setQuery] = useState('');
  const filtered = data.classes.filter((item) => `${item.className} ${item.teacher}`.toLowerCase().includes(query.toLowerCase()));
  const addClass = () => setModal({ title: 'Add a class or section', kicker: 'ACADEMIC STRUCTURE', initial: { className: 'Class 5', sections: 1, students: 0, teacher: data.teachers[0]?.name || '' }, fields: [{ name: 'className', label: 'Class name', type: 'select', options: [...classOptions, 'Class 11', 'Class 12'], required: true }, { name: 'sections', label: 'Sections to add', type: 'number', min: 1, required: true }, { name: 'students', label: 'Students to assign', type: 'number', min: 0, required: true }, { name: 'teacher', label: 'Class teacher', type: 'select', options: data.teachers.map((item) => item.name), required: true }], onSave: (values) => { const existing = data.classes.find((item) => item.className === values.className); const updated = existing ? data.classes.map((item) => item.id === existing.id ? { ...item, sections: Number(item.sections) + Number(values.sections), students: Number(item.students) + Number(values.students), teacher: values.teacher } : item) : [...data.classes, { ...values, id: Date.now(), sections: Number(values.sections), students: Number(values.students) }]; update('classes', updated); notify(existing ? `Sections added to ${values.className}.` : `${values.className} added to the school structure.`); } });
  return <>
    <PageHeader eyebrow="ACADEMIC STRUCTURE" title="Classes & sections" subtitle="See how your school is organized, from classroom to classroom." action={<Button icon={Plus} onClick={addClass}>Add class</Button>} />
    <div className="class-summary"><div><span className="class-summary-icon"><House size={18} /></span><div><strong>{data.classes.length}</strong><span>Active classes</span></div></div><div><span className="class-summary-icon violet"><Users size={18} /></span><div><strong>{data.classes.reduce((sum, item) => sum + Number(item.sections), 0)}</strong><span>Sections in total</span></div></div><div><span className="class-summary-icon amber"><GraduationCap size={18} /></span><div><strong>{data.classes.reduce((sum, item) => sum + Number(item.students), 0)}</strong><span>Students assigned</span></div></div><SearchBox value={query} onChange={setQuery} placeholder="Find a class..." /></div>
    {filtered.length ? <div className="class-grid">{filtered.map((item, index) => <article className="class-card card" key={item.id}><div className={`class-card-top tone-${index % 5}`}><div className="class-number">{String(index + 5).padStart(2, '0')}</div><div className="class-illustration"><BookOpen size={25} /></div><span className="class-active-pill"><i /> Active</span></div><div className="class-card-content"><div className="class-title-row"><h3>{item.className}</h3><button className="more-button" onClick={() => setModal({ title: `Edit ${item.className}`, kicker: 'ACADEMIC STRUCTURE', initial: item, fields: [{ name: 'sections', label: 'Number of sections', type: 'number', min: 1, required: true }, { name: 'students', label: 'Student count', type: 'number', min: 0, required: true }, { name: 'teacher', label: 'Class teacher', type: 'select', options: data.teachers.map((teacher) => teacher.name), required: true }], onSave: (values) => { update('classes', data.classes.map((record) => record.id === item.id ? { ...record, ...values, sections: Number(values.sections), students: Number(values.students) } : record)); notify(`${item.className} details updated.`); } })}><Ellipsis size={18} /></button></div><div className="class-stats"><div><Users size={15} /><span><strong>{item.students}</strong> students</span></div><div><LayoutDashboard size={15} /><span><strong>{item.sections}</strong> sections</span></div></div><div className="class-teacher"><Avatar name={item.teacher} size="small" /><span><small>CLASS TEACHER</small><strong>{item.teacher}</strong></span><ArrowRight size={15} /></div></div></article>)}</div> : <Card><EmptyState title="No class matches" text="Change your search or add a class." action={<Button icon={Plus} onClick={addClass}>Add class</Button>} /></Card>}
    <div className="tip-banner"><GraduationCap size={18} /><span><strong>One classroom, many possibilities.</strong> Class sections and student counts can be managed independently for your school.</span></div>
  </>;
}

function Reports({ data, attendance }) {
  const [tab, setTab] = useState('Overview');
  const [period, setPeriod] = useState('Current term');
  const collected = data.fees.reduce((sum, fee) => sum + fee.paid, 0);
  const dues = data.fees.reduce((sum, fee) => sum + fee.total, 0);
  const enrollment = data.classes.map((item) => ({ name: item.className, count: item.students }));
  return <>
    <PageHeader eyebrow="INSIGHTS & ANALYTICS" title="School reports" subtitle="Useful context for better decisions across your school." action={<Button icon={Printer} onClick={() => window.print()}>Print report</Button>} />
    <div className="report-toolbar"><div className="filter-tabs">{['Overview', 'Attendance', 'Enrollment', 'Fees'].map((item) => <button className={tab === item ? 'selected' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}</div><Select value={period} onChange={setPeriod} options={['Current term', 'Current month', 'Academic year']} /></div>
    <div className="report-summary"><div><span className="report-summary-icon blue"><Users size={17} /></span><div><small>STUDENT ENROLLMENT</small><strong>{data.students.length}</strong><span>Across {data.classes.length} active classes</span></div></div><div><span className="report-summary-icon green"><ClipboardCheck size={17} /></span><div><small>ATTENDANCE TODAY</small><strong>{Math.round(attendance.present / Math.max(attendance.total, 1) * 100)}%</strong><span>{attendance.present} students marked present</span></div></div><div><span className="report-summary-icon purple"><CircleDollarSign size={17} /></span><div><small>FEE COLLECTION</small><strong>{money(collected)}</strong><span>{dues ? Math.round(collected / dues * 100) : 0}% of recorded fees</span></div></div></div>
    <div className="reports-grid"><Card className="report-chart-card" title={tab === 'Enrollment' ? 'Enrollment by class' : tab === 'Fees' ? 'Fee collection summary' : tab === 'Attendance' ? 'Weekly attendance' : 'Attendance trend'} sub={`${period} · Bright Future Public School`}><div className="report-chart"><div className="report-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="report-plot"><div className="report-lines"><i /><i /><i /><i /></div><div className="report-bars">{(tab === 'Enrollment' ? enrollment.map((item) => ({ label: item.name.replace('Class ', 'Cl. '), value: item.count / Math.max(...enrollment.map((c) => c.count)) * 100 })) : tab === 'Fees' ? [{ label: 'Jul', value: 45 }, { label: 'Aug', value: 58 }, { label: 'Sep', value: 72 }, { label: 'Oct', value: dues ? collected / dues * 100 : 0 }, { label: 'Nov', value: 38 }, { label: 'Dec', value: 25 }] : [{ label: 'Mon', value: 88 }, { label: 'Tue', value: 94 }, { label: 'Wed', value: 91 }, { label: 'Thu', value: 96 }, { label: 'Fri', value: Math.round(attendance.present / Math.max(attendance.total, 1) * 100) }, { label: 'Sat', value: 72 }]).map((item) => <div className="report-bar-col" key={item.label}><div><i style={{ height: `${item.value}%` }} /></div><span>{item.label}</span></div>)}</div></div></div><div className="report-chart-legend"><span><i className="legend-dot indigo" /> {tab === 'Enrollment' ? 'Students by class' : tab === 'Fees' ? 'Fee collection rate' : 'Attendance percentage'}</span><span className="report-live"><i /> Based on demo records</span></div></Card>
      <Card className="report-side-card" title="Enrollment snapshot" sub="Students by class"><div className="enrollment-list">{enrollment.map((item, index) => <div key={item.name}><span className={`enrollment-mark color-${index % 5}`}>{item.name.replace('Class ', '')}</span><span className="enrollment-label">{item.name}</span><div className="enrollment-track"><i style={{ width: `${item.count / Math.max(...enrollment.map((c) => c.count)) * 100}%` }} /></div><strong>{item.count}</strong></div>)}</div><div className="enrollment-foot"><span>Average class size</span><strong>{Math.round(enrollment.reduce((sum, item) => sum + item.count, 0) / Math.max(enrollment.length, 1))} students</strong></div></Card>
    </div>
    <div className="report-bottom-grid"><Card title="Fee collection" sub="Collected vs pending"><div className="report-fee-row"><div className="fee-progress-ring" style={{ '--progress': `${dues ? collected / dues * 100 : 0}%` }}><span>{dues ? Math.round(collected / dues * 100) : 0}%</span></div><div className="report-fee-details"><div><span><i className="legend-dot indigo" /> Collected</span><strong>{money(collected)}</strong></div><div><span><i className="legend-dot pale" /> Pending</span><strong>{money(dues - collected)}</strong></div></div></div></Card><Card title="Report notes" sub="A quick guide to this view"><div className="report-note"><span><ShieldCheck size={16} /></span><div><strong>Fictional demo data</strong><p>Figures are generated from the sample records in this browser and do not represent live school data.</p></div></div><div className="report-note"><span className="purple"><Printer size={16} /></span><div><strong>Ready to share</strong><p>Use Print report to open a clean, print-friendly version of this page.</p></div></div></Card></div>
    <div className="report-print-footer">SmartSchool · {data.settings.schoolName} · Generated {new Date().toLocaleDateString('en-IN')}</div>
  </>;
}

function SettingsPage({ data, update, notify }) {
  const [form, setForm] = useState(data.settings);
  useEffect(() => setForm(data.settings), [data.settings]);
  const change = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));
  const save = (event) => { event.preventDefault(); if (!form.schoolName.trim() || !form.address.trim() || !form.phone.trim()) { notify('School name, address and phone are required.'); return; } update('settings', form); notify('School settings saved in this browser.'); };
  return <>
    <PageHeader eyebrow="SCHOOL WORKSPACE" title="Settings" subtitle="Make SmartSchool feel like it belongs to your school." action={<span className="demo-note"><ShieldCheck size={15} /> Saved to this browser</span>} />
    <div className="settings-layout"><div className="settings-nav card"><span className="settings-nav-label">SCHOOL PROFILE</span><button className="selected"><House size={16} /> School information</button><button onClick={() => notify('Academic settings are managed in this demo through your school session field.')}><CalendarDays size={16} /> Academic session</button><button onClick={() => notify('User access controls are not connected in this demo.')}><ShieldCheck size={16} /> Access & roles <span>DEMO</span></button><div className="settings-nav-tip"><Sparkles size={16} /><p>Changes are saved locally and will stay in this browser.</p></div></div>
      <Card className="settings-form-card"><div className="settings-section-head"><div><span className="settings-logo-placeholder"><GraduationCap size={22} /></span><div><h3>School identity</h3><p>How your school appears across the workspace.</p></div></div><button className="button button-secondary logo-upload" onClick={() => notify('Logo upload is not available in this local demo.')}>Logo placeholder</button></div><form onSubmit={save}><div className="settings-form-grid"><label className="form-field full"><span>School name <i>*</i></span><input value={form.schoolName} onChange={(event) => change('schoolName', event.target.value)} required /></label><label className="form-field full"><span>School address <i>*</i></span><textarea rows="3" value={form.address} onChange={(event) => change('address', event.target.value)} required /></label><label className="form-field"><span>Contact phone <i>*</i></span><input value={form.phone} onChange={(event) => change('phone', event.target.value)} required /></label><label className="form-field"><span>Contact email</span><input type="email" value={form.email || ''} onChange={(event) => change('email', event.target.value)} /></label><label className="form-field"><span>Academic session</span><input value={form.session} onChange={(event) => change('session', event.target.value)} /></label></div><div className="settings-save-row"><span><Check size={15} /> Your changes stay in this browser.</span><Button type="submit" icon={Check}>Save settings</Button></div></form><div className="settings-demo-notice"><ShieldCheck size={17} /><span><strong>This is a demo workspace.</strong> There’s no connected backend. Your sample school profile is stored locally on this device only.</span></div></Card></div>
  </>;
}
