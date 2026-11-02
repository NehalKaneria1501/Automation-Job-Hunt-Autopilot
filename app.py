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
        print(f"🚀 Starting FastAPI & Uvicorn Server at http://localhost:{port}")
        print(f"   Interactive Swagger Docs: http://localhost:{port}/docs")
        print(f"   Interactive ReDoc Docs:   http://localhost:{port}/redoc")
        print(f"   AI Engine: Google GenAI SDK & Heuristics")
        print(f"   Automation: BeautifulSoup4 & APScheduler")
        server.run_fastapi(port=port)
    except Exception as e:
        print(f"⚠️ FastAPI runner fallback ({e}), launching standard HTTP server...")
        import autopilot
        autopilot.start_server(port=port)

if __name__ == "__main__":
    main()
