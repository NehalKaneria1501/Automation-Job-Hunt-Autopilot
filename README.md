# Automation: Job Hunt Autopilot
### Google Stitch Edition — Executive Career Cockpit

An autonomous inbound email triage, security quarantine, and pipeline automation cockpit designed for senior tech talent and candidates navigating AI-era layoffs.

---

## 🎯 Problem Statement
After an AI-era layoff, candidates apply to 100+ roles simultaneously and rapidly lose track of:
1. Who replied, who rejected them, and current pipeline velocity.
2. Which applications have lapsed into silence and require a follow-up.
3. **Predatory fake job offers** targeting vulnerable job seekers with upfront "training/equipment fees", free-mail recruiter spoofing, and pre-interview identity theft (Aadhaar / PAN / bank passbook harvesting).

---

## 🚀 Implemented Solution & Features

### 1. Self-Updating Autopilot Tracker Board
Categorizes inbound applicant email streams into 4 real-time operational Kanban columns:
- **Applied & In Review (7)**: Live latency tracking (`Xd ago`), salary benchmarks, and 1-click status inspections.
- **Interviews Active (4)**: Stripe, Figma, Canva, and Postman with upcoming rounds, panel profiles, and one-click access to the Interview Prep Studio.
- **Legit Offers (1)**: Notion Labs verified offer ($210,000 Base + $180,000 Equity grant) authenticated via DocuSign and SPF/DKIM validation.
- **Rejected (4)**: Google Cloud, Airbnb, Atlassian, and Shopify logged and archived with constructive feedback.

### 2. Scam Quarantine Radar (Zero Compromise Mode)
Flagged in bold red with explicit audit reasons and threat breakdown:
- **Global Tech Staffing Solutions**: Demands a $150 refundable equipment & training fee before dispatching a company MacBook.
  - *Flags:* Advance fee scam + `@gmail.com` free-mail sender posing as corporate HR.
- **Infosys Offshore Career Desk**: Demands color scans of Aadhaar Card, PAN Card, and bank passbook before scheduling any interview.
  - *Flags:* Premature government ID harvesting + `@rediffmail.com` spoofing Infosys.
- **Direct Hiring HR India**: Direct appointment letter promised if candidate deposits ₹4,999 anti-cheating fee via GPay/PhonePe.
  - *Flags:* Advance fee extortion via UPI + `@outlook.com` free-mail sender.
- **Apex Tech Consulting Ltd**: Demands PAN, Aadhaar, and 3 months salary slips within 12 hours prior to technical screening.
  - *Flags:* High-risk KYC identity theft vector.

### 3. Autonomous 7-Day Follow-Up Queue
- Automatically detects applications with no response past the 7-day threshold (Datadog 11d, Microsoft 14d, Uber 7d, HubSpot 8d).
- Provides personalized 1-click **Copy Nudge Email** templates ready to send to recruiters.

### 4. Stretch Goal: Interview Prep Studio
Dedicated interactive studio for **Stripe — Staff Full-Stack Engineer (Round 2: Systems Scaling & Architecture)**:
- **Core Topics**: Idempotency keys in payment APIs, event-driven webhooks with truncated exponential jitter, and zero-downtime schema migrations.
- **STAR Stories**: Outage triage hook (Black Friday DB pool exhaustion) and RFC consensus leadership.
- **Director Q&A**: Tailored high-impact questions to ask the hiring director.

### 5. Raw Synced Inbox (20 Emails)
Complete searchable and filterable ledger of all 20 synchronized emails with real-time keyword search across roles, companies, senders, and subjects.

---

## 🛠️ Architecture & Tech Stack

- **Design System**: Google Stitch *Executive Career Cockpit* (`#4648D4` Indigo, `#F8F9FF` Surface, `#BA1A1A` Threat Red, `#00885D` Success Green).
- **Typography**: Plus Jakarta Sans (Headings), Manrope (Body/Data), JetBrains Mono (Codes/Hashes).
- **Frontend**: Vanilla HTML5, Tailwind CSS, Lucide Icons, and reactive JavaScript (`Job Hunt Autopilot.js`).
- **Python Automation Engine (`autopilot.py`)**: Zero-dependency Python CLI and REST API server (`http.server`) with endpoints:
  - `GET /api/triage`: Full classification, scam threat analysis, and KPI statistics.
  - `GET /api/emails`: Raw dataset of the 20 emails.
  - `POST /api/rescan`: Trigger instant inbox re-scan.

---

## 🏃 Quick Start Guide

### Option 1: Run with Python Server (Recommended)
```bash
python autopilot.py --serve --port 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your web browser.

### Option 2: Run CLI Triage Report
```bash
python autopilot.py
```
Outputs a full formatted terminal report with stats, scam flags, follow-up alerts, and interview prep notes.

### Option 3: Open Directly in Browser
Double-click [index.html](file:///d:/Automation%20Job%20Hunt%20Autopilot/index.html) or [Job Hunt Autopilot.html](file:///d:/Automation%20Job%20Hunt%20Autopilot/Job%20Hunt%20Autopilot.html) to run standalone.
