# Продвинутые примеры использования Claude Code RU

Write-Host "=== Продвинутые примеры Claude Code RU ===" -ForegroundColor Cyan
Write-Host ""

# 1. Комбинация опций
Write-Host "1. Комбинация нескольких опций:" -ForegroundColor Green
Write-Host @"
claude-ru --model opus \`
          --verbose \`
          --debug "api" \`
          -p "сложный вопрос"
"@
Write-Host ""

# 2. Работа с инструментами
Write-Host "2. Управление инструментами:" -ForegroundColor Green
Write-Host @"
# Разрешить только определенные инструменты
claude-ru --allowed-tools "Bash,Edit,Read" -p "вопрос"

# Запретить инструменты
claude-ru --disallowed-tools "Bash(git:*)" -p "вопрос"

# Отключить все инструменты
claude-ru --tools "" -p "вопрос"
"@
Write-Host ""

# 3. Работа с MCP серверами
Write-Host "3. MCP серверы:" -ForegroundColor Green
Write-Host @"
# Загрузить MCP конфигурацию
claude-ru --mcp-config "servers.json" -p "вопрос"

# Строгий режим MCP
claude-ru --strict-mcp-config --mcp-config "my-servers.json"

# Debug для MCP
claude-ru --mcp-debug
"@
Write-Host ""

# 4. Настройка и конфигурация
Write-Host "4. Загрузка настроек:" -ForegroundColor Green
Write-Host @"
# Из файла
claude-ru --settings "my-settings.json" -p "вопрос"

# Из JSON строки
claude-ru --settings '{\"setting\":\"value\"}' -p "вопрос"

# Источники настроек
claude-ru --setting-sources "user,project" -p "вопрос"
"@
Write-Host ""

# 5. Работа с сессиями
Write-Host "5. Управление сессиями:" -ForegroundColor Green
Write-Host @"
# Возобновить с поиском
claude-ru --resume "название проекта"

# Fork сессии
claude-ru --resume <session-id> --fork-session

# Без сохранения сессии
claude-ru --no-session-persistence -p "вопрос"

# Конкретный ID сессии
claude-ru --session-id "your-uuid-here"
"@
Write-Host ""

# 6. Структурированный вывод
Write-Host "6. JSON Schema валидация:" -ForegroundColor Green
Write-Host @"
claude-ru -p "данные пользователя" \`
  --json-schema '{
    \"type\":\"object\",
    \"properties\":{
      \"name\":{\"type\":\"string\"},
      \"age\":{\"type\":\"number\"}
    },
    \"required\":[\"name\"]
  }'
"@
Write-Host ""

# 7. Бюджет и ограничения
Write-Host "7. Контроль расходов:" -ForegroundColor Green
Write-Host @"
# Максимальный бюджет
claude-ru --max-budget-usd 5.00 -p "длинный запрос"
"@
Write-Host ""

# 8. Интеграция с другими инструментами
Write-Host "8. Интеграция с другими командами:" -ForegroundColor Green
Write-Host @"
# Анализ логов
Get-Content app.log | Select-String "ERROR" | claude-ru -p "проанализируй ошибки"

# Code review из Git
git diff | claude-ru -p "проверь изменения"

# Анализ структуры проекта
Get-ChildItem -Recurse | claude-ru -p "опиши структуру проекта"

# Оптимизация кода
Get-Content slow-script.ps1 | claude-ru --model opus -p "как оптимизировать этот код?"
"@
Write-Host ""

# Практические сценарии
Write-Host ""
Write-Host "=== Практические сценарии ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Сценарий 1: Автоматизированное тестирование" -ForegroundColor Yellow
Write-Host @"
# Генерация тестов
claude-ru -p "создай unit тесты для функции validateEmail" > tests/email.test.js

# Проверка покрытия
claude-ru -p "проверь достаточно ли тестов для этого модуля" < mymodule.js
"@
Write-Host ""

Write-Host "Сценарий 2: Рефакторинг кода" -ForegroundColor Yellow
Write-Host @"
# Найти код smell
Get-Content legacy-code.js | claude-ru --model opus -p "найди проблемы и предложи улучшения"

# Современный синтаксис
claude-ru -p "переведи этот код на современный ES6+" < old-script.js > modern-script.js
"@
Write-Host ""

Write-Host "Сценарий 3: Документация" -ForegroundColor Yellow
Write-Host @"
# Генерация JSDoc
Get-Content functions.js | claude-ru -p "добавь JSDoc комментарии"

# README из кода
Get-ChildItem *.js | ForEach-Object {Get-Content `$_} |
  claude-ru -p "создай README для этого проекта" > README.md
"@
Write-Host ""

Write-Host "Сценарий 4: Отладка и диагностика" -ForegroundColor Yellow
Write-Host @"
# Анализ stack trace
claude-ru --verbose -p "объясни эту ошибку и как её исправить" < error.log

# Performance анализ
claude-ru --model opus -p "как улучшить производительность?" < slow-code.js
"@
Write-Host ""

Write-Host "Сценарий 5: Обучение и изучение" -ForegroundColor Yellow
Write-Host @"
# Объяснить чужой код
Get-Content complex-algorithm.js | claude-ru -p "объясни что делает этот код пошагово"

# Изучить библиотеку
claude-ru -p "как использовать библиотеку axios? покажи примеры"

# Best practices
claude-ru -p "best practices для работы с async/await в Node.js"
"@
Write-Host ""

# Создание функций-хелперов
Write-Host ""
Write-Host "=== Функции-хелперы для PowerShell профиля ===" -ForegroundColor Cyan
Write-Host ""

Write-Host @"
# Добавьте в `$PROFILE:

# Быстрый запрос
function Ask {
    claude-ru -p `$args
}

# С моделью Opus
function AskOpus {
    claude-ru --model opus -p `$args
}

# Code review
function Review {
    Get-Content `$args | claude-ru -p "проверь этот код"
}

# Объяснить код
function Explain {
    Get-Content `$args | claude-ru -p "объясни этот код"
}

# Генерация тестов
function GenTests {
    Get-Content `$args | claude-ru -p "создай unit тесты"
}

# Перевод текста
function Translate {
    claude-ru -p "переведи на английский: `$args"
}

# Использование:
# Ask "что такое Docker?"
# Review script.js
# Explain algorithm.py
# GenTests myfunction.js
# Translate "привет мир"
"@
Write-Host ""

# Автоматизация с расписанием
Write-Host ""
Write-Host "=== Автоматизация ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Пример: Ежедневный отчет из логов" -ForegroundColor Yellow
Write-Host @"
# daily-report.ps1

`$today = Get-Date -Format "yyyy-MM-dd"
`$logs = Get-Content "app-`$today.log" | Select-String "ERROR|WARNING"

`$report = `$logs | claude-ru --model opus -p @"
Проанализируй эти логи и создай краткий отчет:
- Количество ошибок
- Критичные проблемы
- Рекомендации по исправлению
"@

`$report | Out-File "report-`$today.md"
Send-MailMessage -To "admin@example.com" -Subject "Daily Report" -Body `$report
"@
Write-Host ""

Write-Host "=== Дополнительные ресурсы ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "- Документация: docs/USAGE.md"
Write-Host "- Базовые примеры: examples/basic-usage.ps1"
Write-Host "- Troubleshooting: docs/TROUBLESHOOTING.md"
Write-Host ""
