/**
 * Job Hunt Autopilot — Core Engine & Reactive UI Controller
 * Implements all Google Stitch Screens for Project 589930277291332544
 * (Executive Career Cockpit, Scam Radar & IC3 Dossier, Follow-up Queue,
 *  Interview Studio, Grafana SRE Telemetry & Confluence Retro)
 */

// Embedded fallback dataset (mirrors emails.json for standalone file:// operation)
const EMBEDDED_EMAILS = [
  {
    "id": 1,
    "company": "Stripe",
    "role": "Staff Full-Stack Engineer",
    "sender": "sarah.connor@stripe.com",
    "subject": "Stripe Technical Interview Invitation — Round 2 (Systems Scaling)",
    "date": "2026-10-31",
    "daysAgo": 2,
    "body": "Hi Alex,\n\nWe were really impressed by your initial technical screening! We would love to invite you to Round 2 of our interview process with our Engineering Director, David Zhang, and Principal Architect.\n\nThe discussion will focus on payment platform architecture, idempotency keys, and distributed system resilience.\n\nPlease pick a time on this link for a 45-minute Google Meet session: https://calendly.com/stripe-talent/alex-chen\n\nBest regards,\nSarah Connor | Stripe Talent Acquisition",
    "salary": "$250k - $290k",
    "location": "Remote (US/Global)"
  },
  {
    "id": 2,
    "company": "Global Tech Staffing Solutions",
    "role": "Cloud Specialist (Immediate Offer)",
    "sender": "hr.recruiter.globaltech@gmail.com",
    "subject": "CONGRATULATIONS: Selected as Cloud Specialist ($140k/yr)",
    "date": "2026-10-31",
    "daysAgo": 2,
    "body": "Dear Candidate,\n\nYou have been selected without technical interview due to urgent requirements on our client project. Your confirmed annual salary is $140,000.\n\nPlease note: candidates must deposit a mandatory refundable equipment & training fee of $150 (₹12,500) via Zelle or Crypto before our logistics team can courier the corporate Apple MacBook Pro M3.\n\nReply with payment slip immediately to claim your offer letter.",
    "salary": "$140,000",
    "location": "Remote"
  },
  {
    "id": 3,
    "company": "Google Cloud",
    "role": "Solutions Architect (Enterprise)",
    "sender": "recruiting@google.com",
    "subject": "Update regarding your Google Cloud application",
    "date": "2026-10-30",
    "daysAgo": 3,
    "body": "Hi Alex,\n\nThank you for taking the time to speak with our hiring team. After careful consideration, we have decided not to move forward with your candidacy for this particular role at this time.\n\nOur team was genuinely impressed by your deep background in Kubernetes and distributed systems. We will keep your resume on file for upcoming senior openings.\n\nWe wish you the very best in your search.",
    "salary": "$210k - $260k",
    "location": "Sunnyvale, CA / Hybrid"
  },
  {
    "id": 4,
    "company": "Infosys Offshore Career Desk",
    "role": "Senior Consultant — Cloud Modernization",
    "sender": "careers-verification@rediffmail.com",
    "subject": "Urgent Document Verification for Background Screening (Mandatory)",
    "date": "2026-10-29",
    "daysAgo": 4,
    "body": "Greetings Applicant,\n\nYour profile has been shortlisted from LinkedIn talent pool. Before scheduling an interview call with the Delivery Head, company compliance requires candidates to upload front and back scans of your Aadhaar card and PAN card, along with 6 months bank passbook copy for KYC background check.\n\nSend color scans to this email within 24 hours or your profile will be blacklisted.",
    "salary": "₹28 - 35 LPA",
    "location": "Bengaluru / Remote"
  },
  {
    "id": 5,
    "company": "Datadog",
    "role": "Frontend Engineer (Platform)",
    "sender": "no-reply@datadoghq.com",
    "subject": "Thank you for applying to Datadog!",
    "date": "2026-10-22",
    "daysAgo": 11,
    "body": "Hello Alex,\n\nWe have received your application for the Frontend Engineer (Platform) position. Our recruiting team will review your profile against our open requisitions and reach out if there is a match.\n\nYou can check the status of your application anytime in our Greenhouse candidate portal.\n\nBest regards,\nDatadog Talent Team",
    "salary": "$180k - $220k",
    "location": "New York / Remote"
  },
  {
    "id": 6,
    "company": "Figma",
    "role": "Senior Product Designer / Engineer",
    "sender": "recruiter-dave@figma.com",
    "subject": "Invitation: Portfolio & Code Architecture Walkthrough at Figma",
    "date": "2026-11-01",
    "daysAgo": 1,
    "body": "Hey Alex!\n\nLoved your open-source projects and component library on GitHub. Let's schedule a 60-minute session next Tuesday to walk through one of your system architectures and discuss our collaborative canvas engine.\n\nLooking forward to speaking!\n\nDave | Figma Engineering Recruiting",
    "salary": "$220k - $260k",
    "location": "San Francisco, CA"
  },
  {
    "id": 7,
    "company": "Notion Labs",
    "role": "Lead Product Specialist",
    "sender": "talent@makenotion.com",
    "subject": "Official Offer Letter: Lead Product Specialist @ Notion Labs",
    "date": "2026-11-02",
    "daysAgo": 0,
    "body": "Dear Alex,\n\nOn behalf of the entire Notion team, we are ecstatic to extend an offer of employment for the role of Lead Product Specialist!\n\nCompensation Summary:\n- Base Salary: $210,000 USD\n- Equity Grant: $180,000 RSU value (4-year vesting schedule)\n- Signing Incentive: $25,000 upfront\n\nYour official DocuSign agreement and benefits documentation are attached. Please review and sign by Friday.\n\nWelcome to Notion!",
    "salary": "$210,000 Base + $180k Equity",
    "location": "San Francisco / Remote"
  },
  {
    "id": 8,
    "company": "Amazon Web Services (AWS)",
    "role": "Software Development Engineer II",
    "sender": "aws-jobs@amazon.com",
    "subject": "Application Status: Software Development Engineer II (Job ID: 29841)",
    "date": "2026-10-18",
    "daysAgo": 15,
    "body": "Dear Candidate,\n\nThank you for your interest in Amazon Web Services. We are currently reviewing your qualifications against the requirements for this position. We appreciate your patience while this process is underway.\n\nDue to high volume, candidates will be notified once recruiter screening concludes.",
    "salary": "$175k - $215k",
    "location": "Seattle, WA"
  },
  {
    "id": 9,
    "company": "Airbnb",
    "role": "Staff PM, Guest Experience",
    "sender": "talent-acquisition@airbnb.com",
    "subject": "Confirmation of receipt: Staff PM Application",
    "date": "2026-10-15",
    "daysAgo": 18,
    "body": "Hi Alex,\n\nThanks for applying for the Staff PM, Guest Experience position. Our talent partner is currently evaluating candidates with our VP of Product.\n\nWe will get back to you with next steps soon.",
    "salary": "$240k - $280k",
    "location": "San Francisco, CA / Remote"
  },
  {
    "id": 10,
    "company": "Linear",
    "role": "Principal PM / Developer Advocate",
    "sender": "karri@linear.app",
    "subject": "Linear Application: Principal PM",
    "date": "2026-10-13",
    "daysAgo": 20,
    "body": "Hi Alex,\n\nYour background in high-velocity issue tracking and real-time collaboration fits what we are building at Linear. We are reviewing portfolios this month and will reach out if there is an alignment.\n\nBest,\nLinear Team",
    "salary": "$230k - $270k",
    "location": "Remote (Global)"
  },
  {
    "id": 11,
    "company": "Meta Platforms",
    "role": "Production Engineer (Infra)",
    "sender": "careers@meta.com",
    "subject": "Interview Scheduling: Technical Phone Screen with Meta",
    "date": "2026-10-31",
    "daysAgo": 2,
    "body": "Hi Alex,\n\nYour resume was referred to our Infrastructure Core team. We would like to schedule a 45-minute technical screen covering Linux kernel internals, troubleshooting, and Python/C++ automation.\n\nPlease select a timeslot here: https://meta.avature.net/portal/alex-chen\n\nMeta Recruiting",
    "salary": "$210k - $250k",
    "location": "Menlo Park, CA / Remote"
  },
  {
    "id": 12,
    "company": "Snowflake",
    "role": "Senior Cloud Data Engineer",
    "sender": "recruiting@snowflake.com",
    "subject": "Your application to Snowflake",
    "date": "2026-10-27",
    "daysAgo": 6,
    "body": "Hi Alex,\n\nThank you for applying to Snowflake! Our team has received your application and will review it shortly. You will hear from us if your skills match our open needs.\n\nSnowflake Talent Acquisition",
    "salary": "$190k - $230k",
    "location": "Bozeman, MT / Remote"
  },
  {
    "id": 13,
    "company": "Apex Career Accelerators",
    "role": "Direct Placement — Enterprise Cloud Architect ($220k)",
    "sender": "hiring.apexdesk@yahoo.com",
    "subject": "URGENT: Direct Placement Offer Letter + Laptop Allocation",
    "date": "2026-10-29",
    "daysAgo": 4,
    "body": "Dear Alex Chen,\n\nCongratulations! Apex Executive Desk has approved your candidacy for immediate client deployment. We do not require technical interviews because of your strong LinkedIn recommendations.\n\nTo lock your requisition ID and receive your corporate welcome kit, send a refundable compliance & anti-cheating assessment fee of $300 to our payroll officer via Zelle/PhonePe.\n\nFailure to submit receipt within 12 hours cancels the placement.",
    "salary": "$220,000",
    "location": "Remote"
  },
  {
    "id": 14,
    "company": "Microsoft Careers (Spoofed)",
    "role": "Azure Systems Architect",
    "sender": "hr-executive@micros0ft-careers.net",
    "subject": "Selected for Microsoft Azure Architecture Team (Pre-Onboarding Form)",
    "date": "2026-10-28",
    "daysAgo": 5,
    "body": "Dear Alex,\n\nMicrosoft Talent Acquisition is pleased to confirm your pre-selection for the Azure Cloud Platform group. Prior to issuing your employee ID and scheduling the team meet-and-greet, corporate compliance mandates submission of color copies of your PAN and Aadhaar cards, passport, and an advance courier insurance fee of $85.\n\nPlease reply with documents attached.",
    "salary": "$240k - $280k",
    "location": "Redmond, WA / Remote"
  },
  {
    "id": 15,
    "company": "Netflix",
    "role": "Senior Distributed Systems Engineer",
    "sender": "talent@netflix.com",
    "subject": "Netflix Technical Chat: Content Delivery Network & Open Connect",
    "date": "2026-10-29",
    "daysAgo": 4,
    "body": "Hi Alex,\n\nWe saw your blog post on distributed consensus and high-throughput streaming caches. We would love to chat informally for 30 minutes about our Open Connect team and recent architecture shifts.\n\nLet me know your availability for this Thursday or Friday!\n\nCheers,\nElena Rostova | Netflix Talent",
    "salary": "$350k - $450k (All-Cash)",
    "location": "Los Gatos, CA / Remote"
  },
  {
    "id": 16,
    "company": "Spotify",
    "role": "Backend Engineer (Playback Core)",
    "sender": "jobs@spotify.com",
    "subject": "Thank you for applying to Spotify",
    "date": "2026-10-26",
    "daysAgo": 7,
    "body": "Hej Alex,\n\nThanks for your interest in joining the band! We have received your application for Backend Engineer (Playback Core) and our talent team is currently reviewing your background.\n\nWe will be in touch with updates soon.\n\nBest,\nSpotify Talent Team",
    "salary": "$185k - $225k",
    "location": "Stockholm / New York"
  },
  {
    "id": 17,
    "company": "Ramp",
    "role": "Product Engineer (Spend & Cards)",
    "sender": "recruiter-mike@ramp.com",
    "subject": "Your Ramp Application — Status Update",
    "date": "2026-10-24",
    "daysAgo": 9,
    "body": "Hi Alex,\n\nThank you for giving us the opportunity to consider your background. We received an exceptionally high volume of applicants for Product Engineer (Spend & Cards), and we have decided not to move forward with your candidacy at this time.\n\nWe appreciate your interest in Ramp and wish you the best.",
    "salary": "$200k - $240k",
    "location": "New York, NY"
  },
  {
    "id": 18,
    "company": "Vercel",
    "role": "Edge Runtime Engineer",
    "sender": "careers@vercel.com",
    "subject": "Update on your application for Edge Runtime Engineer",
    "date": "2026-10-25",
    "daysAgo": 8,
    "body": "Hi Alex,\n\nThank you for your interest in Vercel and taking the time to apply. After reviewing your application, our team has chosen to pursue candidates whose background in Rust/V8 isolate runtimes more closely aligns with our immediate goals.\n\nWe wish you great success in your job search.",
    "salary": "$210k - $250k",
    "location": "Remote"
  },
  {
    "id": 19,
    "company": "Apple",
    "role": "Senior CoreOS Systems Engineer",
    "sender": "talent-recruiting@apple.com",
    "subject": "Thank you for applying to Apple",
    "date": "2026-10-20",
    "daysAgo": 13,
    "body": "Dear Alex,\n\nThank you for your interest in career opportunities at Apple. We have received your resume for the Senior CoreOS Systems Engineer opening. While your qualifications are impressive, we have filled this position with another candidate.\n\nWe encourage you to continue reviewing new opportunities on jobs.apple.com.",
    "salary": "$220k - $270k",
    "location": "Cupertino, CA"
  },
  {
    "id": 20,
    "company": "Anthropic",
    "role": "Systems Infrastructure Engineer (Claude Inference)",
    "sender": "careers@anthropic.com",
    "subject": "Anthropic: Application Confirmation",
    "date": "2026-10-28",
    "daysAgo": 5,
    "body": "Hi Alex,\n\nThank you for applying to Anthropic! We are building frontier AI safety and high-throughput inference clusters. Our technical recruiting team reviews applications continuously and will reach out if there is a strong match.\n\nBest,\nAnthropic Talent",
    "salary": "$260k - $320k",
    "location": "San Francisco, CA"
  }
];

const FREE_MAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'rediffmail.com', 'mail.com', 'proton.me'];

function safeCreateIcons() {
  if (typeof lucide !== 'undefined' && lucide && typeof lucide.createIcons === 'function') {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn("Lucide icon rendering skipped:", e);
    }
  }
}

/**
 * Autopilot Classification & Threat Engine
 */
function evaluateAutopilotRules(email) {
  const sender = email.sender || "";
  const domain = sender.split('@')[1] ? sender.split('@')[1].toLowerCase() : '';
  const text = ((email.subject || "") + " " + (email.body || "")).toLowerCase();
  const daysAgo = email.daysAgo || 0;

  let isScam = false;
  let scamReasons = [];

  // Rule 1: Advance Fee Demands
  const feeKeywords = [
    'training fee', 'equipment & training fee', 'refundable equipment', 'courier charge',
    'anti-cheating assessment fees', 'mandatory refundable', 'deposit of ₹', 'deposit of $',
    'deposit ₹', 'deposit $', 'gpay/phonepe', 'zelle', 'crypto', 'courier insurance fee'
  ];
  if (feeKeywords.some(kw => text.includes(kw))) {
    isScam = true;
    scamReasons.push("Advance Fee Scam: Demands upfront monetary payment (equipment deposit / assessment fee) before onboarding.");
  }

  // Rule 2: Free-mail sender impersonating corporate entity
  const isFreeMail = FREE_MAIL_DOMAINS.includes(domain);
  const corporateCues = [
    'selected', 'immediate offer', 'congratulations', 'urgent document',
    'direct selection', 'appointment letter', 'salary is $', 'lpa', 'selected without'
  ];
  if (isFreeMail && corporateCues.some(c => text.includes(c))) {
    isScam = true;
    scamReasons.push(`Free-mail Corporate Spoofing: Sender (@${domain}) poses as an enterprise recruitment officer without an official company domain.`);
  }

  // Rule 3: Premature sensitive document harvesting
  const piiKeywords = ['aadhaar', 'pan card', 'bank passbook', 'pan and aadhaar'];
  const prematureCues = ['prior to interview', 'before scheduling', 'before technical', 'prior to any', 'within 12 hours', 'within 24 hours', 'prior to issuing'];
  const hasPii = piiKeywords.some(k => text.includes(k));
  const hasPremature = prematureCues.some(c => text.includes(c));
  if (hasPii && (hasPremature || isFreeMail || domain.includes('micros0ft'))) {
    isScam = true;
    scamReasons.push("Identity Theft & PII Harvesting: Demands sensitive government IDs (Aadhaar / PAN / Bank Passbook) prior to any interview rounds.");
  }

  // Status Classification
  let status = "applied";
  if (isScam) {
    status = "scam";
  } else if (text.includes('offer letter') || text.includes('ecstatic to extend an offer')) {
    status = "offer";
  } else if (text.includes('interview') || text.includes('screening') || text.includes('walkthrough') || text.includes('technical chat') || text.includes('calendly.com') || text.includes('meta.avature.net')) {
    status = "interview";
  } else if (text.includes('not to move forward') || text.includes('not moving forward') || text.includes('other candidates') || text.includes('pursue candidates') || text.includes('unfortunately') || text.includes('filled this position')) {
    status = "rejected";
  } else {
    status = "applied";
  }

  // Follow-up determination (> 7 days silence on applied)
  const followUpDue = (status === 'applied' && daysAgo >= 7);

  // Auto-generate customized follow-up draft
  let followUpDraft = null;
  if (followUpDue) {
    const comp = email.company || "the team";
    const role = email.role || "the role";
    const dateStr = email.date || "recently";
    followUpDraft = {
      subject: `Following up on application: ${role} — Alex Chen`,
      body: `Dear ${comp} Hiring Team,\n\nI hope you are having a productive week.\n\nI am writing to respectfully follow up on my application for the ${role} position, submitted on ${dateStr} (${daysAgo} days ago).\n\nI remain deeply enthusiastic about ${comp}'s mission and would welcome the opportunity to discuss how my background in distributed systems and platform reliability can add immediate value.\n\nThank you for your time and consideration.\n\nBest regards,\nAlex Chen\nhttps://linkedin.com/in/alexchen • https://github.com/alexchen`
    };
  }

  return {
    ...email,
    evaluatedStatus: status,
    isScam: isScam,
    scamReasons: scamReasons,
    followUpDue: followUpDue,
    followUpDraft: followUpDraft
  };
}

let allEmails = [];
let filteredEmails = [];
let activeView = 'kanban';
let pipelineViewMode = 'columns'; // 'columns' or 'list'
let activeFollowupTab = 'due';
let activeFollowupTone = 'concierge';
let sirenActive = true;
let isMobileViewport = false;
let currentDevicePreset = 'iphone16pro';
let isSimulatorLandscape = false;
let currentSimulatorScale = 0.9;
let isRecordingMock = false;

let dbEngine = 'sqlite'; // 'sqlite' or 'indexeddb'
let idbInstance = null;

// IndexedDB Browser Storage Helper
function openIndexedDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    const req = window.indexedDB.open("JobHuntAutopilotDB", 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("applications")) {
        db.createObjectStore("applications", { keyPath: "id", autoIncrement: true });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = () => resolve(null);
  });
}

function getAllFromIndexedDB(db) {
  return new Promise((resolve) => {
    if (!db) { resolve([]); return; }
    try {
      const tx = db.transaction("applications", "readonly");
      const store = tx.objectStore("applications");
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch (e) {
      resolve([]);
    }
  });
}

function putRecordToIndexedDB(db, item) {
  return new Promise((resolve) => {
    if (!db) { resolve(); return; }
    try {
      const tx = db.transaction("applications", "readwrite");
      const store = tx.objectStore("applications");
      store.put(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) {
      resolve();
    }
  });
}

function clearIndexedDB(db) {
  return new Promise((resolve) => {
    if (!db) { resolve(); return; }
    try {
      const tx = db.transaction("applications", "readwrite");
      const store = tx.objectStore("applications");
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) {
      resolve();
    }
  });
}

/**
 * Initialize application: Connect to relational SQLite database or browser IndexedDB
 */
async function initAutopilot() {
  let sqliteActive = false;
  try {
    const statusRes = await fetch('/api/db/status');
    if (statusRes.ok) {
      const statusData = await statusRes.json();
      if (statusData.active) {
        sqliteActive = true;
        dbEngine = 'sqlite';
        safeSetText('db-status-badge-text', 'DB: SQLite Connected');
        safeSetText('db-modal-engine-text', 'Engine: Relational SQLite (autopilot.db)');
        safeSetText('db-modal-engine-badge', 'SQLite 3.14 (Active)');
      }
    }
  } catch (e) {
    sqliteActive = false;
  }

  if (sqliteActive) {
    try {
      const triageRes = await fetch('/api/triage');
      if (triageRes.ok) {
        const data = await triageRes.json();
        allEmails = data.emails;
      }
    } catch (e) {
      allEmails = EMBEDDED_EMAILS.map(evaluateAutopilotRules);
    }
  } else {
    // Client-side IndexedDB persistent engine
    dbEngine = 'indexeddb';
    safeSetText('db-status-badge-text', 'DB: IndexedDB Connected');
    safeSetText('db-modal-engine-text', 'Engine: Browser IndexedDB (JobHuntAutopilotDB)');
    safeSetText('db-modal-engine-badge', 'IndexedDB (Offline)');

    idbInstance = await openIndexedDB();
    let stored = await getAllFromIndexedDB(idbInstance);
    if (!stored || stored.length === 0) {
      stored = EMBEDDED_EMAILS.map(evaluateAutopilotRules);
      if (idbInstance) {
        for (const it of stored) {
          await putRecordToIndexedDB(idbInstance, it);
        }
      }
    }
    allEmails = stored;
  }

  safeSetText('db-modal-records-count', `${allEmails.length} Records`);
  filteredEmails = [...allEmails];
  renderAll();
  safeCreateIcons();
}

/**
 * Render all views and components
 */
function renderAll() {
  updateKPIs();
  renderKanban();
  renderScamRadar();
  renderFollowupQueue();
  renderInboxTable();
  renderIngestLog();
}

/**
 * Update Top Cockpit Telemetry & KPI counters
 */
function updateKPIs() {
  const counts = { applied: 0, interview: 0, rejected: 0, offer: 0, scam: 0, followups: 0 };
  allEmails.forEach(e => {
    if (e.isScam) counts.scam++;
    else counts[e.evaluatedStatus]++;
    if (e.followUpDue) counts.followups++;
  });

  safeSetText('kpi-total', allEmails.length);
  safeSetText('kpi-applied', counts.applied);
  safeSetText('kpi-interview', counts.interview);
  safeSetText('kpi-offer', counts.offer);
  safeSetText('kpi-rejected', counts.rejected);
  safeSetText('kpi-scams', counts.scam);

  safeSetText('badge-count-applied', counts.applied);
  safeSetText('badge-count-interview', counts.interview);
  safeSetText('badge-count-offer', counts.offer);
  safeSetText('badge-count-rejected', counts.rejected);

  safeSetText('sidebar-scam-badge', `${counts.scam} Blocked`);
  safeSetText('sidebar-followup-badge', `${counts.followups} Due`);
  safeSetText('telemetry-interviews', `${counts.interview} Interviews Scheduled`);
  safeSetText('telemetry-scams', `${counts.scam} Fake Offers Blocked`);
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

/**
 * Render Operational Kanban Matrix (Applied, Interview, Offers, Rejected) & List Mode
 */
function renderKanban() {
  const colApplied = document.getElementById('col-applied');
  const colInterview = document.getElementById('col-interview');
  const colOffer = document.getElementById('col-offer');
  const colRejected = document.getElementById('col-rejected');
  const listBody = document.getElementById('kanban-list-body');

  if (!colApplied || !colInterview || !colOffer || !colRejected) return;

  colApplied.innerHTML = '';
  colInterview.innerHTML = '';
  colOffer.innerHTML = '';
  colRejected.innerHTML = '';
  if (listBody) listBody.innerHTML = '';

  filteredEmails.forEach(item => {
    if (item.isScam) return; // Scams are quarantined into Scam Radar

    // Build List Row
    if (listBody) {
      const tr = document.createElement('tr');
      tr.className = "hover:bg-slate-50 transition-colors cursor-pointer";
      tr.onclick = () => openShelfDrawer(item.company, item.role, item.salary || '$180k+', item.evaluatedStatus);
      
      let stageBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">Applied</span>`;
      if (item.evaluatedStatus === 'interview') stageBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-100 text-indigo-700">Interview</span>`;
      if (item.evaluatedStatus === 'offer') stageBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 font-black">Offer ✓</span>`;
      if (item.evaluatedStatus === 'rejected') stageBadge = `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-500">Rejected</span>`;

      tr.innerHTML = `
        <td class="py-3 px-4">${stageBadge}</td>
        <td class="py-3 px-4 font-bold text-slate-900">${item.company} — <span class="font-normal text-slate-600">${item.role}</span></td>
        <td class="py-3 px-4 font-mono text-emerald-700 font-bold">${item.salary || 'Negotiable'}</td>
        <td class="py-3 px-4 text-slate-500 font-mono">${item.daysAgo}d ago</td>
        <td class="py-3 px-4 text-slate-600">${item.evaluatedStatus === 'interview' ? 'Prep System Design' : (item.evaluatedStatus === 'offer' ? 'Review Terms & Tax' : (item.followUpDue ? 'Follow-up Due' : 'Awaiting Review'))}</td>
        <td class="py-3 px-4 text-right">
          <button type="button" class="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 text-slate-700">
            Shelf →
          </button>
        </td>
      `;
      listBody.appendChild(tr);
    }

    // Build Kanban Card
    const card = document.createElement('div');
    card.onclick = () => openEmailModal(item.id);

    if (item.evaluatedStatus === 'applied') {
      card.className = "p-4 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col gap-2 group";
      let followUpNotice = item.followUpDue 
        ? `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-300">
             <i data-lucide="clock" class="w-3 h-3"></i> ${item.daysAgo}d ago • Follow-up Due
           </span>`
        : `<span class="text-[11px] text-slate-400 font-mono">${item.daysAgo === 0 ? 'Today' : item.daysAgo + 'd ago'}</span>`;

      card.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-600">${item.company}</span>
            <h4 class="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">${item.role}</h4>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">${item.date}</span>
        </div>
        <p class="text-xs text-slate-500 line-clamp-2">${item.subject}</p>
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span class="text-[10px] font-mono text-slate-600 font-semibold">${item.salary || 'Competitive'}</span>
          ${followUpNotice}
        </div>
        <div class="flex items-center justify-end gap-2 pt-1 border-t border-slate-50">
          <button type="button" onclick="event.stopPropagation(); openShelfDrawer('${item.company}', '${item.role}', '${item.salary || '$190k'}', 'applied')" class="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            Shelf <span class="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>
      `;
      colApplied.appendChild(card);
    } else if (item.evaluatedStatus === 'interview') {
      card.className = "p-4 rounded-xl bg-white border-2 border-indigo-300 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col gap-2 group";
      card.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <div>
            <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span> Round 2 Scheduled
            </span>
            <h4 class="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">${item.company} — ${item.role}</h4>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">${item.date}</span>
        </div>
        <p class="text-xs text-slate-600 line-clamp-2 font-medium">${item.subject}</p>
        <div class="pt-2 border-t border-indigo-100 flex items-center justify-between mt-auto">
          <span class="text-[11px] font-bold text-emerald-700 font-mono">${item.salary}</span>
          <button type="button" onclick="event.stopPropagation(); switchView('interview-studio')" class="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[10px] font-bold shadow-xs hover:bg-purple-700 transition-colors flex items-center gap-1">
            <i data-lucide="graduation-cap" class="w-3 h-3"></i> Prep Studio
          </button>
        </div>
      `;
      colInterview.appendChild(card);
    } else if (item.evaluatedStatus === 'offer') {
      card.className = "p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-400 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col gap-2 group";
      card.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <div>
            <span class="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
              <i data-lucide="award" class="w-3 h-3 text-emerald-700"></i> Legitimate Offer
            </span>
            <h4 class="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors mt-1">${item.company}</h4>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">${item.date}</span>
        </div>
        <p class="text-xs font-bold text-slate-800">${item.role}</p>
        <div class="p-2.5 bg-emerald-100/70 rounded-lg text-emerald-900 font-mono font-bold text-xs mt-1">
          ${item.salary}
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-emerald-200">
          <span class="text-[10px] text-slate-500 font-sans">${item.location}</span>
          <button type="button" onclick="event.stopPropagation(); openShelfDrawer('${item.company}', '${item.role}', '${item.salary}', 'offer')" class="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700">
            Review Terms & Tax
          </button>
        </div>
      `;
      colOffer.appendChild(card);
    } else if (item.evaluatedStatus === 'rejected') {
      card.className = "p-4 rounded-xl bg-white/80 border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col gap-2 group opacity-85 hover:opacity-100";
      card.innerHTML = `
        <div class="flex items-start justify-between gap-1">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${item.company}</span>
            <h4 class="text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">${item.role}</h4>
          </div>
          <span class="text-[10px] text-slate-400 font-mono">${item.daysAgo}d ago</span>
        </div>
        <p class="text-[11px] text-slate-400 line-clamp-1 italic">Role filled / Other candidates selected</p>
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span class="text-[10px] text-slate-400 font-mono">Logged to Archive</span>
          <button type="button" onclick="event.stopPropagation(); openShelfDrawer('${item.company}', '${item.role}', '${item.salary || '$190k'}', 'rejected')" class="text-[10px] text-indigo-600 font-semibold hover:underline">
            Keep-in-touch Draft
          </button>
        </div>
      `;
      colRejected.appendChild(card);
    }
  });

  safeCreateIcons();
}

/**
 * Switch Pipeline View Mode: Columns vs Compact List
 */
function setPipelineViewMode(mode) {
  pipelineViewMode = mode;
  const colContainer = document.getElementById('kanban-columns-container');
  const listContainer = document.getElementById('kanban-list-container');
  const btnCol = document.getElementById('btn-mode-kanban');
  const btnList = document.getElementById('btn-mode-list');

  if (mode === 'columns') {
    if (colContainer) colContainer.classList.remove('hidden');
    if (listContainer) listContainer.classList.add('hidden');
    if (btnCol) { btnCol.className = "px-3 py-1 rounded-lg bg-white text-slate-900 shadow-xs flex items-center gap-1.5 font-bold"; }
    if (btnList) { btnList.className = "px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 flex items-center gap-1.5"; }
  } else {
    if (colContainer) colContainer.classList.add('hidden');
    if (listContainer) listContainer.classList.remove('hidden');
    if (btnList) { btnList.className = "px-3 py-1 rounded-lg bg-white text-slate-900 shadow-xs flex items-center gap-1.5 font-bold"; }
    if (btnCol) { btnCol.className = "px-3 py-1 rounded-lg text-slate-600 hover:text-slate-900 flex items-center gap-1.5"; }
  }
}

/**
 * Render Scam Quarantine Radar (4 Predatory Scams with Evidence Badges)
 */
function renderScamRadar() {
  const container = document.getElementById('scam-radar-cards');
  if (!container) return;
  container.innerHTML = '';

  const scams = filteredEmails.filter(e => e.isScam);

  scams.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-3xl p-6 border-2 border-red-300 shadow-sm hover:shadow-scam-glow transition-all flex flex-col gap-4";

    const reasonItems = item.scamReasons.map(r => `
      <li class="flex items-start gap-2 text-xs text-red-900 font-semibold">
        <i data-lucide="alert-circle" class="w-4 h-4 text-red-600 shrink-0 mt-0.5"></i>
        <span>${r}</span>
      </li>
    `).join('');

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 border-b border-red-100 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white shadow-xs">
              Quarantined Threat
            </span>
            <span class="text-xs font-mono text-red-700 font-bold">${item.company}</span>
          </div>
          <h3 class="font-display font-extrabold text-sm text-slate-900 mt-1">${item.role}</h3>
        </div>
        <span class="text-[11px] font-mono text-slate-400">${item.date}</span>
      </div>

      <div class="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-slate-600">
        <div><strong>Sender:</strong> <span class="text-red-600 font-bold">${item.sender}</span></div>
        <div class="mt-1"><strong>Subject:</strong> ${item.subject}</div>
      </div>

      <div class="bg-red-50/70 p-4 rounded-2xl border border-red-200">
        <span class="text-[10px] font-bold uppercase tracking-wider text-red-700 block mb-2">Automated Heuristic Detection Triggers:</span>
        <ul class="space-y-1.5">${reasonItems}</ul>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 mt-auto">
        <button type="button" onclick="openEmailModal(${item.id})" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Inspect Raw Email
        </button>
        <button type="button" onclick="openIC3Modal()" class="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">gavel</span>
          <span>FBI IC3 Referral →</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  safeCreateIcons();
}

/**
 * Render Follow-up Queue (7-Day Silence Latency)
 */
function renderFollowupQueue() {
  const container = document.getElementById('followup-queue-list');
  if (!container) return;
  container.innerHTML = '';

  const followups = filteredEmails.filter(e => e.followUpDue);

  if (followups.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-8 text-center border border-slate-200">
        <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <i data-lucide="check-circle" class="w-6 h-6"></i>
        </div>
        <h3 class="font-display font-bold text-slate-900 text-sm">All Follow-ups Cleared</h3>
        <p class="text-xs text-slate-500 mt-1">No applications are currently past the 7-day silence threshold.</p>
      </div>
    `;
    return;
  }

  followups.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col gap-4";

    const draft = item.followUpDraft;

    card.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
            ${item.daysAgo}d
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-display font-bold text-sm text-slate-900">${item.company}</h3>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                ${item.daysAgo} Days of Silence
              </span>
            </div>
            <p class="text-xs text-slate-500">${item.role} • Applied: ${item.date}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" onclick="snoozeFollowup('${item.company}')" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">
            Snooze 3d
          </button>
          <button type="button" onclick="markHeardBack('${item.company}')" class="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            Mark Heard Back
          </button>
        </div>
      </div>

      <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pre-Drafted Contextual Nudge (${activeFollowupTone}):</span>
          <button type="button" onclick="openFollowupModal('${item.company}', '${item.role}', '${item.sender}')" class="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">edit</span> Edit Draft
          </button>
        </div>
        <div class="font-mono text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed whitespace-pre-line">
          ${draft ? draft.body : 'Follow-up draft ready.'}
        </div>
      </div>

      <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button type="button" onclick="copyFollowUp('${encodeURIComponent(draft ? draft.body : '')}')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Draft
        </button>
        <button type="button" onclick="sendFollowupModal('${item.company}')" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">send</span>
          <span>Send Follow-Up</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  safeCreateIcons();
}

/**
 * Render Synced Inbound Ledger Table (20 Emails)
 */
function renderInboxTable() {
  const tbody = document.getElementById('inbox-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  filteredEmails.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-slate-50 transition-colors cursor-pointer";
    tr.onclick = () => openEmailModal(item.id);

    let statusBadge = '';
    if (item.isScam) {
      statusBadge = `<span class="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-red-600 text-white px-2 py-0.5 rounded-full"><i data-lucide="alert-triangle" class="w-3 h-3"></i> Fake Offer</span>`;
    } else if (item.evaluatedStatus === 'interview') {
      statusBadge = `<span class="text-[10px] font-bold uppercase bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">Interview</span>`;
    } else if (item.evaluatedStatus === 'offer') {
      statusBadge = `<span class="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Offer</span>`;
    } else if (item.evaluatedStatus === 'rejected') {
      statusBadge = `<span class="text-[10px] font-semibold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">Rejected</span>`;
    } else {
      statusBadge = `<span class="text-[10px] font-semibold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">Applied</span>`;
    }

    tr.innerHTML = `
      <td class="py-3 px-4">${statusBadge}</td>
      <td class="py-3 px-4 font-bold text-slate-900">${item.company}</td>
      <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${item.sender}</td>
      <td class="py-3 px-4 font-medium text-slate-800">${item.subject}</td>
      <td class="py-3 px-4 font-mono text-slate-400">${item.date}</td>
      <td class="py-3 px-4 text-indigo-600 font-bold hover:underline">Inspect →</td>
    `;
    tbody.appendChild(tr);
  });

  safeCreateIcons();
}

/**
 * Render Ingest Log Stream into Log Modal
 */
function renderIngestLog() {
  const container = document.getElementById('ingest-log-stream');
  if (!container) return;
  container.innerHTML = '';

  allEmails.forEach((email, i) => {
    const row = document.createElement('div');
    const isThreat = email.isScam;
    const tagClass = isThreat ? 'text-red-600 bg-red-50 border-red-200' : 'text-emerald-700 bg-emerald-50 border-emerald-200';
    const tagText = isThreat ? 'THREAT_QUARANTINED' : 'TRIAGED_OK';

    row.className = "p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2";
    row.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-slate-400 text-[10px]">#00${i+1}</span>
        <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${tagClass}">${tagText}</span>
        <span class="font-bold text-slate-800">${email.company}</span>
        <span class="text-slate-500 text-[11px]">(${email.role})</span>
      </div>
      <div class="flex items-center gap-3 text-[10px] text-slate-400">
        <span>DKIM: PASS</span>
        <span>•</span>
        <span>Latency: ${12 + (i % 8)}ms</span>
        <span>•</span>
        <span class="text-slate-600 font-bold">${email.evaluatedStatus.toUpperCase()}</span>
      </div>
    `;
    container.appendChild(row);
  });
}

/**
 * Switch top-level views: kanban, scam-radar, follow-up, interview-studio, grafana-retro, inbox
 */
function switchView(viewName) {
  activeView = viewName;

  const views = ['kanban', 'scam-radar', 'follow-up', 'interview-studio', 'grafana-retro', 'inbox'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.remove('hidden');
        el.classList.add('flex');
      } else {
        el.classList.add('hidden');
        el.classList.remove('flex');
      }
    }

    const tab = document.getElementById(`tab-${v}`);
    if (tab) {
      if (v === viewName) {
        tab.className = "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all";
      } else {
        tab.className = "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all";
      }
    }
  });

  syncMobileNavActiveTab();
  safeCreateIcons();
}

/**
 * Filter Content across all views by search keyword and priority
 */
function filterContent() {
  const query = (document.getElementById('filter-input')?.value || "").toLowerCase();
  const priority = document.getElementById('priority-filter')?.value || 'all';
  const inboxStatus = document.getElementById('inbox-status-filter')?.value || 'all';

  filteredEmails = allEmails.filter(item => {
    const matchesQuery = 
      (item.company || "").toLowerCase().includes(query) ||
      (item.role || "").toLowerCase().includes(query) ||
      (item.sender || "").toLowerCase().includes(query) ||
      (item.subject || "").toLowerCase().includes(query);

    let matchesPriority = true;
    if (priority === 'high') {
      matchesPriority = (item.salary && (item.salary.includes('$2') || item.salary.includes('$3')));
    } else if (priority === 'urgent') {
      matchesPriority = item.daysAgo <= 3;
    }

    let matchesInboxStatus = true;
    if (inboxStatus !== 'all') {
      if (inboxStatus === 'scam') matchesInboxStatus = item.isScam;
      else matchesInboxStatus = !item.isScam && item.evaluatedStatus === inboxStatus;
    }

    return matchesQuery && matchesPriority && matchesInboxStatus;
  });

  renderKanban();
  renderScamRadar();
  renderFollowupQueue();
  renderInboxTable();
}

/**
 * Open Application Shelf Drawer (Stitch Screen 53491d69f61f40c19d01b0d535d477fd)
 */
function openShelfDrawer(company, role, salary, category) {
  const drawer = document.getElementById('shelf-drawer');
  if (!drawer) return;

  safeSetText('shelf-company-role', `${company} — ${role}`);
  safeSetText('shelf-salary', salary || '$200,000+');

  const stratEl = document.getElementById('shelf-strategy');
  if (stratEl) {
    stratEl.innerText = category === 'offer'
      ? "Validate equity refresh cadences. Inquire about non-dilution rights and request 100% remote tax assistance reimbursement."
      : "Highlight horizontal distributed reliability credentials and cross-functional staff engineering leadership during discussion.";
  }

  drawer.classList.remove('translate-x-full');
  safeCreateIcons();
}

function closeShelfDrawer() {
  const drawer = document.getElementById('shelf-drawer');
  if (drawer) drawer.classList.add('translate-x-full');
}

function copyShelfDraft() {
  const text = document.getElementById('shelf-keepintouch')?.innerText || "";
  navigator.clipboard.writeText(text);
  showToast("Draft copied to clipboard!");
}

/**
 * Open Email Detail & Threat Inspector Modal
 */
function openEmailModal(id) {
  const item = allEmails.find(e => e.id === id);
  if (!item) return;

  const modal = document.getElementById('email-detail-modal');
  const subjectEl = document.getElementById('modal-subject');
  const metaEl = document.getElementById('modal-meta');
  const bodyEl = document.getElementById('modal-body');
  const alertBox = document.getElementById('modal-scam-alert');
  const reasonsEl = document.getElementById('modal-scam-reasons');
  const iconBox = document.getElementById('modal-badge-icon');
  const headerBg = document.getElementById('modal-header-bg');

  if (subjectEl) subjectEl.innerText = item.subject;
  if (metaEl) metaEl.innerText = `From: ${item.sender} • Received: ${item.date} (${item.daysAgo} days ago)`;
  if (bodyEl) bodyEl.innerText = item.body;

  if (item.isScam) {
    if (alertBox) alertBox.classList.remove('hidden');
    if (headerBg) headerBg.className = "p-6 border-b border-red-100 bg-red-50 flex items-center justify-between";
    if (iconBox) {
      iconBox.className = "p-2.5 rounded-xl bg-red-600 text-white";
      iconBox.innerHTML = `<i data-lucide="shield-alert" class="w-5 h-5"></i>`;
    }
    if (reasonsEl) {
      reasonsEl.innerHTML = item.scamReasons.map(r => `<div>• ${r}</div>`).join('');
    }
  } else {
    if (alertBox) alertBox.classList.add('hidden');
    if (headerBg) headerBg.className = "p-6 border-b border-slate-100 bg-white flex items-center justify-between";
    if (iconBox) {
      iconBox.className = "p-2.5 rounded-xl bg-indigo-50 text-indigo-700";
      iconBox.innerHTML = `<i data-lucide="mail-open" class="w-5 h-5"></i>`;
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  safeCreateIcons();
}

function closeEmailModal() {
  const modal = document.getElementById('email-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

/**
 * Modals: OAuth Connect Modal
 */
function openConnectModal() {
  const m = document.getElementById('connect-modal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
  safeCreateIcons();
}

function closeConnectModal() {
  const m = document.getElementById('connect-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function simulateOAuthConnect(provider) {
  showToast(`Connected ${provider} successfully (OAuth 2.0 PKCE Verified)!`);
  closeConnectModal();
}

/**
 * Modals: Ingest Log Modal
 */
function openLogModal() {
  const m = document.getElementById('log-modal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
  safeCreateIcons();
}

function closeLogModal() {
  const m = document.getElementById('log-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

/**
 * Modals: FBI IC3 Referral Dossier Modal
 */
function openIC3Modal() {
  const m = document.getElementById('ic3-modal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
  safeCreateIcons();
}

function closeIC3Modal() {
  const m = document.getElementById('ic3-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function transmitIC3Referral() {
  showToast("Transmitted verified SHA-384 evidence package to FBI IC3 Gateway (HTTP 200 OK)!");
  closeIC3Modal();
}

function exportSTIXJson() {
  const stixData = {
    type: "bundle",
    id: "bundle--9f834a2e-1d7b-4f3e-bc01-ic3202698412",
    spec_version: "2.1",
    objects: [
      {
        type: "indicator",
        id: "indicator--c2-recruitment-fraud",
        name: "Advance Fee & Identity Extortion C2",
        pattern: "[ipv4-addr:value = '185.220.101.44']",
        valid_from: new Date().toISOString()
      }
    ]
  };
  const blob = new Blob([JSON.stringify(stixData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "stix-2.1-ic3-threat-intel.json";
  a.click();
  showToast("Exported STIX 2.1 Threat Intel (.json)!");
}

function downloadForensicEvidenceZip() {
  showToast("Downloading forensic package (evidence_ic3_98412.zip • 4.8MB)...");
}

/**
 * Modals: AI Mock Interview Studio Modal
 */
function openMockStudioModal() {
  const m = document.getElementById('mock-modal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
  safeCreateIcons();
}

function closeMockStudioModal() {
  const m = document.getElementById('mock-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function openPracticeQuestion(num) {
  const titleEl = document.getElementById('mock-question-title');
  if (titleEl) {
    if (num === 1) titleEl.innerText = `"How would you design rate-limiting and billing metering for LLM agent usage at Stripe scale?"`;
    if (num === 2) titleEl.innerText = `"Tell me about a time you had to sunset an API that hundreds of enterprise customers relied on."`;
    if (num === 3) titleEl.innerText = `"How do you resolve conflict between developer purity and immediate business revenue pressure?"`;
  }
  openMockStudioModal();
}

function toggleMockRecording() {
  isRecordingMock = !isRecordingMock;
  const btn = document.getElementById('btn-mock-record');
  const label = document.getElementById('btn-mock-record-label');
  const status = document.getElementById('mock-audio-status');

  if (isRecordingMock) {
    if (btn) btn.className = "px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-2 shadow-lg animate-pulse transition-all";
    if (label) label.innerText = "Recording Answer... (AI Evaluating)";
    if (status) status.innerText = "Audio stream active • Evaluating STAR rubric against Stripe engineering bar...";
  } else {
    if (btn) btn.className = "px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 shadow-lg transition-all";
    if (label) label.innerText = "Start Speaking (AI Listens)";
    if (status) status.innerText = "Analysis Complete: 94 / 100 • Strong Hire Recommendation logged.";
    showToast("AI Scorecard generated: 94/100 (Strong Hire)!");
  }
}

function downloadInterviewScorecardPDF() {
  showToast("Exported 1-Page Interview Drill Scorecard Receipt (.pdf)!");
}

/**
 * Modals: Follow-up Customizer Modal
 */
function openFollowupModal(company, role, recipient) {
  const m = document.getElementById('followup-modal');
  safeSetText('followup-modal-title', `Follow-up: ${company}`);
  safeSetText('followup-modal-recipient', `To: ${recipient || 'Recruiting Partner'}`);

  const textarea = document.getElementById('followup-modal-textarea');
  if (textarea) {
    textarea.value = `Dear ${company} Hiring Team,\n\nI hope you are having a productive week.\n\nI am writing to respectfully follow up on my application for the ${role} opening. I remain deeply enthusiastic about ${company}'s technical trajectory and look forward to any updates from the team.\n\nBest regards,\nAlex Chen\nhttps://linkedin.com/in/alexchen`;
  }

  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
  safeCreateIcons();
}

function closeFollowupModal() {
  const m = document.getElementById('followup-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function applyFollowupTone(tone) {
  activeFollowupTone = tone;
  const textarea = document.getElementById('followup-modal-textarea');
  if (!textarea) return;

  if (tone === 'concierge') {
    textarea.value = `Dear Hiring Team,\n\nI hope your quarter is off to an excellent start.\n\nI am following up on my recently submitted candidacy for the senior engineering opening. Understanding the leadership team's priority on scalable infrastructure, I wanted to reaffirm my strong enthusiasm and readiness to connect.\n\nWarm regards,\nAlex Chen`;
  } else if (tone === 'polite') {
    textarea.value = `Hi there,\n\nHope you're having a good week! Just checking in on the status of my application submitted earlier this month. Please let me know if there are any additional portfolio samples or code repositories I can provide.\n\nThanks,\nAlex Chen`;
  } else {
    textarea.value = `Hey team,\n\nQuick check-in on my application! Still excited about what you're shipping and would love to chat if the timing aligns.\n\nBest,\nAlex`;
  }
  showToast(`Tone updated to: ${tone}`);
}

function copyFollowupDraft() {
  const t = document.getElementById('followup-modal-textarea')?.value || "";
  navigator.clipboard.writeText(t);
  showToast("Follow-up draft copied to clipboard!");
}

function sendFollowupModal(company) {
  showToast(`Automated follow-up sent to ${company || 'Recruiter'}!`);
  closeFollowupModal();
}

function batchSendFollowups() {
  showToast("Batch sent 4 personalized follow-up nudges with 7-day latency timestamps!");
}

function snoozeFollowup(company) {
  showToast(`Snoozed follow-up for ${company} by 3 days.`);
}

function markHeardBack(company) {
  showToast(`Marked ${company} as Heard Back. Moved to Active Interview queue!`);
}

function copyFollowUp(encodedText) {
  const text = decodeURIComponent(encodedText);
  navigator.clipboard.writeText(text);
  showToast("Follow-up email copied to clipboard!");
}

function filterFollowupTab(tab) {
  activeFollowupTab = tab;
  showToast(`Filtered follow-up queue: ${tab.toUpperCase()}`);
}

/**
 * Siren & Security Controls
 */
function toggleSirenMute() {
  sirenActive = !sirenActive;
  const status = document.getElementById('siren-status-text');
  const label = document.getElementById('btn-siren-label');

  if (sirenActive) {
    if (status) { status.innerText = "Active (85 dB)"; status.className = "font-mono text-red-600 font-bold"; }
    if (label) label.innerText = "Auto-Mute Focus (0 dB)";
    showToast("Threat Ingestion Siren un-muted (85 dB).");
  } else {
    if (status) { status.innerText = "Muted Focus Block (0 dB)"; status.className = "font-mono text-slate-500 font-semibold"; }
    if (label) label.innerText = "Un-mute Siren (85 dB)";
    showToast("17:30 Focus Block Triggered: Siren Auto-Muted (0 dB).");
  }
}

/**
 * Telemetry Manifest Download
 */
function exportTelemetryManifest() {
  const manifest = {
    exportedAt: new Date().toISOString(),
    system: "Job Hunt Autopilot Executive Career Cockpit",
    version: "3.2.0",
    metrics: {
      totalParsed: allEmails.length,
      quarantinedScams: allEmails.filter(e => e.isScam).length,
      activeInterviews: allEmails.filter(e => e.evaluatedStatus === 'interview').length,
      offers: allEmails.filter(e => e.evaluatedStatus === 'offer').length,
      totalShieldedLoss: "$0.00"
    },
    emails: allEmails
  };

  const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "autopilot-telemetry-manifest.json";
  a.click();
  showToast("Exported Telemetry Manifest (.json)!");
}

/**
 * SRE & Grafana Controls
 */
function triggerCorruptedChecksumSim() {
  showToast("Simulated corrupt checksum: Automated quarantine triggered for Envoy DSS dictionary!");
}

function openPromqlDrawer() {
  showToast("PromQL Inspector: query `sum(rate(envoy_http_downstream_cx_total[5m]))`");
}

function exportIncidentRetroPDF() {
  showToast("Exported Confluence Postmortem INC-98412 (.pdf) with Zoom ASR transcript!");
}

/**
 * Viewport Toggle (Simulates Desktop Cockpit vs Mobile Device Frame)
 */
function toggleViewportMode() {
  isMobileViewport = !isMobileViewport;
  applyViewportMode();
}

/**
 * Apply or Revert Mobile Device Simulator Workbench
 */
function applyViewportMode() {
  const desktopHeader = document.getElementById('desktop-app-header');
  const simBar = document.getElementById('mobile-simulator-bar');
  const container = document.getElementById('viewport-container');
  const chassis = document.getElementById('device-chassis');
  const bezelTop = document.getElementById('phone-bezel-top');
  const bottomNav = document.getElementById('phone-bottom-nav');
  const homeIndicator = document.getElementById('phone-home-indicator');
  const scrollViewport = document.getElementById('device-scroll-viewport');
  const btn = document.getElementById('btn-viewport-toggle');

  if (isMobileViewport) {
    document.body.classList.add('mobile-simulator-active');
    if (desktopHeader) desktopHeader.classList.add('hidden');
    if (simBar) {
      simBar.classList.remove('hidden');
      simBar.classList.add('flex');
    }
    if (bezelTop) {
      bezelTop.classList.remove('hidden');
      bezelTop.classList.add('flex');
    }
    if (bottomNav) {
      bottomNav.classList.remove('hidden');
      bottomNav.classList.add('flex');
    }
    if (homeIndicator) {
      homeIndicator.classList.remove('hidden');
      homeIndicator.classList.add('flex');
    }

    if (container) {
      container.className = "w-full flex-1 flex flex-col items-center justify-start py-6 px-2 transition-all duration-300";
    }

    applyDeviceDimensions();

    if (scrollViewport) {
      scrollViewport.className = "w-full flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-50";
    }

    if (btn) {
      btn.className = "p-2 rounded-xl bg-indigo-600 text-white transition-colors shadow-sm";
      btn.title = "Exit Mobile Viewport (Esc)";
    }

    updateSimulatorClock();
    syncMobileNavActiveTab();
    safeCreateIcons();
    showToast("📱 Mobile Device Viewport Active ([MOBILE] Stitch Screen View)!");
  } else {
    document.body.classList.remove('mobile-simulator-active');
    if (desktopHeader) desktopHeader.classList.remove('hidden');
    if (simBar) {
      simBar.classList.add('hidden');
      simBar.classList.remove('flex');
    }
    if (bezelTop) {
      bezelTop.classList.add('hidden');
      bezelTop.classList.remove('flex');
    }
    if (bottomNav) {
      bottomNav.classList.add('hidden');
      bottomNav.classList.remove('flex');
    }
    if (homeIndicator) {
      homeIndicator.classList.add('hidden');
      homeIndicator.classList.remove('flex');
    }

    if (container) {
      container.className = "w-full flex-1 flex flex-col transition-all duration-300";
      container.style.transform = '';
    }

    if (chassis) {
      chassis.className = "w-full flex-1 flex flex-col transition-all duration-300";
      chassis.style.width = '';
      chassis.style.height = '';
      chassis.style.maxWidth = '';
      chassis.style.maxHeight = '';
      chassis.style.transform = '';
    }

    if (scrollViewport) {
      scrollViewport.className = "w-full flex-1 flex flex-col";
    }

    if (btn) {
      btn.className = "p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors";
      btn.title = "Toggle Mobile Device Viewport";
    }

    safeCreateIcons();
    showToast("🖥️ Desktop Cockpit View Active!");
  }
}

/**
 * Configure Smartphone Hardware Chassis & Resolution Presets
 */
function applyDeviceDimensions() {
  const chassis = document.getElementById('device-chassis');
  if (!chassis) return;

  const devices = {
    iphone16pro: { width: 393, height: 852 },
    pixel9: { width: 412, height: 924 },
    ipadmini: { width: 768, height: 1024 }
  };

  const dev = devices[currentDevicePreset] || devices.iphone16pro;
  let w = isSimulatorLandscape ? dev.height : dev.width;
  let h = isSimulatorLandscape ? dev.width : dev.height;

  // Max height limit relative to window viewport so it stays comfortably in view
  const availableScreenHeight = Math.max(640, window.innerHeight - 110);
  const constrainedHeight = Math.min(h, availableScreenHeight);

  chassis.className = "mobile-simulator-chassis flex flex-col shadow-2xl relative select-none transition-all duration-300";
  chassis.style.width = `${w}px`;
  chassis.style.height = `${constrainedHeight}px`;
  chassis.style.maxWidth = '96vw';
  chassis.style.transform = `scale(${currentSimulatorScale})`;
  chassis.style.transformOrigin = 'top center';
}

function changeSimulatorDevice(device) {
  currentDevicePreset = device;
  if (isMobileViewport) {
    applyDeviceDimensions();
    const names = { iphone16pro: 'Apple iPhone 16 Pro (393 × 852)', pixel9: 'Google Pixel 9 (412 × 924)', ipadmini: 'Apple iPad Mini (768 × 1024)' };
    showToast(`📱 Preset: ${names[device] || device}`);
  }
}

function rotateSimulator() {
  isSimulatorLandscape = !isSimulatorLandscape;
  if (isMobileViewport) {
    applyDeviceDimensions();
    showToast(`🔄 Orientation: ${isSimulatorLandscape ? 'Landscape' : 'Portrait'}`);
  }
}

function changeSimulatorScale(scale) {
  currentSimulatorScale = parseFloat(scale) || 0.9;
  if (isMobileViewport) {
    applyDeviceDimensions();
  }
}

function updateSimulatorClock() {
  const clockEl = document.getElementById('simulator-clock');
  if (!clockEl) return;
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  clockEl.innerText = `${hours}:${minutes}`;
}

function syncMobileNavActiveTab() {
  const navTabs = ['kanban', 'scam-radar', 'follow-up', 'interview-studio', 'grafana-retro'];
  navTabs.forEach(tabName => {
    const el = document.getElementById(`mob-nav-${tabName}`);
    if (!el) return;
    if (tabName === activeView) {
      el.className = "flex flex-col items-center gap-0.5 py-1 px-2 text-indigo-600 font-bold transition-colors";
    } else {
      el.className = "flex flex-col items-center gap-0.5 py-1 px-2 text-slate-500 hover:text-slate-800 transition-colors";
    }
  });
}

// Global Keyboard Shortcut: Press Escape to return to Desktop Cockpit
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMobileViewport) {
    toggleViewportMode();
  }
});

/**
 * Toast Notification with Progress Bar
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('global-toast');
  const msgEl = document.getElementById('global-toast-message');
  const progressBar = document.getElementById('toast-progress-bar');

  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  if (progressBar) {
    progressBar.style.width = '100%';
    setTimeout(() => { progressBar.style.width = '0%'; }, 50);
  }

  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, duration);
}

/**
 * Trigger Autopilot Ingestion (Re-Scan)
 */
async function triggerAutopilotIngestion() {
  const btn = document.getElementById('btn-run-autopilot');
  if (btn) {
    btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>Scanning...</span>`;
    safeCreateIcons();
  }

  showToast("Scanning candidate mailbox for new ATS messages and interview updates...");

  setTimeout(() => {
    initAutopilot();
    if (btn) {
      btn.innerHTML = `<i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i><span>Re-Scan</span>`;
      safeCreateIcons();
    }
    showToast("Triage complete: 20 emails indexed, 4 predatory scams quarantined!");
  }, 700);
}

/**
 * Database Management Controls (SQLite & IndexedDB)
 */
function openDatabaseModal() {
  const m = document.getElementById('db-modal');
  safeSetText('db-modal-records-count', `${allEmails.length} Records`);
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
  safeCreateIcons();
}

function closeDatabaseModal() {
  const m = document.getElementById('db-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function openAddAppModal() {
  const m = document.getElementById('add-app-modal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
  safeCreateIcons();
}

function closeAddAppModal() {
  const m = document.getElementById('add-app-modal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

async function handleCreateApplication(event) {
  event.preventDefault();
  const company = document.getElementById('new-app-company')?.value.trim();
  const role = document.getElementById('new-app-role')?.value.trim();
  const salary = document.getElementById('new-app-salary')?.value.trim() || 'Negotiable';
  const status = document.getElementById('new-app-status')?.value || 'applied';
  const sender = document.getElementById('new-app-sender')?.value.trim() || 'recruiter@company.com';
  const notes = document.getElementById('new-app-notes')?.value.trim() || '';

  if (!company || !role) {
    showToast("Please enter Company Name and Role!");
    return;
  }

  const newApp = {
    id: Date.now(),
    company: company,
    role: role,
    sender: sender,
    subject: `Application Submitted: ${role} @ ${company}`,
    body: `Application recorded in Database. Notes: ${notes}`,
    date: new Date().toISOString().split('T')[0],
    daysAgo: 0,
    salary: salary,
    location: "Remote / Hybrid",
    evaluatedStatus: status,
    isScam: false,
    scamReasons: [],
    followUpDue: false,
    followUpDraft: null,
    notes: notes
  };

  if (dbEngine === 'sqlite') {
    try {
      const res = await fetch('/api/db/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company,
          role: role,
          salary: salary,
          status: status,
          sender: sender,
          notes: notes
        })
      });
      if (res.ok) {
        showToast(`Saved ${company} to SQLite Database (autopilot.db)!`);
      }
    } catch (e) {
      console.warn("SQLite save error, saving in-memory:", e);
    }
  } else if (idbInstance) {
    await putRecordToIndexedDB(idbInstance, newApp);
    showToast(`Saved ${company} to IndexedDB!`);
  }

  allEmails.unshift(newApp);
  filteredEmails = [...allEmails];
  renderAll();
  closeAddAppModal();
  showToast(`Application for ${company} added successfully!`);
}

async function resetDatabaseToSample() {
  if (confirm("Reset database back to the default 20 sample job seeker emails?")) {
    if (dbEngine === 'sqlite') {
      try {
        await fetch('/api/db/reset', { method: 'POST' });
        showToast("Relational SQLite database reset to 20 emails.");
      } catch (e) {}
    } else if (idbInstance) {
      await clearIndexedDB(idbInstance);
      const defaults = EMBEDDED_EMAILS.map(evaluateAutopilotRules);
      for (const item of defaults) {
        await putRecordToIndexedDB(idbInstance, item);
      }
      showToast("IndexedDB reset to 20 sample emails.");
    }
    await initAutopilot();
    closeDatabaseModal();
  }
}

function exportDatabaseBackup() {
  const exportPayload = {
    database: dbEngine,
    version: "3.2.0",
    exportedAt: new Date().toISOString(),
    recordCount: allEmails.length,
    applications: allEmails
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `autopilot-${dbEngine}-backup.json`;
  a.click();
  showToast(`Exported ${allEmails.length} database records to JSON!`);
}

// Kick off initialization on DOM ready
document.addEventListener('DOMContentLoaded', initAutopilot);
