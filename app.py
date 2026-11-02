#!/usr/bin/env python3
"""
Job Hunt Autopilot — Application Launcher
Enables running `python app.py` to immediately start the local web server,
SQLite database, REST APIs, and AI Career Copilot.
"""

import sys
import autopilot

def main():
    # If executed without arguments, default to starting the web server on port 8000
    if len(sys.argv) == 1:
        autopilot.start_server(port=8000)
    elif "--cli" in sys.argv:
        autopilot.init_db()
        data = autopilot.run_triage()
        autopilot.print_cli_report(data)
    else:
        # Pass flags (--serve, --port, --export) directly to autopilot.main()
        autopilot.main()

if __name__ == "__main__":
    main()
