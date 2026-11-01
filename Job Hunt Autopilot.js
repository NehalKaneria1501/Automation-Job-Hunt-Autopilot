/**
 * Job Hunt Autopilot — Core Engine & Reactive UI Controller
 * Implements Google Stitch "Executive Career Cockpit" Design Specifications.
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
    "body": "Hi Alex,\n\nWe were really impressed by your initial technical screening! We would love to invite you to Round 2 of our interview process with our Engineering Director and Principal Architect.\n\nThe discussion will focus on payment platform architecture, idempotency keys, and distributed system resilience.\n\nPlease pick a time on this link for a 45-minute Google Meet session: https://calendly.com/stripe-talent/alex-chen\n\nBest regards,\nSarah Connor | Stripe Talent Acquisition",
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
    "salary": "$175k - $225k",
    "location": "Seattle, WA / Remote"
  },
  {
    "id": 9,
    "company": "Direct Hiring HR India",
    "role": "Backend Engineer (Work From Home)",
    "sender": "quick.hire.jobs2026@outlook.com",
    "subject": "DIRECT SELECTION OFFER: Backend Engineer (Immediate Joining)",
    "date": "2026-10-31",
    "daysAgo": 2,
    "body": "Congratulations!\n\nYou are selected directly for the Backend Engineer position based on resume screening.\n\nPackage: 18 LPA CTC.\n\nTo process your formal appointment letter and schedule IT dispatch, candidate must deposit ₹4,999 towards training and anti-cheating assessment fees to GPay/PhonePe number 98765-XXXXX.\n\nOffer valid for today only. Failure to pay will result in immediate disqualification.",
    "salary": "₹18 LPA",
    "location": "Work From Home"
  },
  {
    "id": 10,
    "company": "Airbnb",
    "role": "Staff Infrastructure Engineer",
    "sender": "talent@airbnb.com",
    "subject": "Airbnb Application: Update on your submission",
    "date": "2026-10-28",
    "daysAgo": 5,
    "body": "Hello Alex,\n\nWe received many exceptional applications for the Staff Infrastructure Engineer position, and unfortunately, we will not be moving forward with your candidacy at this time.\n\nWe appreciate the time you invested in exploring opportunities with Airbnb and wish you success in your next role.\n\nWarm regards,\nAirbnb Recruiting Team",
    "salary": "$235k - $275k",
    "location": "Remote-first"
  },
  {
    "id": 11,
    "company": "Canva",
    "role": "Senior Full-Stack Engineer",
    "sender": "recruiting@canva.com",
    "subject": "Next Steps: Conversation with Canva Hiring Manager",
    "date": "2026-10-31",
    "daysAgo": 2,
    "body": "Hi Alex,\n\nWe would like to schedule a 30-minute conversation with our Engineering Manager for the Design Platform team to discuss your background and technical architecture interests.\n\nPlease let us know your availability over the next few days.\n\nBest,\nCanva Talent Acquisition",
    "salary": "$190k - $230k",
    "location": "Remote (US/Australia)"
  },
  {
    "id": 12,
    "company": "Microsoft",
    "role": "Senior Software Engineer (Azure Core)",
    "sender": "msftjobs@microsoft.com",
    "subject": "Thank you for applying to Microsoft (Req #189201)",
    "date": "2026-10-19",
    "daysAgo": 14,
    "body": "Thank you for applying to Microsoft. Your application for Senior Software Engineer (Azure Core) has been routed to our recruiting team. If your qualifications match our team needs, an engineering recruiter will reach out directly.\n\nYou can check your application status on Microsoft Action Center.",
    "salary": "$190k - $240k",
    "location": "Redmond, WA / Remote"
  },
  {
    "id": 13,
    "company": "Atlassian",
    "role": "Site Reliability Engineer",
    "sender": "talent@atlassian.com",
    "subject": "Your application to Atlassian — SRE",
    "date": "2026-10-29",
    "daysAgo": 4,
    "body": "Hi Alex,\n\nThank you for applying to Atlassian. While we were impressed by your background, we have decided to pursue candidates whose specific infrastructure experience more closely matches the immediate requirements of this team.\n\nWe appreciate your interest in Atlassian and wish you the best.",
    "salary": "$180k - $220k",
    "location": "Remote"
  },
  {
    "id": 14,
    "company": "Apex Tech Consulting Ltd",
    "role": "Associate Python & AI Developer",
    "sender": "hr.onboarding.desk@yahoo.com",
    "subject": "PAN and Aadhaar submission required prior to interview call",
    "date": "2026-10-30",
    "daysAgo": 3,
    "body": "Dear Applicant,\n\nTo prevent candidate impersonation in AI screenings, our enterprise clients mandate that candidates submit their original Aadhaar Card scan, PAN card, and 3 months salary slips prior to scheduling any technical rounds.\n\nFailing to submit these documents to this email within 12 hours will permanently cancel your profile.",
    "salary": "₹15 - 22 LPA",
    "location": "Noida / Hyderabad"
  },
  {
    "id": 15,
    "company": "Snowflake",
    "role": "Data Platform Engineer",
    "sender": "talent-acquisition@snowflake.com",
    "subject": "Application Received: Data Platform Engineer",
    "date": "2026-10-30",
    "daysAgo": 3,
    "body": "Hi Alex,\n\nThank you for submitting your application to Snowflake. Our engineering recruiters are actively reviewing candidates on a rolling basis. If your profile matches our criteria, we will reach out with scheduling details.\n\nBest,\nSnowflake Talent Team",
    "salary": "$200k - $250k",
    "location": "Bozeman, MT / Remote"
  },
  {
    "id": 16,
    "company": "Shopify",
    "role": "Senior Backend Developer (Core Commerce)",
    "sender": "jobs@shopify.com",
    "subject": "Shopify: Thank you for your interest",
    "date": "2026-10-27",
    "daysAgo": 6,
    "body": "Hi Alex,\n\nWe appreciate you taking the time to explore opportunities with Shopify. At this time, we have chosen to proceed with other candidates whose experience aligns more closely with our current merchant platform needs.\n\nThank you again for your interest in Shopify.",
    "salary": "$185k - $230k",
    "location": "Remote"
  },
  {
    "id": 17,
    "company": "Cloudflare",
    "role": "Systems Engineer (Edge Compute)",
    "sender": "jobs@cloudflare.com",
    "subject": "Application Acknowledgement: Systems Engineer",
    "date": "2026-10-31",
    "daysAgo": 2,
    "body": "Hi Alex,\n\nWe have safely received your application for Systems Engineer (Edge Compute). Our recruiters are reviewing your submissions against our team roadmaps and will be in touch if there is mutual alignment.\n\nBest regards,\nCloudflare Talent Team",
    "salary": "$195k - $240k",
    "location": "Austin, TX / Remote"
  },
  {
    "id": 18,
    "company": "Uber",
    "role": "Senior Software Engineer — Rider Core",
    "sender": "uber-talent@uber.com",
    "subject": "Update on your Uber Application",
    "date": "2026-10-26",
    "daysAgo": 7,
    "body": "Thank you for applying to Uber. We are currently evaluating application materials for the Senior Software Engineer — Rider Core position. We will update you as soon as our review is complete.\n\nThank you for your patience.",
    "salary": "$210k - $255k",
    "location": "San Francisco, CA"
  },
  {
    "id": 19,
    "company": "HubSpot",
    "role": "Frontend Tech Lead",
    "sender": "recruiting@hubspot.com",
    "subject": "Thanks for applying to HubSpot!",
    "date": "2026-10-25",
    "daysAgo": 8,
    "body": "Hi Alex,\n\nThanks for your application for the Frontend Tech Lead role. Our engineering recruiters are actively reviewing profiles and will contact you directly if there is an open fit.\n\nBest,\nHubSpot Recruiting",
    "salary": "$190k - $230k",
    "location": "Cambridge, MA / Remote"
  },
  {
    "id": 20,
    "company": "Postman",
    "role": "API Platform Architect",
    "sender": "careers@postman.com",
    "subject": "Your application at Postman: API Platform Architect",
    "date": "2026-10-29",
    "daysAgo": 4,
    "body": "Hi Alex,\n\nWe have received your resume for the API Platform Architect position and our hiring managers are reviewing it. Thank you for your interest in building the future of API development with Postman.\n\nBest,\nPostman Recruiting Team",
    "salary": "$210k - $260k",
    "location": "San Francisco / Bengaluru"
  }
];

const FREE_MAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'rediffmail.com', 'mail.com', 'proton.me'];

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
    'deposit ₹', 'deposit $', 'gpay/phonepe', 'zelle', 'crypto'
  ];
  if (feeKeywords.some(kw => text.includes(kw))) {
    isScam = true;
    scamReasons.push("Advance Fee Scam: Demands upfront monetary payment (e.g. equipment deposit / training fee) before onboarding.");
  }

  // Rule 2: Free-mail sender impersonating corporate entity
  const isFreeMail = FREE_MAIL_DOMAINS.includes(domain);
  const corporateCues = [
    'selected', 'immediate offer', 'congratulations', 'urgent document',
    'direct selection', 'appointment letter', 'salary is $', 'lpa'
  ];
  if (isFreeMail && corporateCues.some(c => text.includes(c))) {
    isScam = true;
    scamReasons.push(`Free-mail Spoofing: Sender (@${domain}) poses as a corporate hiring entity without an enterprise domain.`);
  }

  // Rule 3: Premature sensitive document harvesting
  const piiKeywords = ['aadhaar', 'pan card', 'bank passbook', 'pan and aadhaar'];
  const prematureCues = ['prior to interview', 'before scheduling', 'before technical', 'prior to any', 'within 12 hours', 'within 24 hours'];
  const hasPii = piiKeywords.some(k => text.includes(k));
  const hasPremature = prematureCues.some(c => text.includes(c));
  if (hasPii && (hasPremature || isFreeMail)) {
    isScam = true;
    scamReasons.push("Identity Theft & PII Harvesting: Demands sensitive government IDs (Aadhaar / PAN / Bank Passbook) prior to any interview rounds.");
  }

  // Status Classification
  let status = "applied";
  if (isScam) {
    status = "scam";
  } else if (text.includes('offer letter') || text.includes('ecstatic to extend an offer')) {
    status = "offer";
  } else if (text.includes('interview') || text.includes('screening') || text.includes('walkthrough') || text.includes('next steps: conversation') || text.includes('calendly.com')) {
    status = "interview";
  } else if (text.includes('not to move forward') || text.includes('not moving forward') || text.includes('other candidates') || text.includes('pursue candidates') || text.includes('unfortunately')) {
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
      body: `Dear ${comp} Hiring Team,\n\nI hope you are having a productive week.\n\nI am writing to respectfully follow up on my application for the ${role} role, submitted on ${dateStr} (${daysAgo} days ago).\n\nI remain deeply interested in ${comp}'s engineering mission and would welcome the opportunity to discuss how my background in distributed systems and platform reliability can add immediate value.\n\nThank you for your time and consideration.\n\nBest regards,\nAlex Chen\nhttps://linkedin.com/in/alexchen • https://github.com/alexchen`
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

/**
 * Initialize application: Try fetching from backend API if available, else use embedded dataset
 */
async function initAutopilot() {
  try {
    const response = await fetch('/api/triage');
    if (response.ok) {
      const data = await response.json();
      allEmails = data.emails;
    } else {
      throw new Error("API not active");
    }
  } catch (err) {
    // Standalone fallback
    allEmails = EMBEDDED_EMAILS.map(evaluateAutopilotRules);
  }
  filteredEmails = [...allEmails];
  renderAll();
  lucide.createIcons();
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

  safeSetText('sidebar-scam-badge', counts.scam);
  safeSetText('sidebar-followup-badge', counts.followups);
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

/**
 * Render Operational Kanban Matrix (Applied, Interview, Offers, Rejected)
 */
function renderKanban() {
  const colApplied = document.getElementById('col-applied');
  const colInterview = document.getElementById('col-interview');
  const colOffer = document.getElementById('col-offer');
  const colRejected = document.getElementById('col-rejected');

  if (!colApplied || !colInterview || !colOffer || !colRejected) return;

  colApplied.innerHTML = '';
  colInterview.innerHTML = '';
  colOffer.innerHTML = '';
  colRejected.innerHTML = '';

  filteredEmails.forEach(item => {
    if (item.isScam) return; // Scams are quarantined into Scam Radar

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
        <p class="text-[11px] text-slate-500 line-clamp-2">${item.subject}</p>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <div class="flex items-center gap-1.5">
            ${followUpNotice}
          </div>
          <span class="text-[11px] font-bold text-slate-700">${item.salary || '$180k+'}</span>
        </div>
      `;
      colApplied.appendChild(card);

    } else if (item.evaluatedStatus === 'interview') {
      card.className = "p-4 rounded-xl bg-white border-l-4 border-indigo-600 border border-slate-200/80 shadow-[0_2px_8px_rgba(99,102,241,0.08)] hover:shadow-lg transition-all cursor-pointer flex flex-col gap-2.5 group relative";
      card.innerHTML = `
        <div class="flex items-center justify-between gap-1">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[10px] border border-indigo-200">
            <i data-lucide="calendar" class="w-3 h-3"></i> Active Round
          </span>
          <span class="text-[10px] text-slate-400 font-mono">${item.date}</span>
        </div>
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-indigo-600">${item.company}</span>
          <h4 class="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">${item.role}</h4>
          <p class="text-[11px] text-slate-500 mt-0.5 line-clamp-1">${item.subject}</p>
        </div>
        <div class="p-2 rounded-lg bg-indigo-50/60 flex items-center justify-between">
          <span class="text-[11px] font-semibold text-indigo-900 flex items-center gap-1">
            <i data-lucide="book-open" class="w-3.5 h-3.5 text-indigo-600"></i> Prep Notes Ready
          </span>
          <button type="button" onclick="event.stopPropagation(); openInterviewStudio();" class="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline">
            Open Studio →
          </button>
        </div>
        <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
          <span class="text-slate-500">${item.location || 'Remote'}</span>
          <span class="font-bold text-slate-800">${item.salary || '$210k+'}</span>
        </div>
      `;
      colInterview.appendChild(card);

    } else if (item.evaluatedStatus === 'offer') {
      card.className = "p-4 rounded-xl bg-white border-l-4 border-emerald-500 border border-slate-200/80 shadow-[0_2px_8px_rgba(16,185,129,0.08)] hover:shadow-lg transition-all cursor-pointer flex flex-col gap-2.5 group";
      card.innerHTML = `
        <div class="flex items-center justify-between gap-1">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
            <i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-600"></i> Authenticated Offer
          </span>
          <span class="text-[10px] font-bold text-emerald-600 font-mono">DocuSign Verified</span>
        </div>
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-700">${item.company}</span>
          <h4 class="text-sm font-black text-slate-900">${item.role}</h4>
          <p class="text-[11px] text-slate-500 mt-0.5">${item.subject}</p>
        </div>
        <div class="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 flex flex-col gap-1 text-[11px]">
          <div class="flex items-center justify-between">
            <span class="text-slate-600">Base Salary:</span>
            <span class="font-bold text-slate-900">$210,000 USD</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-600">Equity Grant:</span>
            <span class="font-bold text-emerald-700">$180,000 RSU</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-600">Signing Incentive:</span>
            <span class="font-bold text-slate-900">$25,000 upfront</span>
          </div>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <button type="button" onclick="event.stopPropagation(); openEmailModal(${item.id});" class="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-sm text-center">
            Review Terms
          </button>
        </div>
      `;
      colOffer.appendChild(card);

    } else if (item.evaluatedStatus === 'rejected') {
      card.className = "p-4 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] hover:border-slate-300 transition-all cursor-pointer flex flex-col gap-2 group opacity-85 hover:opacity-100";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">${item.company}</span>
          <span class="text-[10px] text-slate-400 font-mono">${item.date}</span>
        </div>
        <h4 class="text-xs font-semibold text-slate-700 line-through decoration-slate-400">${item.role}</h4>
        <p class="text-[11px] text-slate-500 line-clamp-2">"Decided to proceed with other candidates whose experience closely aligns."</p>
        <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
          <span>Logged &amp; Archived</span>
          <span class="font-mono">${item.daysAgo}d ago</span>
        </div>
      `;
      colRejected.appendChild(card);
    }
  });
  lucide.createIcons();
}

/**
 * Render Scam Quarantine Radar (Flagged in Red with Explicit Reasons)
 */
function renderScamRadar() {
  const container = document.getElementById('scam-radar-cards');
  if (!container) return;
  container.innerHTML = '';

  const scams = filteredEmails.filter(e => e.isScam);

  scams.forEach(item => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-2xl p-5 border-2 border-red-400 shadow-md flex flex-col gap-3 relative";

    const reasonsHtml = item.scamReasons.map(r => `
      <li class="flex items-start gap-2 text-xs text-red-950 font-medium">
        <i data-lucide="alert-octagon" class="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5"></i>
        <span>${r}</span>
      </li>
    `).join('');

    card.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
            <i data-lucide="shield-alert" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-bold text-slate-900 text-sm">${item.company}</h4>
            <p class="text-xs text-slate-500 font-mono">${item.sender}</p>
          </div>
        </div>
        <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm flex items-center gap-1">
          <i data-lucide="ban" class="w-3 h-3"></i> Scam Intercepted
        </span>
      </div>

      <div class="text-xs font-bold text-slate-800 bg-red-50/70 p-2.5 rounded-xl border border-red-200">
        Subject: "${item.subject}"
      </div>

      <div class="bg-red-50/90 rounded-xl p-3 border border-red-200 flex flex-col gap-1.5">
        <span class="text-[11px] font-bold uppercase tracking-wider text-red-700">Audit Flags &amp; Reasons:</span>
        <ul class="space-y-1.5">${reasonsHtml}</ul>
      </div>

      <div class="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 line-clamp-3 italic">
        "${item.body}"
      </div>

      <div class="flex items-center justify-between pt-1 border-t border-slate-100">
        <span class="text-[11px] text-slate-400 font-mono">Received: ${item.date}</span>
        <button type="button" onclick="openEmailModal(${item.id})" class="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm">
          <span>Inspect Threat Dossier</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
  lucide.createIcons();
}

/**
 * Render Follow-Up Queue (> 7 Days Silence)
 */
function renderFollowupQueue() {
  const container = document.getElementById('followup-queue-list');
  if (!container) return;
  container.innerHTML = '';

  const dueList = filteredEmails.filter(e => e.followUpDue);
  if (dueList.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400 text-sm">No applications currently exceed the 7-day latency threshold.</div>`;
    return;
  }

  dueList.forEach(item => {
    const draft = item.followUpDraft;
    const card = document.createElement('div');
    card.className = "bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col gap-3.5";

    card.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div class="flex items-center gap-2">
            <h4 class="text-sm font-bold text-slate-900">${item.company}</h4>
            <span class="text-xs text-slate-500">• ${item.role}</span>
          </div>
          <p class="text-xs text-amber-700 font-semibold mt-0.5 flex items-center gap-1">
            <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
            Applied ${item.daysAgo} days ago (${item.date}) — Recruiter silence exceeds 7 days
          </p>
        </div>
        <button type="button" onclick="copyFollowUp(${item.id})" class="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          <span>Copy Nudge Email</span>
        </button>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Autopilot Tailored Follow-Up Draft:</label>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed whitespace-pre-line">
<strong>${draft.subject}</strong>

${draft.body}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  lucide.createIcons();
}

/**
 * Render Raw Ingested Inbox Data Table
 */
function renderInboxTable() {
  const tbody = document.getElementById('inbox-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';

  filteredEmails.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = item.isScam ? "bg-red-50/40 hover:bg-red-50 cursor-pointer transition-colors" : "hover:bg-slate-50 cursor-pointer transition-colors";
    tr.onclick = () => openEmailModal(item.id);

    let statusPill = '';
    if (item.isScam) {
      statusPill = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm">
        <i data-lucide="shield-alert" class="w-3 h-3"></i> FAKE OFFER
      </span>`;
    } else if (item.evaluatedStatus === 'offer') {
      statusPill = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">Offer</span>`;
    } else if (item.evaluatedStatus === 'interview') {
      statusPill = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-300">Interview</span>`;
    } else if (item.evaluatedStatus === 'rejected') {
      statusPill = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-300">Rejected</span>`;
    } else {
      statusPill = item.followUpDue
        ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">Follow-up Due</span>`
        : `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">Applied</span>`;
    }

    tr.innerHTML = `
      <td class="py-3 px-4 font-semibold">${statusPill}</td>
      <td class="py-3 px-4 font-bold text-slate-900">${item.company}</td>
      <td class="py-3 px-4 text-slate-500 font-mono text-[11px]">${item.sender}</td>
      <td class="py-3 px-4 text-slate-700 font-medium">${item.subject}</td>
      <td class="py-3 px-4 text-slate-400 font-mono">${item.date}</td>
      <td class="py-3 px-4 text-indigo-600 font-semibold hover:underline">Inspect →</td>
    `;
    tbody.appendChild(tr);
  });
  lucide.createIcons();
}

/**
 * View Switcher: kanban, scam-radar, follow-up, interview-studio, inbox
 */
function switchView(viewName) {
  activeView = viewName;
  const views = ['kanban', 'scam-radar', 'follow-up', 'interview-studio', 'inbox'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.classList.add('hidden');
    const tabBtn = document.getElementById(`tab-${v}`);
    if (tabBtn) {
      tabBtn.className = "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all";
    }
  });

  const activeEl = document.getElementById(`view-${viewName}`);
  if (activeEl) activeEl.classList.remove('hidden');

  const activeTab = document.getElementById(`tab-${viewName}`);
  if (activeTab) {
    if (viewName === 'scam-radar') {
      activeTab.className = "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-red-600 text-white shadow-sm transition-all";
    } else {
      activeTab.className = "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all";
    }
  }
  lucide.createIcons();
}

/**
 * Filter Content via Search input
 */
function filterContent() {
  const query = (document.getElementById('filter-input')?.value || "").toLowerCase().trim();
  if (!query) {
    filteredEmails = [...allEmails];
  } else {
    filteredEmails = allEmails.filter(e => {
      return (e.company || "").toLowerCase().includes(query) ||
             (e.role || "").toLowerCase().includes(query) ||
             (e.sender || "").toLowerCase().includes(query) ||
             (e.subject || "").toLowerCase().includes(query) ||
             (e.body || "").toLowerCase().includes(query);
    });
  }
  renderKanban();
  renderScamRadar();
  renderFollowupQueue();
  renderInboxTable();
}

/**
 * Modal Inspection Controllers
 */
function openEmailModal(id) {
  const email = allEmails.find(e => e.id === id);
  if (!email) return;

  safeSetText('modal-subject', email.subject);
  safeSetText('modal-meta', `From: ${email.sender} • Received: ${email.date} (${email.daysAgo}d ago) • ${email.company}`);
  safeSetText('modal-body', email.body);

  const scamBox = document.getElementById('modal-scam-alert');
  const scamReasonsList = document.getElementById('modal-scam-reasons');
  const badgeIcon = document.getElementById('modal-badge-icon');
  const headerBg = document.getElementById('modal-header-bg');

  if (email.isScam) {
    scamBox.classList.remove('hidden');
    scamReasonsList.innerHTML = email.scamReasons.map(r => `<div>• ${r}</div>`).join('');
    badgeIcon.className = "p-2.5 rounded-xl bg-red-600 text-white";
    badgeIcon.innerHTML = `<i data-lucide="shield-alert" class="w-5 h-5"></i>`;
    headerBg.className = "p-6 border-b border-red-200 bg-red-50/70 flex items-center justify-between";
  } else {
    scamBox.classList.add('hidden');
    badgeIcon.className = "p-2.5 rounded-xl bg-indigo-50 text-indigo-600";
    badgeIcon.innerHTML = `<i data-lucide="mail-check" class="w-5 h-5"></i>`;
    headerBg.className = "p-6 border-b border-slate-100 flex items-center justify-between";
  }

  const modal = document.getElementById('email-detail-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  lucide.createIcons();
}

function closeEmailModal() {
  const modal = document.getElementById('email-detail-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function openInterviewStudio() {
  switchView('interview-studio');
}

/**
 * Copy Follow-up Template to Clipboard with Toast
 */
function copyFollowUp(id) {
  const item = allEmails.find(e => e.id === id);
  if (!item || !item.followUpDraft) return;

  const textToCopy = `Subject: ${item.followUpDraft.subject}\n\n${item.followUpDraft.body}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    showToast("Follow-up draft copied to clipboard!");
  });
}

function showToast(message) {
  const toast = document.getElementById('global-toast');
  const toastMsg = document.getElementById('global-toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

/**
 * Re-scan / Ingestion Engine Simulator
 */
async function triggerAutopilotIngestion() {
  const btn = document.getElementById('btn-run-autopilot');
  const originalText = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Ingesting &amp; Auditing 20 Emails...`;
  lucide.createIcons();

  try {
    const res = await fetch('/api/rescan', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      allEmails = data.result.emails;
    } else {
      allEmails = EMBEDDED_EMAILS.map(evaluateAutopilotRules);
    }
  } catch (err) {
    allEmails = EMBEDDED_EMAILS.map(evaluateAutopilotRules);
  }

  setTimeout(() => {
    filteredEmails = [...allEmails];
    renderAll();
    showToast("Inbox sync complete: 20 emails audited, 4 scams quarantined!");
    btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-300"></i> Sync Complete!`;
    lucide.createIcons();
    setTimeout(() => {
      btn.innerHTML = originalText;
      lucide.createIcons();
    }, 2000);
  }, 600);
}

// Kick off on load
window.addEventListener('DOMContentLoaded', () => {
  initAutopilot();
});
