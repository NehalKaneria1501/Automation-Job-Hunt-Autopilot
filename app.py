#!/usr/bin/env python3
"""
Job Hunt Autopilot — Application Launcher
Runs `python app.py` to start the modern FastAPI + Uvicorn backend with
interactive Swagger documentation at /docs, Gemini AI engine, and APScheduler.
"""

import sys

def main():
    port = 8000
    if "--port" in sys.argv:
        try:
            idx = sys.argv.index("--port")
            if idx + 1 < len(sys.argv):
                port = int(sys.argv[idx + 1])
        except Exception:
            pass

    if "--cli" in sys.argv:
        import autopilot
        autopilot.init_db()
        data = autopilot.run_triage()
        autopilot.print_cli_report(data)
        return

    # Launch FastAPI + Uvicorn modern web server
    try:
        import server
        print("\n" + "=" * 68)
        print(f" 🚀 Job Hunt Autopilot is LIVE & RUNNING at http://localhost:{port}")
        print("=" * 68)
        print(f" 👉 Open in your browser : http://localhost:{port}")
        print(f" 📖 Interactive Swagger  : http://localhost:{port}/docs")
        print(f" 📄 ReDoc Documentation  : http://localhost:{port}/redoc")
        print(f" 📊 Database             : SQLite (autopilot.db)")
        print(f" 🤖 AI Career Copilot    : POST /api/chat (Gemini SDK & Heuristics)")
        print(f" 🧠 AI Resume Matcher    : POST /api/automate/resume-match")
        print(f" 🌐 Job Scraper (BS4)    : POST /api/automate/scrape-job")
        print(f" ⚡ Auto-Sync Poller     : GET /api/automate/sync-status (APScheduler)")
        print("-" * 68)
        print(" 💡 This server is active and listening for web requests.")
        print("    Press CTRL+C anytime in this terminal to stop the server.")
        print("=" * 68 + "\n")
        server.run_fastapi(port=port)
    except Exception as e:
        print(f"⚠️ FastAPI runner fallback ({e}), launching standard HTTP server...")
        import autopilot
        autopilot.start_server(port=port)

if __name__ == "__main__":
    main()
