# Скрипт автоматической проверки и переустановки русификации Claude Code
# Версия: 1.0
# Использование: Добавьте в планировщик задач или запускайте вручную

$ErrorActionPreference = "SilentlyContinue"

# Пути
$claudeCodePath = "$env:APPDATA\npm\node_modules\@anthropic-ai\claude-code"
$translationFile = Join-Path $claudeCodePath "claude-ru.cjs"
$versionFile = "$env:USERPROFILE\.claude-ru-version"
$installScript = "$env:USERPROFILE\claude-ru-install.ps1"
$logFile = "$env:USERPROFILE\.claude-ru-autocheck.log"

# Функция логирования
function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $Message" | Out-File -FilePath $logFile -Append -Encoding UTF8
}

Write-Log "=== Запуск проверки ==="

# Проверяем установлен ли Claude Code
if (-not (Test-Path $claudeCodePath)) {
    Write-Log "Claude Code не установлен, выход"
    exit 0
}

# Получаем текущую версию Claude Code
try {
    $packageJson = Get-Content (Join-Path $claudeCodePath "package.json") | ConvertFrom-Json
    $currentVersion = $packageJson.version
    Write-Log "Текущая версия Claude Code: $currentVersion"
} catch {
    Write-Log "Ошибка чтения версии: $_"
    exit 1
}

# Проверяем существует ли файл перевода
$needsReinstall = $false

if (-not (Test-Path $translationFile)) {
    Write-Log "Файл перевода не найден, требуется установка"
    $needsReinstall = $true
} else {
    # Проверяем версию при последней установке
    if (Test-Path $versionFile) {
        try {
            $versionInfo = Get-Content $versionFile | ConvertFrom-Json
            $installedVersion = $versionInfo.version
            Write-Log "Версия при последней установке: $installedVersion"

            if ($installedVersion -ne $currentVersion) {
                Write-Log "Обнаружено обновление: $installedVersion -> $currentVersion"
                $needsReinstall = $true
            } else {
                Write-Log "Версия не изменилась, переустановка не требуется"
            }
        } catch {
            Write-Log "Ошибка чтения файла версии: $_"
            $needsReinstall = $true
        }
    } else {
        Write-Log "Файл версии не найден, требуется переустановка"
        $needsReinstall = $true
    }
}

# Переустанавливаем если необходимо
if ($needsReinstall) {
    Write-Log "Запуск переустановки..."

    if (Test-Path $installScript) {
        try {
            & $installScript
            Write-Log "Переустановка завершена успешно"
        } catch {
            Write-Log "Ошибка при переустановке: $_"
            exit 1
        }
    } else {
        Write-Log "Скрипт установки не найден: $installScript"
        Write-Log "Пожалуйста, запустите ручную установку"
        exit 1
    }
} else {
    Write-Log "Проверка завершена, действий не требуется"
}

Write-Log "=== Проверка завершена ==="
