@echo off
echo.
echo Installing Claude-RU localization...
echo.

set "CLAUDE_PATH=%APPDATA%\npm\node_modules\@anthropic-ai\claude-code"
set "TEMPLATE=%USERPROFILE%\claude-ru-template.cjs"

if not exist "%CLAUDE_PATH%" (
    echo ERROR: Claude Code not found!
    echo Install with: npm install -g @anthropic-ai/claude-code
    pause
    exit /b 1
)

if not exist "%TEMPLATE%" (
    echo ERROR: Template file not found: %TEMPLATE%
    echo Please ensure claude-ru-template.cjs exists
    pause
    exit /b 1
)

copy /Y "%TEMPLATE%" "%CLAUDE_PATH%\claude-ru.cjs" >nul
echo [OK] Translation file installed

echo.
echo Installation complete!
echo Usage: claude-ru --help
echo.
pause
