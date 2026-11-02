#!/usr/bin/env python3
"""
Job Hunt Autopilot — Modern FastAPI & Pydantic Application Server
Includes interactive Swagger docs (/docs), REST APIs, AI Copilot, and Automation Workers.
"""

import os
import sys
import json
from datetime import datetime
from typing import List, Dict, Any, Optional

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

import autopilot
import ai_engine
import automation_engine

app = FastAPI(
    title="Job Hunt Autopilot API",
    version="3.3.0",
    description="Autonomous Executive Career Cockpit, Zero-Trust Fraud Interceptor & AI Copilot with SQLite, Gemini GenAI & APScheduler",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic Schemas
class ChatPayload(BaseModel):
    message: str = Field(..., description="User prompt or inquiry")
    history: Optional[List[Dict[str, Any]]] = Field(default=[], description="Previous conversation turns")


class ScrapeJobPayload(BaseModel):
    url: Optional[str] = Field(default=None, description="Direct URL to job posting (LinkedIn, Greenhouse, Lever, etc.)")
    html: Optional[str] = Field(default=None, description="Raw HTML snippet of the job posting")


class ResumeReviewPayload(BaseModel):
    resume_text: str = Field(..., description="Raw text of candidate's resume")
    job_description: str = Field(..., description="Target job description")


class ApplicationPayload(BaseModel):
    id: Optional[int] = None
    company: str
    role: str
    salary: Optional[str] = "Competitive"
    location: Optional[str] = "Remote"
    status: Optional[str] = "applied"
    sender: Optional[str] = "recruiter@company.com"
    subject: Optional[str] = "Application Follow-up"
    body: Optional[str] = "Application registered."
    notes: Optional[str] = ""


class SyncConfigPayload(BaseModel):
    interval_minutes: int = Field(default=15, ge=1, le=1440, description="Synchronization interval in minutes")
    active: bool = Field(default=True, description="Whether background synchronization is active")


@app.on_event("startup")
async def startup_event():
    """Initializes SQLite database and starts APScheduler worker on server boot."""
    autopilot.init_db()
    automation_engine.sync_worker.start()
    print("🚀 FastAPI Server initialized with SQLite and APScheduler.")


@app.on_event("shutdown")
async def shutdown_event():
    automation_engine.sync_worker.stop()


# Core Web Routes
@app.get("/", include_in_schema=False)
async def serve_index():
    index_path = os.path.join(os.path.dirname(__file__), "index.html")
    return FileResponse(index_path)


@app.get("/api/status", tags=["System"])
async def get_system_status():
    return {
        "status": "healthy",
        "framework": "FastAPI + Uvicorn",
        "database": "sqlite3 (autopilot.db)",
        "docs": "/docs",
        "gemini_sdk": ai_engine.HAVE_GEMINI_SDK,
        "scheduler": automation_engine.HAVE_APSCHEDULER,
        "scraper": automation_engine.HAVE_BS4
    }


@app.get("/api/db/status", tags=["Database"])
async def get_database_status():
    autopilot.init_db()
    conn = autopilot.get_db()
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM applications")
    total = c.fetchone()[0]
    c.execute("SELECT COUNT(*) FROM threat_logs")
    threats = c.fetchone()[0]
    conn.close()

    return {
        "database": "sqlite3",
        "file": autopilot.DB_FILE,
        "tables": ["applications", "threat_logs"],
        "records_count": total,
        "threat_logs_count": threats,
        "active": True
    }


@app.get("/api/db/applications", tags=["Database"])
async def get_all_applications():
    autopilot.init_db()
    conn = autopilot.get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM applications ORDER BY id ASC")
    rows = [dict(r) for r in c.fetchall()]
    conn.close()
    return rows


@app.post("/api/db/applications", tags=["Database"])
async def save_application(payload: ApplicationPayload):
    try:
        conn = autopilot.get_db()
        c = conn.cursor()
        if payload.id:
            c.execute("""
                UPDATE applications
                SET company = ?, role = ?, salary = ?, status = ?, notes = ?
                WHERE id = ?
            """, (payload.company, payload.role, payload.salary, payload.status, payload.notes, payload.id))
        else:
            c.execute("""
                INSERT INTO applications (company, role, sender, subject, body, date, days_ago, salary, location, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                payload.company,
                payload.role,
                payload.sender,
                payload.subject,
                payload.body,
                datetime.now().strftime("%Y-%m-%d"),
                0,
                payload.salary,
                payload.location,
                payload.status
            ))
        conn.commit()
        conn.close()
        return {"success": True, "message": f"Application for {payload.company} saved to SQLite."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/db/reset", tags=["Database"])
async def reset_database():
    autopilot.seed_db_from_emails()
    data = autopilot.run_triage()
    return {"success": True, "message": "Database reset to default 20 emails", "result": data}


@app.get("/api/triage", tags=["Triage"])
async def get_triage_data():
    return autopilot.run_triage()


@app.post("/api/rescan", tags=["Triage"])
async def trigger_rescan():
    data = autopilot.run_triage()
    return {"success": True, "result": data}


@app.get("/api/emails", tags=["Triage"])
async def get_raw_emails():
    return autopilot.load_emails()


# AI Career Copilot Routes
@app.post("/api/chat", tags=["AI Copilot"])
async def chat_with_copilot(payload: ChatPayload):
    try:
        response = autopilot.handle_ai_chat(payload.message, payload.history)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/automate/resume-match", tags=["AI Copilot"])
async def resume_match_and_critique(payload: ResumeReviewPayload):
    """Evaluates a resume against a job description, computing ATS score and STAR recommendations."""
    return ai_engine.critique_resume_for_job(payload.resume_text, payload.job_description)


# Automation & Scraping Routes
@app.post("/api/automate/scrape-job", tags=["Automation"])
async def scrape_job(payload: ScrapeJobPayload):
    """Scrapes a job posting using BeautifulSoup4 and returns parsed company, role, salary & skills."""
    return automation_engine.scrape_job_details(url=payload.url, html=payload.html)


@app.get("/api/automate/sync-status", tags=["Automation"])
async def get_sync_status():
    """Returns background APScheduler synchronization health and last run timestamp."""
    return automation_engine.sync_worker.get_status()


@app.post("/api/automate/trigger-sync", tags=["Automation"])
async def trigger_manual_sync():
    """Triggers an immediate background synchronization cycle."""
    return automation_engine.sync_worker.trigger_immediate_sync()


@app.post("/api/automate/configure-sync", tags=["Automation"])
async def configure_sync(payload: SyncConfigPayload):
    """Updates background worker polling interval."""
    automation_engine.sync_worker.interval_minutes = payload.interval_minutes
    if payload.active:
        automation_engine.sync_worker.start()
    else:
        automation_engine.sync_worker.stop()
    return {"success": True, "status": automation_engine.sync_worker.get_status()}


# Static assets serving (app.js, styles, etc.)
app.mount("/", StaticFiles(directory=os.path.dirname(__file__), html=True), name="static")


def run_fastapi(port: int = 8000, max_retries: int = 5):
    import uvicorn
    import socket

    current_port = port
    for _ in range(max_retries):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            in_use = (s.connect_ex(('127.0.0.1', current_port)) == 0)
        if not in_use:
            break
        print(f"⚠️ Port {current_port} is busy. Trying fallback port {current_port + 1}...")
        current_port += 1

    uvicorn.run(app, host="0.0.0.0", port=current_port, log_level="info")


if __name__ == "__main__":
    port = 8000
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    run_fastapi(port)
