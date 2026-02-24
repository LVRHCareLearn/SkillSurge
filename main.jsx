import { useState, useEffect } from "react";

const INITIAL_COURSES = [
  {
    id: 1, title: "IV Therapy & Medication Administration", category: "Clinical Skills",
    duration: "2.5 hrs", level: "Intermediate", passingScore: 80,
    dueDate: "2026-03-15", mandatory: true, status: "active",
    description: "Covers safe medication administration, IV line management, and documentation protocols per LVRC standards.",
    modules: ["IV Access & Site Care", "Medication Calculations", "High-Alert Medications", "Documentation & Reporting"],
    questions: [
      { q: "What is the maximum hang time for a peripheral IV bag?", options: ["12 hours", "24 hours", "48 hours", "72 hours"], answer: 1 },
      { q: "Which medication requires a double-check before administration?", options: ["Acetaminophen", "Insulin", "Saline flush", "Multivitamin"], answer: 1 },
      { q: "The '5 Rights' of medication administration include all EXCEPT:", options: ["Right patient", "Right dose", "Right color", "Right route"], answer: 2 },
      { q: "A patient's IV site shows redness, warmth, and swelling. You should:", options: ["Increase flow rate", "Discontinue and restart", "Apply cold compress only", "Document and continue"], answer: 1 },
      { q: "When calculating a drip rate, which formula is correct?", options: ["Volume divided by Time x Drop Factor", "(Volume x Drop Factor) divided by Time (min)", "Time x Drop Factor divided by Volume", "Volume x Time divided by Drop Factor"], answer: 1 },
    ]
  },
  {
    id: 2, title: "Patient Safety & Fall Prevention", category: "Safety",
    duration: "1.5 hrs", level: "Foundational", passingScore: 85,
    dueDate: "2026-02-28", mandatory: true, status: "active",
    description: "Comprehensive training on fall risk assessment using the Morse Fall Scale, prevention strategies, and post-fall protocols.",
    modules: ["Morse Fall Scale", "Environmental Safety", "Bed Alarm Protocols", "Post-Fall Assessment"],
    questions: [
      { q: "The Morse Fall Scale score of 45 or above indicates:", options: ["Low risk", "Medium risk", "High risk", "No risk"], answer: 2 },
      { q: "Which intervention is appropriate for a HIGH fall-risk patient?", options: ["Raise all 4 side rails", "Place in room farthest from nurses station", "Hourly rounding and bed alarm on", "Limit ambulation documentation"], answer: 2 },
      { q: "After a patient fall, what is your FIRST action?", options: ["Complete incident report", "Assess patient for injury", "Notify family", "Review the chart"], answer: 1 },
      { q: "Non-slip footwear should be worn by:", options: ["Only ambulatory patients", "All patients at risk for falls", "Staff only", "Visitors only"], answer: 1 },
      { q: "Which factor is included in the Morse Fall Scale?", options: ["Patient's insurance status", "History of falling", "Patient's age only", "Physician orders"], answer: 1 },
    ]
  },
  {
    id: 3, title: "HIPAA & Patient Privacy Compliance", category: "Compliance",
    duration: "1 hr", level: "Foundational", passingScore: 90,
    dueDate: "2026-12-31", mandatory: true, status: "active",
    description: "Annual HIPAA compliance training covering PHI, minimum necessary standard, breach reporting, and LVRC privacy policies.",
    modules: ["PHI Defined", "Minimum Necessary Rule", "Breach Notification", "Social Media Policy"],
    questions: [
      { q: "PHI stands for:", options: ["Patient Health Insurance", "Protected Health Information", "Primary Health Identifier", "Personal Hospital Information"], answer: 1 },
      { q: "You receive a call from someone claiming to be a patient's spouse asking for lab results. You should:", options: ["Provide the results if they know the DOB", "Verify the patient has given written authorization", "Transfer to the charge nurse who can share", "Share since they are family"], answer: 1 },
      { q: "The 'minimum necessary' standard means:", options: ["Share only minimum cost information", "Access only the PHI needed for your job function", "Use the minimum security password length", "Document only minimum required fields"], answer: 1 },
      { q: "A HIPAA breach must be reported to affected individuals within:", options: ["30 days", "60 days", "90 days", "180 days"], answer: 1 },
      { q: "Posting about a 'difficult patient shift' on social media (no names) is:", options: ["Acceptable since no name is mentioned", "A potential HIPAA violation if identifiable", "Required for public health transparency", "Protected under free speech"], answer: 1 },
    ]
  },
  {
    id: 4, title: "Behavioral Health De-escalation", category: "Behavioral Health",
    duration: "3 hrs", level: "Advanced", passingScore: 80,
    dueDate: "2026-04-01", mandatory: false, status: "active",
    description: "Specialized de-escalation techniques for behavioral health settings including verbal, non-verbal, and environmental strategies.",
    modules: ["Trauma-Informed Care", "Verbal De-escalation", "CPI Techniques", "Post-Incident Debrief"],
    questions: [
      { q: "The first step in de-escalation is:", options: ["Call security immediately", "Establish a calm presence and listen", "Issue a verbal warning", "Medicate the patient"], answer: 1 },
      { q: "Trauma-informed care assumes:", options: ["Patients are manipulative", "Behaviors may be responses to past trauma", "Staff safety is the only priority", "Restraints prevent escalation"], answer: 1 },
      { q: "Personal space during de-escalation should be approximately:", options: ["1 foot", "1.5 to 3 feet", "5 or more feet", "Direct contact"], answer: 1 },
      { q: "After a behavioral incident, a staff debrief should:", options: ["Assign blame", "Identify what worked and improve future response", "Be skipped if no injuries", "Only include supervisors"], answer: 1 },
      { q: "Which body language supports de-escalation?", options: ["Crossed arms and direct eye contact", "Open posture and calm tone", "Standing over the patient", "Rapid speech and movement"], answer: 1 },
    ]
  },
  {
    id: 5, title: "BLS Certification Renewal", category: "Certifications",
    duration: "4 hrs", level: "Intermediate", passingScore: 85,
    dueDate: "2026-06-30", mandatory: true, status: "active",
    description: "AHA-aligned BLS renewal covering adult, child, and infant CPR, AED use, and team-based resuscitation.",
    modules: ["Adult CPR Chain of Survival", "Pediatric CPR", "AED Operation", "Team Resuscitation"],
    questions: [
      { q: "Compression rate for adult CPR is:", options: ["60 to 80 per min", "80 to 100 per min", "100 to 120 per min", "120 to 140 per min"], answer: 2 },
      { q: "Compression depth for adults is:", options: ["1 inch", "1.5 inches", "2 to 2.4 inches", "3 inches"], answer: 2 },
      { q: "For a witnessed cardiac arrest with a shockable rhythm, the AED should be used:", options: ["After 5 cycles of CPR", "After 2 minutes of CPR", "As soon as possible", "Only if pulse absent for 10 minutes"], answer: 2 },
      { q: "Rescue breath to compression ratio for 1-rescuer adult CPR is:", options: ["1:15", "2:30", "1:5", "2:15"], answer: 1 },
      { q: "When using an AED, you should:", options: ["Continue CPR while it analyzes", "Ensure no one is touching patient during shock", "Delay shock until a physician arrives", "Apply pads over clothing"], answer: 1 },
    ]
  },
];

const INITIAL_USERS = [
  { id: 1, name: "Maria Santos, RN", role: "nurse", dept: "ICU", email: "m.santos@lvrc.org", completions: [1, 3], inProgress: [2], avatar: "MS" },
  { id: 2, name: "James Okafor, RN", role: "nurse", dept: "Med-Surg", email: "j.okafor@lvrc.org", completions: [1, 2, 3], inProgress: [], avatar: "JO" },
  { id: 3, name: "Priya Nair, LVN", role: "nurse", dept: "Behavioral Health", email: "p.nair@lvrc.org", completions: [3], inProgress: [4], avatar: "PN" },
  { id: 4, name: "Derek Wills, RN", role: "nurse", dept: "ED", email: "d.wills@lvrc.org", completions: [], inProgress: [5], avatar: "DW" },
  { id: 5, name: "Sophia Chen, MSN", role: "manager", dept: "Education", email: "s.chen@lvrc.org", completions: [1, 2, 3, 4, 5], inProgress: [], avatar: "SC" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0B1929; --navy-mid: #112240; --navy-light: #1A3359;
    --teal: #00C9B1; --teal-dim: #00A090; --amber: #F5A623;
    --red: #E8394D; --green: #2DD4A0; --slate: #8BAABE;
    --white: #EEF4FA; --card: rgba(17,34,64,0.85);
    --border: rgba(0,201,177,0.15); --font: 'Sora', sans-serif;
    --mono: 'JetBrains Mono', monospace; --radius: 12px;
  }
  body { font-family: var(--font); background: var(--navy); color: var(--white); min-height: 100vh; overflow-x: hidden; }
  .bg-grid { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(rgba(0,201,177,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,177,0.03) 1px, transparent 1px); background-size: 60px 60px; }
  .bg-glow { position: fixed; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(0,201,177,0.06) 0%, transparent 70%); top: -100px; right: -100px; pointer-events: none; z-index: 0; animation: glowPulse 8s ease-in-out infinite; }
  @keyframes glowPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
  .app { position: relative; z-index: 1; min-height: 100vh; display: flex; }
  .sidebar { width: 260px; min-height: 100vh; background: var(--navy-mid); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; left: 0; top: 0; bottom: 0; z-index: 100; padding: 0 0 24px 0; }
  .sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid var(--border); }
  .logo-mark { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: var(--white); line-height: 1; }
  .logo-teal { color: var(--teal); }
  .logo-sub { font-size: 10px; color: var(--slate); letter-spacing: 2px; margin-top: 4px; text-transform: uppercase; font-family: var(--mono); }
  .sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 2px; }
  .nav-section { font-size: 10px; color: var(--slate); letter-spacing: 2px; text-transform: uppercase; font-family: var(--mono); padding: 12px 12px 6px; margin-top: 8px; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; color: var(--slate); transition: all 0.2s; border: 1px solid transparent; background: none; font-family: var(--font); width: 100%; text-align: left; }
  .nav-item:hover { color: var(--white); background: rgba(0,201,177,0.08); }
  .nav-item.active { color: var(--teal); background: rgba(0,201,177,0.12); border-color: rgba(0,201,177,0.2); }
  .nav-icon { width: 20px; text-align: center; font-size: 16px; }
  .nav-badge { margin-left: auto; background: var(--red); color: white; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; font-family: var(--mono); }
  .sidebar-user { margin: 0 12px; padding: 12px; border-radius: 8px; background: rgba(0,201,177,0.06); border: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--teal-dim)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--navy); flex-shrink: 0; }
  .user-name { font-size: 13px; font-weight: 600; color: var(--white); }
  .user-role { font-size: 11px; color: var(--slate); margin-top: 1px; }
  .main { margin-left: 260px; flex: 1; padding: 32px; min-height: 100vh; }
  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
  .page-title { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
  .title-teal { color: var(--teal); }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; font-family: var(--font); }
  .btn-primary { background: var(--teal); color: var(--navy); }
  .btn-primary:hover { background: #00e8cc; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,201,177,0.4); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-ghost { background: rgba(255,255,255,0.06); color: var(--white); border: 1px solid var(--border); }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); }
  .btn-sm { padding: 7px 14px; font-size: 13px; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; backdrop-filter: blur(12px); }
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; backdrop-filter: blur(12px); position: relative; overflow: hidden; }
  .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .stat-card.teal::before { background: var(--teal); }
  .stat-card.amber::before { background: var(--amber); }
  .stat-card.green::before { background: var(--green); }
  .stat-card.red::before { background: var(--red); }
  .stat-val { font-size: 32px; font-weight: 700; line-height: 1; font-family: var(--mono); }
  .stat-val.teal { color: var(--teal); }
  .stat-val.amber { color: var(--amber); }
  .stat-val.green { color: var(--green); }
  .stat-val.red { color: var(--red); }
  .stat-label { font-size: 12px; color: var(--slate); margin-top: 8px; text-transform: uppercase; letter-spacing: 1px; font-family: var(--mono); }
  .stat-sub { font-size: 12px; color: var(--slate); margin-top: 4px; }
  .course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .course-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; backdrop-filter: blur(12px); }
  .course-card:hover { border-color: var(--teal); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
  .course-cat { font-size: 10px; font-family: var(--mono); letter-spacing: 2px; color: var(--teal); text-transform: uppercase; margin-bottom: 10px; }
  .course-title { font-size: 16px; font-weight: 600; line-height: 1.3; margin-bottom: 8px; }
  .course-desc { font-size: 13px; color: var(--slate); line-height: 1.5; margin-bottom: 16px; }
  .course-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
  .meta-chip { font-size: 11px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 3px 8px; color: var(--slate); font-family: var(--mono); }
  .mandatory-badge { position: absolute; top: 16px; right: 16px; font-size: 9px; font-family: var(--mono); letter-spacing: 1px; text-transform: uppercase; background: rgba(232,57,77,0.15); border: 1px solid rgba(232,57,77,0.3); color: var(--red); padding: 3px 8px; border-radius: 4px; }
  .progress-bar { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; margin-bottom: 12px; }
  .progress-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--teal), #00e8cc); transition: width 0.5s; }
  .course-status { display: flex; align-items: center; justify-content: space-between; }
  .status-pill { font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 600; font-family: var(--mono); }
  .status-pill.complete { background: rgba(45,212,160,0.15); color: var(--green); border: 1px solid rgba(45,212,160,0.3); }
  .status-pill.in-progress { background: rgba(245,166,35,0.15); color: var(--amber); border: 1px solid rgba(245,166,35,0.3); }
  .status-pill.not-started { background: rgba(139,170,190,0.1); color: var(--slate); border: 1px solid rgba(139,170,190,0.2); }
  .due-date { font-size: 11px; color: var(--slate); font-family: var(--mono); }
  .due-date.overdue { color: var(--red); }
  table { width: 100%; border-collapse: collapse; }
  th { font-size: 11px; font-family: var(--mono); letter-spacing: 1.5px; text-transform: uppercase; color: var(--slate); padding: 12px 16px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 14px 16px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(0,201,177,0.03); }
  .avatar-cell { display: flex; align-items: center; gap: 10px; }
  .mini-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--teal), var(--teal-dim)); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--navy); flex-shrink: 0; }
  .mini-avatar.mgr { background: linear-gradient(135deg, var(--amber), #d48a00); }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-size: 16px; font-weight: 600; }
  .tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 4px; margin-bottom: 24px; width: fit-content; }
  .tab { padding: 8px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; color: var(--slate); }
  .tab.active { background: var(--teal); color: var(--navy); font-weight: 600; }
  .search-row { display: flex; gap: 12px; margin-bottom: 24px; }
  .search-input { flex: 1; background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 10px 16px; font-size: 14px; color: var(--white); font-family: var(--font); outline: none; transition: border-color 0.2s; }
  .search-input:focus { border-color: var(--teal); }
  .search-input::placeholder { color: var(--slate); }
  select.filter { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 10px 16px; font-size: 14px; color: var(--white); font-family: var(--font); outline: none; cursor: pointer; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(4px); animation: fadeIn 0.2s; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .modal { background: var(--navy-mid); border: 1px solid var(--border); border-radius: 16px; width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  .modal-header { padding: 28px 28px 0; display: flex; align-items: flex-start; justify-content: space-between; }
  .modal-body { padding: 24px 28px 28px; }
  .modal-close { background: none; border: none; color: var(--slate); font-size: 20px; cursor: pointer; padding: 4px; line-height: 1; }
  .modal-close:hover { color: var(--white); }
  .question-block { background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 16px; }
  .question-text { font-size: 15px; font-weight: 500; margin-bottom: 16px; line-height: 1.5; }
  .answer-option { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; margin-bottom: 8px; border: 1px solid transparent; transition: all 0.2s; font-size: 14px; }
  .answer-option:hover { background: rgba(0,201,177,0.08); border-color: rgba(0,201,177,0.2); }
  .answer-option.selected { background: rgba(0,201,177,0.12); border-color: var(--teal); color: var(--teal); }
  .answer-option.correct { background: rgba(45,212,160,0.12); border-color: var(--green); color: var(--green); }
  .answer-option.wrong { background: rgba(232,57,77,0.12); border-color: var(--red); color: var(--red); }
  .radio-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid currentColor; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .radio-inner { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
  .result-screen { text-align: center; padding: 40px 0; }
  .result-icon { font-size: 64px; margin-bottom: 16px; }
  .result-score { font-size: 56px; font-weight: 700; font-family: var(--mono); line-height: 1; }
  .result-score.pass { color: var(--green); }
  .result-score.fail { color: var(--red); }
  .result-label { font-size: 20px; font-weight: 600; margin: 8px 0 4px; }
  .result-sub { color: var(--slate); font-size: 14px; }
  .form-group { margin-bottom: 20px; }
  .form-label { font-size: 12px; font-family: var(--mono); letter-spacing: 1px; text-transform: uppercase; color: var(--slate); margin-bottom: 8px; display: block; }
  .form-input { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 14px; color: var(--white); font-family: var(--font); outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: var(--teal); }
  textarea.form-input { resize: vertical; min-height: 80px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .compliance-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .compliance-label { font-size: 13px; width: 200px; flex-shrink: 0; color: var(--slate); }
  .compliance-bar-wrap { flex: 1; height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
  .compliance-bar-fill { height: 100%; border-radius: 4px; transition: width 1s cubic-bezier(0.4,0,0.2,1); }
  .compliance-pct { font-size: 12px; font-family: var(--mono); width: 40px; text-align: right; }
  .cert-card { background: linear-gradient(135deg, rgba(0,201,177,0.08), rgba(0,0,0,0)); border: 1px solid rgba(0,201,177,0.2); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
  .cert-icon { width: 48px; height: 48px; background: linear-gradient(135deg, var(--teal), var(--teal-dim)); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .cert-title { font-size: 14px; font-weight: 600; }
  .cert-meta { font-size: 12px; color: var(--slate); margin-top: 4px; font-family: var(--mono); }
  .cert-badge { margin-left: auto; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .toast { position: fixed; bottom: 32px; right: 32px; background: var(--navy-mid); border: 1px solid var(--teal); border-radius: 10px; padding: 14px 20px; font-size: 14px; font-weight: 500; z-index: 9999; animation: slideToast 0.3s; max-width: 320px; box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
  @keyframes slideToast { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  .empty-state { text-align: center; padding: 60px 0; color: var(--slate); }
  @media(max-width:1200px) { .stat-grid{grid-template-columns:repeat(2,1fr)} .course-grid{grid-template-columns:repeat(2,1fr)} }
  @media(max-width:900px) { .two-col{grid-template-columns:1fr} .course-grid{grid-template-columns:1fr} }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
`;

const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
const isOverdue = (d) => d && new Date(d) < new Date();

function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return <div className="toast">&#10003; {message}</div>;
}

function AssessmentModal({ course, onClose, onComplete }) {
  const [phase, setPhase] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    let correct = 0;
    course.questions.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
    const pct = Math.round((correct / course.questions.length) * 100);
    setScore(pct);
    setPhase("result");
    if (pct >= course.passingScore) onComplete(course.id);
  };

  const allAnswered = course.questions.every((_, i) => answers[i] !== undefined);
  const passed = score >= course.passingScore;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="course-cat">{course.category}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{course.title}</div>
          </div>
          <button className="modal-close" onClick={onClose}>&#10005;</button>
        </div>
        <div className="modal-body">
          {phase === "intro" && (
            <>
              <p style={{ color: "var(--slate)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{course.description}</p>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {[["Duration", course.duration], ["Questions", course.questions.length], ["Passing Score", course.passingScore + "%"], ["Level", course.level]].map(([k, v]) => (
                    <div key={k}><div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--slate)", marginBottom: 4 }}>{k}</div><div style={{ fontWeight: 600 }}>{v}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: "var(--slate)" }}>Modules Covered:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {course.modules.map(m => <span key={m} className="meta-chip" style={{ fontSize: 12 }}>{m}</span>)}
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setPhase("questions")}>Begin Assessment</button>
            </>
          )}
          {phase === "questions" && (
            <>
              <div style={{ marginBottom: 24, fontSize: 13, color: "var(--slate)" }}>
                Answer all {course.questions.length} questions. Passing score: <strong style={{ color: "var(--teal)" }}>{course.passingScore}%</strong>
              </div>
              {course.questions.map((q, qi) => (
                <div key={qi} className="question-block">
                  <div className="question-text">
                    <span style={{ color: "var(--teal)", fontFamily: "var(--mono)", marginRight: 10 }}>{qi + 1}.</span>{q.q}
                  </div>
                  {q.options.map((opt, ai) => (
                    <div key={ai} className={`answer-option${answers[qi] === ai ? " selected" : ""}`} onClick={() => setAnswers(a => ({ ...a, [qi]: ai }))}>
                      <div className="radio-dot">{answers[qi] === ai && <div className="radio-inner" />}</div>
                      {opt}
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 13, color: "var(--slate)" }}>{Object.keys(answers).length}/{course.questions.length} answered</span>
                <button className="btn btn-primary" disabled={!allAnswered} onClick={handleSubmit}>Submit Assessment</button>
              </div>
            </>
          )}
          {phase === "result" && (
            <div className="result-screen">
              <div className="result-icon">{passed ? "🏆" : "📋"}</div>
              <div className={`result-score ${passed ? "pass" : "fail"}`}>{score}%</div>
              <div className="result-label">{passed ? "Assessment Passed!" : "Assessment Not Passed"}</div>
              <div className="result-sub" style={{ marginBottom: 24 }}>
                {passed ? `You have earned credit for ${course.title}.` : `You need ${course.passingScore}% to pass. Please review and retry.`}
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 16, marginBottom: 24, display: "flex", justifyContent: "center", gap: 40 }}>
                <div><div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--mono)", color: "var(--green)" }}>{course.questions.filter((_, i) => answers[i] === course.questions[i].answer).length}</div><div style={{ fontSize: 12, color: "var(--slate)" }}>Correct</div></div>
                <div><div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--mono)", color: "var(--red)" }}>{course.questions.filter((_, i) => answers[i] !== course.questions[i].answer).length}</div><div style={{ fontSize: 12, color: "var(--slate)" }}>Incorrect</div></div>
                <div><div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--mono)", color: "var(--teal)" }}>{score}%</div><div style={{ fontSize: 12, color: "var(--slate)" }}>Score</div></div>
              </div>
              {passed && (
                <div className="cert-card" style={{ textAlign: "left" }}>
                  <div className="cert-icon">🎓</div>
                  <div><div className="cert-title">Certificate of Completion</div><div className="cert-meta">{course.title} · Las Vegas Recovery Hospital · {new Date().toLocaleDateString()}</div></div>
                </div>
              )}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
                <button className="btn btn-ghost" onClick={onClose}>Close</button>
                {!passed && <button className="btn btn-primary" onClick={() => { setPhase("questions"); setAnswers({}); }}>Retry Assessment</button>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AddCourseModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: "", category: "Clinical Skills", level: "Foundational", duration: "", dueDate: "", passingScore: 80, mandatory: false, description: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = () => {
    if (!form.title || !form.duration) return;
    onSave({ ...form, id: Date.now(), status: "active", modules: [], questions: [] });
  };
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <div style={{ fontSize: 18, fontWeight: 700 }}>Add New Course</div>
          <button className="modal-close" onClick={onClose}>&#10005;</button>
        </div>
        <div className="modal-body">
          <div className="form-group"><label className="form-label">Course Title</label><input className="form-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g., Sepsis Recognition and Management" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Category</label><select className="form-input filter" value={form.category} onChange={e => set("category", e.target.value)}>{["Clinical Skills","Safety","Compliance","Behavioral Health","Certifications","Infection Control"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Level</label><select className="form-input filter" value={form.level} onChange={e => set("level", e.target.value)}>{["Foundational","Intermediate","Advanced"].map(l => <option key={l}>{l}</option>)}</select></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Duration</label><input className="form-input" value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g., 2 hrs" /></div>
            <div className="form-group"><label className="form-label">Due Date</label><input className="form-input" type="date" value={form.dueDate} onChange={e => set("dueDate", e.target.value)} /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Passing Score (%)</label><input className="form-input" type="number" min={50} max={100} value={form.passingScore} onChange={e => set("passingScore", Number(e.target.value))} /></div>
            <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 28 }}><input type="checkbox" id="mand" checked={form.mandatory} onChange={e => set("mandatory", e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--teal)" }} /><label htmlFor="mand" style={{ fontSize: 14, cursor: "pointer" }}>Mark as Mandatory</label></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" value={form.description} onChange={e => set("description", e.target.value)} placeholder="Brief description of course content..." /></div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Publish Course</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ courses, completions }) {
  const completed = courses.filter(c => completions.includes(c.id)).length;
  const mandatory = courses.filter(c => c.mandatory);
  const mandatoryDone = mandatory.filter(c => completions.includes(c.id)).length;
  const compliance = Math.round((mandatoryDone / (mandatory.length || 1)) * 100);
  const dueSoon = courses.filter(c => {
    if (!c.dueDate || completions.includes(c.id)) return false;
    const diff = (new Date(c.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  });
  return (
    <div>
      <div className="topbar">
        <div>
          <div style={{ fontSize: 13, color: "var(--slate)", marginBottom: 4 }}>Good morning</div>
          <div className="page-title">Sophia's <span className="title-teal">Dashboard</span></div>
        </div>
        <span style={{ fontSize: 12, fontFamily: "var(--mono)", color: "var(--slate)" }}>Las Vegas Recovery Hospital</span>
      </div>
      <div className="stat-grid">
        <div className="stat-card teal"><div className="stat-val teal">{completed}</div><div className="stat-label">Completed</div><div className="stat-sub">of {courses.length} assigned</div></div>
        <div className="stat-card amber"><div className="stat-val amber">{courses.length - completed}</div><div className="stat-label">Remaining</div><div className="stat-sub">to complete</div></div>
        <div className="stat-card green"><div className="stat-val green">{compliance}%</div><div className="stat-label">Compliance Rate</div><div className="stat-sub">{mandatoryDone}/{mandatory.length} mandatory done</div></div>
        <div className="stat-card red"><div className="stat-val red">{dueSoon.length}</div><div className="stat-label">Due Within 30 Days</div><div className="stat-sub">action required</div></div>
      </div>
      <div className="two-col" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="section-header"><div className="section-title">Mandatory Compliance</div></div>
          {mandatory.map(c => {
            const pct = completions.includes(c.id) ? 100 : 0;
            return (
              <div key={c.id} className="compliance-row">
                <div className="compliance-label">{c.title.length > 28 ? c.title.slice(0, 28) + "…" : c.title}</div>
                <div className="compliance-bar-wrap"><div className="compliance-bar-fill" style={{ width: pct + "%", background: pct === 100 ? "var(--green)" : "var(--red)" }} /></div>
                <div className="compliance-pct" style={{ color: pct === 100 ? "var(--green)" : "var(--red)" }}>{pct}%</div>
              </div>
            );
          })}
        </div>
        <div className="card">
          <div className="section-header"><div className="section-title">Due Soon</div></div>
          {dueSoon.length === 0
            ? <p style={{ color: "var(--slate)", fontSize: 14 }}>You are all caught up! No courses due in the next 30 days.</p>
            : dueSoon.map(c => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div><div style={{ fontSize: 14, fontWeight: 500 }}>{c.title}</div><div className="due-date" style={{ marginTop: 2, color: "var(--amber)" }}>Due {formatDate(c.dueDate)}</div></div>
                {c.mandatory && <span className="meta-chip">Required</span>}
              </div>
            ))
          }
        </div>
      </div>
      <div className="card">
        <div className="section-header"><div className="section-title">My Certifications</div></div>
        {courses.filter(c => completions.includes(c.id)).length === 0
          ? <p style={{ color: "var(--slate)", fontSize: 14 }}>Complete courses to earn certifications.</p>
          : courses.filter(c => completions.includes(c.id)).map(c => (
            <div key={c.id} className="cert-card">
              <div className="cert-icon">🎓</div>
              <div><div className="cert-title">{c.title}</div><div className="cert-meta">{c.category} · Issued {new Date().toLocaleDateString()} · Las Vegas Recovery Hospital</div></div>
              <div className="cert-badge"><span className="status-pill complete">CERTIFIED</span></div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function CourseCatalog({ courses, setCourses, completions, setCompletions, currentUser }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [tabFilter, setTabFilter] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState(null);
  const [inProgress, setInProgress] = useState([]);

  const categories = ["All", ...new Set(INITIAL_COURSES.map(c => c.category))];
  const getStatus = (id) => {
    if (completions.includes(id)) return "complete";
    if (inProgress.includes(id)) return "in-progress";
    return "not-started";
  };
  const filtered = courses.filter(c => {
    const ms = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const mc = catFilter === "All" || c.category === catFilter;
    const mt = tabFilter === "All" || (tabFilter === "Mandatory" && c.mandatory) || (tabFilter === "My Courses" && getStatus(c.id) !== "not-started");
    return ms && mc && mt;
  });
  const handleStart = (course) => {
    if (!inProgress.includes(course.id) && !completions.includes(course.id)) setInProgress(p => [...p, course.id]);
    setSelectedCourse(course);
  };
  const handleComplete = (id) => {
    setCompletions(p => p.includes(id) ? p : [...p, id]);
    setInProgress(p => p.filter(x => x !== id));
    setToast("Course completed! Certification earned.");
  };
  const getProgress = (id) => getStatus(id) === "complete" ? 100 : getStatus(id) === "in-progress" ? 45 : 0;

  return (
    <div>
      <div className="topbar">
        <div className="page-title">Course <span className="title-teal">Catalog</span></div>
        {currentUser.role === "manager" && <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Course</button>}
      </div>
      <div className="tabs">
        {["All", "Mandatory", "My Courses"].map(t => <div key={t} className={`tab${tabFilter === t ? " active" : ""}`} onClick={() => setTabFilter(t)}>{t}</div>)}
      </div>
      <div className="search-row">
        <input className="search-input" placeholder="Search courses, categories..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="filter" value={catFilter} onChange={e => setCatFilter(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select>
      </div>
      <div className="course-grid">
        {filtered.map(c => {
          const status = getStatus(c.id);
          return (
            <div key={c.id} className="course-card" onClick={() => handleStart(c)}>
              {c.mandatory && <span className="mandatory-badge">Required</span>}
              <div className="course-cat">{c.category}</div>
              <div className="course-title">{c.title}</div>
              <div className="course-desc">{(c.description || "").slice(0, 90)}{(c.description || "").length > 90 ? "…" : ""}</div>
              <div className="course-meta">
                <span className="meta-chip">{c.duration}</span>
                <span className="meta-chip">{c.level}</span>
                <span className="meta-chip">Pass: {c.passingScore}%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: getProgress(c.id) + "%" }} /></div>
              <div className="course-status">
                <span className={`status-pill ${status === "not-started" ? "not-started" : status === "in-progress" ? "in-progress" : "complete"}`}>
                  {status === "not-started" ? "Not Started" : status === "in-progress" ? "In Progress" : "Complete"}
                </span>
                {c.dueDate && <span className={`due-date${isOverdue(c.dueDate) && status !== "complete" ? " overdue" : ""}`}>
                  {isOverdue(c.dueDate) && status !== "complete" ? "Overdue" : "Due " + formatDate(c.dueDate)}
                </span>}
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <div className="empty-state">No courses match your search.</div>}
      {selectedCourse && <AssessmentModal course={selectedCourse} onClose={() => setSelectedCourse(null)} onComplete={handleComplete} />}
      {showAdd && <AddCourseModal onClose={() => setShowAdd(false)} onSave={c => { setCourses(p => [...p, c]); setShowAdd(false); setToast("Course published!"); }} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

function Reports({ courses, completions }) {
  const totalNurses = INITIAL_USERS.filter(u => u.role === "nurse").length;
  const complianceData = courses.filter(c => c.mandatory).map(c => {
    const done = INITIAL_USERS.filter(u => u.completions.includes(c.id)).length;
    return { ...c, pct: Math.round((done / totalNurses) * 100) };
  });
  return (
    <div>
      <div className="topbar"><div className="page-title">Compliance <span className="title-teal">Reports</span></div></div>
      <div className="stat-grid">
        <div className="stat-card teal"><div className="stat-val teal">{INITIAL_USERS.length}</div><div className="stat-label">Total Staff</div></div>
        <div className="stat-card green"><div className="stat-val green">{Math.round(complianceData.reduce((a, c) => a + c.pct, 0) / (complianceData.length || 1))}%</div><div className="stat-label">Avg Compliance</div></div>
        <div className="stat-card amber"><div className="stat-val amber">{courses.filter(c => c.mandatory).length}</div><div className="stat-label">Mandatory Courses</div></div>
        <div className="stat-card teal"><div className="stat-val teal">{INITIAL_USERS.filter(u => courses.filter(c => c.mandatory).every(c => u.completions.includes(c.id))).length}</div><div className="stat-label">Fully Compliant</div></div>
      </div>
      <div className="two-col" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="section-header"><div className="section-title">Course Compliance</div></div>
          {complianceData.map(c => (
            <div key={c.id} className="compliance-row">
              <div className="compliance-label" style={{ fontSize: 12 }}>{c.title.slice(0, 30)}{c.title.length > 30 ? "…" : ""}</div>
              <div className="compliance-bar-wrap"><div className="compliance-bar-fill" style={{ width: c.pct + "%", background: c.pct >= 80 ? "var(--green)" : c.pct >= 50 ? "var(--amber)" : "var(--red)" }} /></div>
              <div className="compliance-pct" style={{ color: c.pct >= 80 ? "var(--green)" : c.pct >= 50 ? "var(--amber)" : "var(--red)" }}>{c.pct}%</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-header"><div className="section-title">Staff Summary</div></div>
          <table>
            <thead><tr><th>Name</th><th>Dept</th><th>Completed</th><th>Status</th></tr></thead>
            <tbody>
              {INITIAL_USERS.filter(u => u.role === "nurse").map(u => {
                const mDone = courses.filter(c => c.mandatory && u.completions.includes(c.id)).length;
                const mTotal = courses.filter(c => c.mandatory).length;
                const pct = Math.round((mDone / (mTotal || 1)) * 100);
                return (
                  <tr key={u.id}>
                    <td><div className="avatar-cell"><div className="mini-avatar">{u.avatar}</div>{u.name.split(",")[0]}</div></td>
                    <td style={{ color: "var(--slate)", fontSize: 12 }}>{u.dept}</td>
                    <td style={{ fontFamily: "var(--mono)" }}>{u.completions.length}/{courses.length}</td>
                    <td><span className={`status-pill ${pct === 100 ? "complete" : pct > 0 ? "in-progress" : "not-started"}`}>{pct}%</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div className="section-header"><div className="section-title">All Staff Detail</div></div>
        <table>
          <thead><tr><th>Staff</th><th>Role</th><th>Department</th><th>Completed</th><th>Compliance</th></tr></thead>
          <tbody>
            {INITIAL_USERS.map(u => {
              const mDone = courses.filter(c => c.mandatory && u.completions.includes(c.id)).length;
              const mTotal = courses.filter(c => c.mandatory).length;
              const pct = Math.round((mDone / (mTotal || 1)) * 100);
              return (
                <tr key={u.id}>
                  <td><div className="avatar-cell"><div className={`mini-avatar${u.role === "manager" ? " mgr" : ""}`}>{u.avatar}</div><div><div style={{ fontSize: 13, fontWeight: 500 }}>{u.name.split(",")[0]}</div><div style={{ fontSize: 11, color: "var(--slate)" }}>{u.email}</div></div></div></td>
                  <td><span className="meta-chip" style={{ color: u.role === "manager" ? "var(--amber)" : "var(--teal)" }}>{u.role}</span></td>
                  <td style={{ color: "var(--slate)", fontSize: 13 }}>{u.dept}</td>
                  <td style={{ fontFamily: "var(--mono)", color: "var(--green)" }}>{u.completions.length}</td>
                  <td><span className={`status-pill ${pct === 100 ? "complete" : pct > 0 ? "in-progress" : "not-started"}`}>{pct}%</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", role: "nurse", dept: "Med-Surg", email: "" });
  const [toast, setToast] = useState(null);
  const set = (k, v) => setNewUser(p => ({ ...p, [k]: v }));
  const handleAdd = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers(p => [...p, { ...newUser, id: Date.now(), completions: [], inProgress: [], avatar: newUser.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() }]);
    setShowAdd(false);
    setToast("User added successfully!");
    setNewUser({ name: "", role: "nurse", dept: "Med-Surg", email: "" });
  };
  return (
    <div>
      <div className="topbar">
        <div className="page-title">User <span className="title-teal">Management</span></div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add User</button>
      </div>
      <div className="card">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Completions</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><div className="avatar-cell"><div className={`mini-avatar${u.role === "manager" ? " mgr" : ""}`}>{u.avatar}</div><div style={{ fontSize: 14, fontWeight: 500 }}>{u.name}</div></div></td>
                <td style={{ color: "var(--slate)", fontSize: 12, fontFamily: "var(--mono)" }}>{u.email}</td>
                <td><span className="meta-chip" style={{ color: u.role === "manager" ? "var(--amber)" : "var(--teal)" }}>{u.role}</span></td>
                <td style={{ color: "var(--slate)", fontSize: 13 }}>{u.dept}</td>
                <td style={{ fontFamily: "var(--mono)", color: "var(--green)" }}>{u.completions.length}</td>
                <td><button className="btn btn-ghost btn-sm" onClick={() => setToast("Transcript emailed!")}>Email Transcript</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAdd && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="modal" style={{ maxWidth: 480 }}>
            <div className="modal-header"><div style={{ fontSize: 18, fontWeight: 700 }}>Add New User</div><button className="modal-close" onClick={() => setShowAdd(false)}>&#10005;</button></div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">Full Name + Credentials</label><input className="form-input" value={newUser.name} onChange={e => set("name", e.target.value)} placeholder="e.g., Jane Smith, RN" /></div>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={newUser.email} onChange={e => set("email", e.target.value)} placeholder="jsmith@lvrc.org" /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Role</label><select className="form-input filter" value={newUser.role} onChange={e => set("role", e.target.value)}><option value="nurse">Nurse</option><option value="manager">Manager</option><option value="admin">Admin</option></select></div>
                <div className="form-group"><label className="form-label">Department</label><select className="form-input filter" value={newUser.dept} onChange={e => set("dept", e.target.value)}>{["ICU","Med-Surg","ED","Behavioral Health","Education","Administration"].map(d => <option key={d}>{d}</option>)}</select></div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAdd}>Add User</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [completions, setCompletions] = useState([1, 2, 3, 4, 5]);
  const currentUser = INITIAL_USERS[4];

  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "catalog", icon: "📚", label: "Course Catalog" },
    { id: "reports", icon: "📊", label: "Reports" },
    { id: "users", icon: "👥", label: "User Management" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">Care<span className="logo-teal">Learn</span></div>
            <div className="logo-sub">LVRC Learning Portal</div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section">Navigation</div>
            {navItems.map(item => (
              <button key={item.id} className={`nav-item${page === item.id ? " active" : ""}`} onClick={() => setPage(item.id)}>
                <span className="nav-icon">{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "0 12px" }}>
            <div className="sidebar-user">
              <div className="user-avatar mgr">{currentUser.avatar}</div>
              <div><div className="user-name">{currentUser.name.split(",")[0]}</div><div className="user-role">{currentUser.dept} · {currentUser.role}</div></div>
            </div>
          </div>
        </aside>
        <main className="main">
          {page === "dashboard" && <Dashboard courses={courses} completions={completions} />}
          {page === "catalog" && <CourseCatalog courses={courses} setCourses={setCourses} completions={completions} setCompletions={setCompletions} currentUser={currentUser} />}
          {page === "reports" && <Reports courses={courses} completions={completions} />}
          {page === "users" && <UserManagement />}
        </main>
      </div>
    </>
  );
}
