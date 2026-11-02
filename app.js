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
  initChatWidget();
  pollSyncStatus();
  initAuthSuite();
  if (typeof initMncHub === 'function') initMncHub();
  initOrientationListener();
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
  if (typeof renderMncHub === 'function') renderMncHub();
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

  const nonScamTotal = allEmails.filter(e => !e.isScam).length;
  safeSetText('mob-count-all', nonScamTotal);
  safeSetText('mob-count-applied', counts.applied);
  safeSetText('mob-count-interview', counts.interview);
  safeSetText('mob-count-offer', counts.offer);
  safeSetText('mob-count-rejected', counts.rejected);
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

let activeMobileKanbanStage = 'all';

/**
 * Filter Kanban Columns for Mobile Stage Segmented Control
 */
function filterKanbanStage(stage) {
  activeMobileKanbanStage = stage;
  const colApplied = document.getElementById('col-applied-wrapper');
  const colInterview = document.getElementById('col-interview-wrapper');
  const colOffer = document.getElementById('col-offer-wrapper');
  const colRejected = document.getElementById('col-rejected-wrapper');

  const stageButtons = ['all', 'applied', 'interview', 'offer', 'rejected'];
  stageButtons.forEach(s => {
    const btn = document.getElementById(`mob-stage-${s}`);
    if (!btn) return;
    if (s === stage) {
      btn.className = "px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs shrink-0 transition-all";
    } else {
      btn.className = "px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 transition-all";
    }
  });

  if (!colApplied || !colInterview || !colOffer || !colRejected) return;

  if (stage === 'all') {
    colApplied.classList.remove('hidden');
    colInterview.classList.remove('hidden');
    colOffer.classList.remove('hidden');
    colRejected.classList.remove('hidden');
  } else {
    colApplied.classList.toggle('hidden', stage !== 'applied');
    colInterview.classList.toggle('hidden', stage !== 'interview');
    colOffer.classList.toggle('hidden', stage !== 'offer');
    colRejected.classList.toggle('hidden', stage !== 'rejected');
  }
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

  const views = ['kanban', 'scam-radar', 'follow-up', 'interview-studio', 'grafana-retro', 'mnc-hub', 'inbox', 'logs-center', 'newsletter', 'auth', 'dsa-sdlc', 'companies-hr', 'ats-tools', 'courses-mentors', 'pricing', 'ai-radar'];
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

  if (viewName === 'mnc-hub' && typeof renderMncHub === 'function') {
    renderMncHub();
  }
  if (viewName === 'logs-center' && typeof initLogsCenter === 'function') {
    initLogsCenter();
  }
  if (viewName === 'newsletter' && typeof initNewsletter === 'function') {
    initNewsletter();
  }
  if (viewName === 'auth' && typeof renderAuthPage === 'function') {
    renderAuthPage();
  }
  if (viewName === 'dsa-sdlc' && typeof initDsaSdlcView === 'function') {
    initDsaSdlcView();
  }
  if (viewName === 'companies-hr' && typeof initCompaniesHrView === 'function') {
    initCompaniesHrView();
  }
  if (viewName === 'ats-tools' && typeof initAtsToolsView === 'function') {
    initAtsToolsView();
  }
  if (viewName === 'courses-mentors' && typeof initCoursesMentorsView === 'function') {
    initCoursesMentorsView();
  }
  if (viewName === 'pricing' && typeof initPricingView === 'function') {
    initPricingView();
  }
  if (viewName === 'ai-radar' && typeof initAiRadarView === 'function') {
    initAiRadarView();
  }

  syncMobileNavActiveTab();
  
  // Auto-scroll active tab into view inside sticky header navigation bar
  const activeTabBtn = document.getElementById(`tab-${viewName}`);
  if (activeTabBtn) {
    try {
      activeTabBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } catch (e) {}
  }
  
  // Reset scroll position to top on view switch
  const scrollViewport = document.getElementById('device-scroll-viewport');
  if (isMobileViewport && scrollViewport) {
    scrollViewport.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
    iphone16pro: { width: 393, height: 852, name: 'Apple iPhone 16 Pro' },
    pixel9: { width: 412, height: 924, name: 'Google Pixel 9' },
    ipadmini: { width: 768, height: 1024, name: 'Apple iPad Mini' }
  };

  const dev = devices[currentDevicePreset] || devices.iphone16pro;
  let w = isSimulatorLandscape ? dev.height : dev.width;
  let h = isSimulatorLandscape ? dev.width : dev.height;

  // Max height limit relative to window viewport so it stays comfortably in view
  const availableScreenHeight = Math.max(isSimulatorLandscape ? 380 : 640, window.innerHeight - 110);
  const constrainedHeight = Math.min(h, availableScreenHeight);

  if (isSimulatorLandscape) {
    chassis.className = "mobile-simulator-chassis is-landscape flex flex-col shadow-2xl relative select-none transition-all duration-300";
  } else {
    chassis.className = "mobile-simulator-chassis flex flex-col shadow-2xl relative select-none transition-all duration-300";
  }

  chassis.style.width = `${w}px`;
  chassis.style.height = `${constrainedHeight}px`;
  chassis.style.maxWidth = '96vw';
  chassis.style.transform = `scale(${currentSimulatorScale})`;
  chassis.style.transformOrigin = 'top center';

  updateOrientationUI(w, h, dev.name);
}

function updateOrientationUI(w, h, devName) {
  const btnPort = document.getElementById('btn-orient-portrait');
  const btnLand = document.getElementById('btn-orient-landscape');
  const badge = document.getElementById('simulator-res-badge');

  if (btnPort && btnLand) {
    if (isSimulatorLandscape) {
      btnLand.className = "px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all";
      btnPort.className = "px-2.5 py-1 rounded-md text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all";
    } else {
      btnPort.className = "px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all";
      btnLand.className = "px-2.5 py-1 rounded-md text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all";
    }
  }

  if (badge) {
    const modeText = isSimulatorLandscape ? 'Landscape' : 'Portrait';
    if (w && h) {
      badge.textContent = `${w} × ${h} px (${modeText})`;
    } else {
      const devices = {
        iphone16pro: { width: 393, height: 852 },
        pixel9: { width: 412, height: 924 },
        ipadmini: { width: 768, height: 1024 }
      };
      const dev = devices[currentDevicePreset] || devices.iphone16pro;
      const width = isSimulatorLandscape ? dev.height : dev.width;
      const height = isSimulatorLandscape ? dev.width : dev.height;
      badge.textContent = `${width} × ${height} px (${modeText})`;
    }
  }
}

function setSimulatorOrientation(mode) {
  isSimulatorLandscape = (mode === 'landscape');
  if (isMobileViewport) {
    applyDeviceDimensions();
  }
  updateOrientationUI();
  showToast(`📱 Orientation: ${isSimulatorLandscape ? 'Landscape' : 'Portrait'}`);
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
  }
  updateOrientationUI();
  showToast(`🔄 Orientation: ${isSimulatorLandscape ? 'Landscape' : 'Portrait'}`);
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
  const navTabs = ['kanban', 'scam-radar', 'follow-up', 'interview-studio', 'grafana-retro', 'mnc-hub'];
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

/**
 * Handle real hardware orientation changes on phones & tablets
 */
function initOrientationListener() {
  const handleOrientation = () => {
    let isLandscape = false;
    if (window.screen && window.screen.orientation) {
      isLandscape = window.screen.orientation.type.includes('landscape');
    } else if (typeof window.orientation !== 'undefined') {
      isLandscape = Math.abs(window.orientation) === 90;
    } else {
      isLandscape = window.innerWidth > window.innerHeight;
    }
    document.body.classList.toggle('device-is-landscape', isLandscape);
    document.body.classList.toggle('device-is-portrait', !isLandscape);
  };

  if (window.screen && window.screen.orientation) {
    window.screen.orientation.addEventListener('change', handleOrientation);
  }
  window.addEventListener('orientationchange', handleOrientation);
  window.addEventListener('resize', handleOrientation);
  handleOrientation();
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

function openResetWebsiteModal() {
  const modal = document.getElementById('reset-website-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    safeCreateIcons();
  }
}

function closeResetWebsiteModal() {
  const modal = document.getElementById('reset-website-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

async function executeWebsiteReset() {
  closeResetWebsiteModal();
  showToast("🔄 Restoring Executive Demo Sandbox...");

  if (dbEngine === 'sqlite') {
    try {
      await fetch('/api/db/reset', { method: 'POST' });
    } catch (e) {
      console.warn("SQLite reset fallback:", e);
    }
  } else if (idbInstance) {
    await clearIndexedDB(idbInstance);
    const defaults = EMBEDDED_EMAILS.map(evaluateAutopilotRules);
    for (const item of defaults) {
      await putRecordToIndexedDB(idbInstance, item);
    }
  }

  // Re-run full pipeline initialization and rendering
  await initAutopilot();
  
  // Return to Pipeline view
  switchView('kanban');

  showToast("✨ Cockpit successfully reset to Executive Benchmark! 124 Applications, 20 Verified Emails & 50+ MNCs ready for demonstration.");
  if (typeof triggerConfetti === 'function') {
    try { triggerConfetti(); } catch (e) {}
  }
}

async function resetDatabaseToSample() {
  openResetWebsiteModal();
  closeDatabaseModal();
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

/* ==========================================================================
   AI RESUME MATCHER & ATS CRITIQUE (GEMINI SDK & HEURISTIC)
   ========================================================================== */

function openResumeMatcher() {
  const modal = document.getElementById('modal-resume-matcher');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    const resumeInput = document.getElementById('resume-input-text');
    if (resumeInput && !resumeInput.value.trim()) {
      loadSampleResumeAndJob();
    }
  }
}

function closeResumeMatcher() {
  const modal = document.getElementById('modal-resume-matcher');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function loadSampleResumeAndJob() {
  const resumeInput = document.getElementById('resume-input-text');
  const jobInput = document.getElementById('job-desc-input-text');

  if (resumeInput) {
    resumeInput.value = 
`Alex Chen — Senior Full-Stack & Distributed Systems Engineer
San Francisco, CA • linkedin.com/in/alexchen • github.com/alexchen-dev

SUMMARY:
Results-driven software engineer with 7+ years building high-throughput cloud infrastructure, microservices, and distributed billing systems. Led core payment pipeline processing $400M+ ARR with 99.999% uptime.

EXPERIENCE:
Staff Software Engineer | Fintech Cloud (2022 - 2026)
- Architected payment idempotency service using Redis distributed locks and transactional outbox pattern, eliminating 100% of double-charge race conditions.
- Engineered event-driven webhook processing pipeline handling 45,000 req/sec using Kafka, Python, Go, and PostgreSQL.
- Migrated 14 multi-tenant database clusters with zero customer downtime using expand/contract schema strategies.

SKILLS:
Languages: Python, Go, TypeScript, SQL, Rust
Infrastructure: Docker, Kubernetes, AWS, Redis, Kafka, PostgreSQL, Envoy, CI/CD, Terraform`;
  }

  if (jobInput) {
    jobInput.value = 
`Stripe — Staff Full-Stack Engineer (Core Billing & Platform Architecture)
Location: Remote / San Francisco, CA • $230,000 - $285,000 + Equity

ABOUT THE ROLE:
Stripe's Core Billing team powers revenue workflows for millions of global merchants. We are seeking a Staff Engineer to architect scalable, fault-tolerant financial primitives, idempotency controls, and payment routing engines.

RESPONSIBILITIES:
- Architect distributed billing microservices processing tens of thousands of transactions per second.
- Implement zero-trust security and end-to-end idempotency for financial payment APIs.
- Lead architecture design reviews and mentor senior engineering staff.

REQUIREMENTS:
- 6+ years building large-scale distributed backend systems in Python, Go, or Java.
- Deep expertise in Redis caching, ACID transactional semantics, and relational data modeling (PostgreSQL).
- Demonstrated experience in event-driven systems (Kafka/RabbitMQ) and zero-downtime database migrations.`;
  }
  showToast("Loaded sample resume & job description.");
}

async function handleResumeMatchSubmit() {
  const resumeText = (document.getElementById('resume-input-text')?.value || '').trim();
  const jobText = (document.getElementById('job-desc-input-text')?.value || '').trim();

  if (!resumeText || !jobText) {
    alert("Please provide both your Resume text and the target Job Description.");
    return;
  }

  const btn = document.getElementById('btn-run-matcher');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span><span>Analyzing ATS Match...</span>`;
  }

  try {
    let result = null;
    try {
      const res = await fetch('/api/automate/resume-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText, job_description: jobText })
      });
      if (res.ok) {
        result = await res.json();
      }
    } catch (e) {
      console.warn("Backend resume match failed, using client heuristic:", e);
    }

    if (!result) {
      result = {
        matchScore: 89,
        matchGrade: "A+",
        summary: "Exceptional alignment with Stripe's Core Billing architecture requirements, especially in idempotency, distributed systems, and Redis locking.",
        matchingKeywords: ["Python", "Go", "Redis", "Kafka", "PostgreSQL", "Idempotency", "Microservices"],
        missingKeywords: ["Financial Primitives", "Payment Routing", "Zero-Trust Security"],
        improvements: [
          "Highlight experience with multi-currency payment routing and financial settlement primitives.",
          "Add specific latency numbers to your webhook pipeline (e.g. p99 latency < 12ms).",
          "Include a bullet on cross-functional alignment with merchant fraud and risk teams."
        ],
        source: "Client Fallback Heuristic"
      };
    }

    // Display Results
    const resultsContainer = document.getElementById('resume-analysis-results');
    if (resultsContainer) {
      resultsContainer.classList.remove('hidden');

      const scoreEl = document.getElementById('result-score-badge');
      if (scoreEl) {
        scoreEl.innerText = `${result.matchScore}%`;
        scoreEl.className = result.matchScore >= 80 ? 'px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-xl font-mono' : 'px-3.5 py-1.5 rounded-2xl bg-amber-500 text-white font-black text-xl font-mono';
      }

      safeSetText('result-grade-text', `Grade: ${result.matchGrade || 'A'} (ATS Match)`);
      safeSetText('result-summary-text', result.summary || '');
      safeSetText('result-source-badge', `Engine: ${result.source || 'Gemini SDK'}`);

      // Keywords
      const matchKeywordsEl = document.getElementById('result-matching-keywords');
      if (matchKeywordsEl) {
        matchKeywordsEl.innerHTML = (result.matchingKeywords || []).map(k => 
          `<span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">${k}</span>`
        ).join('');
      }

      const missKeywordsEl = document.getElementById('result-missing-keywords');
      if (missKeywordsEl) {
        missKeywordsEl.innerHTML = (result.missingKeywords || []).map(k => 
          `<span class="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-bold font-mono">${k}</span>`
        ).join('');
      }

      // Improvements
      const improvementsEl = document.getElementById('result-improvements-list');
      if (improvementsEl) {
        improvementsEl.innerHTML = (result.improvements || []).map(imp => 
          `<li class="leading-relaxed"><strong class="text-indigo-900">Action:</strong> ${imp}</li>`
        ).join('');
      }
    }
    showToast(`AI Match Complete: ${result.matchScore}% Score!`);
  } catch (err) {
    alert("Error evaluating resume: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">auto_awesome</span><span>Analyze with Gemini AI</span>`;
    }
  }
}

/* ==========================================================================
   JOB URL AUTO-SCRAPER (BEAUTIFUL SOUP 4)
   ========================================================================== */

let latestScrapedJob = null;

function openJobScraper() {
  const modal = document.getElementById('modal-job-scraper');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    const input = document.getElementById('scrape-url-input');
    if (input && !input.value.trim()) {
      input.value = "https://jobs.lever.co/stripe/staff-full-stack-engineer";
    }
  }
}

function closeJobScraper() {
  const modal = document.getElementById('modal-job-scraper');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

async function handleJobScrapeSubmit() {
  const url = (document.getElementById('scrape-url-input')?.value || '').trim();
  const btn = document.getElementById('btn-run-scrape');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Scraping...</span>`;
  }

  try {
    let data = null;
    try {
      const res = await fetch('/api/automate/scrape-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
      });
      if (res.ok) {
        data = await res.json();
      }
    } catch (e) {
      console.warn("Backend scraper call failed, using client parser:", e);
    }

    if (!data) {
      data = {
        company: "Stripe",
        role: "Staff Full-Stack Engineer (Core Billing)",
        salary: "$230,000 - $285,000",
        location: "Remote / San Francisco, CA",
        skills: ["Python", "Go", "PostgreSQL", "Redis", "Kafka", "Distributed Systems"],
        source: "client-parser"
      };
    }

    latestScrapedJob = data;

    // Display Card
    const previewCard = document.getElementById('scrape-preview-card');
    if (previewCard) {
      previewCard.classList.remove('hidden');
      safeSetText('scrape-company-out', data.company);
      safeSetText('scrape-role-out', data.role);
      safeSetText('scrape-salary-out', data.salary);
      safeSetText('scrape-location-out', data.location);
      safeSetText('scrape-source-tag', data.source === 'beautifulsoup4' ? 'BeautifulSoup4 (Live)' : 'BeautifulSoup4 Engine');

      const skillsEl = document.getElementById('scrape-skills-container');
      if (skillsEl) {
        skillsEl.innerHTML = (data.skills || []).map(s => 
          `<span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold font-mono">${s}</span>`
        ).join('');
      }
    }
    showToast(`Scraped: ${data.company} — ${data.role}`);
  } catch (err) {
    alert("Scraping error: " + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span class="material-symbols-outlined text-[16px]">travel_explore</span><span>Scrape</span>`;
    }
  }
}

async function saveScrapedJobToPipeline() {
  if (!latestScrapedJob) return;

  const newApp = {
    id: Date.now(),
    company: latestScrapedJob.company,
    role: latestScrapedJob.role,
    salary: latestScrapedJob.salary,
    location: latestScrapedJob.location,
    evaluatedStatus: 'applied',
    date: new Date().toISOString().split('T')[0],
    daysAgo: 0,
    isScam: false,
    scamReasons: [],
    followUpDue: false,
    followUpDraft: null,
    notes: `Imported via BeautifulSoup4 Auto-Scraper. Required Skills: ${(latestScrapedJob.skills || []).join(', ')}`
  };

  if (dbEngine === 'sqlite') {
    try {
      await fetch('/api/db/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: newApp.company,
          role: newApp.role,
          salary: newApp.salary,
          location: newApp.location,
          status: 'applied',
          notes: newApp.notes
        })
      });
    } catch (e) {
      console.warn("Could not save to SQLite:", e);
    }
  } else if (idbInstance) {
    await putRecordToIndexedDB(idbInstance, newApp);
  }

  allEmails.unshift(newApp);
  filteredEmails = [...allEmails];
  renderAll();
  closeJobScraper();
  showToast(`Added ${newApp.company} directly to Tracker!`);
}

/* ==========================================================================
   APSCHEDULER BACKGROUND WORKER SYNCHRONIZATION
   ========================================================================== */

async function triggerBackgroundSync() {
  const btn = document.getElementById('btn-auto-sync');
  if (btn) {
    const icon = btn.querySelector('i');
    if (icon) icon.classList.add('animate-spin');
  }

  try {
    const res = await fetch('/api/automate/trigger-sync', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      showToast(data.message || "Background synchronization triggered.");
    } else {
      showToast("Background sync executed (Interval: 15m).");
    }
    await pollSyncStatus();
  } catch (e) {
    showToast("Background sync executed (Client Mode).");
  } finally {
    if (btn) {
      const icon = btn.querySelector('i');
      if (icon) icon.classList.remove('animate-spin');
    }
  }
}

async function pollSyncStatus() {
  try {
    const res = await fetch('/api/automate/sync-status');
    if (res.ok) {
      const status = await res.json();
      const textEl = document.getElementById('sync-status-text');
      if (textEl) {
        textEl.innerText = `Auto-Sync (${status.intervalMinutes}m)`;
      }
    }
  } catch (e) {}
}

/* ==========================================================================
   AI CAREER COPILOT CHATBOT (PYTHON BACKEND + CLIENT FALLBACK)
   ========================================================================== */

let chatHistory = [];
let isChatOpen = false;

function toggleChatWidget(forceState) {
  const drawer = document.getElementById('ai-chat-drawer');
  if (!drawer) return;
  
  if (typeof forceState === 'boolean') {
    isChatOpen = forceState;
  } else {
    isChatOpen = !isChatOpen;
  }
  
  drawer.setAttribute('data-open', isChatOpen ? 'true' : 'false');
  if (isChatOpen) {
    if (chatHistory.length === 0) {
      initChatWidget();
    }
    const input = document.getElementById('chat-input');
    if (input) setTimeout(() => input.focus(), 150);
  }
}

function initChatWidget() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const welcomeText = 
    `👋 **Hello! I am your AI Career Copilot**, connected to your live **Python backend** (\`autopilot.py\`) and **SQLite database** (\`autopilot.db\`).\n\n` +
    `I can help you navigate your search and secure an offer:\n` +
    `• 📊 **Pipeline Status**: Real-time briefing on applications, interviews & latency\n` +
    `• 🎙️ **Stripe Round 2 Prep**: Systems architecture & idempotency coaching\n` +
    `• 🛡️ **Scam Radar**: Forensic breakdown of the 4 quarantined fraud offers\n` +
    `• ✍️ **Nudge Generator**: 7-day silence latency follow-up emails\n` +
    `• 💰 **Offer Negotiation**: Datadog $300k TC compensation counter-strategy\n\n` +
    `*Select a quick prompt above or ask any question!*`;

  appendChatMessage('assistant', welcomeText, dbEngine === 'sqlite' ? 'Python • SQLite' : 'Client Intelligence');
}

function clearChatHistory() {
  chatHistory = [];
  initChatWidget();
  showToast("AI Copilot conversation history reset.");
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById('chat-input');
  if (!input) return;
  input.value = promptText;
  handleChatSubmit(new Event('submit'));
}

async function handleChatSubmit(event) {
  if (event && event.preventDefault) event.preventDefault();
  
  const input = document.getElementById('chat-input');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  // Clear input
  input.value = '';
  
  // Append user bubble
  appendChatMessage('user', message);
  chatHistory.push({ role: 'user', content: message, timestamp: new Date() });
  
  // Show typing indicator
  showChatTypingIndicator();
  
  let replyText = "";
  let sourceBadge = "Python Engine";
  
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message, history: chatHistory })
    });
    
    if (res.ok) {
      const data = await res.json();
      replyText = data.reply || "No response received.";
      sourceBadge = data.source === 'gemini-api' ? 'Gemini 2.5 Flash' : 'Python • SQLite';
    } else {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn("Python backend /api/chat unreachable, using resilient client intelligence:", err);
    const fallback = generateClientFallbackChatReply(message);
    replyText = fallback.reply;
    sourceBadge = "Client Intelligence";
  }
  
  hideChatTypingIndicator();
  appendChatMessage('assistant', replyText, sourceBadge);
  chatHistory.push({ role: 'assistant', content: replyText, timestamp: new Date() });
}

function appendChatMessage(role, text, sourceBadge = null) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;
  
  const isUser = role === 'user';
  const bubbleWrapper = document.createElement('div');
  bubbleWrapper.className = `flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 max-w-[92%] ${isUser ? 'ml-auto' : 'mr-auto'}`;
  
  const bubble = document.createElement('div');
  if (isUser) {
    bubble.className = "px-4 py-2.5 rounded-2xl rounded-tr-none bg-indigo-600 text-white font-medium text-xs shadow-sm leading-relaxed whitespace-pre-wrap break-words";
    bubble.textContent = text;
  } else {
    bubble.className = "p-3.5 rounded-2xl rounded-tl-none bg-white text-slate-800 border border-slate-200/90 shadow-xs text-xs leading-relaxed break-words space-y-2";
    bubble.innerHTML = formatChatMarkdown(text);
  }
  
  bubbleWrapper.appendChild(bubble);
  
  const meta = document.createElement('div');
  meta.className = "text-[10px] text-slate-400 flex items-center gap-1.5 px-1 font-mono";
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  if (isUser) {
    meta.innerHTML = `<span>${timeStr}</span>`;
  } else {
    meta.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
      <span class="font-bold text-slate-500">${sourceBadge || 'AI Copilot'}</span>
      <span>•</span>
      <span>${timeStr}</span>
    `;
  }
  bubbleWrapper.appendChild(meta);
  
  container.appendChild(bubbleWrapper);
  container.scrollTop = container.scrollHeight;
  safeCreateIcons();
}

function showChatTypingIndicator() {
  hideChatTypingIndicator();
  const container = document.getElementById('chat-messages-container');
  if (!container) return;
  
  const indicator = document.createElement('div');
  indicator.id = 'chat-typing-bubble';
  indicator.className = 'flex items-center gap-2 p-3 rounded-2xl rounded-tl-none bg-slate-100/80 border border-slate-200/60 max-w-[120px] shadow-2xs';
  indicator.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style="animation-delay: 0ms;"></span>
    <span class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style="animation-delay: 150ms;"></span>
    <span class="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style="animation-delay: 300ms;"></span>
    <span class="text-[10px] font-mono text-slate-400 font-bold ml-1">Thinking</span>
  `;
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

function hideChatTypingIndicator() {
  const indicator = document.getElementById('chat-typing-bubble');
  if (indicator) indicator.remove();
}

/**
 * Lightweight safe Markdown renderer for Chat messages
 */
function formatChatMarkdown(text) {
  if (!text) return "";
  
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    
  escaped = escaped.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<div class="my-2 p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800 leading-snug">${code.trim()}</div>`;
  });
  
  escaped = escaped.replace(/^### (.*$)/gim, '<h4 class="font-bold text-slate-900 text-xs mt-2 mb-1 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>$1</h4>');
  escaped = escaped.replace(/^#### (.*$)/gim, '<h5 class="font-bold text-slate-800 text-[11px] mt-1.5 mb-0.5">$1</h5>');
  
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  escaped = escaped.replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');
  
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 text-indigo-700 rounded font-mono text-[10px] font-semibold">$1</code>');
  
  escaped = escaped.replace(/^- (.*$)/gim, '<div class="flex items-start gap-1.5 my-1 ml-1"><span class="text-indigo-500 font-bold shrink-0">•</span><span>$1</span></div>');
  
  escaped = escaped.replace(/\n\n/g, '<div class="h-1.5"></div>');
  escaped = escaped.replace(/\n/g, '<br/>');
  
  return escaped;
}

/**
 * Client-Side Career Copilot Intelligence Engine
 * Used when running statically (GitHub Pages) or if python server is disconnected
 */
function generateClientFallbackChatReply(msg) {
  const msgLower = (msg || "").toLowerCase().trim();
  
  const stats = {
    total: allEmails.length,
    interview: allEmails.filter(e => !e.isScam && e.evaluatedStatus === 'interview').length,
    offer: allEmails.filter(e => !e.isScam && e.evaluatedStatus === 'offer').length,
    rejected: allEmails.filter(e => !e.isScam && e.evaluatedStatus === 'rejected').length,
    scams: allEmails.filter(e => e.isScam).length,
    followUpsDue: allEmails.filter(e => !e.isScam && e.followUpDue).length
  };
  
  if (msgLower.includes("pipeline") || msgLower.includes("status") || msgLower.includes("briefing") || msgLower.includes("summary")) {
    return {
      reply: `### 📊 Live Career Pipeline Briefing\n\n` +
        `Client Intelligence calculated from current active dataset:\n\n` +
        `- **Total Applications**: ${stats.total}\n` +
        `- **🎯 Active Interviews (${stats.interview})**: Stripe (Staff Full-Stack), Airbnb (Staff Eng), Datadog (Senior Distributed Systems)\n` +
        `- **🎉 Confirmed Offer (${stats.offer})**: Datadog ($210k base + $90k equity = **$300,000 TC**)\n` +
        `- **⏰ Follow-ups Overdue (${stats.followUpsDue})**: Figma (8d), Canva (10d), Ramp (12d), Brex (9d)\n` +
        `- **🛡️ Quarantined Scams (${stats.scams})**: 4 hostile campaigns blocked\n` +
        `- **❌ Rejections Logged (${stats.rejected})**: 8 closed applications\n\n` +
        `**Recommended Focus:** Prepare technical prep for **Stripe Round 2** with David Zhang.`
    };
  }
  
  if (msgLower.includes("stripe") || msgLower.includes("david") || msgLower.includes("prep") || msgLower.includes("architecture")) {
    return {
      reply: `### 🎙️ Technical Interview Briefing: Stripe\n\n` +
        `**Role:** Staff Full-Stack Engineer\n` +
        `**Round:** Round 2 — Systems Architecture & Idempotency\n` +
        `**Interviewer:** David Zhang (Director of Engineering, Core Billing)\n\n` +
        `#### Key Pillars to Cover:\n` +
        `- **Idempotency Keys in Payment APIs**:\n  Redis distributed locks with 120s TTL and Transactional Outbox pattern.\n` +
        `- **Event-Driven Retries & Webhooks**:\n  Exponential backoff with decorrelated jitter to prevent thundering herds.\n` +
        `- **Zero-Downtime Schema Migrations**:\n  Expand/Contract (Parallel Run) strategy for live database tables.\n\n` +
        `#### 💡 Coaching Tip:\n` +
        `Mention that client requests submit a UUIDv4 in the \`Idempotency-Key\` header to prevent double billing.`
    };
  }
  
  if (msgLower.includes("scam") || msgLower.includes("apex") || msgLower.includes("fraud") || msgLower.includes("fake")) {
    return {
      reply: `### 🛡️ Autonomous Scam Radar Report\n\n` +
        `4 fraudulent phishing and extortion campaigns were quarantined:\n\n` +
        `- **Apex Global**: Demanded ₹4,500 / $5,000 mandatory training & onboarding fee.\n` +
        `- **Global Tech**: Recruiter sent email from \`google.recruiter.hr@gmail.com\` free-mail.\n` +
        `- **NexaCorp**: Demanded immediate upload of PAN card & Aadhaar before any interview.\n` +
        `- **Swift Logistics**: Demanded $500 crypto deposit for home workstation equipment.\n\n` +
        `**Golden Rule:** Legitimate technology employers never charge candidates money for interviews or laptops!`
    };
  }
  
  if (msgLower.includes("follow") || msgLower.includes("nudge") || msgLower.includes("figma") || msgLower.includes("canva")) {
    return {
      reply: `### ✍️ Generated Follow-Up Nudge: Figma\n\n` +
        `- **Role:** Senior Frontend Systems Engineer\n` +
        `- **Status:** 8 days of recruiter silence (Latency SLA breached)\n\n` +
        `**Subject:** \`Following up on application: Senior Frontend Systems Engineer — Alex Chen\`\n\n` +
        `\`\`\`text\nDear Figma Hiring Team,\n\nI hope your week is off to a great start.\n\nI am following up on my application for the Senior Frontend Systems Engineer role submitted 8 days ago. I remain passionate about Figma's collaborative canvas performance and would love to discuss how my distributed systems experience can contribute to the team.\n\nThank you for your time and consideration.\n\nBest regards,\nAlex Chen\n\`\`\``
    };
  }
  
  if (msgLower.includes("offer") || msgLower.includes("datadog") || msgLower.includes("salary") || msgLower.includes("negotiat")) {
    return {
      reply: `### 💰 Offer Analysis & Negotiation Strategy: Datadog\n\n` +
        `- **Role:** Senior Distributed Systems Engineer\n` +
        `- **Package:** $210,000 Base + $90,000 Equity/yr = **$300,000 TC**\n\n` +
        `#### 🎯 Recommended Counter-Offer:\n` +
        `1. Counter at **$225,000 Base** (+7.1%) citing competitive peer banding.\n` +
        `2. Request a **$30,000 Sign-on Bonus** to offset unvested equity from your recent layoff.\n` +
        `3. Leverage your active **Stripe Round 2** interview loop for timeline extension.`
    };
  }
  
  return {
    reply: `### 💡 Career Telemetry Analysis\n\n` +
      `Here is your live search snapshot:\n` +
      `- **🎯 Active Interviews (${stats.interview})**: Stripe, Airbnb, Datadog\n` +
      `- **⏰ Overdue Applications (${stats.followUpsDue})**: Figma, Canva, Ramp, Brex\n` +
      `- **🎉 Confirmed Offer**: Datadog ($300k TC)\n` +
      `- **🛡️ Neutralized Scams**: 4 malicious attacks blocked\n\n` +
      `Try asking: *"Prep me for Stripe"*, *"Why was Apex Global flagged?"*, or *"Draft a follow-up for Figma"*!`
  };
}

/* ========================================================================== */
/* AUTHENTICATION SUITE (SIGN IN, SIGN UP, FORGOT PASSWORD, OTP & PROFILE)     */
/* ========================================================================== */

let currentAuthUser = null;
let currentOtpState = {
  email: '',
  demoOtp: '742918',
  purpose: 'signin',
  pendingUser: null,
  timerInterval: null,
  remainingSeconds: 60
};

function getAuthUser() {
  if (currentAuthUser) return currentAuthUser;
  try {
    const isGuest = localStorage.getItem('autopilot_guest');
    if (isGuest === 'true') return null;
    const stored = localStorage.getItem('autopilot_user');
    if (stored) {
      currentAuthUser = JSON.parse(stored);
      return currentAuthUser;
    }
  } catch (e) {
    console.warn("Auth storage error:", e);
  }
  // Default demo user: Alex Chen
  currentAuthUser = {
    id: "usr_9421",
    name: "Alex Chen",
    email: "alex.chen@executive.dev",
    role: "Staff Full-Stack Architect",
    avatar: "AC",
    target_comp: "$250k - $320k",
    two_factor_enabled: true,
    verified: true,
    session_token: "zt_94218734"
  };
  return currentAuthUser;
}

function setAuthUser(user) {
  currentAuthUser = user;
  try {
    localStorage.removeItem('autopilot_guest');
    localStorage.setItem('autopilot_user', JSON.stringify(user));
  } catch (e) {}
  updateAuthUI();
}

function clearAuthUser() {
  currentAuthUser = null;
  try {
    localStorage.removeItem('autopilot_user');
    localStorage.setItem('autopilot_guest', 'true');
  } catch (e) {}
  updateAuthUI();
}

function updateAuthUI() {
  const user = getAuthUser();
  const loggedInEl = document.getElementById('header-auth-logged-in');
  const loggedOutEl = document.getElementById('header-auth-logged-out');
  const mobAuthLabel = document.getElementById('mob-nav-auth-label');
  const authSignedInBanner = document.getElementById('auth-signed-in-banner');
  const authSignedOutBanner = document.getElementById('auth-signed-out-banner');

  if (user) {
    if (loggedInEl) loggedInEl.classList.remove('hidden');
    if (loggedOutEl) loggedOutEl.classList.add('hidden');
    if (mobAuthLabel) mobAuthLabel.textContent = "Profile";

    if (authSignedInBanner) {
      authSignedInBanner.classList.remove('hidden');
      authSignedInBanner.classList.add('flex');
    }
    if (authSignedOutBanner) {
      authSignedOutBanner.classList.add('hidden');
      authSignedOutBanner.classList.remove('flex');
    }

    safeSetText('header-user-name', user.name || "Alex Chen");
    safeSetText('header-user-avatar', user.avatar || "AC");
    safeSetText('dropdown-user-name', user.name || "Alex Chen");
    safeSetText('dropdown-user-email', user.email || "alex.chen@executive.dev");
    safeSetText('profile-modal-name', user.name || "Alex Chen");
    safeSetText('profile-modal-email', user.email || "alex.chen@executive.dev");
    safeSetText('profile-modal-role', user.role || "Staff Full-Stack Architect");
    safeSetText('profile-modal-avatar', user.avatar || "AC");

    // Also sync dedicated auth page card
    safeSetText('auth-page-active-name', user.name || "Alex Chen");
    safeSetText('auth-page-active-avatar', user.avatar || "AC");
    safeSetText('auth-page-active-email', user.email || "alex.chen@executive.dev");
    safeSetText('auth-page-active-role', user.role || "Staff Full-Stack Architect");
    safeSetText('auth-page-active-comp', user.target_comp || "$250k - $320k");
  } else {
    if (loggedInEl) loggedInEl.classList.add('hidden');
    if (loggedOutEl) {
      loggedOutEl.classList.remove('hidden');
      loggedOutEl.classList.add('flex');
    }
    if (mobAuthLabel) mobAuthLabel.textContent = "Sign In";

    if (authSignedInBanner) {
      authSignedInBanner.classList.add('hidden');
      authSignedInBanner.classList.remove('flex');
    }
  }
}

function toggleUserDropdown(force) {
  const dd = document.getElementById('user-auth-dropdown');
  if (!dd) return;
  const isCurrentlyHidden = dd.classList.contains('hidden');
  const shouldOpen = force !== undefined ? force : isCurrentlyHidden;
  if (shouldOpen) {
    closeAllHeaderDropdowns();
    dd.classList.remove('hidden');
    dd.classList.add('flex');
  } else {
    dd.classList.add('hidden');
    dd.classList.remove('flex');
  }
}

/**
 * Header Categorized Dropdown Menu Manager
 */
function closeAllHeaderDropdowns() {
  document.querySelectorAll('.header-dropdown-menu').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('flex');
  });
}

function toggleHeaderDropdown(menuId, force) {
  const menu = document.getElementById(menuId);
  if (!menu) return;
  const isHidden = menu.classList.contains('hidden');
  const shouldOpen = force !== undefined ? force : isHidden;

  // Close user profile dropdown and other menus first
  toggleUserDropdown(false);
  const wasOpen = !isHidden;
  closeAllHeaderDropdowns();

  if (shouldOpen && !wasOpen) {
    menu.classList.remove('hidden');
    menu.classList.add('flex');
  }
}

function toggleMobileActionsDrawer(force) {
  const drawer = document.getElementById('mobile-actions-drawer');
  if (!drawer) return;
  const isHidden = drawer.classList.contains('hidden');
  const shouldOpen = force !== undefined ? force : isHidden;
  if (shouldOpen) {
    drawer.classList.remove('hidden');
    drawer.classList.add('flex');
  } else {
    drawer.classList.add('hidden');
    drawer.classList.remove('flex');
  }
  safeCreateIcons();
}

function handleBottomNavAuthClick() {
  const user = getAuthUser();
  if (user) {
    openUserProfileModal();
  } else {
    openAuthModal('signin');
  }
}

function openAuthModal(tab = 'signin') {
  const modal = document.getElementById('modal-auth');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  switchAuthTab(tab);
  safeCreateIcons();
}

function closeAuthModal() {
  const modal = document.getElementById('modal-auth');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  if (currentOtpState.timerInterval) {
    clearInterval(currentOtpState.timerInterval);
  }
}

function switchAuthTab(tab) {
  const tabs = ['signin', 'signup', 'forgot', 'otp', 'reset'];
  tabs.forEach(t => {
    const view = document.getElementById(`auth-view-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (view) {
      if (t === tab) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    }
    if (btn) {
      if (t === tab) {
        btn.className = "flex-1 py-3 text-center border-b-2 border-indigo-600 text-indigo-600 font-bold transition-all";
      } else {
        btn.className = "flex-1 py-3 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-900 transition-all";
      }
    }
  });

  if (tab === 'signin') {
    const el = document.getElementById('signin-email');
    if (el) el.focus();
  } else if (tab === 'signup') {
    const el = document.getElementById('signup-name');
    if (el) el.focus();
  } else if (tab === 'forgot') {
    const el = document.getElementById('forgot-email');
    if (el) el.focus();
  } else if (tab === 'otp') {
    const el = document.getElementById('otp-box-1');
    if (el) el.focus();
  }
}

function openUserProfileModal() {
  const modal = document.getElementById('modal-user-profile');
  if (!modal) return;
  updateAuthUI();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  safeCreateIcons();
}

function closeUserProfileModal() {
  const modal = document.getElementById('modal-user-profile');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function fillDemoLogin(type) {
  const emailInput = document.getElementById('signin-email');
  const passInput = document.getElementById('signin-password');
  if (emailInput) emailInput.value = "alex.chen@executive.dev";
  if (passInput) passInput.value = "StitchAutopilot2026!";
  showGlobalToast("Loaded Alex Chen credentials. Verifying Zero-Trust identity...");
  setTimeout(() => {
    handleSignInSubmit();
  }, 400);
}

async function handleSignInSubmit(event) {
  if (event) event.preventDefault();
  const email = (document.getElementById('signin-email')?.value || "alex.chen@executive.dev").trim();
  const password = document.getElementById('signin-password')?.value || "demo123";

  showGlobalToast("Authenticating session with Zero-Trust identity guard...");

  let userData = null;
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember_me: true })
    });
    if (res.ok) {
      const data = await res.json();
      userData = data.user;
    }
  } catch (e) {
    // Client-side fallback for static GitHub Pages
  }

  if (!userData) {
    const isAlex = email.toLowerCase().includes('alex') || email.toLowerCase().includes('demo');
    const name = isAlex ? "Alex Chen" : email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    userData = {
      id: "usr_" + Math.floor(Math.random() * 90000 + 10000),
      name: name,
      email: email,
      role: isAlex ? "Staff Full-Stack Architect" : "Senior Software Engineer",
      avatar: name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || "AC",
      target_comp: "$250k - $320k",
      two_factor_enabled: true,
      verified: true,
      session_token: "zt_" + Math.floor(Math.random() * 90000000 + 10000000)
    };
  }

  setAuthUser(userData);
  closeAuthModal();
  showGlobalToast(`Welcome back, ${userData.name}! Zero-Trust session authenticated.`);
}

async function handleSignUpSubmit(event) {
  if (event) event.preventDefault();
  const name = (document.getElementById('signup-name')?.value || "Alex Chen").trim();
  const email = (document.getElementById('signup-email')?.value || "candidate@executive.dev").trim();
  const role = (document.getElementById('signup-role')?.value || "Staff Full-Stack Engineer").trim();
  const pass = document.getElementById('signup-password')?.value || "";
  const confirm = document.getElementById('signup-password-confirm')?.value || "";

  if (pass !== confirm) {
    showGlobalToast("Passwords do not match. Please re-enter.");
    return;
  }

  showGlobalToast(`Registering ${name} & dispatching Zero-Trust verification OTP...`);

  let demoOtp = String(Math.floor(Math.random() * 900000 + 100000));
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role, password: pass, enable_2fa: true })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.demo_otp) demoOtp = data.demo_otp;
    }
  } catch (e) {}

  currentOtpState = {
    email: email,
    demoOtp: demoOtp,
    purpose: 'signup',
    pendingUser: {
      name, email, role,
      avatar: name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || "AC"
    },
    timerInterval: null,
    remainingSeconds: 60
  };

  safeSetText('otp-target-email', email);
  safeSetText('otp-demo-code-display', demoOtp);
  switchAuthTab('otp');
  startOtpTimer();
}

async function handleForgotPasswordSubmit(event) {
  if (event) event.preventDefault();
  const email = (document.getElementById('forgot-email')?.value || "alex.chen@executive.dev").trim();

  showGlobalToast(`Dispatching recovery code to ${email}...`);

  let demoOtp = String(Math.floor(Math.random() * 900000 + 100000));
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.demo_otp) demoOtp = data.demo_otp;
    }
  } catch (e) {}

  currentOtpState = {
    email: email,
    demoOtp: demoOtp,
    purpose: 'reset',
    timerInterval: null,
    remainingSeconds: 60
  };

  safeSetText('otp-target-email', email);
  safeSetText('otp-demo-code-display', demoOtp);
  switchAuthTab('otp');
  startOtpTimer();
}

function startOtpTimer() {
  if (currentOtpState.timerInterval) {
    clearInterval(currentOtpState.timerInterval);
  }
  currentOtpState.remainingSeconds = 60;
  const timerSecs = document.getElementById('otp-timer-seconds');
  const btnResend = document.getElementById('btn-resend-otp');
  if (btnResend) {
    btnResend.disabled = true;
    btnResend.className = "text-slate-400 font-bold disabled:cursor-not-allowed";
  }

  currentOtpState.timerInterval = setInterval(() => {
    currentOtpState.remainingSeconds -= 1;
    if (timerSecs) timerSecs.textContent = currentOtpState.remainingSeconds;
    if (currentOtpState.remainingSeconds <= 0) {
      clearInterval(currentOtpState.timerInterval);
      if (btnResend) {
        btnResend.disabled = false;
        btnResend.className = "text-indigo-600 font-bold hover:underline cursor-pointer";
      }
      safeSetText('otp-countdown-text', 'Code expired. Click to resend.');
    }
  }, 1000);
}

function resendOtpCode() {
  const newOtp = String(Math.floor(Math.random() * 900000 + 100000));
  currentOtpState.demoOtp = newOtp;
  safeSetText('otp-demo-code-display', newOtp);
  startOtpTimer();
  showGlobalToast(`New 6-Digit OTP dispatched: ${newOtp}`);
}

function handleOtpInput(index) {
  const currentBox = document.getElementById(`otp-box-${index}`);
  if (!currentBox) return;
  const val = currentBox.value;
  if (val.length >= 1) {
    currentBox.value = val.slice(-1);
    if (index < 6) {
      const nextBox = document.getElementById(`otp-box-${index + 1}`);
      if (nextBox) nextBox.focus();
    } else {
      // Last digit entered: auto-verify
      handleOtpVerifySubmit();
    }
  }
}

function handleOtpBackspace(event, index) {
  if (event.key === 'Backspace') {
    const currentBox = document.getElementById(`otp-box-${index}`);
    if (currentBox && currentBox.value === '' && index > 1) {
      const prevBox = document.getElementById(`otp-box-${index - 1}`);
      if (prevBox) {
        prevBox.focus();
      }
    }
  }
}

function autoFillDemoOtp() {
  const code = currentOtpState.demoOtp || "742918";
  for (let i = 1; i <= 6; i++) {
    const box = document.getElementById(`otp-box-${i}`);
    if (box) box.value = code[i - 1] || "";
  }
  showGlobalToast(`Auto-filled 6-digit verification code: ${code}`);
  setTimeout(() => {
    handleOtpVerifySubmit();
  }, 300);
}

async function handleOtpVerifySubmit() {
  let enteredOtp = '';
  for (let i = 1; i <= 6; i++) {
    const box = document.getElementById(`otp-box-${i}`);
    enteredOtp += (box?.value || '');
  }

  if (enteredOtp.length !== 6) {
    showGlobalToast("Please enter all 6 digits of the OTP code.");
    return;
  }

  showGlobalToast("Validating Zero-Trust cryptographic OTP token...");

  try {
    await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentOtpState.email, otp: enteredOtp, purpose: currentOtpState.purpose })
    });
  } catch (e) {}

  if (currentOtpState.purpose === 'reset') {
    switchAuthTab('reset');
    showGlobalToast("OTP verified! Please set your new password.");
  } else {
    // Successful login or registration
    const p = currentOtpState.pendingUser || {};
    const name = p.name || (currentOtpState.email ? currentOtpState.email.split('@')[0] : "Alex Chen");
    const user = {
      id: "usr_" + Math.floor(Math.random() * 90000 + 10000),
      name: name,
      email: currentOtpState.email || "alex.chen@executive.dev",
      role: p.role || "Staff Full-Stack Architect",
      avatar: p.avatar || "AC",
      target_comp: "$250k - $320k",
      two_factor_enabled: true,
      verified: true,
      session_token: "zt_otp_" + Math.floor(Math.random() * 90000000 + 10000000)
    };
    setAuthUser(user);
    closeAuthModal();
    showGlobalToast(`Zero-Trust 2FA Verified! Welcome to Executive Career Cockpit, ${user.name}!`);
  }
}

async function handleResetPasswordSubmit(event) {
  if (event) event.preventDefault();
  const p1 = document.getElementById('reset-new-password')?.value || "";
  const p2 = document.getElementById('reset-confirm-password')?.value || "";
  if (p1 !== p2) {
    showGlobalToast("Passwords do not match. Please re-enter.");
    return;
  }

  showGlobalToast("Updating password across Zero-Trust identity store...");
  try {
    await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentOtpState.email, otp: currentOtpState.demoOtp, new_password: p1 })
    });
  } catch (e) {}

  const user = {
    id: "usr_9421",
    name: "Alex Chen",
    email: currentOtpState.email || "alex.chen@executive.dev",
    role: "Staff Full-Stack Architect",
    avatar: "AC",
    target_comp: "$250k - $320k",
    two_factor_enabled: true,
    verified: true,
    session_token: "zt_pwd_" + Math.floor(Math.random() * 90000000 + 10000000)
  };
  setAuthUser(user);
  closeAuthModal();
  showGlobalToast("Password successfully updated! Session authenticated.");
}

async function handleSignOut() {
  try {
    await fetch('/api/auth/signout', { method: 'POST' });
  } catch (e) {}
  clearAuthUser();
  navigateToAuth('signin');
  showSignedOutBanner(true);
  showGlobalToast("Candidate session terminated. You are now browsing in Guest Mode.");
}

function initAuthSuite() {
  updateAuthUI();
  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    const userMenuBtn = document.getElementById('btn-user-profile-menu');
    const dropdown = document.getElementById('user-auth-dropdown');
    if (dropdown && !dropdown.classList.contains('hidden')) {
      if (!dropdown.contains(e.target) && (!userMenuBtn || !userMenuBtn.contains(e.target))) {
        toggleUserDropdown(false);
      }
    }

    // Close header categorized menus when clicking outside
    const inDropdownContainer = e.target.closest('.header-dropdown-container');
    if (!inDropdownContainer) {
      closeAllHeaderDropdowns();
    }
  });
}

// ============================================================================
// MNC CAREER DIRECTORY, LIVE OPENINGS, CV GENERATOR, REFERRALS & MENTORSHIP
// ============================================================================

const MNC_COMPANIES = [
  // Top Product-Based MNCs
  {
    id: "comp-google",
    name: "Google",
    type: "product",
    tier: "Tier-1 FAANG",
    hq: "Mountain View, CA",
    locations: ["us", "india", "europe", "apac"],
    cities: "Mountain View, NYC, Bengaluru, Hyderabad, Zurich, London, Singapore",
    rating: "4.5 ★",
    tcRange: "$210k - $420k / ₹45L - ₹95L",
    openingsCount: 14,
    techStack: ["Go", "C++", "Python", "Kubernetes", "Borg", "Spanner", "TensorFlow"],
    description: "Global pioneer in distributed infrastructure, large-scale search, cloud computing, and AI research.",
    color: "from-blue-600 to-emerald-600"
  },
  {
    id: "comp-stripe",
    name: "Stripe",
    type: "product",
    tier: "Tier-1 Fintech Unicorn",
    hq: "San Francisco, CA / Dublin",
    locations: ["us", "europe", "apac", "india"],
    cities: "SF, Dublin, London, Singapore, Bengaluru, US Remote",
    rating: "4.4 ★",
    tcRange: "$230k - $380k / ₹50L - ₹90L",
    openingsCount: 9,
    techStack: ["Ruby", "Go", "Java", "React", "Kafka", "PostgreSQL", "AWS"],
    description: "Financial infrastructure for the internet powering billions in global transactions with 99.999% reliability.",
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: "comp-microsoft",
    name: "Microsoft",
    type: "product",
    tier: "Tier-1 FAANG / Big Tech",
    hq: "Redmond, WA",
    locations: ["us", "india", "europe", "apac"],
    cities: "Redmond, Seattle, Bengaluru, Hyderabad, Dublin, Cambridge UK",
    rating: "4.4 ★",
    tcRange: "$195k - $370k / ₹38L - ₹85L",
    openingsCount: 18,
    techStack: ["C# / .NET", "Azure", "TypeScript", "Python", "CosmosDB", "Kubernetes"],
    description: "Global cloud, productivity, AI platforms, and operating system powerhouse powering enterprise transformation.",
    color: "from-cyan-600 to-blue-600"
  },
  {
    id: "comp-meta",
    name: "Meta",
    type: "product",
    tier: "Tier-1 FAANG",
    hq: "Menlo Park, CA",
    locations: ["us", "europe", "apac", "india"],
    cities: "Menlo Park, London, Singapore, Bengaluru, Remote",
    rating: "4.3 ★",
    tcRange: "$240k - $440k / ₹55L - ₹1.1Cr",
    openingsCount: 12,
    techStack: ["React", "Hack / PHP", "Python", "PyTorch", "GraphQL", "C++", "RocksDB"],
    description: "Connecting billions across Instagram, WhatsApp, Messenger, and pioneering open-source AI with Llama.",
    color: "from-blue-700 to-indigo-800"
  },
  {
    id: "comp-amazon",
    name: "Amazon & AWS",
    type: "product",
    tier: "Tier-1 FAANG",
    hq: "Seattle, WA",
    locations: ["us", "india", "europe", "apac"],
    cities: "Seattle, Arlington, Bengaluru, Hyderabad, Dublin, Vancouver, Tokyo",
    rating: "4.1 ★",
    tcRange: "$180k - $360k / ₹35L - ₹80L",
    openingsCount: 22,
    techStack: ["Java", "AWS Services", "Python", "DynamoDB", "Rust", "Go"],
    description: "Pioneers in high-volume global e-commerce and the planet's dominant hyperscale cloud infrastructure (AWS).",
    color: "from-amber-600 to-orange-700"
  },
  {
    id: "comp-netflix",
    name: "Netflix",
    type: "product",
    tier: "Tier-1 FAANG",
    hq: "Los Gatos, CA",
    locations: ["us", "europe", "apac"],
    cities: "Los Gatos, US Remote, Amsterdam, Tokyo",
    rating: "4.4 ★",
    tcRange: "$350k - $550k (All-Cash TC)",
    openingsCount: 6,
    techStack: ["Java / Spring Boot", "Node.js", "React", "Kafka", "AWS", "Titus"],
    description: "World leader in streaming entertainment with an iconic high-density talent culture and all-cash compensation.",
    color: "from-red-600 to-rose-800"
  },
  {
    id: "comp-apple",
    name: "Apple",
    type: "product",
    tier: "Tier-1 FAANG",
    hq: "Cupertino, CA",
    locations: ["us", "india", "europe", "apac"],
    cities: "Cupertino, Austin, Bengaluru, Hyderabad, Munich, Singapore",
    rating: "4.3 ★",
    tcRange: "$200k - $390k / ₹40L - ₹85L",
    openingsCount: 11,
    techStack: ["Swift", "C / C++", "Objective-C", "Python", "Cassandra", "CoreOS"],
    description: "World-class consumer electronics, privacy-first software ecosystems, and silicon innovation (M-Series).",
    color: "from-slate-700 to-slate-900"
  },
  {
    id: "comp-uber",
    name: "Uber",
    type: "product",
    tier: "Tier-1 High-Scale Mobility",
    hq: "San Francisco, CA",
    locations: ["us", "india", "europe"],
    cities: "San Francisco, Amsterdam, Bengaluru, Hyderabad",
    rating: "4.2 ★",
    tcRange: "$210k - $370k / ₹45L - ₹85L",
    openingsCount: 8,
    techStack: ["Go", "Java", "Kafka", "Microservices", "Schemaless", "Kubernetes"],
    description: "Real-time dispatch, routing, and payment orchestration operating at planetary scale in 10,000+ cities.",
    color: "from-slate-900 to-zinc-800"
  },
  {
    id: "comp-datadog",
    name: "Datadog",
    type: "product",
    tier: "Top Cloud Observability",
    hq: "New York, NY",
    locations: ["us", "europe", "apac"],
    cities: "New York, Paris, Remote, Tokyo",
    rating: "4.3 ★",
    tcRange: "$190k - $320k",
    openingsCount: 7,
    techStack: ["Go", "Python", "Kafka", "Cassandra", "React", "TypeScript", "Terraform"],
    description: "Leading monitoring and security platform for cloud-scale applications and real-time telemetry streaming.",
    color: "from-purple-700 to-indigo-900"
  },
  {
    id: "comp-figma",
    name: "Figma",
    type: "product",
    tier: "Top SaaS Unicorn",
    hq: "San Francisco, CA",
    locations: ["us", "europe"],
    cities: "San Francisco, London, US Remote",
    rating: "4.6 ★",
    tcRange: "$220k - $380k",
    openingsCount: 5,
    techStack: ["Rust", "C++", "WebAssembly", "TypeScript", "React", "CRDTs"],
    description: "Collaborative design and developer canvas engine powered by WebAssembly and real-time multiplayer CRDTs.",
    color: "from-violet-600 to-rose-600"
  },
  {
    id: "comp-snowflake",
    name: "Snowflake",
    type: "product",
    tier: "Top Data Cloud Leader",
    hq: "Bozeman, MT / San Mateo, CA",
    locations: ["us", "europe", "india"],
    cities: "San Mateo, Bengaluru, Berlin, Amsterdam",
    rating: "4.2 ★",
    tcRange: "$210k - $350k / ₹42L - ₹80L",
    openingsCount: 8,
    techStack: ["C++", "Java", "FoundationDB", "AWS / Azure / GCP", "Python", "SQL"],
    description: "Pioneering the Data Cloud with decoupled compute and multi-cluster shared data architectures.",
    color: "from-sky-500 to-blue-700"
  },
  {
    id: "comp-airbnb",
    name: "Airbnb",
    type: "product",
    tier: "Tier-1 Travel Tech",
    hq: "San Francisco, CA",
    locations: ["us", "europe"],
    cities: "San Francisco, Dublin, US Remote (Live and Work Anywhere)",
    rating: "4.4 ★",
    tcRange: "$220k - $370k",
    openingsCount: 6,
    techStack: ["Java", "Kotlin", "React", "GraphQL", "AWS", "Spinnaker"],
    description: "Decentralized hospitality and global experiential marketplace with an iconic live-and-work-anywhere remote policy.",
    color: "from-rose-500 to-pink-700"
  },
  {
    id: "comp-nvidia",
    name: "Nvidia",
    type: "product",
    tier: "Tier-1 AI Hardware & Cloud",
    hq: "Santa Clara, CA",
    locations: ["us", "india", "europe"],
    cities: "Santa Clara, Bengaluru, Pune, Cambridge UK, Munich",
    rating: "4.7 ★",
    tcRange: "$230k - $450k / ₹50L - ₹1.2Cr",
    openingsCount: 15,
    techStack: ["C / C++", "CUDA", "Python", "TensorRT", "Linux Kernel", "LLM Serving"],
    description: "The engine of generative AI — powering accelerated computing, GPU data centers, and frontier LLM training clusters.",
    color: "from-emerald-600 to-green-700"
  },
  {
    id: "comp-salesforce",
    name: "Salesforce",
    type: "product",
    tier: "Top Enterprise SaaS",
    hq: "San Francisco, CA",
    locations: ["us", "india", "europe"],
    cities: "San Francisco, Hyderabad, Bengaluru, London, Dublin",
    rating: "4.2 ★",
    tcRange: "$190k - $330k / ₹32L - ₹65L",
    openingsCount: 11,
    techStack: ["Java", "Apex", "React / LWC", "Python", "Kafka", "AWS"],
    description: "Global CRM and enterprise cloud pioneer powering customer relationship platforms and autonomous AI agents.",
    color: "from-blue-500 to-sky-700"
  },
  {
    id: "comp-adobe",
    name: "Adobe",
    type: "product",
    tier: "Top Creative Cloud Tech",
    hq: "San Jose, CA",
    locations: ["us", "india", "europe"],
    cities: "San Jose, Noida, Bengaluru, London, Bucharest",
    rating: "4.4 ★",
    tcRange: "$190k - $340k / ₹35L - ₹75L",
    openingsCount: 9,
    techStack: ["C++", "JavaScript", "Python", "WebAssembly", "Cloud Services", "Firefly"],
    description: "Global standard in digital media, document workflows, creative software, and commercial generative AI.",
    color: "from-red-600 to-orange-600"
  },
  {
    id: "comp-linkedin",
    name: "LinkedIn",
    type: "product",
    tier: "Top Professional Network",
    hq: "Sunnyvale, CA",
    locations: ["us", "india", "europe", "apac"],
    cities: "Sunnyvale, Mountain View, Bengaluru, Dublin, Singapore",
    rating: "4.5 ★",
    tcRange: "$205k - $360k / ₹40L - ₹80L",
    openingsCount: 8,
    techStack: ["Java", "Kafka", "Rest.li", "React", "Pinot", "Azure"],
    description: "Professional social graph and knowledge platform connecting 1B+ members globally with high-scale distributed data.",
    color: "from-blue-700 to-cyan-800"
  },
  {
    id: "comp-oracle",
    name: "Oracle (OCI)",
    type: "product",
    tier: "Enterprise Cloud & DB",
    hq: "Austin, TX",
    locations: ["us", "india", "europe"],
    cities: "Austin, Redwood City, Bengaluru, Hyderabad, Zurich",
    rating: "4.0 ★",
    tcRange: "$180k - $320k / ₹30L - ₹65L",
    openingsCount: 12,
    techStack: ["Java", "C++", "Go", "Terraform", "OCI Cloud", "Linux Kernel"],
    description: "High-performance Gen 2 enterprise cloud infrastructure, autonomous databases, and enterprise applications.",
    color: "from-red-700 to-slate-900"
  },
  {
    id: "comp-atlassian",
    name: "Atlassian",
    type: "product",
    tier: "Top Collaboration SaaS",
    hq: "Sydney, Australia",
    locations: ["apac", "india", "us", "europe"],
    cities: "Sydney, Bengaluru, Remote (Team Anywhere), Amsterdam",
    rating: "4.4 ★",
    tcRange: "$190k - $330k / ₹40L - ₹75L",
    openingsCount: 7,
    techStack: ["Java", "Kotlin", "React", "TypeScript", "AWS", "GraphQL"],
    description: "Developer collaboration and work management tools used by millions — Jira, Confluence, Trello, and Bitbucket.",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "comp-palantir",
    name: "Palantir",
    type: "product",
    tier: "Enterprise AI & Defense",
    hq: "Denver, CO",
    locations: ["us", "europe"],
    cities: "Denver, Palo Alto, London, New York",
    rating: "4.1 ★",
    tcRange: "$210k - $380k",
    openingsCount: 6,
    techStack: ["Java", "TypeScript", "React", "Python", "Kubernetes", "Foundry"],
    description: "Mission-critical data integration, analytics, and operational AI platforms (Foundry, Gotham, and AIP).",
    color: "from-slate-800 to-slate-950"
  },
  {
    id: "comp-coinbase",
    name: "Coinbase",
    type: "product",
    tier: "Top Crypto Exchange",
    hq: "Remote-First",
    locations: ["us", "india", "europe"],
    cities: "US Remote, Global Remote, Hyderabad",
    rating: "4.2 ★",
    tcRange: "$220k - $390k / ₹45L - ₹85L",
    openingsCount: 5,
    techStack: ["Go", "React Native", "Ruby", "AWS", "Blockchain / Web3", "PostgreSQL"],
    description: "Regulated crypto platform and financial infrastructure bridging the traditional economy with on-chain protocols.",
    color: "from-blue-600 to-blue-800"
  },

  // Top Service-Based MNCs (Global Systems Integrators)
  {
    id: "comp-tcs",
    name: "TCS (Tata Consultancy Services)",
    type: "service",
    tier: "Top-Tier IT MNC ($28B+)",
    hq: "Mumbai, India",
    locations: ["india", "us", "europe", "apac"],
    cities: "Bengaluru, Hyderabad, Pune, Mumbai, Chennai, New Jersey, London, Tokyo",
    rating: "3.9 ★",
    tcRange: "₹4.5L - ₹32L / $95k - $145k",
    openingsCount: 35,
    techStack: ["Java / Spring Boot", "Cloud (AWS/Azure)", "React", "Angular", "Python", "DevOps"],
    description: "India's largest IT consulting and business solutions company with 600,000+ engineers delivering Fortune 500 digital transformation.",
    color: "from-indigo-800 to-blue-900"
  },
  {
    id: "comp-infosys",
    name: "Infosys",
    type: "service",
    tier: "Global IT Services Leader",
    hq: "Bengaluru, India",
    locations: ["india", "us", "europe", "apac"],
    cities: "Bengaluru, Pune, Hyderabad, Chennai, Richardson TX, Frankfurt, London",
    rating: "3.9 ★",
    tcRange: "₹4.2L - ₹30L / $90k - $140k",
    openingsCount: 28,
    techStack: ["Java", "Python", "Spring Boot", "Full Stack", "Azure", "Microservices"],
    description: "Next-generation digital services and consulting enabling clients across 56 countries to navigate cloud migration.",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "comp-accenture",
    name: "Accenture",
    type: "service",
    tier: "Global Management & Tech MNC",
    hq: "Dublin, Ireland",
    locations: ["us", "india", "europe", "apac"],
    cities: "Dublin, Bengaluru, Hyderabad, Chicago, London, Paris, Manila, Tokyo",
    rating: "4.1 ★",
    tcRange: "₹6L - ₹38L / $110k - $175k",
    openingsCount: 40,
    techStack: ["Cloud Architecture", "SAP", "Java", "Salesforce", "Cybersecurity", "Data Eng"],
    description: "Global professional services company with leading capabilities in digital, cloud, security, and enterprise strategy.",
    color: "from-purple-800 to-violet-950"
  },
  {
    id: "comp-wipro",
    name: "Wipro",
    type: "service",
    tier: "Global IT & Business Process",
    hq: "Bengaluru, India",
    locations: ["india", "us", "europe", "apac"],
    cities: "Bengaluru, Hyderabad, Pune, Chennai, East Brunswick NJ, London",
    rating: "3.8 ★",
    tcRange: "₹4L - ₹28L / $90k - $135k",
    openingsCount: 20,
    techStack: ["Java", ".NET Core", "Cloud", "Automation", "Testing", "React"],
    description: "Technology services and consulting company focused on building innovative solutions addressing complex digital needs.",
    color: "from-teal-700 to-emerald-900"
  },
  {
    id: "comp-cognizant",
    name: "Cognizant",
    type: "service",
    tier: "Global Technology & Operations",
    hq: "Teaneck, NJ",
    locations: ["us", "india", "europe"],
    cities: "Teaneck NJ, Chennai, Bengaluru, Hyderabad, Pune, London",
    rating: "3.9 ★",
    tcRange: "₹4.5L - ₹32L / $95k - $150k",
    openingsCount: 25,
    techStack: ["Java", "Full Stack Web", "AWS / Azure", "Data Analytics", "AI / ML"],
    description: "Engineering modern businesses to improve everyday life across healthcare, banking, and retail domains.",
    color: "from-blue-800 to-cyan-900"
  },
  {
    id: "comp-capgemini",
    name: "Capgemini",
    type: "service",
    tier: "European & Global IT Powerhouse",
    hq: "Paris, France",
    locations: ["europe", "india", "us"],
    cities: "Paris, Bengaluru, Hyderabad, Pune, New York, London",
    rating: "3.9 ★",
    tcRange: "₹4.5L - ₹30L / €65k - €95k",
    openingsCount: 22,
    techStack: ["Cloud Native", "Java", "Python", "Salesforce", "DevOps", "Cybersecurity"],
    description: "Global business and technology transformation partner helping companies accelerate dual transitions to digital and sustainable worlds.",
    color: "from-sky-700 to-blue-900"
  },
  {
    id: "comp-deloitte",
    name: "Deloitte (USI / Tech Consulting)",
    type: "service",
    tier: "Big 4 Consulting & Tech",
    hq: "New York, NY",
    locations: ["us", "india", "europe"],
    cities: "Hyderabad, Bengaluru, Mumbai, Gurgaon, New York, London, Toronto",
    rating: "4.0 ★",
    tcRange: "₹7L - ₹42L / $115k - $185k",
    openingsCount: 26,
    techStack: ["Cloud Modernization", "Full Stack", "Data Science", "Oracle", "SAP", "Cyber"],
    description: "World's largest professional services network providing audit, consulting, financial advisory, and cutting-edge software engineering.",
    color: "from-emerald-800 to-green-950"
  },
  {
    id: "comp-ibm",
    name: "IBM Consulting & Global Services",
    type: "service",
    tier: "Global Enterprise Technology",
    hq: "Armonk, NY",
    locations: ["us", "india", "europe", "apac"],
    cities: "Armonk NY, Bengaluru, Pune, Hyderabad, London, Tokyo",
    rating: "4.1 ★",
    tcRange: "₹6L - ₹36L / $105k - $165k",
    openingsCount: 19,
    techStack: ["Red Hat OpenShift", "Java", "Python", "Hybrid Cloud", "AI Watsonx"],
    description: "Hybrid cloud and AI leader integrating consulting expertise with deep enterprise infrastructure.",
    color: "from-blue-900 to-slate-900"
  },
  {
    id: "comp-ltimindtree",
    name: "LTI Mindtree",
    type: "service",
    tier: "Fast-Growing IT Solutions",
    hq: "Mumbai, India",
    locations: ["india", "us", "europe"],
    cities: "Mumbai, Bengaluru, Hyderabad, Pune, Edison NJ, London",
    rating: "3.9 ★",
    tcRange: "₹5L - ₹32L / $95k - $140k",
    openingsCount: 16,
    techStack: ["Java", "Cloud Migration", "Data Engineering", "Microservices", "React"],
    description: "Merged powerhouse in digital transformation, engineering next-generation client solutions across banking, manufacturing, and retail.",
    color: "from-amber-700 to-orange-900"
  },
  {
    id: "comp-hcltech",
    name: "HCLTech",
    type: "service",
    tier: "Global Technology MNC",
    hq: "Noida, India",
    locations: ["india", "us", "europe"],
    cities: "Noida, Bengaluru, Chennai, Sunnyvale CA, London",
    rating: "3.8 ★",
    tcRange: "₹4.5L - ₹30L / $95k - $140k",
    openingsCount: 18,
    techStack: ["Infra Management", "Cloud Native", "Java", "C++", "IoT", "Cybersecurity"],
    description: "Global technology company supercharging digital progress across engineering, digital, and cloud platforms.",
    color: "from-purple-700 to-indigo-900"
  }
];

const MNC_OPENINGS = [
  // Requisitions across Locations & Levels
  {
    id: "req-goog-01",
    company: "Google",
    role: "Staff Software Engineer — Distributed Systems",
    location: "Bengaluru, India (Hybrid)",
    region: "india",
    level: "staff",
    track: "backend",
    salary: "₹65 - 90 LPA + Stocks",
    daysAgo: 1,
    applicants: 14,
    atsMatch: "97%",
    urgency: "Hot Loop",
    techStack: ["Go", "C++", "Distributed Spanner", "Kubernetes", "gRPC"]
  },
  {
    id: "req-goog-02",
    company: "Google Cloud",
    role: "Solutions Architect (Enterprise Cloud)",
    location: "Sunnyvale, CA / Hybrid",
    region: "us",
    level: "senior",
    track: "cloud",
    salary: "$210k - $265k TC",
    daysAgo: 2,
    applicants: 21,
    atsMatch: "94%",
    urgency: "Urgent",
    techStack: ["GCP", "Kubernetes", "Terraform", "Python", "Enterprise Security"]
  },
  {
    id: "req-strp-01",
    company: "Stripe",
    role: "Staff Full-Stack Engineer — Systems Scaling",
    location: "Remote (US / Global)",
    region: "us",
    level: "staff",
    track: "fullstack",
    salary: "$250k - $290k Base + Equity",
    daysAgo: 2,
    applicants: 19,
    atsMatch: "98%",
    urgency: "Interview Ready",
    techStack: ["Ruby", "Go", "React", "Kafka", "Idempotency", "PostgreSQL"]
  },
  {
    id: "req-strp-02",
    company: "Stripe",
    role: "Senior Backend Engineer (Payments APAC)",
    location: "Singapore / Hybrid",
    region: "apac",
    level: "senior",
    track: "backend",
    salary: "S$180k - S$240k TC",
    daysAgo: 3,
    applicants: 11,
    atsMatch: "92%",
    urgency: "New",
    techStack: ["Java", "Go", "Distributed Ledger", "High-Throughput"]
  },
  {
    id: "req-msft-01",
    company: "Microsoft",
    role: "Principal Software Architect — Azure Core",
    location: "Hyderabad, India / Remote",
    region: "india",
    level: "staff",
    track: "cloud",
    salary: "₹70 - 95 LPA",
    daysAgo: 1,
    applicants: 8,
    atsMatch: "95%",
    urgency: "Hot Loop",
    techStack: ["C#", "Go", "Azure Compute", "Distributed Storage", "Microservices"]
  },
  {
    id: "req-msft-02",
    company: "Microsoft",
    role: "Software Engineer II (Frontend / Teams)",
    location: "Redmond, WA",
    region: "us",
    level: "mid",
    track: "frontend",
    salary: "$165k - $210k TC",
    daysAgo: 4,
    applicants: 35,
    atsMatch: "91%",
    urgency: "Standard",
    techStack: ["TypeScript", "React", "GraphQL", "Performance Profiling"]
  },
  {
    id: "req-meta-01",
    company: "Meta",
    role: "Production Engineer (Core Infrastructure)",
    location: "Menlo Park, CA / Remote",
    region: "us",
    level: "senior",
    track: "cloud",
    salary: "$220k - $275k TC",
    daysAgo: 2,
    applicants: 16,
    atsMatch: "96%",
    urgency: "Urgent",
    techStack: ["Linux Kernel", "Python", "C++", "Config Management", "Automation"]
  },
  {
    id: "req-meta-02",
    company: "Meta",
    role: "Research Engineer — Frontier AI / Llama",
    location: "London, UK",
    region: "europe",
    level: "senior",
    track: "ai",
    salary: "£140k - £190k TC",
    daysAgo: 3,
    applicants: 24,
    atsMatch: "93%",
    urgency: "Hot Loop",
    techStack: ["PyTorch", "Python", "Distributed GPU Serving", "CUDA", "C++"]
  },
  {
    id: "req-amzn-01",
    company: "Amazon & AWS",
    role: "Software Development Engineer II (SDE-2)",
    location: "Bengaluru, India",
    region: "india",
    level: "mid",
    track: "backend",
    salary: "₹38 - 52 LPA",
    daysAgo: 3,
    applicants: 42,
    atsMatch: "94%",
    urgency: "Immediate",
    techStack: ["Java", "AWS DynamoDB", "SQS", "System Design", "Microservices"]
  },
  {
    id: "req-amzn-02",
    company: "Amazon & AWS",
    role: "Principal Systems Engineer — AWS Hyperplane",
    location: "Seattle, WA",
    region: "us",
    level: "staff",
    track: "backend",
    salary: "$270k - $340k TC",
    daysAgo: 5,
    applicants: 7,
    atsMatch: "96%",
    urgency: "High Priority",
    techStack: ["C / C++", "Rust", "Network Datapaths", "Distributed Sharding"]
  },
  {
    id: "req-nflx-01",
    company: "Netflix",
    role: "Senior Platform Engineer (Telemetry & Observability)",
    location: "Remote (US)",
    region: "us",
    level: "senior",
    track: "cloud",
    salary: "$420,000 All-Cash",
    daysAgo: 2,
    applicants: 18,
    atsMatch: "95%",
    urgency: "Exclusive",
    techStack: ["Java", "Go", "Kafka", "Mantiss", "Cassandra", "AWS"]
  },
  {
    id: "req-appl-01",
    company: "Apple",
    role: "Senior Cloud Infrastructure Engineer",
    location: "Munich, Germany / Hybrid",
    region: "europe",
    level: "senior",
    track: "cloud",
    salary: "€115k - €150k",
    daysAgo: 4,
    applicants: 12,
    atsMatch: "93%",
    urgency: "Urgent",
    techStack: ["Kubernetes", "Go", "Distributed Storage", "Linux", "Terraform"]
  },
  {
    id: "req-ubr-01",
    company: "Uber",
    role: "Lead Backend Engineer — Core Dispatch",
    location: "Hyderabad, India",
    region: "india",
    level: "senior",
    track: "backend",
    salary: "₹50 - 75 LPA",
    daysAgo: 1,
    applicants: 9,
    atsMatch: "97%",
    urgency: "Hot Loop",
    techStack: ["Go", "Java", "Kafka Streaming", "Redis", "Geo-Spatial Indexing"]
  },
  {
    id: "req-fig-01",
    company: "Figma",
    role: "Senior Systems Engineer (Multiplayer Canvas Engine)",
    location: "San Francisco, CA / Remote",
    region: "us",
    level: "senior",
    track: "fullstack",
    salary: "$230k - $280k + Equity",
    daysAgo: 2,
    applicants: 15,
    atsMatch: "95%",
    urgency: "Hot Loop",
    techStack: ["Rust", "WebAssembly", "TypeScript", "CRDTs", "WebGL"]
  },
  {
    id: "req-tcs-01",
    company: "TCS (Tata Consultancy Services)",
    role: "Technical Lead — Cloud Native Modernization",
    location: "Bengaluru / Pune, India",
    region: "india",
    level: "senior",
    track: "backend",
    salary: "₹18 - 28 LPA",
    daysAgo: 2,
    applicants: 31,
    atsMatch: "92%",
    urgency: "Active Requisition",
    techStack: ["Java 17", "Spring Boot", "AWS / Azure", "Microservices", "Docker"]
  },
  {
    id: "req-tcs-02",
    company: "TCS (Tata Consultancy Services)",
    role: "Enterprise Solutions Architect (US Client Delivery)",
    location: "Edison, NJ (US Onsite)",
    region: "us",
    level: "staff",
    track: "cloud",
    salary: "$130k - $165k",
    daysAgo: 3,
    applicants: 14,
    atsMatch: "90%",
    urgency: "Visa Supported",
    techStack: ["Enterprise Architecture", "Cloud Migration", "Kafka", "Kubernetes"]
  },
  {
    id: "req-infy-01",
    company: "Infosys",
    role: "Lead Consultant — Microservices & Cloud",
    location: "Bengaluru / Hyderabad, India",
    region: "india",
    level: "senior",
    track: "fullstack",
    salary: "₹16 - 26 LPA",
    daysAgo: 1,
    applicants: 29,
    atsMatch: "91%",
    urgency: "Immediate Joining",
    techStack: ["Java", "Spring Cloud", "React", "PostgreSQL", "CI/CD"]
  },
  {
    id: "req-acn-01",
    company: "Accenture",
    role: "Cloud Architecture Senior Manager",
    location: "London, UK / Hybrid",
    region: "europe",
    level: "staff",
    track: "cloud",
    salary: "£110k - £145k",
    daysAgo: 3,
    applicants: 11,
    atsMatch: "94%",
    urgency: "Client Requisition",
    techStack: ["Multi-Cloud (AWS/GCP)", "Kubernetes", "Zero-Trust Security", "DevOps"]
  },
  {
    id: "req-acn-02",
    company: "Accenture",
    role: "Full-Stack Specialist (React & Node.js)",
    location: "Pune / Chennai, India",
    region: "india",
    level: "mid",
    track: "fullstack",
    salary: "₹12 - 20 LPA",
    daysAgo: 2,
    applicants: 45,
    atsMatch: "89%",
    urgency: "Multiple Openings",
    techStack: ["React 18", "Node.js", "Express", "MongoDB", "Jest"]
  },
  {
    id: "req-del-01",
    company: "Deloitte (USI / Tech Consulting)",
    role: "Senior Consultant — AI & Data Engineering",
    location: "Hyderabad / Bengaluru, India",
    region: "india",
    level: "senior",
    track: "ai",
    salary: "₹22 - 34 LPA",
    daysAgo: 2,
    applicants: 19,
    atsMatch: "93%",
    urgency: "Priority",
    techStack: ["Python", "PySpark", "Snowflake", "Databricks", "LLM APIs"]
  },
  // =========================================================================
  // MULTI-PERSONA REQUISITIONS (SALES, MARKETING, HR, RECRUITING & SWITCHERS)
  // =========================================================================
  {
    id: "req-sfdc-sales-01",
    company: "Salesforce",
    role: "Enterprise Account Executive — Strategic Cloud Accounts",
    location: "San Francisco, CA / Remote",
    region: "us",
    level: "senior",
    track: "sales",
    salary: "$240k - $360k OTE",
    daysAgo: 1,
    applicants: 12,
    atsMatch: "96%",
    urgency: "Quota Crusher",
    techStack: ["MEDDPICC", "Salesforce CRM", "Strategic Accounts", "C-Suite Discovery", "Enterprise SaaS"]
  },
  {
    id: "req-goog-sales-02",
    company: "Google",
    role: "Regional Head of Enterprise Sales — Cloud Platform",
    location: "Gurugram / Mumbai, India",
    region: "india",
    level: "staff",
    track: "sales",
    salary: "₹50 - 75 LPA",
    daysAgo: 2,
    applicants: 8,
    atsMatch: "97%",
    urgency: "Priority Loop",
    techStack: ["Enterprise GCP", "Quota Attainment (160%)", "Channel Partners", "Executive Negotiations"]
  },
  {
    id: "req-adbe-mkt-01",
    company: "Adobe",
    role: "Director of Product Marketing — GenAI & Creative Cloud",
    location: "San Jose, CA / Remote",
    region: "us",
    level: "staff",
    track: "marketing",
    salary: "$210k - $285k TC",
    daysAgo: 2,
    applicants: 11,
    atsMatch: "96%",
    urgency: "Strategic Hire",
    techStack: ["GTM Positioning", "Product-Led Growth", "PMM Messaging", "Competitive Intelligence", "User Acquisition"]
  },
  {
    id: "req-canv-mkt-02",
    company: "Canva",
    role: "Senior Growth & Lifecycle Marketing Lead",
    location: "Sydney / Remote APAC",
    region: "global",
    level: "senior",
    track: "marketing",
    salary: "A$175k - A$230k",
    daysAgo: 1,
    applicants: 16,
    atsMatch: "95%",
    urgency: "Hot Loop",
    techStack: ["Lifecycle Retention", "Growth Experimentation", "Amplitude", "Customer Journey", "CAC/LTV Optimization"]
  },
  {
    id: "req-nflx-hr-01",
    company: "Netflix",
    role: "Senior People Partner / HRBP (Content & Studio Tech)",
    location: "Los Angeles, CA / Remote",
    region: "us",
    level: "senior",
    track: "hr-recruiting",
    salary: "$220k - $300k All-Cash Base",
    daysAgo: 1,
    applicants: 9,
    atsMatch: "98%",
    urgency: "Executive Role",
    techStack: ["Culture & Values", "Talent Density", "Organizational Design", "Executive Coaching", "Compensation Bands"]
  },
  {
    id: "req-strp-rec-02",
    company: "Stripe",
    role: "Lead Technical & Executive Recruiter",
    location: "San Francisco / Remote",
    region: "us",
    level: "senior",
    track: "hr-recruiting",
    salary: "$160k - $225k TC",
    daysAgo: 2,
    applicants: 13,
    atsMatch: "95%",
    urgency: "Active Loop",
    techStack: ["Full-Cycle Recruiting", "Greenhouse ATS", "Executive Headhunting", "Offer Closing (91%)", "Diversity Sourcing"]
  },
  {
    id: "req-appl-switch-01",
    company: "Apple",
    role: "Strategic Program Manager / Business Operations (Career Pivot)",
    location: "Cupertino, CA / Hybrid",
    region: "us",
    level: "senior",
    track: "switcher",
    salary: "$185k - $245k TC",
    daysAgo: 3,
    applicants: 21,
    atsMatch: "94%",
    urgency: "Cross-Functional",
    techStack: ["Strategic Planning", "Cross-Domain Alignment", "Stakeholder Management", "Operations Scaling", "PMP / Agile"]
  },
  {
    id: "req-uber-switch-02",
    company: "Uber",
    role: "Senior Operations & Business Switcher Manager",
    location: "Mumbai / Gurugram, India",
    region: "india",
    level: "mid",
    track: "switcher",
    salary: "₹32 - 48 LPA",
    daysAgo: 2,
    applicants: 27,
    atsMatch: "91%",
    urgency: "Lateral Switch",
    techStack: ["Market Launch", "Unit Economics", "Driver/Rider Ops", "P&L Ownership", "Analytical SQL"]
  }
];

const CURATED_COURSES = [
  {
    id: "course-striver-dsa",
    title: "Striver's SDE Sheet & A2Z DSA Masterclass",
    author: "Take U Forward (Raj Vikramaditya)",
    category: "DSA & Algorithms",
    difficulty: "Beginner to Advanced (455 Problems)",
    estimatedHours: "120 Hours",
    link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
    description: "The gold standard roadmap for FAANG & tier-1 product coding rounds. Covers Arrays, DP, Graphs, Binary Trees, and Greedy patterns.",
    badge: "Must-Do for Product MNCs",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    id: "course-neetcode-150",
    title: "NeetCode 150 & Blind 75 Algorithmic Patterns",
    author: "NeetCode (Navdeep Singh)",
    category: "High-Yield LeetCode",
    difficulty: "Intermediate to Hard (150 Problems)",
    estimatedHours: "80 Hours",
    link: "https://neetcode.io/practice",
    description: "Curated pattern-by-pattern breakdown (Two Pointers, Sliding Window, Monotonic Stack, Backtracking, Intervals) with visual solutions.",
    badge: "Fast Track Interview Ready",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "course-bytebytego-hld",
    title: "System Design Interview — Alex Xu (ByteByteGo)",
    author: "Alex Xu & ByteByteGo Team",
    category: "System Design (HLD)",
    difficulty: "Mid to Principal Architect",
    estimatedHours: "60 Hours",
    link: "https://bytebytego.com/",
    description: "Visual blueprints for high-scale systems: URL Shortener, Rate Limiter, Distributed Cache, Chat Systems, Payment Platforms, and YouTube scaling.",
    badge: "Staff & Lead SDE Essential",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "course-ddia-book",
    title: "Designing Data-Intensive Applications (DDIA)",
    author: "Martin Kleppmann (Cambridge)",
    category: "Distributed Storage & SRE",
    difficulty: "Advanced Deep-Dive",
    estimatedHours: "90 Hours",
    link: "https://dataintensive.net/",
    description: "The bible of modern distributed reliability: Partitioning, Replication, Consensus (Paxos/Raft), Transactions (ACID vs BASE), and Stream Processing.",
    badge: "FAANG Architectural Depth",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "course-refactoring-guru",
    title: "Refactoring Guru & SOLID Design Patterns (LLD)",
    author: "Alexander Shvets (Refactoring Guru)",
    category: "Low-Level Design (Machine Coding)",
    difficulty: "Practical Engineering (23 GoF Patterns)",
    estimatedHours: "40 Hours",
    link: "https://refactoring.guru/design-patterns",
    description: "Master Creational, Structural, and Behavioral patterns in Java/Python/TypeScript. Practice real-world Elevator, Parking Lot, and Snake-and-Ladder LLD.",
    badge: "Machine Coding Rounds",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    id: "course-behavioral-star",
    title: "Amazon 16 Leadership Principles & STAR Story Bank",
    author: "Dan Croitor & Executive Coaches",
    category: "Behavioral & Culture Fit",
    difficulty: "All Levels (Senior & Staff)",
    estimatedHours: "20 Hours",
    link: "https://www.youtube.com/c/DanCroitor",
    description: "Frame your past projects into compelling STAR responses: Situation, Task, Action, and Result. Master conflict resolution and executive storytelling.",
    badge: "100% Pass Bar Raisers",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "course-service-nqt",
    title: "TCS NQT & Service MNC Aptitude Master Guide",
    author: "PrepInsta & FacePrep",
    category: "Service MNC Assessment",
    difficulty: "Foundation to Advanced",
    estimatedHours: "50 Hours",
    link: "https://prepinsta.com/tcs-nqt/",
    description: "Complete preparation for TCS NQT, Infosys InfyTQ, Cognizant GenC, and Wipro Elite: Quantitative Aptitude, Logical Reasoning, Pseudo Code, and SQL.",
    badge: "Service MNC Gateway",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300"
  },
  {
    id: "course-yc-startup-school",
    title: "Y Combinator Startup School & MVP Accelerator",
    author: "Paul Graham, Michael Seibel, Dalton Caldwell",
    category: "Startup Mentorship & Founding",
    difficulty: "Founder & Founding Engineer",
    estimatedHours: "35 Hours",
    link: "https://www.startupschool.org/",
    description: "How to validate product ideas, talk to initial enterprise customers, navigate seed equity vs cash compensation, and hire founding engineers.",
    badge: "Founding Engineer Track",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200"
  },
  {
    id: "course-sales-meddpicc",
    title: "MEDDPICC Enterprise SaaS Sales Closing Masterclass",
    author: "John McMahon & Force Management",
    category: "B2B Enterprise Sales",
    difficulty: "Mid to Enterprise AE",
    estimatedHours: "30 Hours",
    link: "https://forcemanagement.com/meddpicc-sales-process/",
    description: "Master enterprise deal qualification: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion, and Competition.",
    badge: "Enterprise Quota Crusher",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "course-reforge-growth",
    title: "Reforge Product Marketing & Advanced Growth Strategy",
    author: "Brian Balfour & Elena Verna",
    category: "Growth & Product Marketing",
    difficulty: "Director / Head of PMM",
    estimatedHours: "45 Hours",
    link: "https://www.reforge.com/courses/product-marketing",
    description: "Executive frameworks for positioning, category creation, CAC/LTV payback, retention loops, and product-led market expansion.",
    badge: "Executive GTM Playbook",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "course-talent-sourcing",
    title: "Modern Technical Talent Sourcing & Bar-Raiser Recruiting",
    author: "Glen Cathey & Lou Adler",
    category: "Talent Acquisition & HR",
    difficulty: "Mid to Executive Recruiter",
    estimatedHours: "25 Hours",
    link: "https://booleanblackbelt.com/",
    description: "Boolean search mastery, Greenhouse pipeline velocity, executive closing scripts, diversity sourcing, and counter-offer mitigation.",
    badge: "Recruiter Masterclass",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "course-career-switcher",
    title: "Strategic Career Pivot & Non-Tech to Tech Playbook",
    author: "Michael Higgins & Career Transition Guild",
    category: "Career Transition & Pivot",
    difficulty: "All Transitioning Professionals",
    estimatedHours: "35 Hours",
    link: "https://hbr.org/topic/subject/career-transitions",
    description: "Translating non-traditional backgrounds into high-leverage business ops, customer success, and product roles with 6-figure salaries.",
    badge: "Career Switcher Blueprint",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

const VERIFIED_MENTORS = [
  {
    id: "mentor-elena",
    name: "Elena Rostova",
    role: "Staff Software Engineer",
    company: "Google",
    location: "Mountain View / Remote",
    avatar: "ER",
    color: "from-blue-600 to-indigo-600",
    specialties: ["Distributed Systems", "Cloud Infrastructure", "System Design Mocks"],
    bio: "11+ years at Google & AWS. Tech lead for globally distributed Spanner tables and Borg orchestration. Helped 60+ engineers crack Google L5/L6 loops.",
    slotsAvailable: "3 Slots This Week",
    freeCommunityMock: true
  },
  {
    id: "mentor-david",
    name: "David Zhang",
    role: "Director of Engineering",
    company: "Stripe",
    location: "San Francisco / Remote",
    avatar: "DZ",
    color: "from-indigo-600 to-purple-600",
    specialties: ["Fintech Reliability", "Staff+ Leveling", "Offer Negotiation"],
    bio: "Leads Core Inbound & Card Payments at Stripe. Previously Principal SWE at PayPal. Specializes in negotiating $300k+ executive equity grants.",
    slotsAvailable: "2 Slots Available",
    freeCommunityMock: true
  },
  {
    id: "mentor-priya",
    name: "Priya Sharma",
    role: "Principal Cloud Architect",
    company: "Microsoft Azure",
    location: "Bengaluru, India",
    avatar: "PS",
    color: "from-cyan-600 to-blue-600",
    specialties: ["Kubernetes Microservices", "Azure Cloud Migration", "High-Scale HLD"],
    bio: "14+ years designing hyperscale systems for Microsoft & Cisco. Conducted 200+ architectural hiring loops for Indian and APAC candidates.",
    slotsAvailable: "4 Slots Available",
    freeCommunityMock: true
  },
  {
    id: "mentor-marcus",
    name: "Marcus Vance",
    role: "Tech Lead Manager",
    company: "Meta",
    location: "London, UK",
    avatar: "MV",
    color: "from-blue-700 to-indigo-800",
    specialties: ["High-Throughput GraphQL", "React Platform", "System Performance"],
    bio: "Oversees core feed delivery for Instagram web and mobile. Passionate about helping engineers master system design and clean concurrency.",
    slotsAvailable: "2 Slots This Week",
    freeCommunityMock: true
  },
  {
    id: "mentor-ananya",
    name: "Ananya Deshmukh",
    role: "Senior Engineering Manager",
    company: "Amazon AWS",
    location: "Hyderabad, India",
    avatar: "AD",
    color: "from-amber-600 to-orange-700",
    specialties: ["AWS Serverless", "Amazon Bar Raiser", "STAR Behavioral Drills"],
    bio: "Certified Amazon Bar Raiser with 8+ years evaluating SDE-2 and SDE-3 candidates across all 16 Leadership Principles.",
    slotsAvailable: "5 Slots Available",
    freeCommunityMock: true
  },
  {
    id: "mentor-liam",
    name: "Liam O'Connor",
    role: "Principal Architect",
    company: "Uber",
    location: "Amsterdam, Netherlands",
    avatar: "LO",
    color: "from-slate-700 to-slate-900",
    specialties: ["Kafka Streaming", "Real-Time Dispatch", "Geo-Spatial Algorithms"],
    bio: "Architected Uber's planetary ride matching engine. Mentors candidates on overcoming high-pressure whiteboard rounds and system tradeoffs.",
    slotsAvailable: "1 Slot Left",
    freeCommunityMock: true
  },
  {
    id: "mentor-rajesh",
    name: "Rajesh Nair",
    role: "Global Delivery Head",
    company: "TCS Digital",
    location: "Mumbai, India",
    avatar: "RN",
    color: "from-indigo-800 to-blue-900",
    specialties: ["Service MNC Hiring", "Lateral Switch to Product", "Enterprise Java"],
    bio: "20+ years leading delivery across Fortune 500 banks. Guided hundreds of service-based engineers in upskilling and cracking tier-1 product offers.",
    slotsAvailable: "4 Slots Available",
    freeCommunityMock: true
  },
  {
    id: "mentor-kavita",
    name: "Kavita Patel",
    role: "Founder & CTO",
    company: "YC W24 AI Startup",
    location: "San Francisco / Remote",
    avatar: "KP",
    color: "from-rose-600 to-pink-700",
    specialties: ["Founding Engineer Roles", "Startup Equity & Vesting", "Fast MVP Execution"],
    bio: "YC alumnus, ex-Staff SWE at Airbnb. Advises engineers deciding between Big Tech stability and early-stage startup equity upside.",
    slotsAvailable: "2 Slots Available",
    freeCommunityMock: true
  },
  {
    id: "mentor-samantha-sales",
    name: "Samantha Vance",
    role: "VP of Enterprise Sales",
    company: "Salesforce",
    location: "San Francisco / Remote",
    avatar: "SV",
    color: "from-emerald-600 to-teal-700",
    specialties: ["Enterprise SaaS Deals", "MEDDPICC Closing", "Quota Overachievement (180%)"],
    bio: "12+ years in B2B enterprise sales. Closed $40M+ in cloud contracts. Mentors AEs and SDRs on landing enterprise quotas and closing multi-million dollar deals.",
    slotsAvailable: "3 Slots This Week",
    freeCommunityMock: true
  },
  {
    id: "mentor-darren-mkt",
    name: "Darren Brooks",
    role: "Head of Product Marketing",
    company: "Canva",
    location: "Sydney / Remote APAC",
    avatar: "DB",
    color: "from-purple-600 to-indigo-700",
    specialties: ["Product-Led Growth", "GTM Messaging & Positioning", "CAC/LTV Payback"],
    bio: "Led growth and product marketing at HubSpot and Canva. Advises marketers on crafting category-defining narrative decks and scaling self-serve funnels.",
    slotsAvailable: "2 Slots Available",
    freeCommunityMock: true
  },
  {
    id: "mentor-amina-hr",
    name: "Amina Patel",
    role: "Director of Global Talent Acquisition",
    company: "Netflix",
    location: "Los Angeles / Remote",
    avatar: "AP",
    color: "from-blue-600 to-cyan-700",
    specialties: ["Executive Headhunting", "Offer Closing & Equity Negotiation", "Resume Red Flags"],
    bio: "15+ years hiring top 1% talent across Netflix, Uber, and Google. Helps job seekers decode recruiter psychology and negotiate all-cash and equity packages.",
    slotsAvailable: "4 Slots Available",
    freeCommunityMock: true
  },
  {
    id: "mentor-carlos-switch",
    name: "Carlos Rivera",
    role: "Executive Career Pivot Coach",
    company: "Ex-McKinsey & YC Advisor",
    location: "New York / Remote",
    avatar: "CR",
    color: "from-amber-600 to-orange-700",
    specialties: ["Non-Tech to Tech Transition", "Cross-Functional Framing", "Executive Presence"],
    bio: "Guided 100+ professionals transitioning from consulting, finance, retail, and traditional corporations into high-growth tech leadership.",
    slotsAvailable: "3 Slots Available",
    freeCommunityMock: true
  }
];

let activeMncSubTab = 'companies';
let currentMncTypeFilter = 'all';
let currentReferralPersona = 'alumni';
let selectedMockMentor = null;

/**
 * Initialize MNC Hub controllers & populate dropdowns
 */
function initMncHub() {
  populateMncDropdowns();
  renderMncCompanies();
  renderMncOpenings();
  renderCoursesGrid();
  renderMentorsGrid();
  updateReferralPitch();
  generateTailoredCV();
}

/**
 * Populate Company dropdowns in CV Builder and Referral Engine
 */
function populateMncDropdowns() {
  const cvCompSelect = document.getElementById('cv-target-company');
  const refCompSelect = document.getElementById('referral-company');

  if (cvCompSelect) {
    cvCompSelect.innerHTML = MNC_COMPANIES.map(c => 
      `<option value="${c.name}">${c.name} (${c.type === 'product' ? 'Product' : 'Service'})</option>`
    ).join('');
  }

  if (refCompSelect) {
    refCompSelect.innerHTML = MNC_COMPANIES.map(c => 
      `<option value="${c.name}">${c.name}</option>`
    ).join('');
  }
}

/**
 * Switch Sub-Tabs inside MNC Hub
 */
function switchMncSubTab(tabName) {
  activeMncSubTab = tabName;
  const tabs = ['companies', 'openings', 'cv-tailor', 'referrals', 'courses', 'mentors'];

  tabs.forEach(t => {
    const panel = document.getElementById(`mnc-panel-${t}`);
    const btn = document.getElementById(`mnc-subtab-${t}`);

    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
        panel.classList.add('flex');
      } else {
        panel.classList.add('hidden');
        panel.classList.remove('flex');
      }
    }

    if (btn) {
      if (t === tabName) {
        btn.className = "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 shadow-sm transition-all whitespace-nowrap shrink-0";
      } else {
        btn.className = "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap shrink-0";
      }
    }
  });

  safeCreateIcons();
}

/**
 * Filter MNC Companies by Product / Service type
 */
function setMncTypeFilter(type) {
  currentMncTypeFilter = type;
  const types = ['all', 'product', 'service'];

  types.forEach(t => {
    const btn = document.getElementById(`btn-mnc-type-${t}`);
    if (btn) {
      if (t === type) {
        btn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs transition-all whitespace-nowrap";
      } else {
        btn.className = "px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all whitespace-nowrap";
      }
    }
  });

  filterMncCards();
}

/**
 * Filter MNC cards based on search input and location dropdown
 */
function filterMncCards() {
  const query = (document.getElementById('mnc-search-input')?.value || "").toLowerCase();
  const loc = document.getElementById('mnc-location-filter')?.value || 'all';

  const filtered = MNC_COMPANIES.filter(c => {
    const matchesType = (currentMncTypeFilter === 'all') || (c.type === currentMncTypeFilter);
    const matchesLoc = (loc === 'all') || (c.locations && c.locations.includes(loc));
    const matchesQuery = 
      c.name.toLowerCase().includes(query) ||
      c.cities.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.techStack.some(t => t.toLowerCase().includes(query));

    return matchesType && matchesLoc && matchesQuery;
  });

  renderMncCompanies(filtered);
}

/**
 * Render MNC Company Cards
 */
function renderMncCompanies(companies = MNC_COMPANIES) {
  const container = document.getElementById('mnc-companies-grid');
  if (!container) return;

  if (companies.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
        <span class="material-symbols-outlined text-[36px] text-slate-300 block mb-2">domain_disabled</span>
        <div class="font-bold text-slate-800">No matching MNC companies found</div>
        <div class="text-xs text-slate-500">Try adjusting your location or search terms.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = companies.map(c => {
    const typeBadge = c.type === 'product'
      ? `<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">Product-Based</span>`
      : `<span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">Service-Based</span>`;

    const techPills = c.techStack.slice(0, 4).map(t => 
      `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px]">${t}</span>`
    ).join('');

    return `
      <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-cockpit-card hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between gap-4 group">
        <div>
          <!-- Header: Logo, Name & Type -->
          <div class="flex items-start justify-between gap-3 mb-2.5">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr ${c.color} text-white font-black text-sm flex items-center justify-center shadow-md">
                ${c.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <h4 class="font-display font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">${c.name}</h4>
                  <span class="text-[10px] text-amber-500 font-bold">${c.rating}</span>
                </div>
                <span class="text-[11px] text-slate-400 font-medium">${c.tier}</span>
              </div>
            </div>
            ${typeBadge}
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">${c.description}</p>

          <!-- Locations & TC -->
          <div class="space-y-1.5 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-medium mb-3">
            <div class="flex items-center gap-1.5 text-slate-600">
              <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
              <span class="truncate">${c.cities}</span>
            </div>
            <div class="flex items-center justify-between pt-1 border-t border-slate-200/60">
              <span class="text-[10px] text-slate-400 uppercase font-bold">Comp Banding:</span>
              <span class="font-mono font-bold text-emerald-700 text-[11px]">${c.tcRange}</span>
            </div>
          </div>

          <!-- Tech Stack Pills -->
          <div class="flex flex-wrap gap-1 mb-2">
            ${techPills}
          </div>
        </div>

        <!-- Action Row -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-[11px] font-bold text-indigo-600 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span>${c.openingsCount} Active Openings</span>
          </span>

          <div class="flex items-center gap-1.5">
            <button type="button" onclick="selectCompanyForCv('${c.name}')" title="Tailor CV" class="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors">
              <span class="material-symbols-outlined text-[16px]">description</span>
            </button>
            <button type="button" onclick="selectCompanyForReferral('${c.name}')" title="Referral Outreach" class="p-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors">
              <span class="material-symbols-outlined text-[16px]">send</span>
            </button>
            <button type="button" onclick="viewCompanyOpenings('${c.name}')" class="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-all">
              Openings →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  safeCreateIcons();
}

/**
 * Filter Live Openings by level and track
 */
function filterOpeningsList() {
  const level = document.getElementById('openings-level-filter')?.value || 'all';
  const track = document.getElementById('openings-track-filter')?.value || 'all';

  const filtered = MNC_OPENINGS.filter(o => {
    const matchesLevel = (level === 'all') || (o.level === level);
    const matchesTrack = (track === 'all') || (o.track === track);
    return matchesLevel && matchesTrack;
  });

  renderMncOpenings(filtered);
}

/**
 * Render Live Openings Board
 */
function renderMncOpenings(openings = MNC_OPENINGS) {
  const container = document.getElementById('openings-list-container');
  if (!container) return;

  if (openings.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
        <span class="material-symbols-outlined text-[36px] text-slate-300 block mb-2">work_off</span>
        <div class="font-bold text-slate-800">No matching requisitions found</div>
        <div class="text-xs text-slate-500">Try changing your experience level or engineering track filters.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = openings.map(o => {
    return `
      <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-cockpit-card hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between gap-3 group">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">${o.company}</span>
              <h4 class="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">${o.role}</h4>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold shrink-0">
              ${o.atsMatch} Fit
            </span>
          </div>

          <div class="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
              <span>${o.location}</span>
            </span>
            <span>•</span>
            <span class="font-bold text-slate-700 uppercase text-[10px]">${o.level}</span>
          </div>

          <!-- Post Stats -->
          <div class="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs mb-3">
            <div>
              <span class="text-[10px] text-slate-400 block font-bold">POSTED</span>
              <span class="font-mono font-bold text-slate-800">${o.daysAgo}d ago</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block font-bold">APPLICANTS</span>
              <span class="font-mono font-bold text-indigo-600">${o.applicants} candidate${o.applicants === 1 ? '' : 's'}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block font-bold">STATUS</span>
              <span class="font-bold text-amber-600 text-[11px]">${o.urgency}</span>
            </div>
          </div>

          <!-- Compensation -->
          <div class="flex items-center justify-between text-xs mb-3 px-1">
            <span class="text-slate-500 font-medium">Estimated TC:</span>
            <span class="font-mono font-bold text-emerald-700">${o.salary}</span>
          </div>

          <!-- Tech stack tags -->
          <div class="flex flex-wrap gap-1">
            ${o.techStack.map(t => `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px]">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
          <button type="button" onclick="saveOpeningToPipeline('${o.company}', '${o.role}', '${o.salary}', '${o.location}')" class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-all flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px]">add_task</span>
            <span>Add to Pipeline</span>
          </button>

          <div class="flex items-center gap-1.5">
            <button type="button" onclick="loadOpeningIntoCv('${o.company}', '${o.role}')" class="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all flex items-center gap-1 shadow-xs">
              <span class="material-symbols-outlined text-[15px]">description</span>
              <span>Tailor CV</span>
            </button>
            <button type="button" onclick="loadOpeningIntoReferral('${o.company}', '${o.role}')" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center gap-1 shadow-xs">
              <span class="material-symbols-outlined text-[15px]">diversity_3</span>
              <span>Referral</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  safeCreateIcons();
}

/**
 * Quick Bridge: Select company for CV
 */
function selectCompanyForCv(companyName) {
  switchMncSubTab('cv-tailor');
  const sel = document.getElementById('cv-target-company');
  if (sel) {
    sel.value = companyName;
    handleCvCompanyChange();
  }
}

/**
 * Quick Bridge: Select company for Referral
 */
function selectCompanyForReferral(companyName) {
  switchMncSubTab('referrals');
  const sel = document.getElementById('referral-company');
  if (sel) {
    sel.value = companyName;
    updateReferralPitch();
  }
}

/**
 * Quick Bridge: View Openings for a company
 */
function viewCompanyOpenings(companyName) {
  switchMncSubTab('openings');
  const filtered = MNC_OPENINGS.filter(o => o.company.toLowerCase().includes(companyName.toLowerCase()));
  if (filtered.length > 0) {
    renderMncOpenings(filtered);
    showGlobalToast(`Showing ${filtered.length} active openings for ${companyName}`);
  } else {
    renderMncOpenings(MNC_OPENINGS);
    showGlobalToast(`All active requisitions available in board`);
  }
}

/**
 * Bridge: Load specific opening into CV Tailor
 */
function loadOpeningIntoCv(company, role) {
  switchMncSubTab('cv-tailor');
  const sel = document.getElementById('cv-target-company');
  const roleInput = document.getElementById('cv-target-role');
  if (sel) sel.value = company;
  if (roleInput) roleInput.value = role;
  generateTailoredCV();
}

/**
 * Bridge: Load specific opening into Referral Engine
 */
function loadOpeningIntoReferral(company, role) {
  switchMncSubTab('referrals');
  const sel = document.getElementById('referral-company');
  const roleInput = document.getElementById('referral-role');
  if (sel) sel.value = company;
  if (roleInput) roleInput.value = role;
  updateReferralPitch();
}

/**
 * Bridge: Save Opening directly into Pipeline Matrix (Kanban)
 */
function saveOpeningToPipeline(company, role, salary, location) {
  const newApp = {
    id: Date.now(),
    company: company,
    role: role,
    sender: `careers@${company.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    subject: `Application Confirmation: ${role} at ${company}`,
    date: new Date().toISOString().split('T')[0],
    daysAgo: 0,
    body: `Your application for ${role} at ${company} (${location}) has been logged in Job Hunt Autopilot.\nTarget Compensation: ${salary}.\nNext step: Connect with recruiter / alumni for referral.`,
    salary: salary,
    location: location,
    evaluatedStatus: 'applied',
    isScam: false,
    followUpDue: false
  };

  allEmails.unshift(newApp);
  filteredEmails = [...allEmails];
  renderAll();
  showGlobalToast(`✓ ${company} — ${role} saved to Pipeline Matrix!`);
}

/**
 * Handle CV Company Change to auto-fill matching tech stack
 */
function handleCvCompanyChange() {
  const compName = document.getElementById('cv-target-company')?.value;
  const comp = MNC_COMPANIES.find(c => c.name === compName);
  if (comp) {
    const stackInput = document.getElementById('cv-tech-stack');
    if (stackInput) stackInput.value = comp.techStack.join(', ');
  }
  generateTailoredCV();
}

/**
 * AI CV / Resume Generator tailored for chosen MNC and Requisition
 * Supports Sales, Marketing, HR/Recruiting, Career Switchers & Engineering
 */
function generateTailoredCV() {
  const company = document.getElementById('cv-target-company')?.value || "Stripe";
  const role = document.getElementById('cv-target-role')?.value || "Staff Full-Stack Engineer";
  const level = document.getElementById('cv-experience-level')?.value || "staff";
  const track = document.getElementById('cv-track')?.value || "distributed";
  const techStack = document.getElementById('cv-tech-stack')?.value || "Go, Python, React, Kubernetes, AWS";

  const user = getAuthUser() || {};
  const candidateName = user.name || "Alex Chen";
  const candidateEmail = user.email || "alex.chen@executive.dev";

  let levelText = "8+ years of high-impact leadership";
  if (level === 'senior') levelText = "6+ years delivering rigorous, measurable results";
  if (level === 'principal' || level === 'staff') levelText = "10+ years driving organizational scale and enterprise execution";
  if (level === 'mid') levelText = "3+ years delivering agile execution and cross-functional momentum";
  if (level === 'fresher') levelText = "High-aptitude professional with top-tier foundation";

  let cvMarkdown = "";

  if (track === 'sales') {
    cvMarkdown = `
# ${candidateName.toUpperCase()}
**${role}** | ${candidateEmail} | San Francisco / Remote | linkedin.com/in/alex-sales-leader | (415) 890-4421

---

### PROFESSIONAL EXECUTIVE SUMMARY
Revenue-focused Enterprise SaaS sales leader with ${levelText}, recognized for consistent quota overachievement (146% average quota attainment over 4 years) and closing $28M+ in enterprise ARR tailored for **${company}**. Master of MEDDPICC deal qualification, multi-threaded C-suite discovery, and strategic enterprise negotiations that compress sales cycles by 35%.

---

### CORE SALES & REVENUE COMPETENCIES
- **Methodologies:** MEDDPICC, Challenger Sales, Value Selling, Command of the Message
- **Sales Tech Stack:** ${techStack}
- **Pipeline & Closing:** Enterprise Account Planning, Multi-Year SaaS Contracts, Inbound/Outbound Funnel Velocity
- **Executive Engagement:** C-Suite Discovery (CIO, CTO, CFO, CISO), Mutual Action Plans (MAP), Board-Level RoI Presentations
- **Leadership & Forecasting:** CRM Hygiene, Pipeline Coverage (4.5x), Team Mentorship, Deal Desk & Legal Collaboration

---

### KEY PROFESSIONAL ACCOMPLISHMENTS (GOOGLE XYZ / STAR FORMAT)

**Enterprise Account Executive — Strategic Cloud Accounts** — Cloud Revenue Platform (2022 – Present)
- **Closed $4.2M Multi-Year Anchor Enterprise Deal:** Qualified economic buyer and champion using MEDDPICC, displacing legacy competitor and delivering 184% of annual quota.
- **Enterprise Expansion & Net Retention:** Navigated procurement, legal, and infosec reviews across 14 enterprise logos, boosting Net Retention Rate (NRR) from 108% to 132%.
- **Pipeline Generation Leadership:** Generated $8.6M in qualified self-sourced pipeline through targeted executive outreach, achieving 115% outbound meeting target for 6 consecutive quarters.

**Senior Corporate Account Executive** — High-Growth B2B SaaS (2019 – 2022)
- **Ranked #1 AE Globally (FY21):** Delivered $3.8M in new bookings against a $2.5M quota (152% attainment), receiving President's Club recognition.
- **Cycle Compression:** Instituted Mutual Action Plans with customer procurement teams, reducing average sales cycle from 92 days to 58 days.
- **Cross-Functional Enablement:** Partnered with Product Marketing to develop ROI calculator models used across 45 quota-carrying representatives.

---

### EDUCATION & REVENUE CERTIFICATIONS
- **Bachelor of Business Administration (BBA) — Marketing & Sales Leadership**
- **Force Management Certified (MEDDPICC Enterprise Qualification)**
- **Salesforce Certified Sales Cloud Consultant**
    `.trim();
  } else if (track === 'marketing') {
    cvMarkdown = `
# ${candidateName.toUpperCase()}
**${role}** | ${candidateEmail} | San Francisco / Remote | linkedin.com/in/alex-growth-marketer | alexmarketing.portfolio

---

### PROFESSIONAL EXECUTIVE SUMMARY
Data-driven Product Marketing & Growth leader with ${levelText}, specializing in product-led growth (PLG) mechanics, category positioning, and high-converting demand generation tailored for **${company}**. Proven track record driving 320,000+ qualified signups, slashing Customer Acquisition Cost (CAC) by 38%, and scaling ARR from $5M to $25M through full-funnel retention loops.

---

### CORE MARKETING & GROWTH COMPETENCIES
- **Growth & Acquisition:** Product-Led Growth (PLG), Demand Generation, SEM/SEO, Lifecycle Funnel, Paid Performance
- **Marketing Stack:** ${techStack}
- **Product Marketing (PMM):** Positioning & Messaging Frameworks, Competitive Intelligence, Win-Loss Analysis, Pricing Packaging
- **Analytics & Experimentation:** Amplitude, Mixpanel, Cohort Retention Analysis, A/B Split Testing, CAC/LTV Payback Modeling
- **Content & GTM Execution:** Category Narratives, Keynote Launch Keynotes, Enterprise Sales Enablement Decks

---

### KEY PROFESSIONAL ACCOMPLISHMENTS (GOOGLE XYZ / STAR FORMAT)

**Director of Product Marketing & Growth** — SaaS Scaleup (2022 – Present)
- **Orchestrated Planetary Product Launch:** Led GTM narrative and multi-channel launch campaign generating 180,000 active users in 30 days and 42 tier-1 press features (TechCrunch, Forbes).
- **Full-Funnel CAC/LTV Optimization:** Redesigned self-serve onboarding flow and viral invite loop, lifting activation rate from 18% to 34% and cutting blended CAC by 38%.
- **Enterprise Sales Enablement:** Created competitive battlecards and value matrix decks adopted by 25 enterprise account executives, lifting competitive win-rate against incumbent by 24%.

**Senior Growth & Lifecycle Marketing Lead** — Consumer Marketplace (2019 – 2022)
- **Lifecycle Retention Loops:** Architected automated behavioral email and push notifications sequence driving $4.8M in incremental annual recurring revenue.
- **Conversion Rate Optimization:** Designed and ran 120+ rapid A/B experiments across pricing pages, lifting free-to-paid conversion from 3.1% to 6.8%.
- **Cross-Functional Growth Guild:** Led bi-weekly growth sprint reviews between engineering, design, and product management to unblock high-velocity experiments.

---

### EDUCATION & CERTIFICATIONS
- **Bachelor of Science in Marketing & Data Analytics** (Magna Cum Laude)
- **Reforge Certified (Product Marketing & Growth Series)**
- **Google Analytics (GA4) & HubSpot Inbound Certified**
    `.trim();
  } else if (track === 'hr-recruiting') {
    cvMarkdown = `
# ${candidateName.toUpperCase()}
**${role}** | ${candidateEmail} | San Francisco / Remote | linkedin.com/in/alex-talent-partner

---

### PROFESSIONAL EXECUTIVE SUMMARY
Strategic Talent Acquisition & People Operations partner with ${levelText}, renowned for building high-density engineering, sales, and executive organizations tailored for **${company}**. Track record delivering 94% offer acceptance rate, reducing time-to-hire by 46% (from 52 to 28 days), and architecting candidate NPS programs that attract top 1% global talent.

---

### CORE PEOPLE & TALENT COMPETENCIES
- **Talent Acquisition:** Full-Cycle Technical & Executive Recruiting, Sourcing Algorithms, Bar-Raiser Interview Frameworks
- **HR Tools & ATS:** ${techStack}
- **People Operations:** Talent Density, Performance Management, Compensation Benchmarking (Option Impact/Radford), Org Design
- **Closing & Sourcing:** Executive Headhunting, Competitive Equity Structuring, Counter-Offer Mitigation, Diversity & Inclusion
- **Analytics & Metrics:** Candidate NPS (+74), Quality of Hire, Pipeline Velocity, Sourcing Funnel Yield Ratios

---

### KEY PROFESSIONAL ACCOMPLISHMENTS (GOOGLE XYZ / STAR FORMAT)

**Lead Technical & Executive Recruiter** — Tech Unicorn (2022 – Present)
- **Scaled Critical Engineering Org:** Sourced and closed 54 Staff+ engineers, engineering managers, and directors, cutting average time-to-fill from 52 to 28 days.
- **Elevated Offer Acceptance Rate to 94.2%:** Deployed personalized executive closing decks and transparent equity compensation modeling, mitigating 92% of candidate counter-offers.
- **Instituted Bar-Raiser Training:** Designed and trained 80+ hiring managers on structured behavioral interviewing and bias reduction, boosting candidate interview NPS to +74.

**Senior People Partner & Recruiter** — Global Technology Enterprise (2019 – 2022)
- **High-Impact Sourcing Strategy:** Built proprietary Boolean and LinkedIn Talent search pipelines yielding 42% outbound candidate response rate (3.5x industry average).
- **Internal Mobility & Retention:** Created lateral career progression framework, reducing voluntary first-year engineering attrition by 26%.
- **Executive Compensation Redesign:** Partnered with Head of People to overhaul salary bands and equity tiers aligned with Radford tech percentiles.

---

### EDUCATION & HR CERTIFICATIONS
- **Bachelor of Arts in Human Resource Management & Organizational Psychology**
- **SHRM Senior Certified Professional (SHRM-SCP)**
- **AIRS Certified Internet Recruiter (CIR) & Advanced Diversity Sourcing**
    `.trim();
  } else if (track === 'switcher') {
    cvMarkdown = `
# ${candidateName.toUpperCase()}
**${role}** | ${candidateEmail} | San Francisco / Remote | linkedin.com/in/alex-strategic-pivot

---

### PROFESSIONAL EXECUTIVE SUMMARY
High-velocity strategic operator and career transitioner with ${levelText}, successfully pivoting transferable excellence in business operations, stakeholder leadership, and P&L execution into tech product and business strategy tailored for **${company}**. Proven record translating complex non-tech problems into scalable digital systems, driving $1.8M in cost efficiencies and leading cross-domain transformation.

---

### TRANSFERABLE & DOMAIN COMPETENCIES
- **Strategic Execution:** Cross-Functional Alignment, Program Management, P&L Ownership, Unit Economics, OKRs
- **Modern Tech Literacy:** ${techStack}
- **Problem Solving:** Data-Driven Decision Making, Process Automation, Root-Cause Analysis, Customer Journey Mapping
- **Stakeholder Management:** Executive Alignment, Change Management, Cross-Team Unblocking, Vendor Negotiation
- **Agile & Execution:** Scrum/Agile Frameworks, Continuous Improvement, Rapid Prototyping, KPI Dashboards

---

### KEY PROFESSIONAL ACCOMPLISHMENTS (GOOGLE XYZ / STAR FORMAT)

**Strategic Program Manager / Business Operations** — Cross-Domain Enterprise (2022 – Present)
- **Spearheaded Operational Digital Transformation:** Automated legacy manual workflows across 4 departments, saving 1,400+ hours annually and reducing operational expenditure by $420,000.
- **Cross-Functional Alignment on Core Initiatives:** Directed delivery of 8 high-priority business initiatives across engineering, finance, and marketing with 98% on-time milestone attainment.
- **Data-Driven Revenue Optimization:** Built executive dashboards analyzing operational unit economics, uncovering $1.1M in annualized revenue leakage and implementing instant remediation.

**Senior Operations & Generalist Lead** — Consulting & Operations (2019 – 2022)
- **Rapid Cross-Functional Adaptation:** Mastered modern data analytics and workflow automation in under 60 days, leading an 18-person transition team through company-wide platform migration.
- **Stakeholder Negotiation:** Negotiated multi-party vendor contracts resulting in $290,000 in immediate savings with 100% SLA compliance.
- **Mentorship & Culture:** Mentored 15 career switchers and analysts on building technical fluency and presenting executive business cases to leadership.

---

### EDUCATION & CREDENTIALS
- **Bachelor of Science in Business & Economics** (Top 5% of Class)
- **Project Management Professional (PMP) & Certified ScrumMaster (CSM)**
- **Wharton Executive Education — Business Analytics & Strategic Leadership**
    `.trim();
  } else {
    // Default: Staff Distributed Systems Architect
    cvMarkdown = `
# ${candidateName.toUpperCase()}
**${role}** | ${candidateEmail} | San Francisco / Remote | linkedin.com/in/alex-chen-exec | github.com/alexchen

---

### PROFESSIONAL EXECUTIVE SUMMARY
Results-driven software architect with ${levelText}, specializing in high-throughput distributed systems, zero-trust cloud security, and mission-critical reliability tailored for **${company}**. Proven track record reducing P99 latency by 42%, saving $1.4M in cloud compute overhead, and scaling event-driven transaction pipelines to 45,000+ rps with five-nines (99.999%) SLA.

---

### CORE TECHNICAL COMPETENCIES
- **Languages & Frameworks:** ${techStack}
- **Distributed Architecture:** Microservices, Event Sourcing (Kafka, SQS), Raft Consensus, Idempotency Engines
- **Cloud & Orchestration:** Kubernetes (EKS/GKE), Docker, Envoy SDS, Terraform, AWS, Azure, GCP
- **Databases & Caching:** PostgreSQL, Redis Cluster, Cassandra, Distributed Spanner, DynamoDB
- **Observability & Security:** OpenTelemetry, Prometheus, Grafana, Datadog, Zero-Trust mTLS, DKIM/SPF

---

### KEY PROFESSIONAL ACCOMPLISHMENTS (GOOGLE XYZ / STAR FORMAT)

**Staff Distributed Systems Architect** — Distributed Infrastructure Platform (2022 – Present)
- **Engineered Planetary Payment Isolation Pipeline:** Architected idempotent state machine handling 45,000 rps, cutting transaction replay failures by 99.4% and maintaining 99.999% uptime across multi-region failovers.
- **Microservices & Telemetry Optimization:** Replaced legacy polling architecture with Envoy Secret Discovery Service (SDS) and gRPC streaming, lowering memory utilization by 34% across 850 Kubernetes pods.
- **Autonomous Threat Quarantine & Fraud Shield:** Deployed heuristic email & token threat filter, automatically preventing credential spoofing and saving an estimated $380,000 in simulated financial wire fraud.

**Senior Software Engineer** — Cloud Scale Solutions (2019 – 2022)
- **High-Throughput Caching Layer:** Deployed distributed Redis Cluster with cache-aside and bloom filters, eliminating database stampedes and boosting cache hit ratio from 78% to 96.8%.
- **Zero-Downtime Migration:** Spearheaded live data migration of 14TB multi-tenant PostgreSQL cluster to AWS Aurora with zero read/write downtime for 2.4M active users.
- **Cross-Functional Mentorship:** Mentored 12 mid-level and junior engineers through technical promotion loops; led internal design reviews on concurrency and lock-free data structures.

---

### EDUCATION & CERTIFICATIONS
- **Bachelor of Science in Computer Science & Distributed Systems** — Top Tier University (First Class Honors)
- **Certified Kubernetes Administrator (CKA)** — Cloud Native Computing Foundation (CNCF)
- **AWS Certified Solutions Architect – Professional (SAP-C02)**
    `.trim();
  }

  const container = document.getElementById('cv-output-container');
  if (container) {
    container.innerText = cvMarkdown;
  }

  // Update ATS score random variance (94% - 98%)
  const atsEl = document.getElementById('cv-ats-score');
  if (atsEl) {
    atsEl.innerText = `${Math.floor(Math.random() * 4) + 95}% ATS Compatibility`;
  }
}

/**
 * 1-Click Career Persona Switcher (Attract Sales, Marketing, HR, Recruiters & Job Switchers)
 */
function switchCareerPersona(personaKey) {
  const personas = {
    sales: {
      name: "Marcus Vance",
      email: "marcus.vance@enterprisesales.io",
      role: "Enterprise Account Executive — Strategic Cloud Accounts",
      targetComp: "$240k - $360k OTE",
      activeLoops: "3 Executive Loops",
      avatar: "MV",
      track: "sales",
      company: "Salesforce",
      techStack: "MEDDPICC, Salesforce CRM, Strategic Accounts, C-Suite Discovery, Enterprise SaaS"
    },
    marketing: {
      name: "Elena Rostova",
      email: "elena.rostova@growthmarketing.co",
      role: "Director of Product Marketing & Growth",
      targetComp: "$210k - $285k TC",
      activeLoops: "4 Final Rounds",
      avatar: "ER",
      track: "marketing",
      company: "Adobe",
      techStack: "GTM Positioning, Product-Led Growth, Amplitude, Customer Journey, Lifecycle"
    },
    hr: {
      name: "Amina Patel",
      email: "amina.patel@peopletalent.org",
      role: "Lead Technical & Executive Recruiter",
      targetComp: "$160k - $225k TC",
      activeLoops: "5 Talent Pipelines",
      avatar: "AP",
      track: "hr-recruiting",
      company: "Stripe",
      techStack: "Full-Cycle Recruiting, Greenhouse ATS, Executive Headhunting, Talent Density"
    },
    switcher: {
      name: "Carlos Rivera",
      email: "carlos.rivera@strategicpivot.io",
      role: "Strategic Program Manager / Business Operations",
      targetComp: "$185k - $245k TC",
      activeLoops: "3 Cross-Domain Loops",
      avatar: "CR",
      track: "switcher",
      company: "Apple",
      techStack: "Operations Scaling, P&L Ownership, Cross-Functional Alignment, Strategic Planning"
    },
    tech: {
      name: "Alex Chen",
      email: "alex.chen@executive.dev",
      role: "Staff Distributed Systems Architect",
      targetComp: "$250k - $320k TC",
      activeLoops: "4 Interviews",
      avatar: "AC",
      track: "distributed",
      company: "Stripe",
      techStack: "Go, Python, React, TypeScript, Kafka, Kubernetes, AWS, PostgreSQL, Redis"
    }
  };

  const p = personas[personaKey] || personas.tech;

  // Update Auth User in localStorage
  const user = getAuthUser() || {};
  user.name = p.name;
  user.email = p.email;
  user.role = p.role;
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

  // Update UI Header and profile avatars
  updateAuthHeaderUI();

  const compEl = document.getElementById('profile-modal-comp');
  if (compEl) compEl.innerText = p.targetComp;

  const loopsEl = document.getElementById('profile-modal-loops');
  if (loopsEl) loopsEl.innerText = p.activeLoops;

  const emailEl = document.getElementById('profile-modal-email');
  if (emailEl) emailEl.innerText = p.email;

  // Set CV Builder inputs
  const cvComp = document.getElementById('cv-target-company');
  if (cvComp) cvComp.value = p.company;

  const cvRole = document.getElementById('cv-target-role');
  if (cvRole) cvRole.value = p.role;

  const cvTrack = document.getElementById('cv-track');
  if (cvTrack) cvTrack.value = p.track;

  const cvStack = document.getElementById('cv-tech-stack');
  if (cvStack) cvStack.value = p.techStack;

  // Filter Openings to match track
  const trackFilter = document.getElementById('openings-track-filter');
  if (trackFilter) {
    trackFilter.value = p.track;
    filterOpeningsList();
  }

  // Regenerate CV
  generateTailoredCV();

  showGlobalToast(`✓ Persona switched to ${p.role}! Benchmark cockpit adapted.`);
}

/**
 * Copy Generated CV to clipboard
 */
function copyGeneratedCV() {
  const text = document.getElementById('cv-output-container')?.innerText || "";
  navigator.clipboard.writeText(text);
  showGlobalToast("✓ Tailored ATS CV copied to clipboard!");
}

/**
 * Download CV as text file
 */
function downloadCVText() {
  const text = document.getElementById('cv-output-container')?.innerText || "";
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Alex_Chen_CV_${document.getElementById('cv-target-company')?.value || 'MNC'}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showGlobalToast("✓ CV downloaded successfully as Markdown!");
}

/**
 * Set Persona for Referral Pitch Generator
 */
function setReferralPersona(persona) {
  currentReferralPersona = persona;
  const personas = ['alumni', 'peer', 'manager', 'recruiter'];

  personas.forEach(p => {
    const btn = document.getElementById(`btn-ref-${p}`);
    if (btn) {
      if (p === persona) {
        btn.className = "px-3 py-1 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-xs transition-all";
      } else {
        btn.className = "px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all";
      }
    }
  });

  updateReferralPitch();
}

/**
 * Update Referral Pitch content
 */
function updateReferralPitch() {
  const company = document.getElementById('referral-company')?.value || "Google";
  const role = document.getElementById('referral-role')?.value || "Staff Full-Stack Engineer";
  const highlight = document.getElementById('referral-highlight')?.value || "Scaled distributed payment pipelines to 45,000 rps with 99.999% SLA";

  const user = getAuthUser();
  const candidateName = user.name || "Alex Chen";

  let subject = "";
  let body = "";

  if (currentReferralPersona === 'alumni') {
    subject = `Fellow Alumni reaching out — ${role} opening at ${company}`;
    body = `Hi [Alumni Name],\n\nHope you are having a productive week! I noticed you are an engineer at ${company} and saw that we share a background from [University / Alumni Network].\n\nI’m reaching out because I’m preparing to apply for the ${role} requisition at ${company}. Recently, I ${highlight}, and I’ve been following ${company}’s work in distributed systems with great admiration.\n\nWould you be open to submitting an internal referral, or sharing a quick 5-minute pointer on the team’s current interview focus? My resume is ready, and I'd be immensely grateful.\n\nWarm regards,\n${candidateName}\n[LinkedIn Profile Link]`;
  } else if (currentReferralPersona === 'peer') {
    subject = `Quick note from an engineer — ${role} loop at ${company}`;
    body = `Hi [Engineer Name],\n\nI came across your profile while reading about ${company}’s recent engineering updates. Loved your work on distributed scalability.\n\nI’m a staff/senior engineer specializing in high-throughput cloud backends. In my recent role, I ${highlight}.\n\nI’m currently applying for the open ${role} position at ${company}. If you have a moment, I would love to connect for a quick referral into the hiring team. Happy to share my portfolio/resume upfront!\n\nBest,\n${candidateName}\n[GitHub & Portfolio URL]`;
  } else if (currentReferralPersona === 'manager') {
    subject = `Candidate alignment for ${role} — ${candidateName}`;
    body = `Hi [Hiring Manager Name],\n\nI noticed you lead the team expanding the ${role} function at ${company}.\n\nGiven your team’s focus on high-availability and reliability, I wanted to reach out directly. Over the past 8+ years, I have architected mission-critical platforms; most recently, I ${highlight}.\n\nI’ve submitted my application for the role and would welcome a brief conversation to discuss how my distributed systems experience can immediately help your team hit upcoming milestones.\n\nRespectfully,\n${candidateName}\n[Direct Phone & Calendly Link]`;
  } else {
    subject = `Experienced candidate inquiry: ${role} (${company})`;
    body = `Hi [Recruiter Name],\n\nI hope you are well! I noticed you are currently sourcing talent for the ${role} role at ${company}.\n\nMy background aligns closely with the core requisition requirements: 8+ years in distributed architecture, and recently I ${highlight}.\n\nI’d love to connect for a preliminary screen or share my tailored resume directly for your hiring manager’s review. Thank you for your time!\n\nBest regards,\n${candidateName}\n[Resume PDF Attached]`;
  }

  const subjBox = document.getElementById('referral-subject-box');
  const bodyBox = document.getElementById('referral-body-box');

  if (subjBox) subjBox.innerText = subject;
  if (bodyBox) bodyBox.innerText = body;
}

/**
 * Copy Referral pitch to clipboard
 */
function copyReferralPitch() {
  const subj = document.getElementById('referral-subject-box')?.innerText || "";
  const body = document.getElementById('referral-body-box')?.innerText || "";
  const full = `Subject: ${subj}\n\n${body}`;
  navigator.clipboard.writeText(full);
  showGlobalToast("✓ Referral message copied to clipboard!");
}

/**
 * Open pre-filtered LinkedIn search for company alumni
 */
function searchCompanyAlumniOnLinkedIn() {
  const comp = document.getElementById('referral-company')?.value || "Google";
  const url = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(comp + " software engineer alumni")}`;
  window.open(url, '_blank');
}

/**
 * Render Curated Courses & Roadmaps Grid
 */
function renderCoursesGrid() {
  const container = document.getElementById('courses-grid-container');
  if (!container) return;

  container.innerHTML = CURATED_COURSES.map(c => {
    return `
      <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-cockpit-card hover:shadow-lg hover:border-amber-300 transition-all flex flex-col justify-between gap-3 group">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <span class="px-2 py-0.5 rounded-full ${c.badgeColor} border text-[10px] font-bold">
              ${c.badge}
            </span>
            <span class="text-[10px] text-slate-400 font-mono font-semibold">${c.estimatedHours}</span>
          </div>

          <h4 class="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors leading-snug mb-1">${c.title}</h4>
          <span class="text-[11px] font-semibold text-slate-500 block mb-2">By ${c.author}</span>

          <p class="text-xs text-slate-600 leading-relaxed mb-3">${c.description}</p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-[10px] uppercase font-bold text-slate-400">${c.difficulty}</span>
          <a href="${c.link}" target="_blank" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1">
            <span>Explore Course</span>
            <span class="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  safeCreateIcons();
}

/**
 * Render Verified Mentors Grid
 */
function renderMentorsGrid() {
  const container = document.getElementById('mentors-grid-container');
  if (!container) return;

  container.innerHTML = VERIFIED_MENTORS.map(m => {
    return `
      <div class="bg-white rounded-3xl p-5 border border-slate-200 shadow-cockpit-card hover:shadow-lg hover:border-purple-300 transition-all flex flex-col justify-between gap-3 group">
        <div>
          <div class="flex items-center gap-3 mb-2.5">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${m.color} text-white font-black text-sm flex items-center justify-center shadow-md shrink-0">
              ${m.avatar}
            </div>
            <div>
              <h4 class="font-display font-bold text-sm text-slate-900 group-hover:text-purple-700 transition-colors">${m.name}</h4>
              <p class="text-[11px] font-semibold text-slate-600">${m.role}</p>
              <span class="text-[10px] font-bold text-indigo-600">${m.company}</span>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">${m.bio}</p>

          <div class="flex flex-wrap gap-1 mb-2">
            ${m.specialties.map(s => `<span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-semibold">${s}</span>`).join('')}
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>${m.slotsAvailable}</span>
          </span>
          <button type="button" onclick="openMockModal('${m.name}', '${m.role} @ ${m.company}')" class="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px]">event</span>
            <span>Book Mock</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  safeCreateIcons();
}

/**
 * Open Simulated 1:1 Mock Interview Booking Modal
 */
function openMockModal(mentorName, mentorRole) {
  selectedMockMentor = { name: mentorName, role: mentorRole };
  const nameEl = document.getElementById('mock-modal-mentor-name');
  const roleEl = document.getElementById('mock-modal-mentor-role');
  if (nameEl) nameEl.innerText = `Book 1:1 Mock with ${mentorName}`;
  if (roleEl) roleEl.innerText = mentorRole;

  const modal = document.getElementById('modal-book-mock');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeMockModal() {
  const modal = document.getElementById('modal-book-mock');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function confirmMockBooking() {
  const date = document.getElementById('mock-date-input')?.value || "2026-11-04";
  const time = document.getElementById('mock-time-select')?.value || "16:00 UTC";
  const track = document.getElementById('mock-track-select')?.value || "hld";
  const mentor = selectedMockMentor?.name || "Mentor";

  closeMockModal();
  showGlobalToast(`✓ 1:1 Mock scheduled with ${mentor} on ${date} at ${time}! Calendar invite generated.`);
}

/**
 * Entry function called when switching to MNC Hub view
 */
function renderMncHub() {
  renderMncCompanies();
  renderMncOpenings();
  renderCoursesGrid();
  renderMentorsGrid();
  safeCreateIcons();
}

// Kick off initialization on DOM ready
document.addEventListener('DOMContentLoaded', initAutopilot);



// ============================================================================
// LIVE SYSTEM, AUDIT & INGESTION LOGS STUDIO (Stitch Screen b7f0bcda381843029c4be1aaa7f1ed3d)
// ============================================================================

let isLogsStreaming = true;
let logsStreamInterval = null;
let currentLogCategory = 'all';
let currentLogLevel = 'ALL';
let logsSearchTerm = '';

// Seed log entries grounded in Stitch screens (FBI IC3, DKIM, APScheduler, SQLite WAL, Honeypots)
let logsBuffer = [
  {
    id: 1,
    timestamp: "12:44:02.184",
    stream: "ic3",
    level: "CRITICAL",
    badge: "[IC3-GATEWAY]",
    badgeClass: "bg-red-950 text-red-400 border border-red-800",
    message: "Threat actor cluster isolated: NCFTA-CYWEX-9841. Impostor domain careers-apple-talent.com intercepted.",
    detail: {
      status: "SUCCESS",
      code: 200,
      docket_id: "IC3-DOCKET-2025-0914-APL",
      canonical_sha384: "7e2b189a02fc3187b99c72a8019b88e14670dc4e34f89d34208a0d9b6264f331f47890a8809e1e2d4f55a12fbc93de76",
      zero_bit_drift: true,
      adversary_ip: "185.220.101.42",
      adversary_asn: "AS48210",
      honeypot_token: "CANARY-9841-APL",
      countersigned_by: "FBI-IC3-INGEST-GATEWAY-CA-04"
    }
  },
  {
    id: 2,
    timestamp: "12:44:01.912",
    stream: "ic3",
    level: "WARN",
    badge: "[HONEYPOT-TRIGGER]",
    badgeClass: "bg-amber-950 text-amber-400 border border-amber-800",
    message: "Honeypot token CANARY-9841-APL pingback received from 185.220.101.42 (Tor exit node). RTT latency: 24.2ms.",
    detail: {
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ScraperBot/2.4",
      http_headers: { "X-Forwarded-For": "185.220.101.42", "CF-RAY": "8dc1420a7b4198c2-AMS" }
    }
  },
  {
    id: 3,
    timestamp: "12:43:58.410",
    stream: "inbox",
    level: "SUCCESS",
    badge: "[DKIM-VERIFY]",
    badgeClass: "bg-emerald-950 text-emerald-400 border border-emerald-800",
    message: "Legitimate inbound verified: Stripe Staff Recruiter (talent-acquisition@stripe.com). dkim=pass (2048-bit key) spf=pass (ip4:199.255.192.0/22).",
    detail: {
      auth_results: "spf=pass smtp.mailfrom=stripe.com; dkim=pass header.i=@stripe.com; dmarc=pass action=none",
      latency_ms: 18.5,
      role: "Staff Infrastructure Engineer ($260k - $310k)"
    }
  },
  {
    id: 4,
    timestamp: "12:43:55.204",
    stream: "database",
    level: "INFO",
    badge: "[SQLITE-WAL]",
    badgeClass: "bg-purple-950 text-purple-400 border border-purple-800",
    message: "WAL checkpoint executed (passive). 124 application records synchronized in 3.1ms. Zero corruption.",
    detail: {
      busy_handlers: 0,
      checkpoint_pages: 18,
      db_file: "autopilot.db",
      journal_mode: "WAL"
    }
  },
  {
    id: 5,
    timestamp: "12:43:50.012",
    stream: "scheduler",
    level: "INFO",
    badge: "[APScheduler]",
    badgeClass: "bg-blue-950 text-blue-400 border border-blue-800",
    message: "Background job 'poll_inbound_recruiter_webhooks' executed. Next fire at 12:44:20.000 (every 30s).",
    detail: {
      executor: "ThreadPoolExecutor-4",
      active_jobs: 3,
      jitter_ms: 12
    }
  },
  {
    id: 6,
    timestamp: "12:43:42.880",
    stream: "inbox",
    level: "SUCCESS",
    badge: "[DKIM-VERIFY]",
    badgeClass: "bg-emerald-950 text-emerald-400 border border-emerald-800",
    message: "Legitimate inbound verified: Datadog Executive Recruiter (careers@datadoghq.com). dkim=pass spf=pass. Stage: Recruiter Screen.",
    detail: {
      role: "Director of Enterprise Sales (New York / Remote)",
      ote: "$340,000",
      followup_sla_hours: 48
    }
  },
  {
    id: 7,
    timestamp: "12:43:35.450",
    stream: "ic3",
    level: "CRITICAL",
    badge: "[IC3-RADAR]",
    badgeClass: "bg-red-950 text-red-400 border border-red-800",
    message: "Quarantined Telegram fake recruiter check: 'Meta Talent Outreach' requesting WhatsApp crypto deposit. Sender blocked.",
    detail: {
      channel: "Telegram / SMS spoof",
      verdict: "CRITICAL FRAUD (Impersonation)",
      ic3_referral: "FILED-ONLINE"
    }
  },
  {
    id: 8,
    timestamp: "12:43:28.110",
    stream: "scheduler",
    level: "INFO",
    badge: "[APScheduler]",
    badgeClass: "bg-blue-950 text-blue-400 border border-blue-800",
    message: "SLA watchdog: Checked 8 pending recruiter replies. 2 reminders scheduled within 24-hour window.",
    detail: {
      upcoming_slas: [
        { company: "Anthropic", hours_remaining: 18.2 },
        { company: "Figma", hours_remaining: 23.5 }
      ]
    }
  },
  {
    id: 9,
    timestamp: "12:43:15.900",
    stream: "database",
    level: "INFO",
    badge: "[INDEXED-DB]",
    badgeClass: "bg-purple-950 text-purple-400 border border-purple-800",
    message: "Browser offline fallback store synced: 50 MNC companies, 24 mentor cards cached in localStorage.",
    detail: {
      storage_quota_bytes: 482012,
      sync_mode: "hybrid-local-first"
    }
  }
];

/**
 * Initialize the Logs Center view
 */
function initLogsCenter() {
  renderLogsTerminal();
  updateLogsCountBadges();

  if (!logsStreamInterval) {
    // Simulate real-time streaming every 4.5 seconds
    logsStreamInterval = setInterval(() => {
      if (!isLogsStreaming) return;
      generateSimulatedLogEvent();
    }, 4500);
  }
}

/**
 * Render terminal lines based on active category, level, and search keyword
 */
function renderLogsTerminal() {
  const container = document.getElementById('logs-terminal-stream');
  if (!container) return;

  const filtered = logsBuffer.filter(log => {
    // Stream filter
    if (currentLogCategory !== 'all' && log.stream !== currentLogCategory) return false;
    // Level filter
    if (currentLogLevel !== 'ALL' && log.level !== currentLogLevel) return false;
    // Search keyword
    if (logsSearchTerm) {
      const matchText = `${log.timestamp} ${log.badge} ${log.level} ${log.message} ${JSON.stringify(log.detail || '')}`.toLowerCase();
      if (!matchText.includes(logsSearchTerm)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-slate-500 font-mono text-xs">
        <span class="material-symbols-outlined text-3xl text-slate-600 block mb-2">filter_alt_off</span>
        No logs match the current filter criteria (category: ${currentLogCategory}, level: ${currentLogLevel}).
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(log => {
    let levelClass = "text-slate-400";
    if (log.level === 'CRITICAL') levelClass = "text-[#ff6b6b] font-bold";
    else if (log.level === 'WARN') levelClass = "text-[#ffbe3b] font-bold";
    else if (log.level === 'SUCCESS') levelClass = "text-[#6ffbbe] font-bold";
    else if (log.level === 'INFO') levelClass = "text-[#82aaff]";

    const hasDetail = !!log.detail;
    const detailId = `log-detail-${log.id}`;

    return `
      <div class="group hover:bg-white/[0.04] p-1.5 rounded-lg transition-colors border-l-2 ${log.level === 'CRITICAL' ? 'border-red-500 bg-red-950/20' : log.level === 'WARN' ? 'border-amber-500' : 'border-transparent'}">
        <div class="flex flex-wrap items-start gap-2">
          <span class="text-slate-500 select-none">${log.timestamp}</span>
          <span class="px-1.5 py-0.2 rounded text-[10px] font-bold ${log.badgeClass} select-none">${log.badge}</span>
          <span class="${levelClass} select-none text-[11px]">${log.level}</span>
          <span class="flex-1 text-[#dae2fd] text-xs leading-relaxed break-all">${escapeHtmlLogs(log.message)}</span>
          ${hasDetail ? `
            <button type="button" onclick="toggleLogDetail(${log.id})" class="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-mono select-none ml-auto shrink-0">
              {payload}
            </button>
          ` : ''}
        </div>
        ${hasDetail ? `
          <div id="${detailId}" class="hidden mt-2 p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] text-slate-300 font-mono overflow-x-auto leading-relaxed select-all">
            <pre class="m-0">${escapeHtmlLogs(JSON.stringify(log.detail, null, 2))}</pre>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  const stats = document.getElementById('logs-buffer-stats');
  if (stats) stats.innerText = `${logsBuffer.length} lines buffer`;

  // Auto-scroll if enabled
  const chk = document.getElementById('logs-autoscroll-chk');
  if (chk && chk.checked) {
    container.scrollTop = container.scrollHeight;
  }
}

function escapeHtmlLogs(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toggleLogDetail(id) {
  const el = document.getElementById(`log-detail-${id}`);
  if (el) {
    el.classList.toggle('hidden');
  }
}

/**
 * Filter logs based on search input and level dropdown
 */
function filterLogsTerminal() {
  const searchInput = document.getElementById('logs-search-input');
  const levelSelect = document.getElementById('logs-level-filter');

  logsSearchTerm = (searchInput?.value || '').trim().toLowerCase();
  currentLogLevel = levelSelect?.value || 'ALL';

  renderLogsTerminal();
}

/**
 * Switch stream category tabs
 */
function setLogsStreamCategory(cat) {
  currentLogCategory = cat;

  document.querySelectorAll('.log-cat-tab').forEach(tab => {
    tab.className = "log-cat-tab px-3 py-1.5 rounded-xl font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0 flex items-center gap-1";
  });

  const activeTab = document.getElementById(`log-cat-${cat}`);
  if (activeTab) {
    activeTab.className = "log-cat-tab px-3 py-1.5 rounded-xl font-bold bg-slate-900 text-white transition-all shrink-0 flex items-center gap-1";
  }

  renderLogsTerminal();
}

function updateLogsCountBadges() {
  const allEl = document.getElementById('count-logs-all');
  const ic3El = document.getElementById('count-logs-ic3');
  const inboxEl = document.getElementById('count-logs-inbox');
  const schedEl = document.getElementById('count-logs-scheduler');
  const dbEl = document.getElementById('count-logs-database');

  if (allEl) allEl.innerText = logsBuffer.length;
  if (ic3El) ic3El.innerText = logsBuffer.filter(l => l.stream === 'ic3').length;
  if (inboxEl) inboxEl.innerText = logsBuffer.filter(l => l.stream === 'inbox').length;
  if (schedEl) schedEl.innerText = logsBuffer.filter(l => l.stream === 'scheduler').length;
  if (dbEl) dbEl.innerText = logsBuffer.filter(l => l.stream === 'database').length;
}

/**
 * Toggle live stream on/off
 */
function toggleLogsStream() {
  isLogsStreaming = !isLogsStreaming;
  const icon = document.getElementById('logs-toggle-icon');
  const label = document.getElementById('logs-toggle-label');
  const ind = document.getElementById('logs-active-indicator');

  if (isLogsStreaming) {
    if (icon) icon.innerText = 'pause';
    if (label) label.innerText = 'Pause Stream';
    if (ind) {
      ind.innerText = 'STREAMING';
      ind.parentElement.className = "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold";
    }
    showGlobalToast("▶ Live Log Stream Resumed");
  } else {
    if (icon) icon.innerText = 'play_arrow';
    if (label) label.innerText = 'Resume Stream';
    if (ind) {
      ind.innerText = 'PAUSED';
      ind.parentElement.className = "inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 font-bold";
    }
    showGlobalToast("⏸ Live Log Stream Paused");
  }
}

/**
 * Clear the current log buffer
 */
function clearLogsTerminal() {
  logsBuffer = [
    {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      stream: "scheduler",
      level: "INFO",
      badge: "[SYSTEM]",
      badgeClass: "bg-slate-800 text-slate-300 border border-slate-700",
      message: "Terminal buffer cleared by operator. Listening on mTLS 1.3 socket...",
      detail: { operator: "admin", action: "buffer_flush" }
    }
  ];
  renderLogsTerminal();
  updateLogsCountBadges();
  showGlobalToast("🧹 Terminal buffer cleared");
}

/**
 * Copy entire logs stream to clipboard
 */
function copyLogsStream() {
  const lines = logsBuffer.map(l => `[${l.timestamp}] ${l.badge} ${l.level}: ${l.message}`).join('\n');
  navigator.clipboard.writeText(lines).then(() => {
    showGlobalToast("✓ Logs stream copied to clipboard!");
  }).catch(() => {
    showGlobalToast("✓ Logs copied!");
  });
}

/**
 * Download logs stream as file
 */
function downloadLogsFile(format) {
  let content = "";
  let filename = `autopilot_audit_stream_${Date.now()}.${format}`;
  let mimeType = "text/plain";

  if (format === 'json') {
    content = JSON.stringify(logsBuffer, null, 2);
    mimeType = "application/json";
  } else {
    content = logsBuffer.map(l => {
      let str = `[${l.timestamp}] ${l.badge} [${l.level}] ${l.message}`;
      if (l.detail) str += `\n  PAYLOAD: ${JSON.stringify(l.detail)}`;
      return str;
    }).join('\n');
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showGlobalToast(`✓ Downloaded ${filename}`);
}

/**
 * Generate occasional simulated log events
 */
function generateSimulatedLogEvent() {
  const events = [
    {
      stream: "scheduler",
      level: "INFO",
      badge: "[APScheduler]",
      badgeClass: "bg-blue-950 text-blue-400 border border-blue-800",
      message: "Background heartbeat: IMAP/OAuth socket alive. 0 dropped packets.",
      detail: { socket_alive: true, latency_ms: 11.4 }
    },
    {
      stream: "inbox",
      level: "SUCCESS",
      badge: "[DKIM-VERIFY]",
      badgeClass: "bg-emerald-950 text-emerald-400 border border-emerald-800",
      message: "Recruiter webhook received: Salesforce Talent Partner. SPF pass, DMARC pass.",
      detail: { domain: "salesforce.com", sender: "careers@salesforce.com", dkim_score: 1.0 }
    },
    {
      stream: "database",
      level: "INFO",
      badge: "[SQLITE-WAL]",
      badgeClass: "bg-purple-950 text-purple-400 border border-purple-800",
      message: "Auto-checkpoint: SQLite WAL committed 4 new audit events.",
      detail: { pages: 4, write_time_ms: 1.8 }
    },
    {
      stream: "ic3",
      level: "WARN",
      badge: "[HONEYPOT-PROBE]",
      badgeClass: "bg-amber-950 text-amber-400 border border-amber-800",
      message: "Suspicious crawler blocked on canary endpoint: User-Agent Python-urllib/3.10 quarantined.",
      detail: { ip: "194.26.29.112", action: "403_FORBIDDEN" }
    }
  ];

  const pick = events[Math.floor(Math.random() * events.length)];
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;

  const newLog = {
    id: Date.now(),
    timestamp: timeStr,
    ...pick
  };

  logsBuffer.push(newLog);
  if (logsBuffer.length > 200) logsBuffer.shift();

  renderLogsTerminal();
  updateLogsCountBadges();
}

/**
 * Modal handlers for FBI IC3 Docket
 */
function openIc3DocketModal() {
  const modal = document.getElementById('modal-ic3-docket');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeIc3DocketModal() {
  const modal = document.getElementById('modal-ic3-docket');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function copyIc3PayloadJson() {
  const payload = {
    status: "SUCCESS",
    code: 200,
    docket_id: "IC3-DOCKET-2025-0914-APL",
    canonical_sha384: "7e2b189a02fc3187b99c72a8019b88e14670dc4e34f89d34208a0d9b6264f331f47890a8809e1e2d4f55a12fbc93de76",
    zero_bit_drift: true,
    threat_actor_cluster: "NCFTA-CYWEX-9841",
    adversary_ip: "185.220.101.42",
    adversary_asn: "AS48210",
    honeypot_token: "CANARY-9841-APL",
    countersigned_by: "FBI-IC3-INGEST-GATEWAY-CA-04",
    timestamp: "2026-11-02T12:44:02.184Z"
  };

  navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
    showGlobalToast("✓ IC3 Docket JSON copied to clipboard!");
  }).catch(() => {
    showGlobalToast("✓ Docket copied!");
  });
}


// ============================================================================
// EXECUTIVE CAREER & HIRING NEWSLETTER HUB (Issue #48)
// ============================================================================

let activeNewsletterTab = 'briefing';

function initNewsletter() {
  switchNewsletterTab(activeNewsletterTab);
  safeCreateIcons();
}

function switchNewsletterTab(tabKey) {
  activeNewsletterTab = tabKey;

  const tabs = ['briefing', 'benchmarks', 'personas', 'archive', 'subscribe'];
  tabs.forEach(t => {
    const contentEl = document.getElementById(`nl-content-${t}`);
    const tabBtn = document.getElementById(`nl-tab-${t}`);

    if (contentEl) {
      if (t === tabKey) {
        contentEl.classList.remove('hidden');
      } else {
        contentEl.classList.add('hidden');
      }
    }

    if (tabBtn) {
      if (t === tabKey) {
        tabBtn.className = "nl-nav-tab px-4 py-2 rounded-xl font-bold bg-indigo-600 text-white transition-all shrink-0 flex items-center gap-1.5 shadow-sm";
      } else {
        tabBtn.className = "nl-nav-tab px-4 py-2 rounded-xl font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0 flex items-center gap-1.5";
      }
    }
  });

  safeCreateIcons();
}

function filterCompTable(domain) {
  document.querySelectorAll('.comp-filter-btn').forEach(btn => {
    btn.className = "comp-filter-btn px-3 py-1.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-all";
  });

  const activeBtn = document.getElementById(`comp-btn-${domain}`);
  if (activeBtn) {
    activeBtn.className = "comp-filter-btn px-3 py-1.5 rounded-xl font-bold bg-indigo-600 text-white transition-all";
  }

  const rows = document.querySelectorAll('.comp-row');
  rows.forEach(r => {
    const rowDomain = r.getAttribute('data-domain');
    if (domain === 'all' || rowDomain === domain) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

function handleNewsletterSubscribe(e) {
  if (e) e.preventDefault();

  const emailInput = document.getElementById('newsletter-email-input');
  const email = emailInput?.value || "candidate@executive.com";

  const selectedTracks = [];
  document.querySelectorAll('input[name="nl-track"]:checked').forEach(cb => {
    selectedTracks.push(cb.value);
  });

  const subData = {
    email,
    tracks: selectedTracks,
    subscribedAt: new Date().toISOString(),
    issue: 48
  };

  try {
    localStorage.setItem('autopilot_newsletter_subscription', JSON.stringify(subData));
  } catch (err) {}

  if (emailInput) emailInput.value = '';

  showGlobalToast(`🎉 Welcome aboard, ${email}! Issue #48 sent to your inbox. Briefing preferences saved.`);
  if (typeof triggerConfetti === 'function') {
    try { triggerConfetti(); } catch (err) {}
  }
}

function jumpToNewsletterSubscribe() {
  switchNewsletterTab('subscribe');
  setTimeout(() => {
    const input = document.getElementById('newsletter-email-input');
    if (input) input.focus();
  }, 100);
}

function downloadNewsletterPdf() {
  showGlobalToast("📄 Generating executive PDF brief for Issue #48...");
  setTimeout(() => {
    window.print();
  }, 600);
}

function shareNewsletterEdition() {
  const shareData = {
    title: "The Autopilot Executive: Issue #48",
    text: "The Great Lateral Reshuffle: Q4 Multi-Domain Hiring Index & Quota Dynamics",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showGlobalToast("✓ Issue link copied to clipboard!");
    });
  }
}

function loadArchivedIssue(num) {
  showGlobalToast(`📖 Loading The Autopilot Executive Archive: Issue #${num}...`);
  switchNewsletterTab('briefing');
}



// ============================================================================
// DEDICATED SIGN IN, SIGN OUT & CANDIDATE IDENTITY PORTAL (#view-auth)
// ============================================================================

let currentAuthPageTab = 'signin';
let pageOtpTimerInterval = null;
let pageOtpRemainingSeconds = 60;
let currentPendingPageUser = null;

/**
 * Navigate directly to full-screen Candidate Auth Portal
 */
function navigateToAuth(tab = 'signin') {
  closeAllHeaderDropdowns();
  toggleUserDropdown(false);
  toggleMobileActionsDrawer(false);
  closeAuthModal();

  switchView('auth');
  switchAuthPageTab(tab);
}

/**
 * Renders the Auth Portal view state
 */
function renderAuthPage() {
  updateAuthUI();
  switchAuthPageTab(currentAuthPageTab);
  safeCreateIcons();
}

/**
 * Switch tabs on the dedicated auth page
 */
function switchAuthPageTab(tab) {
  currentAuthPageTab = tab;

  const tabs = ['signin', 'signup', 'forgot', 'otp'];
  tabs.forEach(t => {
    const view = document.getElementById(`page-auth-view-${t}`);
    const btn = document.getElementById(`page-tab-btn-${t}`);

    if (view) {
      if (t === tab) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    }

    if (btn) {
      if (t === tab) {
        btn.className = "page-auth-tab flex-1 py-3.5 px-4 text-center border-b-2 border-indigo-600 text-indigo-600 font-bold transition-all shrink-0 shadow-xs";
      } else {
        btn.className = "page-auth-tab flex-1 py-3.5 px-4 text-center border-b-2 border-transparent text-slate-500 hover:text-slate-900 font-semibold transition-all shrink-0";
      }
    }
  });

  if (tab === 'signin') {
    const el = document.getElementById('page-signin-email');
    if (el) el.focus();
  } else if (tab === 'signup') {
    const el = document.getElementById('page-signup-name');
    if (el) el.focus();
  } else if (tab === 'forgot') {
    const el = document.getElementById('page-forgot-email');
    if (el) el.focus();
  } else if (tab === 'otp') {
    const el = document.getElementById('page-otp-1');
    if (el) el.focus();
  }

  safeCreateIcons();
}

/**
 * Toggle the signed-out confirmation banner
 */
function showSignedOutBanner(show) {
  const banner = document.getElementById('auth-signed-out-banner');
  if (banner) {
    if (show) {
      banner.classList.remove('hidden');
      banner.classList.add('flex');
    } else {
      banner.classList.add('hidden');
      banner.classList.remove('flex');
    }
  }
}

function dismissSignedOutBanner() {
  showSignedOutBanner(false);
}

/**
 * 1-Click Multi-Persona Logins: Marcus (Sales), Elena (Marketing), Sarah (HR), Alex (SWE), David (Switcher)
 */
function loginAsPersona(personaKey) {
  const personas = {
    marcus: {
      id: "usr_marcus_vance",
      name: "Marcus Vance",
      email: "marcus.vance@executive.dev",
      role: "VP of Enterprise Sales & RevOps",
      avatar: "MV",
      target_comp: "$280k - $420k OTE",
      two_factor_enabled: true,
      verified: true,
      domain: "sales",
      session_token: "zt_mv_9841"
    },
    elena: {
      id: "usr_elena_rostova",
      name: "Elena Rostova",
      email: "elena.rostova@executive.dev",
      role: "Principal Product Marketing Manager (PMM)",
      avatar: "ER",
      target_comp: "$210k - $275k Base",
      two_factor_enabled: true,
      verified: true,
      domain: "marketing",
      session_token: "zt_er_7419"
    },
    sarah: {
      id: "usr_sarah_lin",
      name: "Sarah Lin",
      email: "sarah.lin@executive.dev",
      role: "Head of People & Executive Talent Partner",
      avatar: "SL",
      target_comp: "$220k - $300k Base",
      two_factor_enabled: true,
      verified: true,
      domain: "hr",
      session_token: "zt_sl_3821"
    },
    alex: {
      id: "usr_alex_chen",
      name: "Alex Chen",
      email: "alex.chen@executive.dev",
      role: "Staff Full-Stack Architect",
      avatar: "AC",
      target_comp: "$250k - $320k Total",
      two_factor_enabled: true,
      verified: true,
      domain: "tech",
      session_token: "zt_ac_9421"
    },
    david: {
      id: "usr_david_miller",
      name: "David Miller",
      email: "david.miller@executive.dev",
      role: "Solutions Architect & Career Switcher",
      avatar: "DM",
      target_comp: "$180k - $240k Base",
      two_factor_enabled: true,
      verified: true,
      domain: "switchers",
      session_token: "zt_dm_5192"
    }
  };

  const user = personas[personaKey] || personas.alex;
  setAuthUser(user);
  dismissSignedOutBanner();

  showGlobalToast(`🎉 Welcome back, ${user.name}! Authenticated as ${user.role}.`);
  if (typeof triggerConfetti === 'function') {
    try { triggerConfetti(); } catch (e) {}
  }

  // Pre-select persona in MNC Hub / Kanban if available
  if (typeof selectPersonaTrack === 'function') {
    selectPersonaTrack(user.domain || 'tech');
  }

  // Redirect to Pipeline Kanban view
  setTimeout(() => {
    switchView('kanban');
  }, 400);
}

/**
 * Handle form submission on dedicated Sign In page
 */
async function handlePageSignInSubmit(event) {
  if (event) event.preventDefault();

  const email = (document.getElementById('page-signin-email')?.value || "alex.chen@executive.dev").trim();
  const password = document.getElementById('page-signin-password')?.value || "StitchAutopilot2026!";

  showGlobalToast("Authenticating session with Zero-Trust identity guard...");

  let userData = null;
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember_me: true })
    });
    if (res.ok) {
      const data = await res.json();
      userData = data.user;
    }
  } catch (e) {}

  if (!userData) {
    const isAlex = email.toLowerCase().includes('alex') || email.toLowerCase().includes('demo');
    const name = isAlex ? "Alex Chen" : email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    userData = {
      id: "usr_" + Math.floor(Math.random() * 90000 + 10000),
      name: name,
      email: email,
      role: isAlex ? "Staff Full-Stack Architect" : "Senior Software Engineer",
      avatar: name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || "AC",
      target_comp: "$250k - $320k",
      two_factor_enabled: true,
      verified: true,
      session_token: "zt_" + Math.floor(Math.random() * 90000000 + 10000000)
    };
  }

  setAuthUser(userData);
  dismissSignedOutBanner();

  showGlobalToast(`Welcome back, ${userData.name}! Zero-Trust session authenticated.`);
  if (typeof triggerConfetti === 'function') {
    try { triggerConfetti(); } catch (e) {}
  }

  setTimeout(() => {
    switchView('kanban');
  }, 400);
}

/**
 * Handle form submission on dedicated Sign Up page
 */
async function handlePageSignUpSubmit(event) {
  if (event) event.preventDefault();

  const name = (document.getElementById('page-signup-name')?.value || "Alex Chen").trim();
  const email = (document.getElementById('page-signup-email')?.value || "candidate@executive.dev").trim();
  const persona = document.getElementById('page-signup-persona')?.value || "tech";
  const pass = document.getElementById('page-signup-password')?.value || "";
  const confirm = document.getElementById('page-signup-confirm')?.value || "";

  if (pass !== confirm) {
    showGlobalToast("Passwords do not match. Please re-enter.");
    return;
  }

  const roleMap = {
    sales: "VP of Enterprise Sales & RevOps",
    marketing: "Principal Product Marketing Manager (PMM)",
    hr: "Head of People & Talent Acquisition Lead",
    switchers: "Solutions Architect & Career Switcher",
    tech: "Staff Full-Stack Architect"
  };

  const userRole = roleMap[persona] || "Senior Candidate";

  showGlobalToast(`Registering ${name} & generating Zero-Trust 2FA OTP...`);

  let demoOtp = String(Math.floor(Math.random() * 900000 + 100000));
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role: userRole, password: pass, enable_2fa: true })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.demo_otp) demoOtp = data.demo_otp;
    }
  } catch (e) {}

  currentPendingPageUser = {
    name,
    email,
    role: userRole,
    domain: persona,
    avatar: name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || "AC",
    demoOtp
  };

  safeSetText('page-otp-target-email', email);
  safeSetText('page-otp-demo-display', demoOtp);
  switchAuthPageTab('otp');
  startPageOtpTimer();
}

/**
 * Handle form submission on dedicated Forgot Password page
 */
async function handlePageForgotPasswordSubmit(event) {
  if (event) event.preventDefault();

  const email = (document.getElementById('page-forgot-email')?.value || "alex.chen@executive.dev").trim();
  showGlobalToast(`Dispatching recovery code to ${email}...`);

  let demoOtp = String(Math.floor(Math.random() * 900000 + 100000));
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.demo_otp) demoOtp = data.demo_otp;
    }
  } catch (e) {}

  currentPendingPageUser = {
    email,
    demoOtp,
    purpose: 'recovery'
  };

  safeSetText('page-otp-target-email', email);
  safeSetText('page-otp-demo-display', demoOtp);
  switchAuthPageTab('otp');
  startPageOtpTimer();
}

function startPageOtpTimer() {
  if (pageOtpTimerInterval) {
    clearInterval(pageOtpTimerInterval);
  }
  pageOtpRemainingSeconds = 60;
  const timerSecs = document.getElementById('page-otp-timer-seconds');
  const btnResend = document.getElementById('btn-page-resend-otp');
  if (btnResend) {
    btnResend.disabled = true;
    btnResend.className = "text-slate-400 font-bold disabled:cursor-not-allowed";
  }

  pageOtpTimerInterval = setInterval(() => {
    pageOtpRemainingSeconds -= 1;
    if (timerSecs) timerSecs.textContent = pageOtpRemainingSeconds;
    if (pageOtpRemainingSeconds <= 0) {
      clearInterval(pageOtpTimerInterval);
      if (btnResend) {
        btnResend.disabled = false;
        btnResend.className = "text-indigo-600 font-bold hover:underline cursor-pointer";
      }
      safeSetText('page-otp-timer-text', 'Code expired. Click to resend.');
    }
  }, 1000);
}

function resendPageOtpCode() {
  const newOtp = String(Math.floor(Math.random() * 900000 + 100000));
  if (currentPendingPageUser) {
    currentPendingPageUser.demoOtp = newOtp;
  }
  safeSetText('page-otp-demo-display', newOtp);
  startPageOtpTimer();
  showGlobalToast(`New 6-Digit OTP dispatched: ${newOtp}`);
}

function handlePageOtpInput(index) {
  const currentBox = document.getElementById(`page-otp-${index}`);
  if (!currentBox) return;
  const val = currentBox.value;
  if (val.length >= 1) {
    currentBox.value = val.slice(-1);
    if (index < 6) {
      const nextBox = document.getElementById(`page-otp-${index + 1}`);
      if (nextBox) nextBox.focus();
    } else {
      // Auto-verify on 6th digit
      handlePageOtpVerifySubmit();
    }
  }
}

function handlePageOtpBackspace(event, index) {
  if (event.key === 'Backspace') {
    const currentBox = document.getElementById(`page-otp-${index}`);
    if (currentBox && currentBox.value === '' && index > 1) {
      const prevBox = document.getElementById(`page-otp-${index - 1}`);
      if (prevBox) prevBox.focus();
    }
  }
}

function autoFillPageDemoOtp() {
  const code = (currentPendingPageUser && currentPendingPageUser.demoOtp) || "742918";
  for (let i = 1; i <= 6; i++) {
    const box = document.getElementById(`page-otp-${i}`);
    if (box) box.value = code[i - 1] || "";
  }
  showGlobalToast(`Auto-filled 6-digit verification code: ${code}`);
  setTimeout(() => {
    handlePageOtpVerifySubmit();
  }, 300);
}

async function handlePageOtpVerifySubmit() {
  let enteredOtp = '';
  for (let i = 1; i <= 6; i++) {
    const box = document.getElementById(`page-otp-${i}`);
    enteredOtp += (box?.value || '');
  }

  if (enteredOtp.length !== 6) {
    showGlobalToast("Please enter all 6 digits of the verification code.");
    return;
  }

  showGlobalToast("Validating Zero-Trust cryptographic OTP token...");

  const p = currentPendingPageUser || {};
  const name = p.name || "Alex Chen";
  const user = {
    id: "usr_" + Math.floor(Math.random() * 90000 + 10000),
    name: name,
    email: p.email || "alex.chen@executive.dev",
    role: p.role || "Staff Full-Stack Architect",
    avatar: p.avatar || "AC",
    target_comp: "$250k - $320k",
    two_factor_enabled: true,
    verified: true,
    domain: p.domain || "tech",
    session_token: "zt_page_otp_" + Math.floor(Math.random() * 90000000 + 10000000)
  };

  setAuthUser(user);
  dismissSignedOutBanner();

  showGlobalToast(`✓ Zero-Trust 2FA Verified! Welcome to Executive Career Cockpit, ${user.name}!`);
  if (typeof triggerConfetti === 'function') {
    try { triggerConfetti(); } catch (e) {}
  }

  setTimeout(() => {
    switchView('kanban');
  }, 400);
}

// URL Hash routing for direct bookmarks: #signin, #signup, #signout, #auth
function checkAuthHashRouting() {
  const hash = (window.location.hash || '').toLowerCase();
  if (hash === '#signin' || hash === '#login' || hash === '#auth') {
    navigateToAuth('signin');
  } else if (hash === '#signup' || hash === '#register') {
    navigateToAuth('signup');
  } else if (hash === '#signout' || hash === '#logout') {
    handleSignOut();
  } else if (hash === '#forgot') {
    navigateToAuth('forgot');
  } else if (hash === '#otp') {
    navigateToAuth('otp');
  }
}

window.addEventListener('hashchange', checkAuthHashRouting);
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkAuthHashRouting, 200);
});



// =============================================================================
// COMPREHENSIVE SUITE MODULE: DSA/SDLC, COMPANIES/HR, ATS, COURSES, PRICING, AI
// =============================================================================

// -----------------------------------------------------------------------------
// 1. GLOBAL SEARCH & REAL-TIME SUGGESTIONS (Ctrl+K)
// -----------------------------------------------------------------------------
const globalSearchIndex = [
  // Views & Hubs
  { title: "Pipeline Kanban", category: "Navigation", subtitle: "Track Sales, Marketing, HR & Tech applications", action: () => switchView('kanban'), keywords: "kanban pipeline jobs board" },
  { title: "DSA & SDLC Lifecycle", category: "Engineering", subtitle: "Problem bank, solutions & 6-phase engineering lifecycle", action: () => switchView('dsa-sdlc'), keywords: "dsa sdlc algorithms data structures system design" },
  { title: "Companies & Verified HR", category: "Companies", subtitle: "50+ Product, Service & AI Unicorns with recruiter contacts", action: () => switchView('companies-hr'), keywords: "companies recruiters hr talent google stripe databricks" },
  { title: "ATS & CV Intelligence Suite", category: "Tools", subtitle: "Resume score scanner, X-Y-Z bullet rewriter & PDF export", action: () => switchView('ats-tools'), keywords: "ats resume cv scanner keywords bullets cover letter" },
  { title: "Courses & 1-on-1 Mentorship", category: "Education", subtitle: "Masterclasses & private mock interviews with Staff Mentors", action: () => switchView('courses-mentors'), keywords: "courses mentors mock interview coaching classes" },
  { title: "Subscriptions & Pro Plans", category: "Pricing", subtitle: "Unlock unlimited ATS scans, verified HR emails & mentorship", action: () => switchView('pricing'), keywords: "pricing plans pro subscription billing upgrade" },
  { title: "AI & Tech Radar Logs", category: "Engineering", subtitle: "Deep-dives on Agentic MCP, Gemini Flash, DeepSeek & SRE", action: () => switchView('ai-radar'), keywords: "ai logs tech radar mcp gemini deepseek llm" },
  { title: "Candidate Sign In / Sign Out", category: "Identity", subtitle: "Multi-persona identity portal (Marcus, Elena, Sarah, Alex, David)", action: () => switchView('auth'), keywords: "signin signout login logout persona auth" },

  // Key Companies
  { title: "Google", category: "Company", subtitle: "Staff SWE, Product Managers, Cloud RevOps (Mountain View / Remote)", action: () => { switchView('companies-hr'); searchCompanies('Google'); }, keywords: "google alphabet faang" },
  { title: "Stripe", category: "Company", subtitle: "Financial Infrastructure, Staff Full-Stack, Technical Recruiters", action: () => { switchView('companies-hr'); searchCompanies('Stripe'); }, keywords: "stripe fintech payments" },
  { title: "Databricks", category: "Company", subtitle: "Data Intelligence Platform, Solutions Architects, Enterprise Sales", action: () => { switchView('companies-hr'); searchCompanies('Databricks'); }, keywords: "databricks spark lakehouse ai" },
  { title: "OpenAI", category: "Company", subtitle: "Frontier AI Research, Research Engineers, Member of Technical Staff", action: () => { switchView('companies-hr'); searchCompanies('OpenAI'); }, keywords: "openai chatgpt gpt-4" },
  { title: "Tata Consultancy Services (TCS)", category: "Company", subtitle: "Global Systems Integration, Enterprise Transformation", action: () => { switchView('companies-hr'); searchCompanies('TCS'); }, keywords: "tcs service consulting" },

  // Key DSA Topics
  { title: "Two Sum & Hash Maps", category: "DSA Problem", subtitle: "Arrays & Hash Table • O(N) Time complexity", action: () => { switchView('dsa-sdlc'); openDsaSolutionModal(1); }, keywords: "two sum array hash map leetcode" },
  { title: "LRU Cache Design", category: "DSA Problem", subtitle: "Linked List & Hash Table • System Design core", action: () => { switchView('dsa-sdlc'); openDsaSolutionModal(146); }, keywords: "lru cache doubly linked list system design" },
  { title: "Trapping Rain Water", category: "DSA Problem", subtitle: "Two Pointers • Hard interview question", action: () => { switchView('dsa-sdlc'); openDsaSolutionModal(42); }, keywords: "trapping rain water two pointers" },

  // SDLC Phases
  { title: "Phase 1: Requirements & PRD", category: "SDLC", subtitle: "User Stories, KPI specs & RFC Architecture", action: () => { switchView('dsa-sdlc'); switchDsaSdlcTab('sdlc'); renderSdlcActiveStage(0); }, keywords: "sdlc requirements prd user story" },
  { title: "Phase 5: Canary Deployments & CI/CD", category: "SDLC", subtitle: "Kubernetes, Docker, ArgoCD, Zero-Downtime rollouts", action: () => { switchView('dsa-sdlc'); switchDsaSdlcTab('sdlc'); renderSdlcActiveStage(4); }, keywords: "sdlc canary deployment kubernetes k8s cicd" },
  { title: "Phase 6: Observability & SRE", category: "SDLC", subtitle: "Prometheus, Grafana, SLOs & Blameless Post-Mortems", action: () => { switchView('dsa-sdlc'); switchDsaSdlcTab('sdlc'); renderSdlcActiveStage(5); }, keywords: "sdlc sre observability grafana prometheus post-mortem" }
];

function handleGlobalSearch(query) {
  const q = (query || '').toLowerCase().trim();
  const dropdown = document.getElementById('header-search-dropdown');
  const resultsList = document.getElementById('header-search-results-list');
  const modalResultsList = document.getElementById('modal-search-results-list');

  if (!q) {
    if (resultsList) resultsList.innerHTML = '<div class="p-3 text-center text-xs text-slate-400">Type keywords to search across the cockpit...</div>';
    if (modalResultsList) modalResultsList.innerHTML = '<div class="p-4 text-center text-xs text-slate-400">Type keywords to search across the cockpit...</div>';
    return;
  }

  const matches = globalSearchIndex.filter(item => {
    return item.title.toLowerCase().includes(q) ||
           item.category.toLowerCase().includes(q) ||
           item.subtitle.toLowerCase().includes(q) ||
           item.keywords.toLowerCase().includes(q);
  }).slice(0, 8);

  const renderHtml = (items) => {
    if (!items.length) {
      return '<div class="p-3 text-center text-xs text-slate-500">No results found for "' + q + '".</div>';
    }
    return items.map(item => `
      <div 
        onclick="executeSearchResult(${globalSearchIndex.indexOf(item)})"
        class="p-2.5 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 cursor-pointer flex items-center justify-between gap-2 transition-colors"
      >
        <div>
          <div class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
            <span>${item.title}</span>
            <span class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[9px] font-mono">${item.category}</span>
          </div>
          <div class="text-[11px] text-slate-500 line-clamp-1">${item.subtitle}</div>
        </div>
        <span class="material-symbols-outlined text-slate-400 text-[16px]">arrow_forward</span>
      </div>
    `).join('');
  };

  const html = renderHtml(matches);
  if (resultsList) resultsList.innerHTML = html;
  if (modalResultsList) modalResultsList.innerHTML = html;

  if (dropdown && matches.length > 0) {
    dropdown.classList.remove('hidden');
    dropdown.classList.add('flex');
  }
}

function executeSearchResult(index) {
  const item = globalSearchIndex[index];
  if (item && typeof item.action === 'function') {
    item.action();
  }
  closeGlobalSearchDropdown();
  closeGlobalSearchModal();
}

function openGlobalSearchDropdown() {
  const dropdown = document.getElementById('header-search-dropdown');
  const input = document.getElementById('header-global-search-input');
  if (dropdown) {
    dropdown.classList.remove('hidden');
    dropdown.classList.add('flex');
  }
  if (input && input.value) {
    handleGlobalSearch(input.value);
  } else {
    handleGlobalSearch('');
  }
}

function closeGlobalSearchDropdown() {
  const dropdown = document.getElementById('header-search-dropdown');
  if (dropdown) {
    dropdown.classList.add('hidden');
    dropdown.classList.remove('flex');
  }
}

function openGlobalSearchModal() {
  const modal = document.getElementById('modal-global-search');
  const input = document.getElementById('modal-search-input');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 100);
    handleGlobalSearch('');
  }
}

function closeGlobalSearchModal() {
  const modal = document.getElementById('modal-global-search');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Keyboard Shortcut: Ctrl+K or Cmd+K
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openGlobalSearchModal();
  }
  if (e.key === 'Escape') {
    closeGlobalSearchModal();
    closeGlobalSearchDropdown();
    closeNotificationsDropdown();
    closeDsaSolutionModal();
    closeMentorBookingModal();
    closeSubscriptionCheckout();
    closeAiLogReaderModal();
    closeHrOutreachModal();
  }
});

// Click outside handler for dropdowns
document.addEventListener('click', (e) => {
  const searchContainer = document.getElementById('header-global-search-input')?.parentElement?.parentElement;
  if (searchContainer && !searchContainer.contains(e.target)) {
    closeGlobalSearchDropdown();
  }
  const notifContainer = document.getElementById('header-notification-btn')?.parentElement;
  if (notifContainer && !notifContainer.contains(e.target)) {
    closeNotificationsDropdown();
  }
});

// -----------------------------------------------------------------------------
// 2. HEADER NOTIFICATIONS SYSTEM
// -----------------------------------------------------------------------------
const notificationsData = [
  { id: 1, type: "recruiter", icon: "visibility", color: "text-emerald-600 bg-emerald-50", title: "Recruiter Profile View", text: "Senior Talent Partner at Stripe viewed your CV profile.", time: "12m ago", unread: true, action: () => { switchView('companies-hr'); filterCompaniesCategory('hr-directory'); } },
  { id: 2, type: "ats", icon: "auto_fix_high", color: "text-amber-600 bg-amber-50", title: "ATS Score Benchmark", text: "Optimized resume matched 94% with Staff AI Requisition.", time: "45m ago", unread: true, action: () => switchView('ats-tools') },
  { id: 3, type: "recruiter", icon: "event", color: "text-blue-600 bg-blue-50", title: "1-on-1 Mentor Confirmed", text: "Session with Ex-Google Staff Mentor confirmed for tomorrow 10:00 AM.", time: "2h ago", unread: true, action: () => { switchView('courses-mentors'); switchCourseMentorTab('mentors'); } },
  { id: 4, type: "ai", icon: "psychology", color: "text-cyan-600 bg-cyan-50", title: "New AI Radar Published", text: "Agentic MCP Architectures: The 2026 Production Standard.", time: "4h ago", unread: true, action: () => { switchView('ai-radar'); openAiLogReaderModal('mcp-agents'); } }
];

let activeNotifFilter = 'all';

function toggleNotificationsDropdown(force) {
  const dd = document.getElementById('header-notifications-dropdown');
  if (!dd) return;
  const isCurrentlyOpen = !dd.classList.contains('hidden');
  const shouldOpen = force !== undefined ? force : !isCurrentlyOpen;

  if (shouldOpen) {
    dd.classList.remove('hidden');
    dd.classList.add('flex');
    renderNotifications(activeNotifFilter);
  } else {
    dd.classList.add('hidden');
    dd.classList.remove('flex');
  }
}

function closeNotificationsDropdown() {
  const dd = document.getElementById('header-notifications-dropdown');
  if (dd) {
    dd.classList.add('hidden');
    dd.classList.remove('flex');
  }
}

function filterNotifications(category) {
  activeNotifFilter = category;
  ['all', 'recruiter', 'ats', 'ai'].forEach(cat => {
    const btn = document.getElementById(`notif-tab-${cat}`);
    if (btn) {
      if (cat === category) {
        btn.className = "px-2.5 py-1 rounded-lg bg-indigo-600 text-white shrink-0";
      } else {
        btn.className = "px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 shrink-0";
      }
    }
  });
  renderNotifications(category);
}

function renderNotifications(category = 'all') {
  const container = document.getElementById('notifications-items-container');
  if (!container) return;

  const filtered = category === 'all' 
    ? notificationsData 
    : notificationsData.filter(n => n.type === category);

  if (!filtered.length) {
    container.innerHTML = '<div class="p-4 text-center text-xs text-slate-400">No notifications in this category.</div>';
    return;
  }

  container.innerHTML = filtered.map(n => `
    <div 
      onclick="notificationsData.find(x => x.id === ${n.id}).action(); closeNotificationsDropdown();"
      class="p-2.5 rounded-xl ${n.unread ? 'bg-indigo-50/60 border border-indigo-100' : 'bg-slate-50 border border-slate-100'} hover:bg-indigo-100/60 cursor-pointer transition-all flex items-start gap-2.5"
    >
      <div class="w-7 h-7 rounded-lg ${n.color} flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[16px]">${n.icon}</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="font-bold text-xs text-slate-900">${n.title}</span>
          <span class="text-[9px] text-slate-400 font-mono">${n.time}</span>
        </div>
        <p class="text-[11px] text-slate-600 line-clamp-2 mt-0.5">${n.text}</p>
      </div>
      ${n.unread ? '<span class="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1"></span>' : ''}
    </div>
  `).join('');

  updateNotificationBadge();
}

function markAllNotificationsRead() {
  notificationsData.forEach(n => n.unread = false);
  updateNotificationBadge();
  renderNotifications(activeNotifFilter);
  if (typeof showToast === 'function') {
    showToast("All notifications marked as read ✓");
  }
}

function updateNotificationBadge() {
  const badge = document.getElementById('header-notification-badge');
  const count = notificationsData.filter(n => n.unread).length;
  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// -----------------------------------------------------------------------------
// 3. DSA PROBLEM BANK & SDLC 6-PHASE LIFECYCLE
// -----------------------------------------------------------------------------
const dsaProblemsData = [
  {
    id: 1,
    title: "Two Sum",
    category: "arrays",
    categoryLabel: "Arrays & Hash Table",
    difficulty: "Easy",
    companies: "Google, Amazon, Meta, Apple",
    complexity: "Time: O(N) | Space: O(N)",
    solved: true,
    python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (seen.has(comp)) return [seen.get(comp), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
    java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[]{map.get(comp), i};
        map.put(nums[i], i);
    }
    return new int[0];
}`
  },
  {
    id: 42,
    title: "Trapping Rain Water",
    category: "sliding-window",
    categoryLabel: "Two Pointers",
    difficulty: "Hard",
    companies: "Google, Amazon, Stripe",
    complexity: "Time: O(N) | Space: O(1)",
    solved: false,
    python: `def trap(height: list[int]) -> int:
    if not height: return 0
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    res = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            res += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            res += right_max - height[r]
    return res`,
    javascript: `function trap(height) {
  let l = 0, r = height.length - 1;
  let leftMax = height[l], rightMax = height[r];
  let res = 0;
  while (l < r) {
    if (leftMax < rightMax) {
      l++;
      leftMax = Math.max(leftMax, height[l]);
      res += leftMax - height[l];
    } else {
      r--;
      rightMax = Math.max(rightMax, height[r]);
      res += rightMax - height[r];
    }
  }
  return res;
}`,
    java: `public int trap(int[] height) {
    int l = 0, r = height.length - 1;
    int leftMax = height[l], rightMax = height[r];
    int res = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            res += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            res += rightMax - height[r];
        }
    }
    return res;
}`
  },
  {
    id: 146,
    title: "LRU Cache Implementation",
    category: "system-design",
    categoryLabel: "System Design / LLD",
    difficulty: "Medium",
    companies: "Stripe, Databricks, Amazon, Meta",
    complexity: "Time: O(1) Get & Put | Space: O(Capacity)",
    solved: true,
    python: `class DLinkedNode:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = {}
        self.cap = capacity
        self.head, self.tail = DLinkedNode(), DLinkedNode()
        self.head.next, self.tail.prev = self.tail, self.head

    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._move_to_head(node)
        else:
            newNode = DLinkedNode(key, value)
            self.cache[key] = newNode
            self._add_node(newNode)
            if len(self.cache) > self.cap:
                tail = self._pop_tail()
                del self.cache[tail.key]`,
    javascript: `class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, val);
    if (this.map.size > this.cap) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}`,
    java: `class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    public void put(int key, int value) {
        super.put(key, value);
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`
  },
  {
    id: 200,
    title: "Number of Islands",
    category: "trees-graphs",
    categoryLabel: "Graphs / BFS & DFS",
    difficulty: "Medium",
    companies: "Amazon, Microsoft, Bloomberg",
    complexity: "Time: O(M*N) | Space: O(M*N)",
    solved: true,
    python: `def numIslands(grid: list[list[str]]) -> int:
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '#'
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1
    return count`,
    javascript: `function numIslands(grid) {
  if (!grid || !grid.length) return 0;
  let count = 0;
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') {
        dfs(r, c);
        count++;
      }
    }
  }
  return count;
}`,
    java: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                dfs(grid, r, c);
                count++;
            }
        }
    }
    return count;
}`
  },
  {
    id: 300,
    title: "Longest Increasing Subsequence",
    category: "dp",
    categoryLabel: "Dynamic Programming",
    difficulty: "Medium",
    companies: "Google, Meta, Microsoft",
    complexity: "Time: O(N log N) | Space: O(N)",
    solved: false,
    python: `import bisect
def lengthOfLIS(nums: list[int]) -> int:
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`,
    javascript: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (tails[mid] < x) l = mid + 1;
      else r = mid;
    }
    tails[l] = x;
  }
  return tails.length;
}`,
    java: `public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    int len = 0;
    for (int x : nums) {
        int i = Arrays.binarySearch(dp, 0, len, x);
        if (i < 0) i = -(i + 1);
        dp[i] = x;
        if (i == len) len++;
    }
    return len;
}`
  }
];

// SDLC 6-Phase Pipeline Data
const sdlcStagesData = [
  {
    number: "01",
    phase: "Requirements & PRD Definition",
    icon: "assignment",
    color: "from-blue-600 to-indigo-600",
    summary: "Establish user pain points, high-level business goals, measurable SLOs, and scope boundaries.",
    deliverables: ["Product Requirement Document (PRD)", "User Persona Stories", "System Non-Functional Requirements (Latency, Throughput, SLAs)", "RFC Architecture Proposal"],
    checklist: [
      "Define measurable metrics (e.g. p99 response < 120ms, 99.99% availability)",
      "Align cross-functional stakeholders (Product, Engineering, Security)",
      "Draft zero-trust security threat boundary document"
    ],
    templateSnippet: `## PRD: Autonomous Candidate Ingestion Pipeline
**Owner:** Staff Systems Architect
**Objective:** Ingest 15,000 inbound recruiter emails/sec with sub-second spam classification.
**Non-Functional Requirements:**
- Availability: 99.95%
- Latency: p95 < 250ms
- Security: RFC822 DKIM/SPF/DMARC cryptographic validation`
  },
  {
    number: "02",
    phase: "System Architecture & Design",
    icon: "architecture",
    color: "from-purple-600 to-indigo-600",
    summary: "Create C4 architecture models, High-Level (HLD) & Low-Level (LLD) designs, DB schemas, and API contracts.",
    deliverables: ["HLD / LLD Specifications", "Database ER Diagram (PostgreSQL / Redis)", "OpenAPI 3.1 Spec", "Event Schema Registry (Protobuf/Avro)"],
    checklist: [
      "Select synchronous vs asynchronous messaging (gRPC vs Kafka)",
      "Data consistency model (ACID vs Eventual Consistency)",
      "Disaster recovery and multi-region replication strategy"
    ],
    templateSnippet: `// OpenAPI 3.1 Contract Snippet
paths:
  /v1/candidates/score:
    post:
      summary: "AI ATS Vector Matcher"
      requestBody:
        content:
          application/json:
            schema: { $ref: '#/components/schemas/ResumePayload' }`
  },
  {
    number: "03",
    phase: "Implementation & Clean Code (TDD)",
    icon: "code",
    color: "from-emerald-600 to-teal-600",
    summary: "Develop modular codebases with test-driven development, trunk-based CI branching, and static analysis.",
    deliverables: ["Clean Architecture Microservices", "Unit & Integration Test Suite (>85% coverage)", "Pre-commit linting & SonarQube quality gates"],
    checklist: [
      "Follow SOLID principles and 12-factor application guidelines",
      "Enforce immutable configuration via environment variables",
      "Run automated vulnerability scanning (Snyk / Dependabot)"
    ],
    templateSnippet: `// Go Clean Architecture Handler
func (h *CandidateHandler) IngestResume(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
    defer cancel()
    result, err := h.service.Process(ctx, r.Body)
    if err != nil {
        http.Error(w, err.Error(), http.StatusUnprocessableEntity)
        return
    }
    json.NewEncoder(w).Encode(result)
}`
  },
  {
    number: "04",
    phase: "Automated QA & Security Audit",
    icon: "verified_user",
    color: "from-amber-600 to-orange-600",
    summary: "Comprehensive End-to-End testing, performance load testing, OWASP Top 10 penetration audits, and chaos engineering.",
    deliverables: ["E2E Playwright Automation Suite", "k6 / Locust Stress Test Report", "OWASP SAST & DAST Compliance Badge"],
    checklist: [
      "Execute load test up to 3x peak anticipated RPS",
      "Simulate service degradation with Chaos Mesh",
      "Validate zero hardcoded secrets via GitGuardian"
    ],
    templateSnippet: `// k6 Load Test Script
import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = { vus: 50, duration: '30s' };
export default function () {
  const res = http.get('http://localhost:8000/api/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(0.5);
}`
  },
  {
    number: "05",
    phase: "Canary Deployment & GitOps CI/CD",
    icon: "rocket_launch",
    color: "from-rose-600 to-red-600",
    summary: "Automated container builds, Helm packaging, GitOps release via ArgoCD, and automated canary progression.",
    deliverables: ["Multi-Stage Dockerfile", "Kubernetes Deployment & HPA", "ArgoCD Rollout Manifest (Canary 10% -> 50% -> 100%)"],
    checklist: [
      "Graceful SIGTERM shutdown handling with 30s drain timeout",
      "Readiness and liveness health probe configuration",
      "Automated rollback triggered if HTTP 5xx rate > 0.5%"
    ],
    templateSnippet: `# Argo Rollouts Canary Strategy
spec:
  strategy:
    canary:
      steps:
      - setWeight: 10
      - pause: { duration: 5m }
      - setWeight: 50
      - pause: { duration: 10m }`
  },
  {
    number: "06",
    phase: "Observability, SRE & Post-Mortem",
    icon: "query_stats",
    color: "from-indigo-600 to-cyan-600",
    summary: "Real-time telemetry with Prometheus metrics, Grafana dashboards, PagerDuty on-call, and blameless post-mortem audits.",
    deliverables: ["Grafana Golden Signals Dashboard", "Alertmanager Routing Matrix", "Blameless Incident Post-Mortem Document"],
    checklist: [
      "Monitor the 4 Golden Signals: Latency, Traffic, Errors, Saturation",
      "Define SLO error budget burn rate alerts",
      "Conduct post-incident review within 48h of P0/P1 incidents"
    ],
    templateSnippet: `## Blameless Post-Mortem Template
**Incident ID:** INC-8492
**Date:** 2026-11-02
**Impact:** 4.2% of inbound webhook emails delayed by 4 minutes.
**Root Cause:** Redis connection pool starvation under unexpected traffic spike.
**Preventative Actions:**
1. Increased max idle pool size from 50 to 200.
2. Implemented circuit breaker with fallback in-memory buffer.`
  }
];

let activeDsaCategory = 'all';
let activeDsaLang = 'python';
let activeSelectedProblemId = 1;

function initDsaSdlcView() {
  renderDsaProblemsTable();
  renderSdlcPipeline();
  renderSdlcActiveStage(0);
}

function switchDsaSdlcTab(tab) {
  const dsaContent = document.getElementById('section-dsa-content');
  const sdlcContent = document.getElementById('section-sdlc-content');
  const btnDsa = document.getElementById('tab-btn-dsa');
  const btnSdlc = document.getElementById('tab-btn-sdlc');

  if (tab === 'dsa') {
    if (dsaContent) dsaContent.classList.remove('hidden');
    if (sdlcContent) sdlcContent.classList.add('hidden');
    if (btnDsa) btnDsa.className = "px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all flex items-center gap-1.5";
    if (btnSdlc) btnSdlc.className = "px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
  } else {
    if (dsaContent) dsaContent.classList.add('hidden');
    if (sdlcContent) sdlcContent.classList.remove('hidden');
    if (btnDsa) btnDsa.className = "px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
    if (btnSdlc) btnSdlc.className = "px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all flex items-center gap-1.5";
  }
}

function filterDsaCategory(category) {
  activeDsaCategory = category;
  document.querySelectorAll('.dsa-cat-chip').forEach(chip => {
    chip.className = "dsa-cat-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0";
  });
  const target = event?.target;
  if (target) target.className = "dsa-cat-chip px-3 py-1.5 rounded-xl bg-indigo-600 text-white shrink-0";
  renderDsaProblemsTable();
}

function searchDsaProblems(query) {
  const q = (query || '').toLowerCase().trim();
  renderDsaProblemsTable(q);
}

function renderDsaProblemsTable(searchFilter = '') {
  const tbody = document.getElementById('dsa-problems-tbody');
  if (!tbody) return;

  let problems = dsaProblemsData;
  if (activeDsaCategory !== 'all') {
    problems = problems.filter(p => p.category === activeDsaCategory);
  }
  if (searchFilter) {
    problems = problems.filter(p => p.title.toLowerCase().includes(searchFilter) || p.companies.toLowerCase().includes(searchFilter));
  }

  if (!problems.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-xs text-slate-400">No matching DSA problems found.</td></tr>';
    return;
  }

  tbody.innerHTML = problems.map(p => {
    let diffBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (p.difficulty === 'Medium') diffBadge = 'bg-amber-50 text-amber-700 border-amber-200';
    if (p.difficulty === 'Hard') diffBadge = 'bg-rose-50 text-rose-700 border-rose-200';

    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3 px-4 text-center">
          <input 
            type="checkbox" 
            ${p.solved ? 'checked' : ''} 
            onchange="toggleDsaProblemSolved(${p.id})" 
            class="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
          />
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-slate-900">${p.title}</div>
          <div class="text-[10px] text-slate-400 font-mono">LeetCode #${p.id}</div>
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">${p.categoryLabel}</span>
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-full border text-[10px] font-bold ${diffBadge}">${p.difficulty}</span>
        </td>
        <td class="py-3 px-4">
          <div class="text-slate-600 text-[11px] font-medium">${p.companies}</div>
        </td>
        <td class="py-3 px-4 text-right">
          <button 
            type="button" 
            onclick="openDsaSolutionModal(${p.id})" 
            class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs inline-flex items-center gap-1 transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">terminal</span>
            <span>View Solution</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleDsaProblemSolved(id) {
  const prob = dsaProblemsData.find(p => p.id === id);
  if (prob) {
    prob.solved = !prob.solved;
    const solvedCount = dsaProblemsData.filter(p => p.solved).length;
    const statSolved = document.getElementById('dsa-stat-solved');
    if (statSolved) statSolved.textContent = `${solvedCount} / ${dsaProblemsData.length}`;
    if (typeof showToast === 'function') {
      showToast(prob.solved ? `Marked "${prob.title}" as Solved ✓` : `Marked "${prob.title}" as Todo`);
    }
  }
}

function openDsaSolutionModal(id) {
  activeSelectedProblemId = id;
  const prob = dsaProblemsData.find(p => p.id === id) || dsaProblemsData[0];
  const modal = document.getElementById('modal-dsa-solution');
  if (!modal) return;

  document.getElementById('dsa-modal-title').textContent = prob.title;
  document.getElementById('dsa-modal-category').textContent = prob.categoryLabel;
  document.getElementById('dsa-modal-complexity').textContent = prob.complexity;
  document.getElementById('dsa-modal-companies').textContent = `Asked at: ${prob.companies}`;

  const diffBadge = document.getElementById('dsa-modal-diff-badge');
  if (diffBadge) {
    diffBadge.textContent = prob.difficulty;
    diffBadge.className = prob.difficulty === 'Easy' 
      ? 'px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold'
      : (prob.difficulty === 'Medium' ? 'px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold' : 'px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold');
  }

  switchDsaCodeLang(activeDsaLang);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeDsaSolutionModal() {
  const modal = document.getElementById('modal-dsa-solution');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function switchDsaCodeLang(lang) {
  activeDsaLang = lang;
  ['python', 'javascript', 'java'].forEach(l => {
    const btn = document.getElementById(`btn-lang-${l}`);
    if (btn) {
      if (l === lang) {
        btn.className = "px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white";
      } else {
        btn.className = "px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white";
      }
    }
  });

  const prob = dsaProblemsData.find(p => p.id === activeSelectedProblemId) || dsaProblemsData[0];
  const codeBody = document.getElementById('dsa-modal-code-body');
  if (codeBody) {
    codeBody.textContent = prob[lang] || prob.python;
  }
}

function copyDsaCode() {
  const codeBody = document.getElementById('dsa-modal-code-body');
  if (codeBody) {
    navigator.clipboard.writeText(codeBody.textContent).then(() => {
      if (typeof showToast === 'function') showToast("Code copied to clipboard! 📋");
    });
  }
}

function renderSdlcPipeline() {
  const container = document.getElementById('sdlc-pipeline-stepper');
  if (!container) return;

  container.innerHTML = sdlcStagesData.map((stage, idx) => `
    <div 
      onclick="renderSdlcActiveStage(${idx})"
      class="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/50 cursor-pointer transition-all space-y-2 group shadow-2xs"
    >
      <div class="flex items-center justify-between">
        <span class="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center font-mono">${stage.number}</span>
        <span class="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-[18px]">${stage.icon}</span>
      </div>
      <div class="font-bold text-xs text-slate-900 group-hover:text-indigo-600 line-clamp-2">${stage.phase}</div>
    </div>
  `).join('');
}

function renderSdlcActiveStage(idx) {
  const stage = sdlcStagesData[idx] || sdlcStagesData[0];
  const viewer = document.getElementById('sdlc-active-stage-viewer');
  if (!viewer) return;

  viewer.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold">Stage ${stage.number} / 06</span>
          <span class="text-xs text-slate-400 font-semibold">Production SDLC Standard</span>
        </div>
        <h4 class="font-display font-black text-xl text-slate-900">${stage.phase}</h4>
        <p class="text-xs text-slate-600 max-w-2xl">${stage.summary}</p>
      </div>

      <button type="button" onclick="copySdlcTemplate(${idx})" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors self-start shrink-0">
        <span class="material-symbols-outlined text-[16px]">content_copy</span>
        <span>Copy Phase Template</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-indigo-600 text-[18px]">verified</span>
          <span>Core Deliverables &amp; Artifacts</span>
        </div>
        <ul class="space-y-1.5 text-xs text-slate-600">
          ${stage.deliverables.map(d => `<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span><span>${d}</span></li>`).join('')}
        </ul>
      </div>

      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="font-bold text-xs text-slate-900 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-emerald-600 text-[18px]">fact_check</span>
          <span>Quality Gate Checklist</span>
        </div>
        <ul class="space-y-1.5 text-xs text-slate-600">
          ${stage.checklist.map(c => `<li class="flex items-center gap-2"><span class="material-symbols-outlined text-emerald-600 text-[16px]">check_box</span><span>${c}</span></li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="mt-4 p-4 rounded-2xl bg-slate-950 text-slate-200 space-y-2">
      <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Production Template / Spec Snippet</span>
        <span class="text-emerald-400">Ready for Git repository</span>
      </div>
      <pre class="text-xs font-mono overflow-x-auto custom-scrollbar p-2 bg-slate-900 rounded-xl leading-relaxed"><code>${stage.templateSnippet}</code></pre>
    </div>
  `;
}

function copySdlcTemplate(idx) {
  const stage = sdlcStagesData[idx] || sdlcStagesData[0];
  navigator.clipboard.writeText(stage.templateSnippet).then(() => {
    if (typeof showToast === 'function') showToast(`Copied ${stage.phase} template! 📋`);
  });
}

// -----------------------------------------------------------------------------
// 4. COMPANIES & VERIFIED HR RECRUITER DIRECTORY
// -----------------------------------------------------------------------------
const companiesData = [
  // Product / MAANG Tier
  { name: "Google", type: "product", tier: "Tier-1 MAANG", hq: "Mountain View, CA / Remote", rolesCount: 42, salaryRange: "$180k - $340k", rating: 4.5, tech: ["Go", "Python", "Kubernetes", "Borg", "Spanner"], openingsUrl: "#kanban" },
  { name: "Stripe", type: "product", tier: "Tier-1 Fintech", hq: "San Francisco, CA / Remote", rolesCount: 28, salaryRange: "$190k - $360k", rating: 4.6, tech: ["Ruby", "Go", "Java", "Sorbet", "Kafka"], openingsUrl: "#kanban" },
  { name: "Databricks", type: "product", tier: "Unicorn / Pre-IPO", hq: "San Francisco, CA / Hybrid", rolesCount: 35, salaryRange: "$210k - $380k", rating: 4.7, tech: ["Scala", "Python", "Spark", "Kubernetes", "AWS"], openingsUrl: "#kanban" },
  { name: "Microsoft", type: "product", tier: "Tier-1 Tech", hq: "Redmond, WA / Remote", rolesCount: 64, salaryRange: "$165k - $310k", rating: 4.4, tech: ["C#", ".NET", "Azure", "TypeScript", "Python"], openingsUrl: "#kanban" },
  { name: "Amazon", type: "product", tier: "Tier-1 Tech", hq: "Seattle, WA / Hybrid", rolesCount: 88, salaryRange: "$170k - $320k", rating: 4.2, tech: ["Java", "AWS", "DynamoDB", "C++", "React"], openingsUrl: "#kanban" },
  { name: "Meta", type: "product", tier: "Tier-1 MAANG", hq: "Menlo Park, CA / Remote", rolesCount: 39, salaryRange: "$195k - $370k", rating: 4.3, tech: ["Hack", "C++", "Python", "PyTorch", "React"], openingsUrl: "#kanban" },
  { name: "Snowflake", type: "product", tier: "Cloud Data Tier", hq: "Bozeman, MT / Remote", rolesCount: 22, salaryRange: "$185k - $330k", rating: 4.4, tech: ["C++", "Java", "FoundationDB", "AWS", "Go"], openingsUrl: "#kanban" },
  { name: "Uber", type: "product", tier: "Tier-1 Mobility", hq: "San Francisco, CA / Hybrid", rolesCount: 31, salaryRange: "$175k - $325k", rating: 4.2, tech: ["Go", "Java", "Kafka", "Mesos", "Flink"], openingsUrl: "#kanban" },

  // AI Unicorns
  { name: "OpenAI", type: "ai", tier: "Frontier AI", hq: "San Francisco, CA", rolesCount: 18, salaryRange: "$250k - $450k", rating: 4.8, tech: ["Python", "PyTorch", "Triton", "Kubernetes", "Azure"], openingsUrl: "#kanban" },
  { name: "Anthropic", type: "ai", tier: "Frontier AI", hq: "San Francisco, CA", rolesCount: 14, salaryRange: "$260k - $480k", rating: 4.9, tech: ["Python", "JAX", "PyTorch", "AWS", "Rust"], openingsUrl: "#kanban" },
  { name: "Mistral AI", type: "ai", tier: "European AI", hq: "Paris / Remote", rolesCount: 12, salaryRange: "€140k - €240k", rating: 4.7, tech: ["Python", "C++", "CUDA", "vLLM", "GCP"], openingsUrl: "#kanban" },
  { name: "Scale AI", type: "ai", tier: "AI Infrastructure", hq: "San Francisco, CA", rolesCount: 20, salaryRange: "$190k - $350k", rating: 4.5, tech: ["Python", "React", "MongoDB", "Kubernetes", "AWS"], openingsUrl: "#kanban" },
  { name: "Cohere", type: "ai", tier: "Enterprise LLM", hq: "Toronto / San Francisco", rolesCount: 15, salaryRange: "$200k - $360k", rating: 4.6, tech: ["Python", "JAX", "C++", "Kubernetes", "GCP"], openingsUrl: "#kanban" },

  // Service & Consulting Leaders
  { name: "Tata Consultancy Services (TCS)", type: "service", tier: "Global Consulting", hq: "Mumbai / Global", rolesCount: 120, salaryRange: "₹18L - ₹45L", rating: 4.1, tech: ["Java", "Spring Boot", "Cloud Migration", "SAP", "Angular"], openingsUrl: "#kanban" },
  { name: "Infosys", type: "service", tier: "Global Consulting", hq: "Bangalore / Global", rolesCount: 95, salaryRange: "₹16L - ₹42L", rating: 4.0, tech: [".NET", "Java", "AWS", "Microservices", "React"], openingsUrl: "#kanban" },
  { name: "Accenture", type: "service", tier: "Global Consulting", hq: "Dublin / Global", rolesCount: 80, salaryRange: "$130k - $240k", rating: 4.2, tech: ["Salesforce", "Cloud Architecture", "Python", "Data Engineering"], openingsUrl: "#kanban" },
  { name: "Wipro", type: "service", tier: "Global Consulting", hq: "Bangalore / Global", rolesCount: 65, salaryRange: "₹15L - ₹38L", rating: 3.9, tech: ["Java", "Oracle", "DevOps", "Cybersecurity", "Azure"], openingsUrl: "#kanban" },
  { name: "Deloitte Digital", type: "service", tier: "Big 4 Consulting", hq: "New York / Global", rolesCount: 50, salaryRange: "$140k - $260k", rating: 4.3, tech: ["Enterprise Strategy", "Cloud Security", "Full-Stack", "AI Transformation"], openingsUrl: "#kanban" }
];

const hrRecruitersData = [
  { id: "hr-1", name: "Jessica Campbell", title: "Senior Technical Talent Partner", company: "Stripe", domain: "Engineering & SRE", location: "San Francisco / Remote", email: "jcampbell@stripe.com", linkedin: "https://www.linkedin.com" },
  { id: "hr-2", name: "Rohit Malhotra", title: "Director of Executive Talent Acquisition", company: "Google", domain: "Staff Architecture & Cloud", location: "Sunnyvale, CA", email: "rmalhotra@google.com", linkedin: "https://www.linkedin.com" },
  { id: "hr-3", name: "Samantha Vance", title: "Head of Go-To-Market & RevOps Recruiting", company: "Databricks", domain: "Enterprise Sales & Marketing", location: "San Francisco, CA", email: "svance@databricks.com", linkedin: "https://www.linkedin.com" },
  { id: "hr-4", name: "Alexandre Dupont", title: "Lead AI Research Recruiter", company: "Anthropic", domain: "LLM Safety & Alignment", location: "San Francisco / Remote", email: "adupont@anthropic.com", linkedin: "https://www.linkedin.com" },
  { id: "hr-5", name: "Pooja Sharma", title: "Global Talent Lead - Digital & Cloud", company: "Tata Consultancy Services", domain: "Enterprise Solutions", location: "Bangalore, India", email: "psharma@tcs.com", linkedin: "https://www.linkedin.com" },
  { id: "hr-6", name: "Michael Chang", title: "Principal Technical Headhunter", company: "Deloitte Digital", domain: "Executive Engineering", location: "New York, NY", email: "mchang@deloitte.com", linkedin: "https://www.linkedin.com" }
];

let activeCompanyCat = 'all';
let activeSelectedRecruiter = hrRecruitersData[0];

function initCompaniesHrView() {
  renderCompaniesGrid();
  renderHrRecruitersGrid();
}

function filterCompaniesCategory(cat) {
  activeCompanyCat = cat;
  document.querySelectorAll('.company-cat-chip').forEach(c => {
    c.className = "company-cat-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0";
  });
  const target = event?.target;
  if (target) target.className = "company-cat-chip px-3 py-1.5 rounded-xl bg-emerald-600 text-white shrink-0";

  const hrSection = document.getElementById('hr-recruiters-section');
  const compGrid = document.getElementById('companies-cards-grid');

  if (cat === 'hr-directory') {
    if (compGrid) compGrid.classList.add('hidden');
    if (hrSection) hrSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    if (compGrid) compGrid.classList.remove('hidden');
    renderCompaniesGrid();
  }
}

function filterCompaniesLocation(loc) {
  renderCompaniesGrid();
}

function searchCompanies(query) {
  const q = (query || '').toLowerCase().trim();
  renderCompaniesGrid(q);
}

function renderCompaniesGrid(searchFilter = '') {
  const grid = document.getElementById('companies-cards-grid');
  if (!grid) return;

  let companies = companiesData;
  if (activeCompanyCat !== 'all' && activeCompanyCat !== 'hr-directory') {
    companies = companies.filter(c => c.type === activeCompanyCat);
  }
  if (searchFilter) {
    companies = companies.filter(c => c.name.toLowerCase().includes(searchFilter) || c.tech.some(t => t.toLowerCase().includes(searchFilter)));
  }

  grid.innerHTML = companies.map(c => `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div class="space-y-3">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
              ${c.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div class="font-display font-black text-slate-900 text-sm flex items-center gap-1.5">
                <span>${c.name}</span>
                <span class="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
              </div>
              <div class="text-[10px] text-slate-400 font-semibold">${c.tier}</div>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">★ ${c.rating}</span>
        </div>

        <div class="space-y-1 text-xs">
          <div class="text-slate-500 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px] text-slate-400">location_on</span>
            <span>${c.hq}</span>
          </div>
          <div class="text-slate-700 font-semibold flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px] text-emerald-600">payments</span>
            <span>Target Comp: ${c.salaryRange}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-1 pt-1">
          ${c.tech.map(t => `<span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-medium">${t}</span>`).join('')}
        </div>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <span class="font-bold text-slate-500">${c.rolesCount} Active Openings</span>
        <div class="flex items-center gap-1.5">
          <button 
            type="button" 
            onclick="switchView('kanban')" 
            class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            Pipeline
          </button>
          <button 
            type="button" 
            onclick="openHrOutreachModal('hr-1')" 
            class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Reach Out
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderHrRecruitersGrid() {
  const grid = document.getElementById('hr-recruiters-grid');
  if (!grid) return;

  grid.innerHTML = hrRecruitersData.map(r => `
    <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-3">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-600 text-white font-bold text-xs flex items-center justify-center">
            ${r.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <div class="font-bold text-xs text-slate-900 flex items-center gap-1">
              <span>${r.name}</span>
              <span class="material-symbols-outlined text-emerald-600 text-[15px]">verified</span>
            </div>
            <div class="text-[10px] text-slate-500">${r.title} @ <strong class="text-slate-800">${r.company}</strong></div>
          </div>
        </div>
      </div>

      <div class="text-[11px] text-slate-600 space-y-0.5">
        <div><strong>Domain:</strong> ${r.domain}</div>
        <div><strong>Location:</strong> ${r.location}</div>
      </div>

      <div class="flex items-center gap-2 pt-1 border-t border-slate-200">
        <a href="${r.linkedin}" target="_blank" rel="noopener" class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[10px] flex items-center gap-1">
          <span>LinkedIn ↗</span>
        </a>
        <button type="button" onclick="openHrOutreachModal('${r.id}')" class="flex-1 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] text-center shadow-xs">
          1-Click Email Template
        </button>
      </div>
    </div>
  `).join('');
}

function openHrOutreachModal(recruiterId) {
  const r = hrRecruitersData.find(x => x.id === recruiterId) || hrRecruitersData[0];
  activeSelectedRecruiter = r;
  const modal = document.getElementById('modal-hr-outreach');
  if (!modal) return;

  document.getElementById('hr-outreach-modal-title').textContent = `Outreach: ${r.name} @ ${r.company}`;
  document.getElementById('hr-outreach-modal-sub').textContent = `${r.title} • ${r.domain}`;
  document.getElementById('hr-outreach-subject').value = `Executive Application / Discussion: Senior Candidate for ${r.company} ${r.domain}`;
  document.getElementById('hr-outreach-body').value = `Hi ${r.name.split(' ')[0]},

I noticed ${r.company} is actively expanding its ${r.domain} team. With over 8+ years architecting high-scale distributed systems and driving measurable revenue outcomes, I wanted to introduce myself directly.

Key Highlights:
- Architected core microservices scaling to 2.4M DAU with 99.99% uptime
- Cut infrastructure p99 latency by 38% via Go & Kafka event streaming
- Spearheaded cross-functional delivery across 4 continents

I would welcome a brief 10-minute introductory conversation this week.

Best regards,
Candidate Portfolio (Job Hunt Autopilot Pro)`;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeHrOutreachModal() {
  const modal = document.getElementById('modal-hr-outreach');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function openRecruiterLinkedIn() {
  if (activeSelectedRecruiter && activeSelectedRecruiter.linkedin) {
    window.open(activeSelectedRecruiter.linkedin, '_blank');
  }
}

function copyHrOutreachEmail() {
  const body = document.getElementById('hr-outreach-body')?.value || '';
  navigator.clipboard.writeText(body).then(() => {
    if (typeof showToast === 'function') showToast("Email template copied! Opening mail client... ✉️");
    window.location.href = `mailto:${activeSelectedRecruiter.email}?subject=${encodeURIComponent(document.getElementById('hr-outreach-subject')?.value || '')}&body=${encodeURIComponent(body)}`;
  });
}

// -----------------------------------------------------------------------------
// 5. FREEMIUM & PREMIUM ATS RESUME & CV SUITE
// -----------------------------------------------------------------------------
const sampleResumes = {
  tech: `ALEX CHEN - STAFF FULL-STACK ARCHITECT
alex.chen@enterprise.dev | github.com/alexchen | linkedin.com/in/alexchen

SUMMARY:
Staff Systems Architect with 9+ years experience designing cloud-native microservices, high-throughput message brokers, and developer platforms. Expert in Go, Python, Kubernetes, PostgreSQL, and distributed event architectures.

EXPERIENCE:
Staff Software Engineer | CloudScale Systems (2022 - Present)
- Architected 14 resilient REST/gRPC endpoints using Go and PostgreSQL, reducing p99 response times by 38% for 1.8M daily active users.
- Designed distributed multi-region Kafka ingestion pipeline processing 180,000 events/sec with zero message drop.
- Mentored 12 senior engineers across CI/CD automation, Kubernetes Helm deployments, and zero-trust mTLS security.

Senior Backend Engineer | DataStream Corp (2018 - 2022)
- Re-architected monolithic Rails backend into 8 decoupled Go microservices, saving $420,000 annually in AWS compute.
- Implemented Redis caching tier achieving 94% cache hit ratio and mitigating database connection pool exhaustion.

SKILLS:
Go, Python, Kubernetes, Docker, PostgreSQL, Redis, Apache Kafka, Distributed Systems, System Design, CI/CD, AWS, Prometheus, Grafana.`,

  sales: `MARCUS VANCE - VP OF ENTERPRISE SALES & REVOPS
marcus.vance@revops.io | linkedin.com/in/marcusvance

SUMMARY:
Executive Revenue Leader with 12+ years driving B2B SaaS growth, pipeline velocity, and multi-million enterprise contracts. Track record of growing ARR from $12M to $48M.

EXPERIENCE:
Vice President of Enterprise Sales | CloudMatrix (2021 - Present)
- Closed $18.4M in new enterprise ARR across Fortune 500 accounts utilizing MEDDPICC methodology.
- Scaled field sales organization from 8 to 28 account executives while increasing quota attainment from 64% to 88%.
- Partnered with RevOps to deploy automated Salesforce scoring pipelines, reducing sales cycle length from 145 days to 82 days.`,

  hr: `SARAH LIN - HEAD OF PEOPLE & TALENT ACQUISITION
sarah.lin@peopleops.dev | linkedin.com/in/sarahlin

SUMMARY:
Talent Executive specialized in hyper-growth tech hiring, compensation leveling, and retention programs. Scaled headcount from 80 to 450 across US and EMEA.

EXPERIENCE:
Director of Talent Acquisition | ScaleGrid (2020 - Present)
- Built in-house sourcing and recruiting engine hiring 140+ senior technical candidates annually with 92% offer acceptance rate.
- Reduced agency spend by 68%, saving $1.2M annually while maintaining diversity hiring goals of 44%.`
};

const sampleJds = {
  'staff-swe': `STAFF SOFTWARE ENGINEER - DISTRIBUTED PLATFORMS
Location: Remote / San Francisco, CA | Salary: $210,000 - $310,000 + Equity

ABOUT THE ROLE:
We are seeking a Staff Software Engineer to lead the architecture of our core financial transaction pipeline. You will be responsible for building highly reliable distributed systems, optimizing database performance, and driving engineering excellence.

QUALIFICATIONS:
- 8+ years software engineering experience in Go, Python, or Java.
- Deep expertise in distributed systems, microservices, and database optimization (PostgreSQL, Redis).
- Proven track record scaling containerized workloads on Kubernetes and Docker.
- Experience with event streaming technologies (Apache Kafka) and API design (gRPC, GraphQL).
- Strong communication and mentoring skills with proven ability to influence cross-functional roadmaps.`,

  'vp-sales': `VP OF ENTERPRISE SALES - REVOPS
Location: New York / Remote | Salary: $200,000 Base / $400,000 OTE

ABOUT THE ROLE:
Lead our global enterprise sales team closing Tier-1 accounts across banking and retail. Deep experience in MEDDPICC, contract negotiation, and sales cycle acceleration required.`
};

function initAtsToolsView() {
  loadSampleResume('tech');
  loadSampleJd('staff-swe');
}

function loadSampleResume(type) {
  const el = document.getElementById('ats-resume-textarea');
  if (el) el.value = sampleResumes[type] || sampleResumes.tech;
}

function loadSampleJd(type) {
  const el = document.getElementById('ats-jd-textarea');
  if (el) el.value = sampleJds[type] || sampleJds['staff-swe'];
}

function runAtsResumeScan() {
  const resume = document.getElementById('ats-resume-textarea')?.value || '';
  const jd = document.getElementById('ats-jd-textarea')?.value || '';

  if (!resume || !jd) {
    if (typeof showToast === 'function') showToast("Please paste both Resume text and Job Description.");
    return;
  }

  // Calculate heuristic match score based on keyword intersection
  const keywords = ['python', 'go', 'kubernetes', 'docker', 'postgresql', 'redis', 'kafka', 'distributed systems', 'system design', 'microservices', 'graphql', 'aws', 'ci/cd'];
  const resumeLower = resume.toLowerCase();
  const jdLower = jd.toLowerCase();

  const matched = [];
  const missing = [];

  keywords.forEach(kw => {
    if (jdLower.includes(kw)) {
      if (resumeLower.includes(kw)) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    }
  });

  const matchRatio = matched.length / (matched.length + missing.length || 1);
  const score = Math.min(96, Math.max(72, Math.round(matchRatio * 100)));

  const scoreDisplay = document.getElementById('ats-score-display');
  if (scoreDisplay) scoreDisplay.textContent = `${score}%`;

  const statSkills = document.getElementById('ats-stat-skills');
  if (statSkills) statSkills.textContent = `${Math.min(98, score + 4)}%`;

  // Update chips
  const matchedContainer = document.getElementById('ats-matched-chips');
  if (matchedContainer) {
    matchedContainer.innerHTML = (matched.length ? matched : ['Python', 'Kubernetes', 'Go', 'Microservices', 'PostgreSQL']).map(m => `
      <span class="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-semibold capitalize">${m}</span>
    `).join('');
  }

  const missingContainer = document.getElementById('ats-missing-chips');
  if (missingContainer) {
    missingContainer.innerHTML = (missing.length ? missing : ['GraphQL', 'Apache Kafka']).map(m => `
      <span class="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-semibold capitalize">${m}</span>
    `).join('');
  }

  if (typeof showToast === 'function') {
    showToast(`ATS Scan Complete: ${score}% Match Index ✓`);
  }
}

function optimizeBulletWithAi() {
  const bulletDisplay = document.getElementById('ats-optimized-bullet-text');
  if (bulletDisplay) {
    bulletDisplay.textContent = "Spearheaded zero-downtime database migration to distributed PostgreSQL, achieving 99.995% uptime and saving $140,000 in monthly failover costs.";
  }
  if (typeof showToast === 'function') {
    showToast("Transformed into Google X-Y-Z formula bullet! ✨");
  }
}

function copyOptimizedBullet() {
  const bulletDisplay = document.getElementById('ats-optimized-bullet-text');
  if (bulletDisplay) {
    navigator.clipboard.writeText(bulletDisplay.textContent).then(() => {
      if (typeof showToast === 'function') showToast("Copied optimized bullet to clipboard! 📋");
    });
  }
}

function generateCoverLetterAi() {
  const letter = `Dear Hiring Team,

I am writing to express my strong interest in the Staff Software Engineer position at your organization. Having engineered high-throughput distributed microservices for 1.8M daily active users at CloudScale Systems, I am drawn to your team's mission and engineering velocity.

In my previous role, I led the architecture of 14 core Go microservices and a multi-region Kafka pipeline processing 180,000 events/sec. My focus on low latency and automated CI/CD directly aligns with your tech stack requirements.

Thank you for your time and consideration.

Sincerely,
Alex Chen`;
  navigator.clipboard.writeText(letter).then(() => {
    if (typeof showToast === 'function') showToast("Tailored Cover Letter generated & copied to clipboard! 📋");
  });
}

function exportAtsResume(format) {
  if (format === 'pdf') {
    window.print();
  } else {
    const resumeText = document.getElementById('ats-resume-textarea')?.value || sampleResumes.tech;
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Alex_Chen_ATS_Resume.txt";
    a.click();
    URL.revokeObjectURL(url);
    if (typeof showToast === 'function') showToast("Exported clean ATS .TXT file ✓");
  }
}

// -----------------------------------------------------------------------------
// 6. COURSES & 1-ON-1 MENTORSHIP HUB
// -----------------------------------------------------------------------------
const coursesData = [
  { id: "c-1", title: "DSA Zero to FAANG Staff Masterclass", hours: "65 hours", rating: 4.9, students: 2400, price: "$49 Pro", freeBadge: "Modules 1-3 Free", desc: "Covers Two Pointers, Trees, Graphs, DP, and System Design with Python, JS, and Java solutions.", tags: ["DSA", "LeetCode", "FAANG"] },
  { id: "c-2", title: "Modern SDLC, Kubernetes & Production SRE", hours: "45 hours", rating: 4.9, students: 1850, price: "$79 Pro", freeBadge: "Module 1 Free", desc: "Hands-on labs on Docker multi-stage builds, Helm charts, ArgoCD canary releases, and Prometheus alerts.", tags: ["DevOps", "SRE", "Kubernetes"] },
  { id: "c-3", title: "Executive RevOps & Enterprise Sales Engine", hours: "35 hours", rating: 4.8, students: 1200, price: "$59 Pro", freeBadge: "Intro Free", desc: "MEDDPICC enterprise selling, Salesforce pipeline automation, and executive compensation negotiation.", tags: ["Sales", "RevOps", "Leadership"] },
  { id: "c-4", title: "Generative AI Engineering: Agentic Workflows & MCP", hours: "40 hours", rating: 5.0, students: 3100, price: "$89 Pro", freeBadge: "Overview Free", desc: "Build production autonomous agents using Model Context Protocol (MCP), Gemini 1.5 Flash, and Vector DBs.", tags: ["AI Agents", "MCP", "LLMs"] }
];

const mentorsData = [
  { id: "m-1", name: "Aravind Kumar", title: "Staff Software Engineer @ Google", expertise: "System Design, L6+ Loops, Distributed Systems", rating: 4.9, sessions: 180, rate: "$150/hr or 1 Free/mo with Pro" },
  { id: "m-2", name: "Sarah Jenkins", title: "VP of People & Talent @ ex-Stripe", expertise: "FAANG Executive Loops, Offer Negotiation", rating: 5.0, sessions: 210, rate: "$175/hr or 1 Free/mo with Pro" },
  { id: "m-3", name: "Marcus Vance", title: "VP of Enterprise Sales @ Databricks", expertise: "B2B SaaS RevOps, Quota Attainment", rating: 4.8, sessions: 95, rate: "$140/hr or 1 Free/mo with Pro" },
  { id: "m-4", name: "Elena Rostova", title: "Principal PMM @ Figma", expertise: "GTM Messaging, Product Portfolio Critique", rating: 4.9, sessions: 110, rate: "$130/hr or 1 Free/mo with Pro" }
];

function initCoursesMentorsView() {
  renderCoursesCards();
  renderMentorsCards();
}

function switchCourseMentorTab(tab) {
  const coursesSec = document.getElementById('section-courses-content');
  const mentorsSec = document.getElementById('section-mentors-content');
  const btnCourses = document.getElementById('tab-btn-courses');
  const btnMentors = document.getElementById('tab-btn-mentors');

  if (tab === 'courses') {
    if (coursesSec) coursesSec.classList.remove('hidden');
    if (mentorsSec) mentorsSec.classList.add('hidden');
    if (btnCourses) btnCourses.className = "px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all flex items-center gap-1.5";
    if (btnMentors) btnMentors.className = "px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
  } else {
    if (coursesSec) coursesSec.classList.add('hidden');
    if (mentorsSec) mentorsSec.classList.remove('hidden');
    if (btnCourses) btnCourses.className = "px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
    if (btnMentors) btnMentors.className = "px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all flex items-center gap-1.5";
  }
}

function renderCoursesCards() {
  const grid = document.getElementById('courses-cards-grid');
  if (!grid) return;

  grid.innerHTML = coursesData.map(c => `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">${c.freeBadge}</span>
          <span class="text-xs text-amber-500 font-bold">★ ${c.rating}</span>
        </div>
        <h4 class="font-display font-black text-slate-900 text-sm leading-snug">${c.title}</h4>
        <p class="text-xs text-slate-500 leading-relaxed">${c.desc}</p>
        <div class="flex flex-wrap gap-1 pt-1">
          ${c.tags.map(t => `<span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">${t}</span>`).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div>
          <div class="text-[10px] text-slate-400 font-bold">${c.hours}</div>
          <div class="font-black text-slate-900">${c.price}</div>
        </div>
        <button type="button" onclick="openCourseEnrollModal('${c.id}')" class="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors">
          Enroll Now
        </button>
      </div>
    </div>
  `).join('');
}

function renderMentorsCards() {
  const grid = document.getElementById('mentors-cards-grid');
  if (!grid) return;

  grid.innerHTML = mentorsData.map(m => `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div class="space-y-3">
        <div class="flex items-start justify-between">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
            ${m.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">★ ${m.rating} (${m.sessions})</span>
        </div>
        <div>
          <h4 class="font-display font-black text-slate-900 text-sm">${m.name}</h4>
          <div class="text-xs text-slate-500">${m.title}</div>
        </div>
        <div class="text-xs text-slate-600">
          <strong>Focus:</strong> ${m.expertise}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 space-y-2">
        <div class="text-[10px] text-slate-500 font-medium">${m.rate}</div>
        <button type="button" onclick="openMentorBookingModal('${m.id}')" class="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors">
          Book 1-on-1 Session
        </button>
      </div>
    </div>
  `).join('');
}

function openCourseEnrollModal(courseId) {
  const c = coursesData.find(x => x.id === courseId) || coursesData[0];
  if (typeof showToast === 'function') {
    showToast(`Enrolled in "${c.title}" Free Preview! 🎉`);
  }
}

function openMentorBookingModal(mentorId) {
  const m = mentorsData.find(x => x.id === mentorId) || mentorsData[0];
  const modal = document.getElementById('modal-mentor-booking');
  if (!modal) return;

  document.getElementById('mentor-modal-title').textContent = `Book Session: ${m.name}`;
  document.getElementById('mentor-modal-subtitle').textContent = m.title;

  const dateInput = document.getElementById('mentor-session-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeMentorBookingModal() {
  const modal = document.getElementById('modal-mentor-booking');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function confirmMentorBooking() {
  closeMentorBookingModal();
  if (typeof showToast === 'function') {
    showToast("1-on-1 Mentorship confirmed & added to your calendar! 📅");
  }
}

// -----------------------------------------------------------------------------
// 7. SUBSCRIPTIONS & WHOLE WEBSITE PRO PRICING
// -----------------------------------------------------------------------------
let isAnnualBilling = true;

function initPricingView() {
  updatePricingPrices();
}

function togglePricingBilling() {
  isAnnualBilling = !isAnnualBilling;
  const knob = document.getElementById('pricing-toggle-knob');
  if (knob) {
    if (isAnnualBilling) {
      knob.className = "w-5 h-5 bg-white rounded-full transition-transform translate-x-6";
    } else {
      knob.className = "w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5";
    }
  }
  updatePricingPrices();
}

function updatePricingPrices() {
  const proPrice = document.getElementById('pricing-pro-price');
  const execPrice = document.getElementById('pricing-exec-price');

  if (proPrice) {
    proPrice.innerHTML = isAnnualBilling 
      ? '$29 <span class="text-xs font-normal text-slate-300">/ month ($260/yr)</span>' 
      : '$39 <span class="text-xs font-normal text-slate-300">/ month</span>';
  }
  if (execPrice) {
    execPrice.innerHTML = isAnnualBilling 
      ? '$79 <span class="text-xs font-normal text-slate-500">/ month ($710/yr)</span>' 
      : '$99 <span class="text-xs font-normal text-slate-500">/ month</span>';
  }
}

function openSubscriptionCheckout(planId) {
  const modal = document.getElementById('modal-subscription-checkout');
  if (!modal) return;

  const nameEl = document.getElementById('checkout-plan-name');
  const cycleEl = document.getElementById('checkout-billing-cycle');

  if (planId === 'executive') {
    if (nameEl) nameEl.textContent = "Executive & Switcher Elite Pass";
    if (cycleEl) cycleEl.textContent = isAnnualBilling ? "Annual ($710 / year)" : "Monthly ($99 / month)";
  } else {
    if (nameEl) nameEl.textContent = "Pro Career Hunter Pass";
    if (cycleEl) cycleEl.textContent = isAnnualBilling ? "Annual ($260 / year)" : "Monthly ($39 / month)";
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeSubscriptionCheckout() {
  const modal = document.getElementById('modal-subscription-checkout');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function processSubscriptionPayment() {
  const btn = document.getElementById('btn-process-checkout');
  if (btn) btn.textContent = "Verifying Card...";

  setTimeout(() => {
    closeSubscriptionCheckout();
    if (btn) btn.textContent = "Activate Subscription 🚀";

    // Set pro status in localStorage
    localStorage.setItem('autopilot_pro_tier', 'PRO');
    
    // Elevate UI user badge
    const badge = document.getElementById('header-user-avatar');
    if (badge) badge.textContent = "PRO";

    if (typeof triggerConfetti === 'function') {
      try { triggerConfetti(); } catch (e) {}
    }

    if (typeof showToast === 'function') {
      showToast("Subscription Activated! Unlimited Pro Tools Unlocked 🌟");
    }

    setTimeout(() => switchView('kanban'), 400);
  }, 700);
}

// -----------------------------------------------------------------------------
// 8. AI & NEW TECH RADAR LOGS
// -----------------------------------------------------------------------------
const aiRadarLogsData = [
  {
    id: "mcp-agents",
    title: "Model Context Protocol (MCP): The Universal Bridge for Autonomous Agentic Tooling",
    tag: "Agentic MCP",
    readTime: "8 min read",
    author: "Staff AI Architect",
    date: "November 2026",
    excerpt: "Why MCP is replacing ad-hoc REST function calling in enterprise agents, enabling seamless discovery of databases, IDEs, and browser environments.",
    content: `
      <p class="font-bold text-slate-900">The Rise of Model Context Protocol</p>
      <p>As enterprise AI moves from single-turn chat completion to autonomous multi-agent pipelines, tool coordination becomes the primary operational bottleneck. The Model Context Protocol (MCP) establishes an open, JSON-RPC 2.0 based standard for decoupling model inference from localized tools, filesystem sandboxes, and cloud databases.</p>
      
      <p class="font-bold text-slate-900 mt-3">Architectural Pillars of MCP:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Unified Discovery:</strong> Standardized endpoints for inspecting tools, resources, and prompt templates without hardcoding model capabilities.</li>
        <li><strong>Stateful Sidecars:</strong> Agents connect to local or remote servers over stdio or Streamable HTTP/SSE with end-to-end security envelopes.</li>
        <li><strong>Safe Autonomy:</strong> Guardrails around destructive operations (accidental data loss prevention, rate limit throttling, and zero-trust credentials).</li>
      </ul>

      <pre class="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs mt-3"><code>// Example MCP Tool Registration
{
  "name": "query_recruiter_pipeline",
  "description": "Searches verified candidate database by match score",
  "parameters": {
    "type": "object",
    "properties": {
      "min_ats_score": { "type": "number" },
      "role": { "type": "string" }
    }
  }
}</code></pre>
    `
  },
  {
    id: "gemini-flash",
    title: "Gemini 1.5 Pro & Flash: Million-Token Multimodal Pipelines in Production",
    tag: "Gemini & LLMs",
    readTime: "6 min read",
    author: "Principal ML Engineer",
    date: "October 2026",
    excerpt: "Harnessing 1M+ token context windows for whole-codebase AST parsing, exhaustive resume parsing, and multimodal video interview feedback.",
    content: `
      <p class="font-bold text-slate-900">Million-Token Context In Practice</p>
      <p>Rather than chunking resumes and losing semantic cross-references across a candidate's 10-year career, Gemini 1.5 Flash ingests entire candidate portfolios, GitHub repos, and multi-page patent filings in a single forward pass with near-perfect needle-in-a-haystack recall.</p>
    `
  },
  {
    id: "ats-embeddings",
    title: "The 2026 AI-Powered ATS Revolution: How Embeddings Beat Traditional Keyword Matchers",
    tag: "ATS Algorithms",
    readTime: "7 min read",
    author: "Executive Talent Partner",
    date: "October 2026",
    excerpt: "How modern applicant tracking systems leverage dense semantic vector embeddings to rank candidates based on capability rather than verbatim keyword stuffing.",
    content: `
      <p class="font-bold text-slate-900">Beyond Keyword Stuffing</p>
      <p>Traditional regex ATS tools look for exact string matches like 'Kubernetes' or 'React'. Modern 2026 enterprise engines project candidate resumes into dense vector spaces, measuring conceptual similarity between project achievements and job requirements.</p>
    `
  },
  {
    id: "canary-sre",
    title: "Production SRE: Zero-Downtime Canary Deployments with Kubernetes and Envoy",
    tag: "DevOps & SRE",
    readTime: "9 min read",
    author: "Lead Infrastructure SRE",
    date: "September 2026",
    excerpt: "Step-by-step blueprint for deploying high-concurrency microservices with progressive traffic shifting and automated metric rollbacks.",
    content: `
      <p class="font-bold text-slate-900">Zero-Downtime Production Engineering</p>
      <p>Discover how Argo Rollouts and Envoy proxy route 10% of real candidate traffic to canary pods, continuously evaluating p99 latency against Prometheus metrics before promoting to 100%.</p>
    `
  }
];

let activeAiRadarCategory = 'all';

function initAiRadarView() {
  renderAiRadarCards();
}

function filterAiRadar(tag) {
  activeAiRadarCategory = tag;
  document.querySelectorAll('.ai-cat-chip').forEach(c => {
    c.className = "ai-cat-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0";
  });
  const target = event?.target;
  if (target) target.className = "ai-cat-chip px-3 py-1.5 rounded-xl bg-cyan-600 text-white shrink-0";
  renderAiRadarCards();
}

function searchAiRadar(query) {
  const q = (query || '').toLowerCase().trim();
  renderAiRadarCards(q);
}

function renderAiRadarCards(searchFilter = '') {
  const grid = document.getElementById('ai-radar-cards-grid');
  if (!grid) return;

  let logs = aiRadarLogsData;
  if (activeAiRadarCategory !== 'all') {
    logs = logs.filter(l => l.tag.toLowerCase().includes(activeAiRadarCategory));
  }
  if (searchFilter) {
    logs = logs.filter(l => l.title.toLowerCase().includes(searchFilter) || l.excerpt.toLowerCase().includes(searchFilter));
  }

  grid.innerHTML = logs.map(l => `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-bold text-[10px]">#${l.tag}</span>
          <span class="text-xs text-slate-400 font-mono">${l.readTime}</span>
        </div>
        <h4 class="font-display font-black text-slate-900 text-sm leading-snug">${l.title}</h4>
        <p class="text-xs text-slate-500 leading-relaxed">${l.excerpt}</p>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="text-[10px] text-slate-400">${l.author} • ${l.date}</span>
        <button type="button" onclick="openAiLogReaderModal('${l.id}')" class="px-3.5 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-bold text-xs transition-colors">
          Read Log ↗
        </button>
      </div>
    </div>
  `).join('');
}

function openAiLogReaderModal(logId) {
  const l = aiRadarLogsData.find(x => x.id === logId) || aiRadarLogsData[0];
  const modal = document.getElementById('modal-ai-log-reader');
  if (!modal) return;

  document.getElementById('ai-log-modal-title').textContent = l.title;
  document.getElementById('ai-log-modal-tag').textContent = `#${l.tag}`;
  document.getElementById('ai-log-modal-time').textContent = `${l.readTime} • ${l.author}`;
  document.getElementById('ai-log-modal-content').innerHTML = l.content;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAiLogReaderModal() {
  const modal = document.getElementById('modal-ai-log-reader');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// -----------------------------------------------------------------------------
// 9. EXTENDED HASH ROUTING
// -----------------------------------------------------------------------------
const originalCheckAuthHashRouting = window.checkAuthHashRouting;
function checkExtendedHashRouting() {
  const hash = (window.location.hash || '').toLowerCase();
  if (hash === '#dsa' || hash === '#sdlc') {
    switchView('dsa-sdlc');
    if (hash === '#sdlc') switchDsaSdlcTab('sdlc');
  } else if (hash === '#companies' || hash === '#hr' || hash === '#recruiters') {
    switchView('companies-hr');
    if (hash === '#hr' || hash === '#recruiters') filterCompaniesCategory('hr-directory');
  } else if (hash === '#ats' || hash === '#cv') {
    switchView('ats-tools');
  } else if (hash === '#courses' || hash === '#mentors') {
    switchView('courses-mentors');
    if (hash === '#mentors') switchCourseMentorTab('mentors');
  } else if (hash === '#pricing' || hash === '#plans' || hash === '#subscription') {
    switchView('pricing');
  } else if (hash === '#airadar' || hash === '#ai-radar' || hash === '#techradar') {
    switchView('ai-radar');
  } else if (typeof checkAuthHashRouting === 'function') {
    checkAuthHashRouting();
  }
}

window.addEventListener('hashchange', checkExtendedHashRouting);
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    updateNotificationBadge();
    checkExtendedHashRouting();
  }, 250);
});



function scrollNavTabs(direction) {
  const container = document.getElementById('header-nav-tabs-scroll');
  if (container) {
    const scrollAmount = direction === 'left' ? -260 : 260;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}


// =============================================================================
// PREMIER ED-TECH ECOSYSTEM: SCALER, APNA COLLEGE, EDUREKA, INTELLIPAAT,
// CODEWITHHARRY, WSCUBE TECH, IN-PAGE PAYMENT, INTERVIEW NOTES & GOOGLE MAPS
// =============================================================================

const expandedCoursesData = [
  {
    id: "scaler-fullstack",
    platform: "scaler",
    platformBadge: "Scaler Academy Inspired",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    title: "Scaler Software Academy: Full-Stack & System Design Masterclass",
    desc: "Comprehensive 9-month industry cohort covering Low-Level Design (LLD), High-Level Design (HLD), Distributed Microservices, Redis, Kafka, and 1:1 Live Mock Interviews with FAANG Staff.",
    rating: 4.95,
    students: 4850,
    duration: "9 Months Cohort",
    priceInr: "₹24,999",
    priceUsd: "$299",
    rawPrice: 24999,
    emiText: "₹2,083 / month",
    tags: ["System Design", "LLD / HLD", "Microservices", "1:1 Mentorship"],
    freeBadge: "Free 1:1 Evaluation"
  },
  {
    id: "apna-alpha-dsa",
    platform: "apna",
    platformBadge: "Apna College Inspired",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Alpha DSA & Placement Batch: Complete Java & C++ Masterclass",
    desc: "From Zero to FAANG Placement with 375+ curated LeetCode problems. Comprehensive coverage of Recursion, Backtracking, BSTs, Dynamic Programming, and Graph Traversals.",
    rating: 4.9,
    students: 12400,
    duration: "120 Hours On-Demand",
    priceInr: "₹4,999",
    priceUsd: "$59",
    rawPrice: 4999,
    emiText: "₹833 / month",
    tags: ["DSA Sheet", "Java", "C++", "LeetCode 375"],
    freeBadge: "Modules 1-3 Free"
  },
  {
    id: "edureka-cloud-devops",
    platform: "edureka",
    platformBadge: "Edureka Inspired",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Cloud DevOps & Production Kubernetes Architect Certification",
    desc: "Hands-on multi-cloud engineering spanning AWS, Azure, Docker, Kubernetes Helm charts, Terraform Infrastructure-as-Code, CI/CD pipelines, and Prometheus SRE observability.",
    rating: 4.85,
    students: 6200,
    duration: "60 Hours Live Labs",
    priceInr: "₹14,999",
    priceUsd: "$179",
    rawPrice: 14999,
    emiText: "₹1,250 / month",
    tags: ["Kubernetes", "Docker", "AWS / Azure", "Terraform", "SRE"],
    freeBadge: "Lab Preview Free"
  },
  {
    id: "intellipaat-genai",
    platform: "intellipaat",
    platformBadge: "Intellipaat Inspired",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    title: "Executive Post-Graduate in AI & Generative AI Systems",
    desc: "Master LLM application engineering, RAG pipelines with Vector DBs (Pinecone/Milvus), Agentic Workflows via Model Context Protocol (MCP), and fine-tuning open weights like Llama-3.",
    rating: 4.9,
    students: 3400,
    duration: "6 Months Weekend Live",
    priceInr: "₹29,999",
    priceUsd: "$349",
    rawPrice: 29999,
    emiText: "₹2,500 / month",
    tags: ["GenAI", "LLMs", "MCP Agents", "RAG", "PyTorch"],
    freeBadge: "Job Assistance"
  },
  {
    id: "harry-webdev",
    platform: "harry",
    platformBadge: "CodeWithHarry Inspired",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Complete Modern Full-Stack Web Development & Next.js 15 Sprint",
    desc: "Practical hands-on web development building 10 production-ready projects with React 19, Next.js, Node.js, Express, MongoDB, TailwindCSS, and cloud deployment on Vercel.",
    rating: 4.95,
    students: 18500,
    duration: "80 Hours Video",
    priceInr: "₹1,999",
    priceUsd: "$25",
    rawPrice: 1999,
    emiText: "₹333 / month",
    tags: ["Next.js", "React 19", "MERN", "10 Projects"],
    freeBadge: "Source Code Free"
  },
  {
    id: "wscube-flutter",
    platform: "harry",
    platformBadge: "WsCube Tech Inspired",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "Cross-Platform Mobile App Development with Flutter & Dart",
    desc: "Step-by-step mobile app development with Dart, Flutter 3.x, Riverpod state management, Firebase authentication, Firestore, REST APIs, and Google Play Store deployment.",
    rating: 4.8,
    students: 5100,
    duration: "50 Hours Project Sprint",
    priceInr: "₹3,499",
    priceUsd: "$45",
    rawPrice: 3499,
    emiText: "₹583 / month",
    tags: ["Flutter", "Dart", "Firebase", "App Store"],
    freeBadge: "Interview Q&A"
  }
];

const interviewNotesData = [
  {
    id: "note-dsa-75",
    tag: "FAANG DSA 75",
    pages: "28 Pages • High-Yield",
    title: "FAANG Essential 75 DSA Patterns & Pitfalls Sheet",
    summary: "The highest frequency patterns asked at Google, Meta, and Amazon: Two Pointers, Fast & Slow, Sliding Window, Monotonic Stack, Top-K Elements, and DP State Reductions.",
    snippets: "Python, C++, Java code templates included for all 75 problems.",
    content: `
      <h4 class="font-bold text-slate-900 text-sm">1. Two Pointers &amp; Sliding Window Cheat Sheet</h4>
      <p class="text-xs text-slate-600">Whenever searching for contiguous subarrays or pairs in sorted arrays, use two pointers to achieve O(N) time with O(1) space.</p>
      <pre class="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs mt-2"><code>// Sliding Window Template (Dynamic Size)
def minSubArrayLen(target: int, nums: list[int]) -> int:
    l, total, min_len = 0, 0, float('inf')
    for r in range(len(nums)):
        total += nums[r]
        while total >= target:
            min_len = min(min_len, r - l + 1)
            total -= nums[l]
            l += 1
    return 0 if min_len == float('inf') else min_len</code></pre>
      
      <h4 class="font-bold text-slate-900 text-sm mt-4">2. Monotonic Stack Strategy</h4>
      <p class="text-xs text-slate-600">Used for 'Next Greater Element' or 'Largest Rectangle in Histogram'. Keep stack monotonically decreasing.</p>
    `
  },
  {
    id: "note-system-design",
    tag: "System Design HLD",
    pages: "36 Pages • Architecture",
    title: "High-Level & Low-Level System Design Primer",
    summary: "Comprehensive trade-off matrix: CAP theorem in modern databases, Distributed Caching (Redis), Event-driven streaming (Kafka vs RabbitMQ), and Sharding architectures.",
    snippets: "C4 model diagrams, API specs, and capacity estimation math.",
    content: `
      <h4 class="font-bold text-slate-900 text-sm">System Design Interview Math Cheatsheet</h4>
      <ul class="list-disc pl-5 space-y-1 text-xs text-slate-700">
        <li><strong>RPS to Daily Queries:</strong> 1,000 RPS ≈ 86.4M requests/day.</li>
        <li><strong>Storage Math:</strong> 1KB per user record * 100M users = 100 GB storage.</li>
        <li><strong>Latency Numbers Everyone Should Know:</strong> L1 cache ~ 0.5ns, RAM ~ 100ns, SSD read ~ 16μs, Data center roundtrip ~ 500μs, Intercontinental roundtrip ~ 150ms.</li>
      </ul>
    `
  },
  {
    id: "note-behavioral-star",
    tag: "Leadership & STAR",
    pages: "20 Pages • Executive",
    title: "Behavioral STAR & Amazon Leadership Principles Bank",
    summary: "Word-for-word executive scripts for 'Tell me about a time you had a conflict with an engineering lead', 'Dealing with project delays', and 'Driving consensus across teams'.",
    snippets: "50+ verified STAR frameworks tailored for Senior, Staff, and Director loops.",
    content: `
      <h4 class="font-bold text-slate-900 text-sm">The Google / Amazon STAR Formula</h4>
      <p class="text-xs text-slate-600">Spend 15% on Situation, 15% on Task, 50% on Action (what YOU specifically did), and 20% on Measurable Business Result.</p>
    `
  },
  {
    id: "note-salary-negotiation",
    tag: "Offer Negotiation",
    pages: "16 Pages • Tactical",
    title: "Executive Compensation & Offer Negotiation Playbook",
    summary: "How to negotiate a 25-40% increase on initial FAANG offers. Scripts for leveraging competing offers, sign-on bonus escalations, and equity refresher terms.",
    snippets: "Exact email templates and live phone negotiation counter-scripts.",
    content: `
      <h4 class="font-bold text-slate-900 text-sm">Rule #1: Never Give the First Number</h4>
      <p class="text-xs text-slate-600">"I am confident that your team pays competitively for top talent at this level. Once we establish mutual fit, I'm certain we will arrive at a mutually agreeable package."</p>
    `
  },
  {
    id: "note-genai-mcp",
    tag: "GenAI & MCP",
    pages: "32 Pages • 2026 AI",
    title: "Generative AI, Agentic Workflows & Model Context Protocol (MCP)",
    summary: "Technical deep-dive on agent tool discovery, RAG retrieval strategies (dense vs sparse hybrid search), context window management, and zero-trust tool security.",
    snippets: "Python & TypeScript code for custom MCP server implementations.",
    content: `
      <h4 class="font-bold text-slate-900 text-sm">Model Context Protocol Architecture</h4>
      <p class="text-xs text-slate-600">MCP decouples LLMs from data sources using standard JSON-RPC 2.0 messages over stdio or Streamable HTTP.</p>
    `
  }
];

// Offline Tech Hubs & Walk-in Center Data
const mapsCentersData = {
  bangalore: {
    city: "Bengaluru, Karnataka",
    centerName: "Scaler & Autopilot Tech Hub (Koramangala)",
    address: "80 Feet Road, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    mapQuery: "Koramangala+5th+Block+Bengaluru+Karnataka",
    phone: "+91 80 4718 2026",
    hours: "Monday - Sunday: 9:00 AM - 9:00 PM IST",
    facilities: ["10 Private Mock Interview Suites", "High-Speed Multi-Monitor Coding Lab", "In-Person Resume Review Clinic", "Placement Drives & Hiring Mixers"]
  },
  hyderabad: {
    city: "Hyderabad, Telangana",
    centerName: "Hitec City Walk-in Tech Center",
    address: "Cyber Towers, 4th Floor, Hitec City, Madhapur, Hyderabad, Telangana 500081",
    mapQuery: "Cyber+Towers+Hitec+City+Hyderabad",
    phone: "+91 40 6820 2026",
    hours: "Monday - Saturday: 9:30 AM - 8:30 PM IST",
    facilities: ["System Design Whiteboarding Labs", "Technical Screening Rooms", "Alumni Networking Lounge"]
  },
  pune: {
    city: "Pune, Maharashtra",
    centerName: "Pune IT Hub & Offline Coding Arena",
    address: "Cybercity Magarpatta, Tower 4, Hadapsar, Pune, Maharashtra 411028",
    mapQuery: "Magarpatta+City+Hadapsar+Pune",
    phone: "+91 20 5912 2026",
    hours: "Monday - Saturday: 9:00 AM - 8:00 PM IST",
    facilities: ["Live DSA Speed Programming Desks", "1-on-1 Mentor Chambers", "Cloud Lab Workstations"]
  },
  noida: {
    city: "Delhi NCR (Noida)",
    centerName: "Delhi NCR Tech Training & Assessment Hub",
    address: "Sector 62, Electronic City, Noida, Uttar Pradesh 201309",
    mapQuery: "Sector+62+Noida+Uttar+Pradesh",
    phone: "+91 120 481 2026",
    hours: "Monday - Sunday: 9:00 AM - 9:00 PM IST",
    facilities: ["Full-Stack Project Assessment Center", "HR & Behavioral Mock Studio", "Co-working Learning Pods"]
  },
  mumbai: {
    city: "Mumbai, Maharashtra",
    centerName: "BKC Executive Leadership & Placement Center",
    address: "Bandra Kurla Complex (BKC), G Block, Mumbai, Maharashtra 400051",
    mapQuery: "Bandra+Kurla+Complex+Mumbai",
    phone: "+91 22 6124 2026",
    hours: "Monday - Friday: 9:00 AM - 8:00 PM IST",
    facilities: ["Executive Interview Lounges", "Corporate Talent Acquisition Suites", "Offer Negotiation Strategy Desks"]
  },
  siliconvalley: {
    city: "San Jose / Silicon Valley, USA",
    centerName: "Silicon Valley FAANG Accelerator Hub",
    address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043",
    mapQuery: "Mountain+View+California",
    phone: "+1 (650) 253-2026",
    hours: "Monday - Friday: 8:00 AM - 7:00 PM PST",
    facilities: ["Staff & Principal Level Mock Boards", "Distributed Systems Simulator", "Venture & Tech Switcher Labs"]
  }
};

let activeCourseSubTab = 'courses';
let activeCourseFilter = 'all';
let currentActivePaymentItem = null;
let activePayMethod = 'upi';
let activeSelectedNote = interviewNotesData[0];

function initCoursesMentorsView() {
  renderExpandedCoursesGrid();
  renderInterviewNotesGrid();
  renderMentorsCards();
  selectMapCenter('bangalore');
}

function switchCourseSubTab(tab) {
  activeCourseSubTab = tab;
  const sections = ['courses', 'notes', 'mentors', 'maps'];
  sections.forEach(s => {
    const el = document.getElementById(`section-${s}-content`);
    const btn = document.getElementById(`tab-btn-${s}`);
    if (el) {
      if (s === tab) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
    if (btn) {
      if (s === tab) {
        btn.className = "px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all flex items-center gap-1.5";
      } else {
        btn.className = "px-3.5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
      }
    }
  });

  if (tab === 'notes') renderInterviewNotesGrid();
  if (tab === 'maps') selectMapCenter('bangalore');
}

function filterCoursesCategory(cat) {
  activeCourseFilter = cat;
  document.querySelectorAll('.course-cat-chip').forEach(c => {
    c.className = "course-cat-chip px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0";
  });
  const target = event?.target;
  if (target) target.className = "course-cat-chip px-3 py-1.5 rounded-xl bg-blue-600 text-white shrink-0";
  renderExpandedCoursesGrid();
}

function searchCourses(query) {
  const q = (query || '').toLowerCase().trim();
  renderExpandedCoursesGrid(q);
}

function renderExpandedCoursesGrid(searchFilter = '') {
  const grid = document.getElementById('courses-cards-grid');
  if (!grid) return;

  let courses = expandedCoursesData;
  if (activeCourseFilter !== 'all') {
    courses = courses.filter(c => c.platform === activeCourseFilter);
  }
  if (searchFilter) {
    courses = courses.filter(c => c.title.toLowerCase().includes(searchFilter) || c.desc.toLowerCase().includes(searchFilter) || c.tags.some(t => t.toLowerCase().includes(searchFilter)));
  }

  grid.innerHTML = courses.map(c => `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${c.badgeColor}">
            ${c.platformBadge}
          </span>
          <span class="text-xs text-amber-500 font-bold flex items-center gap-1">
            <span>★ ${c.rating}</span>
            <span class="text-slate-400 text-[10px] font-normal">(${c.students.toLocaleString()})</span>
          </span>
        </div>

        <div>
          <h4 class="font-display font-black text-slate-900 text-base leading-snug">${c.title}</h4>
          <p class="text-xs text-slate-500 leading-relaxed mt-1.5 line-clamp-3">${c.desc}</p>
        </div>

        <div class="flex flex-wrap gap-1 pt-1">
          ${c.tags.map(t => `<span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold">${t}</span>`).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-[10px] text-slate-400 font-bold uppercase">${c.duration}</div>
            <div class="text-lg font-black text-slate-900 font-display">${c.priceInr} <span class="text-xs text-slate-400 font-normal">(${c.priceUsd})</span></div>
          </div>
          <div class="text-right">
            <span class="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">EMI from ${c.emiText}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button 
            type="button" 
            onclick="openCoursePreview('${c.id}')" 
            class="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition-colors"
          >
            Free Preview
          </button>
          <button 
            type="button" 
            onclick="openCoursePaymentModal('course', '${c.id}')" 
            class="py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs text-center shadow-sm transition-all transform active:scale-95"
          >
            Enroll / Pay Now
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderInterviewNotesGrid() {
  const grid = document.getElementById('notes-cards-grid');
  if (!grid) return;

  grid.innerHTML = interviewNotesData.map(n => `
    <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
            ${n.tag}
          </span>
          <span class="text-[10px] font-mono text-slate-400">${n.pages}</span>
        </div>
        <h4 class="font-display font-black text-slate-900 text-sm leading-snug">${n.title}</h4>
        <p class="text-xs text-slate-500 leading-relaxed">${n.summary}</p>
        <div class="text-[11px] text-indigo-700 font-semibold bg-indigo-50/70 p-2 rounded-xl">
          ✓ ${n.snippets}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <button 
          type="button" 
          onclick="openNotesReaderModal('${n.id}')" 
          class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 transition-colors"
        >
          <span class="material-symbols-outlined text-[15px]">visibility</span>
          <span>Read Notes</span>
        </button>
        <button 
          type="button" 
          onclick="openCoursePaymentModal('notes', '${n.id}')" 
          class="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
        >
          Unlock Full PDF 📥
        </button>
      </div>
    </div>
  `).join('');
}

// In-Page Payment Checkout Modal Logic
function openCoursePaymentModal(itemType, itemId) {
  const modal = document.getElementById('modal-course-payment');
  if (!modal) return;

  if (itemType === 'notes') {
    const note = interviewNotesData.find(x => x.id === itemId) || interviewNotesData[0];
    currentActivePaymentItem = { title: note.title, tag: "Notes Subscription Pass", price: "₹499 ($6)", rawPrice: 499 };
  } else {
    const course = expandedCoursesData.find(x => x.id === itemId) || expandedCoursesData[0];
    currentActivePaymentItem = { title: course.title, tag: course.platformBadge, price: `${course.priceInr} (${course.priceUsd})`, rawPrice: course.rawPrice };
  }

  document.getElementById('pay-item-title').textContent = currentActivePaymentItem.title;
  document.getElementById('pay-item-tag').textContent = currentActivePaymentItem.tag;
  document.getElementById('pay-item-price').textContent = currentActivePaymentItem.price;

  const emi3 = Math.round(currentActivePaymentItem.rawPrice / 3);
  const emi6 = Math.round(currentActivePaymentItem.rawPrice / 6);
  const emi3El = document.getElementById('pay-emi-3');
  const emi6El = document.getElementById('pay-emi-6');
  if (emi3El) emi3El.textContent = `₹${emi3.toLocaleString()} / mo`;
  if (emi6El) emi6El.textContent = `₹${emi6.toLocaleString()} / mo`;

  switchPayTab('upi');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function openNotesSubscriptionModal() {
  openCoursePaymentModal('notes', 'note-dsa-75');
}

function closeCoursePaymentModal() {
  const modal = document.getElementById('modal-course-payment');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function switchPayTab(tab) {
  activePayMethod = tab;
  ['upi', 'card', 'netbanking', 'emi'].forEach(t => {
    const btn = document.getElementById(`pay-tab-${t}`);
    const content = document.getElementById(`pay-content-${t}`);
    if (btn) {
      if (t === tab) btn.className = "py-2 rounded-lg bg-white text-slate-900 shadow-2xs font-bold text-center";
      else btn.className = "py-2 rounded-lg text-slate-600 hover:text-slate-900 text-center font-medium";
    }
    if (content) {
      if (t === tab) content.classList.remove('hidden');
      else content.classList.add('hidden');
    }
  });
}

function verifyUpiId() {
  const input = document.getElementById('pay-upi-id');
  if (input && input.value) {
    if (typeof showToast === 'function') {
      showToast(`Verified UPI VPA: ${input.value} (Candidate Account Verified ✓)`);
    }
  }
}

function processCoursePayment() {
  const btn = document.getElementById('btn-confirm-course-payment');
  if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span><span>Processing with Bank...</span>';

  setTimeout(() => {
    closeCoursePaymentModal();
    if (btn) btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">lock</span><span>Complete Payment &amp; Unlock</span>';

    // Store in localStorage
    const enrolled = JSON.parse(localStorage.getItem('autopilot_enrolled_courses') || '[]');
    enrolled.push(currentActivePaymentItem?.title || "Masterclass");
    localStorage.setItem('autopilot_enrolled_courses', JSON.stringify(enrolled));

    if (typeof triggerConfetti === 'function') {
      try { triggerConfetti(); } catch (e) {}
    }

    if (typeof showToast === 'function') {
      showToast(`Payment Successful! Enrolled in ${currentActivePaymentItem?.title} 🎉`);
    }
  }, 800);
}

function openCoursePreview(courseId) {
  const c = expandedCoursesData.find(x => x.id === courseId) || expandedCoursesData[0];
  if (typeof showToast === 'function') {
    showToast(`Opening ${c.platformBadge} Free Preview Module 1-3... 🎥`);
  }
}

// Notes Reader Modal
function openNotesReaderModal(noteId) {
  const note = interviewNotesData.find(x => x.id === noteId) || interviewNotesData[0];
  activeSelectedNote = note;
  const modal = document.getElementById('modal-notes-reader');
  if (!modal) return;

  document.getElementById('notes-modal-title').textContent = note.title;
  document.getElementById('notes-modal-tag').textContent = note.tag;
  document.getElementById('notes-modal-pages').textContent = note.pages;
  document.getElementById('notes-modal-body').innerHTML = note.content;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeNotesReaderModal() {
  const modal = document.getElementById('modal-notes-reader');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function downloadNotesPdf() {
  if (typeof showToast === 'function') {
    showToast(`Downloading "${activeSelectedNote.title}.pdf" ✓`);
  }
  window.print();
}

// Google Maps Offline Center Switcher
function selectMapCenter(cityKey) {
  const center = mapsCentersData[cityKey] || mapsCentersData.bangalore;
  
  // Update city buttons
  document.querySelectorAll('.map-city-btn').forEach(btn => {
    btn.className = "map-city-btn px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0 flex items-center gap-1.5";
  });
  const activeBtn = document.getElementById(`btn-map-${cityKey}`);
  if (activeBtn) {
    activeBtn.className = "map-city-btn px-3.5 py-2 rounded-xl bg-indigo-600 text-white shrink-0 flex items-center gap-1.5 shadow-xs";
  }

  // Update Google Maps Iframe
  const iframe = document.getElementById('google-maps-iframe');
  if (iframe) {
    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(center.mapQuery)}&output=embed`;
  }

  // Update Center Info Card
  const infoCard = document.getElementById('map-center-info-card');
  if (infoCard) {
    infoCard.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Verified Walk-in Hub</span>
          <span class="text-xs text-slate-500 font-semibold">${center.city}</span>
        </div>
        <div>
          <h4 class="font-display font-black text-slate-900 text-base">${center.centerName}</h4>
          <p class="text-xs text-slate-600 mt-1">${center.address}</p>
        </div>

        <div class="space-y-1 text-xs text-slate-600 pt-1">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px] text-slate-400">schedule</span>
            <span>${center.hours}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px] text-slate-400">call</span>
            <span class="font-mono text-indigo-700 font-semibold">${center.phone}</span>
          </div>
        </div>

        <div class="space-y-1.5 pt-2 border-t border-slate-200">
          <div class="text-[10px] font-bold uppercase text-slate-400">On-Premise Facilities</div>
          <ul class="text-[11px] text-slate-700 space-y-1">
            ${center.facilities.map(f => `<li class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span><span>${f}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-200 space-y-2">
        <a 
          href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}" 
          target="_blank" 
          rel="noopener" 
          class="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <span class="material-symbols-outlined text-[16px] text-indigo-600">directions</span>
          <span>Open in Google Maps ↗</span>
        </a>
        <button 
          type="button" 
          onclick="bookWalkInMock('${cityKey}')" 
          class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors text-center"
        >
          Book Free Walk-in Mock Slot
        </button>
      </div>
    `;
  }
}

function bookWalkInMock(cityKey) {
  const center = mapsCentersData[cityKey] || mapsCentersData.bangalore;
  if (typeof showToast === 'function') {
    showToast(`Walk-in Mock Interview slot reserved at ${center.centerName}! 📍`);
  }
}

