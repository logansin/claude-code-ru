# Скрипт настройки автоматической проверки обновлений через планировщик задач
# Версия: 1.0
# Требует прав администратора

# Проверка прав администратора
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║  ОШИБКА: Требуются права администратора!      ║" -ForegroundColor Red
    Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Red
    Write-Host ""
    Write-Host "Запустите PowerShell от имени администратора и выполните:" -ForegroundColor Yellow
    Write-Host "  .\claude-ru-setup-scheduler.ps1" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Настройка автоматической проверки            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Параметры задачи
$taskName = "Claude-RU-AutoCheck"
$taskDescription = "Автоматическая проверка и переустановка русификации Claude Code после обновлений"
$scriptPath = "$env:USERPROFILE\claude-ru-autocheck.ps1"
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name

Write-Host "→ Проверка скрипта автопроверки..." -ForegroundColor Cyan

if (-not (Test-Path $scriptPath)) {
    Write-Host "✗ Файл не найден: $scriptPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Пожалуйста, убедитесь что скрипт claude-ru-autocheck.ps1 находится в:" -ForegroundColor Yellow
    Write-Host "  $env:USERPROFILE" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Нажмите Enter для выхода"
    exit 1
}

Write-Host "✓ Скрипт найден" -ForegroundColor Green
Write-Host ""

# Меню выбора частоты проверки
Write-Host "Выберите частоту автоматической проверки:" -ForegroundColor Cyan
Write-Host "  1. При входе в систему" -ForegroundColor White
Write-Host "  2. Каждый день в 09:00" -ForegroundColor White
Write-Host "  3. Каждый час" -ForegroundColor White
Write-Host "  4. Удалить задачу из планировщика" -ForegroundColor Yellow
Write-Host "  5. Отмена" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Ваш выбор (1-5)"

# Удаляем существующую задачу если есть
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host ""
    Write-Host "→ Удаление существующей задачи..." -ForegroundColor Cyan
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "✓ Существующая задача удалена" -ForegroundColor Green
}

switch ($choice) {
    "1" {
        # При входе в систему
        Write-Host ""
        Write-Host "→ Создание задачи: Проверка при входе в систему..." -ForegroundColor Cyan

        $trigger = New-ScheduledTaskTrigger -AtLogOn -User $currentUser
        $action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""
        $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
        $principal = New-ScheduledTaskPrincipal -UserId $currentUser -LogonType Interactive -RunLevel Limited

        Register-ScheduledTask -TaskName $taskName -Description $taskDescription -Trigger $trigger -Action $action -Settings $settings -Principal $principal | Out-Null

        Write-Host "✓ Задача создана: Проверка при каждом входе в систему" -ForegroundColor Green
    }

    "2" {
        # Каждый день в 09:00
        Write-Host ""
        Write-Host "→ Создание задачи: Проверка каждый день в 09:00..." -ForegroundColor Cyan

        $trigger = New-ScheduledTaskTrigger -Daily -At 9am
        $action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""
        $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
        $principal = New-ScheduledTaskPrincipal -UserId $currentUser -LogonType Interactive -RunLevel Limited

        Register-ScheduledTask -TaskName $taskName -Description $taskDescription -Trigger $trigger -Action $action -Settings $settings -Principal $principal | Out-Null

        Write-Host "✓ Задача создана: Проверка каждый день в 09:00" -ForegroundColor Green
    }

    "3" {
        # Каждый час
        Write-Host ""
        Write-Host "→ Создание задачи: Проверка каждый час..." -ForegroundColor Cyan

        $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Hours 1) -RepetitionDuration ([TimeSpan]::MaxValue)
        $action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""
        $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
        $principal = New-ScheduledTaskPrincipal -UserId $currentUser -LogonType Interactive -RunLevel Limited

        Register-ScheduledTask -TaskName $taskName -Description $taskDescription -Trigger $trigger -Action $action -Settings $settings -Principal $principal | Out-Null

        Write-Host "✓ Задача создана: Проверка каждый час" -ForegroundColor Green
    }

    "4" {
        # Удаление задачи
        Write-Host ""
        Write-Host "✓ Задача удалена из планировщика" -ForegroundColor Green
        Write-Host ""
        Read-Host "Нажмите Enter для выхода"
        exit 0
    }

    "5" {
        # Отмена
        Write-Host ""
        Write-Host "Отменено пользователем" -ForegroundColor Yellow
        Write-Host ""
        Read-Host "Нажмите Enter для выхода"
        exit 0
    }

    default {
        Write-Host ""
        Write-Host "✗ Неверный выбор" -ForegroundColor Red
        Write-Host ""
        Read-Host "Нажмите Enter для выхода"
        exit 1
    }
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║     Автоматическая проверка настроена! ✓       ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Информация:" -ForegroundColor Cyan
Write-Host "  Имя задачи: $taskName" -ForegroundColor White
Write-Host "  Скрипт: $scriptPath" -ForegroundColor White
Write-Host "  Лог: $env:USERPROFILE\.claude-ru-autocheck.log" -ForegroundColor White
Write-Host ""
Write-Host "Управление задачей:" -ForegroundColor Cyan
Write-Host "  • Откройте: Планировщик заданий (taskschd.msc)" -ForegroundColor White
Write-Host "  • Найдите: $taskName" -ForegroundColor White
Write-Host "  • Для проверки вручную: Запустите claude-ru-autocheck.ps1" -ForegroundColor White
Write-Host ""

Read-Host "Нажмите Enter для выхода"
