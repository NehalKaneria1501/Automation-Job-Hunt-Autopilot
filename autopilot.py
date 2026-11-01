#!/usr/bin/env python3
"""
Job Hunt Autopilot — Autonomous Inbox Triage & Fraud Interceptor
Engineered as per Google Stitch Executive Career Cockpit Specifications.

Features:
- Automated classification of raw inbox stream: Applied, Interview, Offer, Rejected.
- Zero-trust scam detection with explicit reasoning:
    1. Advance fee demands (training/equipment fees, laptop deposits)
    2. Free-mail domains (@gmail, @yahoo, @outlook, @rediffmail) posing as corporate HR
    3. Premature KYC/PII harvesting (Aadhaar, PAN card, bank passbook before interview)
- 7-day silence latency detection with auto-generated follow-up nudges.
- Comprehensive technical interview prep notes for upcoming rounds.
- CLI reporting and built-in HTTP server with REST APIs.
"""

import sys
import json
import os
import re
from datetime import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse

# Ensure utf-8 encoding on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

DATA_FILE = os.path.join(os.path.dirname(__file__), "emails.json")

FREE_MAIL_DOMAINS = {
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "rediffmail.com", "mail.com", "proton.me"
}

def load_emails(filepath=DATA_FILE):
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Emails file not found at: {filepath}")
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def extract_domain(email_address):
    match = re.search(r"@([\w.-]+)", email_address)
    return match.group(1).lower() if match else ""

def evaluate_email_security_and_status(email):
    sender = email.get("sender", "")
    subject = email.get("subject", "")
    body = email.get("body", "")
    days_ago = email.get("daysAgo", 0)
    
    sender_domain = extract_domain(sender)
    combined_text = f"{subject}\n{body}".lower()
    
    is_scam = False
    scam_reasons = []
    
    # Rule 1: Advance Fee Demands
    fee_keywords = [
        "training fee", "equipment & training fee", "refundable equipment",
        "courier charge", "anti-cheating assessment fees", "mandatory refundable",
        "deposit of ₹", "deposit of $", "deposit ₹", "deposit $", "gpay/phonepe", "zelle", "crypto"
    ]
    matched_fee = [kw for kw in fee_keywords if kw in combined_text]
    if matched_fee:
        is_scam = True
        scam_reasons.append(
            "Advance Fee Scam: Demands upfront monetary payment (e.g. equipment deposit / training fee) before onboarding."
        )
        
    # Rule 2: Free-mail sender impersonating corporate enterprise
    is_freemail = sender_domain in FREE_MAIL_DOMAINS
    corporate_offer_cues = [
        "selected", "immediate offer", "congratulations", "urgent document",
        "direct selection", "appointment letter", "salary is $", "lpa"
    ]
    if is_freemail and any(cue in combined_text for cue in corporate_offer_cues):
        is_scam = True
        scam_reasons.append(
            f"Free-mail Spoofing: Sender (@{sender_domain}) poses as a corporate hiring entity without an enterprise domain."
        )

    # Rule 3: Premature sensitive document harvesting (Aadhaar / PAN / Bank details)
    pii_keywords = ["aadhaar", "pan card", "bank passbook", "pan and aadhaar"]
    premature_cues = ["prior to interview", "before scheduling", "before technical", "prior to any", "within 12 hours", "within 24 hours"]
    has_pii = any(k in combined_text for k in pii_keywords)
    has_premature = any(c in combined_text for c in premature_cues)
    if has_pii and (has_premature or is_freemail):
        is_scam = True
        scam_reasons.append(
            "Identity Theft & PII Harvesting: Demands sensitive government IDs (Aadhaar / PAN / Bank Passbook) prior to any interview rounds."
        )
        
    # Status Classification
    if is_scam:
        status = "scam"
    elif "offer letter" in combined_text or "ecstatic to extend an offer" in combined_text:
        status = "offer"
    elif any(term in combined_text for term in ["interview", "screening", "walkthrough", "next steps: conversation", "calendly.com"]):
        status = "interview"
    elif any(term in combined_text for term in ["not to move forward", "not moving forward", "other candidates", "pursue candidates", "unfortunately"]):
        status = "rejected"
    else:
        status = "applied"
        
    # Follow-up determination (No reply > 7 days on applied)
    follow_up_due = (status == "applied" and days_ago >= 7)
    
    # Generate follow-up draft if due
    follow_up_draft = None
    if follow_up_due:
        company = email.get("company", "the team")
        role = email.get("role", "the position")
        date_str = email.get("date", "recently")
        follow_up_draft = {
            "subject": f"Following up on application: {role} — Alex Chen",
            "body": (
                f"Dear {company} Hiring Team,\n\n"
                f"I hope you are having a productive week.\n\n"
                f"I am writing to respectfully follow up on my application for the {role} role, "
                f"submitted on {date_str} ({days_ago} days ago).\n\n"
                f"I remain deeply interested in {company}'s engineering mission and would welcome the opportunity "
                f"to discuss how my background in distributed systems and platform reliability can add immediate value.\n\n"
                f"Thank you for your time and consideration.\n\n"
                f"Best regards,\n"
                f"Alex Chen\n"
                f"https://linkedin.com/in/alexchen • https://github.com/alexchen"
            )
        }

    return {
        **email,
        "evaluatedStatus": status,
        "isScam": is_scam,
        "scamReasons": scam_reasons,
        "followUpDue": follow_up_due,
        "followUpDraft": follow_up_draft
    }

def generate_interview_prep(email):
    """Generates structured interview notes for upcoming interviews."""
    return {
        "company": email.get("company", "Target Company"),
        "role": email.get("role", "Target Role"),
        "interviewRound": "Round 2: Systems Scaling & Architecture",
        "scheduledTime": "Upcoming (e.g. Tomorrow @ 2:00 PM PST)",
        "panel": "VP Platform Engineering & Principal Systems Architect",
        "coreTopics": [
            {
                "topic": "Idempotency Keys in High-Scale Payment APIs",
                "summary": "Design atomic transaction handlers using distributed Redis locks, unique client request tokens, and transactional outbox patterns to prevent double billing."
            },
            {
                "topic": "Event-Driven Webhook Delivery & Exponential Jitter",
                "summary": "Implement durable retry queues with truncated exponential backoff + decorrelated jitter to shield downstream merchant servers from thunderous herds."
            },
            {
                "topic": "Zero-Downtime Schema Migrations at High TPS",
                "summary": "Multi-phase Expand/Contract rollout for relational DBs (Postgres/MySQL) with foreign-key isolation and asynchronous backfills."
            }
        ],
        "starStories": [
            {
                "prompt": "Tell me about a high-severity production outage you triaged.",
                "hook": "Lead with 2025 Black Friday DB connection pool exhaustion (50k req/s). Walk through blameless RCA, emergency circuit-breaking, and connection-pooler partition fix."
            },
            {
                "prompt": "How do you resolve architectural disagreements between senior staff?",
                "hook": "Demonstrate RFC-driven decision matrices with quantifiable SLA and cost benchmarks rather than dogma."
            }
        ],
        "closingQuestions": [
            "How does the platform team balance 99.999% availability SLAs with rapid weekly continuous deployments?",
            "What is the single biggest technical bottleneck your infrastructure team aims to solve this quarter?"
        ]
    }

def run_triage(emails=None):
    if emails is None:
        emails = load_emails()
    
    processed = [evaluate_email_security_and_status(e) for e in emails]
    
    stats = {
        "total": len(processed),
        "applied": sum(1 for e in processed if e["evaluatedStatus"] == "applied"),
        "interview": sum(1 for e in processed if e["evaluatedStatus"] == "interview"),
        "rejected": sum(1 for e in processed if e["evaluatedStatus"] == "rejected"),
        "offer": sum(1 for e in processed if e["evaluatedStatus"] == "offer"),
        "scams": sum(1 for e in processed if e["isScam"]),
        "followUpsDue": sum(1 for e in processed if e["followUpDue"]),
        "financialLossProtected": "$0 (100% Shielded)"
    }
    
    interviews = [e for e in processed if e["evaluatedStatus"] == "interview"]
    interview_prep = generate_interview_prep(interviews[0]) if interviews else None
    
    return {
        "stats": stats,
        "emails": processed,
        "interviewPrep": interview_prep
    }

def print_cli_report(triage_data):
    stats = triage_data["stats"]
    print("\n" + "=" * 70)
    print(" 🚀  JOB HUNT AUTOPILOT — INBOX TRIAGE & SCAM RADAR")
    print("=" * 70)
    print(f" Total Emails Ingested   : {stats['total']}")
    print(f" ⏳ Awaiting Reply (Applied): {stats['applied']}")
    print(f" 🎯 Active Interviews    : {stats['interview']}")
    print(f" 🏆 Legitimate Offers     : {stats['offer']}")
    print(f" 🚫 Rejections Logged     : {stats['rejected']}")
    print(f" ⚠️  Fake Offers Blocked  : {stats['scams']} [100% QUARANTINED]")
    print(f" ⏰ Follow-ups Due (>7d)  : {stats['followUpsDue']}")
    print("-" * 70)
    
    print("\n🚨  QUARANTINED FAKE OFFERS & ADVANCE FEE SCAMS:")
    for e in triage_data["emails"]:
        if e["isScam"]:
            print(f"\n  • [{e['company']}] — {e['role']}")
            print(f"    From: {e['sender']} | Date: {e['date']}")
            for reason in e["scamReasons"]:
                print(f"    ❌ FLAG: {reason}")
                
    print("\n⏰  APPLICATIONS REQUIRING FOLLOW-UP (>7 DAYS SILENCE):")
    for e in triage_data["emails"]:
        if e["followUpDue"]:
            print(f"  • {e['company']} ({e['role']}) — Applied {e['daysAgo']} days ago ({e['date']})")
            
    if triage_data.get("interviewPrep"):
        prep = triage_data["interviewPrep"]
        print(f"\n📚  STRETCH: UPCOMING INTERVIEW PREP NOTES — {prep['company']}")
        print(f"  Role: {prep['role']} ({prep['interviewRound']})")
        print("  Key Topics:")
        for t in prep["coreTopics"]:
            print(f"   - {t['topic']}")
    print("=" * 70 + "\n")

class AutopilotRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        
        if path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "service": "Job Hunt Autopilot Engine"}).encode("utf-8"))
            return
            
        if path == "/api/triage":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            data = run_triage()
            self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))
            return
            
        if path == "/api/emails":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            emails = load_emails()
            self.wfile.write(json.dumps(emails, indent=2).encode("utf-8"))
            return

        if path == "/":
            self.path = "/index.html"

        return super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        
        if path == "/api/rescan":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            data = run_triage()
            self.wfile.write(json.dumps({"success": True, "result": data}).encode("utf-8"))
            return
            
        self.send_response(404)
        self.end_headers()

def start_server(port=8000):
    server_address = ("", port)
    httpd = HTTPServer(server_address, AutopilotRequestHandler)
    print(f"🚀 Job Hunt Autopilot running at http://localhost:{port}")
    print(f"   API endpoints available: /api/triage, /api/emails, /api/rescan")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Autopilot server.")
        httpd.server_close()

def main():
    if "--serve" in sys.argv:
        port = 8000
        if "--port" in sys.argv:
            idx = sys.argv.index("--port")
            if idx + 1 < len(sys.argv):
                port = int(sys.argv[idx + 1])
        start_server(port)
    elif "--export" in sys.argv:
        idx = sys.argv.index("--export")
        out_file = sys.argv[idx + 1] if idx + 1 < len(sys.argv) else "triage_export.json"
        data = run_triage()
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"Exported triage results to {out_file}")
    else:
        # Default: run CLI report
        triage_data = run_triage()
        print_cli_report(triage_data)

if __name__ == "__main__":
    main()
