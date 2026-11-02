#!/usr/bin/env python3
"""
Job Hunt Autopilot — AI Career Intelligence Engine
Powered by Google Gemini SDK (google-genai) with zero-key autonomous heuristic fallbacks.
"""

import os
import json
import re
from typing import Dict, Any, List, Optional

# Attempt to load google-genai SDK
HAVE_GEMINI_SDK = False
try:
    from google import genai
    from google.genai import types
    HAVE_GEMINI_SDK = True
except ImportError:
    HAVE_GEMINI_SDK = False


def get_gemini_client():
    """Initializes and returns the Google GenAI client if API key is present."""
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key or not HAVE_GEMINI_SDK:
        return None
    try:
        return genai.Client(api_key=api_key)
    except Exception as e:
        print(f"[AI Engine] Could not initialize Gemini client: {e}")
        return None


def generate_gemini_response(prompt: str, system_instruction: str, model: str = "gemini-2.5-flash") -> Optional[str]:
    """Generates a text completion using Gemini GenAI SDK."""
    client = get_gemini_client()
    if not client:
        return None
    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3,
                max_output_tokens=1200
            )
        )
        return response.text
    except Exception as e:
        print(f"[AI Engine] Gemini API call error: {e}")
        return None


def critique_resume_for_job(resume_text: str, job_description: str) -> Dict[str, Any]:
    """
    Evaluates a candidate resume against a job description.
    Produces ATS match score, missing keywords, and tailored STAR bullets.
    """
    system_instruction = (
        "You are a Principal Engineering Recruiter and Executive Career Coach. "
        "Analyze the provided Resume against the Job Description. "
        "Return a strictly valid JSON object with the following keys:\n"
        "- matchScore (integer 0-100)\n"
        "- matchGrade ('A+', 'A', 'B', 'C', or 'D')\n"
        "- summary (concise 2-sentence executive summary)\n"
        "- missingKeywords (list of strings, top missing technical skills/keywords)\n"
        "- matchingKeywords (list of strings, strongest matches)\n"
        "- improvements (list of 3 actionable bullet suggestions in STAR format)\n"
        "Return ONLY the raw JSON object, without backticks or markdown fences."
    )

    prompt = f"RESUME:\n{resume_text}\n\nJOB DESCRIPTION:\n{job_description}"
    gemini_raw = generate_gemini_response(prompt, system_instruction)

    if gemini_raw:
        try:
            # Clean markdown code blocks if returned
            clean_json = re.sub(r"^```[a-z]*\s*", "", gemini_raw.strip(), flags=re.I)
            clean_json = re.sub(r"\s*```$", "", clean_json.strip())
            return json.loads(clean_json)
        except Exception:
            pass

    # Autonomous Fallback Engine (computes keyword overlap & heuristic score)
    resume_words = set(re.findall(r"\b[a-zA-Z]{3,}\b", resume_text.lower()))
    job_words = set(re.findall(r"\b[a-zA-Z]{3,}\b", job_description.lower()))

    # Common technical stop words
    ignore_words = {"the", "and", "for", "with", "that", "this", "from", "have", "will", "your", "our", "are"}
    tech_candidates = job_words - ignore_words

    matched = sorted(list(resume_words.intersection(tech_candidates)))[:10]
    missing = sorted(list(tech_candidates - resume_words))[:8]

    overlap_ratio = len(matched) / max(len(tech_candidates), 1)
    score = min(95, max(45, int(overlap_ratio * 120) + 40))

    if score >= 85:
        grade = "A+"
    elif score >= 75:
        grade = "A"
    elif score >= 65:
        grade = "B"
    else:
        grade = "C"

    return {
        "matchScore": score,
        "matchGrade": grade,
        "summary": f"Your background exhibits strong alignment with {len(matched)} core domain skills, but highlights {len(missing)} ATS keyword gaps.",
        "matchingKeywords": matched[:6],
        "missingKeywords": missing[:6],
        "improvements": [
            f"Explicitly weave '{missing[0] if missing else 'Distributed Systems'}' into your recent project impact bullets.",
            "Quantify scale metrics (e.g. throughput in req/sec, latency reduction in ms, or cost savings in %).",
            "Align job title keywords in your summary section to match the job opening precisely."
        ],
        "source": "gemini-sdk" if gemini_raw else "python-heuristic-engine"
    }


def forensic_scam_analysis(body: str, sender: str, company: str) -> Dict[str, Any]:
    """
    Forensic analysis of a suspicious offer email.
    Evaluates Advance Fees, Corporate Spoofing, and PII Harvesting.
    """
    flags = []
    risk_score = 0

    lower_body = (body + " " + sender).lower()

    # Heuristic 1: Free-mail domain spoofing
    free_domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "rediffmail.com", "proton.me"]
    sender_domain = sender.split("@")[-1].lower() if "@" in sender else ""
    if any(sender_domain == d for d in free_domains):
        flags.append("Free-Mail Impersonation: Sender uses public email provider posing as corporate recruiter.")
        risk_score += 45

    # Heuristic 2: Advance fees
    fee_triggers = ["fee", "deposit", "laptop", "equipment", "payment", "crypto", "gpay", "phonepe", "reimburse"]
    for trig in fee_triggers:
        if trig in lower_body:
            flags.append(f"Advance Fee Trigger: Email mentions monetary deposit/fee keyword ('{trig}').")
            risk_score += 35
            break

    # Heuristic 3: PII Harvesting
    pii_triggers = ["aadhaar", "pan card", "bank passbook", "ssn", "passport scan"]
    for trig in pii_triggers:
        if trig in lower_body:
            flags.append(f"Premature KYC Extortion: Requests sensitive ID documents ('{trig}') prior to interview.")
            risk_score += 40
            break

    risk_score = min(100, risk_score)
    is_scam = risk_score >= 50

    return {
        "isScam": is_scam,
        "riskScore": risk_score,
        "flags": flags,
        "company": company,
        "sender": sender,
        "verdict": "HOSTILE SCAM (QUARANTINED)" if is_scam else "VERIFIED LEGITIMATE",
        "action": "Block sender, alert recipient, quarantine in SQLite threat_logs" if is_scam else "Safe to proceed"
    }
