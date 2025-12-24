@echo off
REM Claude Code RU - Main Installer
REM Run this to install Russian localization

echo.
echo ========================================
echo   Claude Code RU Installer
echo ========================================
echo.

REM Check if Claude Code is installed
where claude >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Claude Code not found!
    echo.
    echo Please install Claude Code first:
    echo   npm install -g @anthropic-ai/claude-code
    echo.
    pause
    exit /b 1
)

echo [OK] Claude Code found
echo.

REM Copy translation template
echo Copying translation file...
copy /Y "%~dp0src\claude-ru.cjs" "%USERPROFILE%\claude-ru-template.cjs" >nul
if errorlevel 1 (
    echo [ERROR] Failed to copy translation file
    pause
    exit /b 1
)
echo [OK] Translation template created
echo.

REM Run installation script
echo Running installation script...
call "%~dp0scripts\claude-ru-install.cmd"
if errorlevel 1 (
    echo [ERROR] Installation failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Installation completed!
echo ========================================
echo.
echo Usage:
echo   claude-ru --help
echo   claude-ru --print "your question"
echo.
echo Note: Restart PowerShell or run: . $PROFILE
echo.
pause
