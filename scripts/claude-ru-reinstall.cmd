@echo off
REM Быстрая переустановка русификации Claude Code
echo.
echo ╔════════════════════════════════════════════════╗
echo ║  Переустановка русификации Claude Code        ║
echo ╚════════════════════════════════════════════════╝
echo.

powershell -ExecutionPolicy Bypass -File "%USERPROFILE%\claude-ru-install.ps1"

echo.
echo Нажмите любую клавишу для выхода...
pause >nul
