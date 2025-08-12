@echo off
REM Change to the directory of this script (the client folder)
cd /d "%~dp0"
set BROWSER=none
set FORCE_COLOR=true
npm start
