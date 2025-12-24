# Базовые примеры использования Claude Code RU

Write-Host "=== Примеры использования Claude Code RU ===" -ForegroundColor Cyan
Write-Host ""

# 1. Справка
Write-Host "1. Справка на русском:" -ForegroundColor Green
Write-Host "   claude-ru --help"
Write-Host ""

# 2. Версия
Write-Host "2. Проверка версии:" -ForegroundColor Green
Write-Host "   claude-ru --version"
Write-Host ""

# 3. Быстрый запрос
Write-Host "3. Быстрый запрос (неинтерактивный режим):" -ForegroundColor Green
Write-Host '   claude-ru --print "что такое npm?"'
Write-Host '   claude-ru -p "объясни async/await"'
Write-Host ""

# 4. Интерактивная сессия
Write-Host "4. Интерактивная сессия:" -ForegroundColor Green
Write-Host "   claude-ru"
Write-Host "   (Откроется интерактивный режим для общения)"
Write-Host ""

# 5. Выбор модели
Write-Host "5. Выбор модели:" -ForegroundColor Green
Write-Host "   claude-ru --model sonnet -p 'вопрос'"
Write-Host "   claude-ru --model opus -p 'сложный вопрос'"
Write-Host "   claude-ru --model haiku -p 'простой вопрос'"
Write-Host ""

# 6. Продолжить разговор
Write-Host "6. Продолжить предыдущий разговор:" -ForegroundColor Green
Write-Host "   claude-ru --continue"
Write-Host "   claude-ru -c"
Write-Host ""

# 7. Verbose режим
Write-Host "7. Подробный вывод:" -ForegroundColor Green
Write-Host "   claude-ru --verbose -p 'вопрос'"
Write-Host ""

# 8. Debug режим
Write-Host "8. Отладка:" -ForegroundColor Green
Write-Host "   claude-ru --debug -p 'вопрос'"
Write-Host ""

# Практические примеры
Write-Host ""
Write-Host "=== Практические примеры ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Пример 1: Объяснить концепцию" -ForegroundColor Yellow
Write-Host 'claude-ru -p "объясни что такое замыкания в JavaScript простыми словами"'
Write-Host ""

Write-Host "Пример 2: Код review" -ForegroundColor Yellow
Write-Host 'Get-Content script.ps1 | claude-ru -p "проверь этот код на ошибки"'
Write-Host ""

Write-Host "Пример 3: Создание документации" -ForegroundColor Yellow
Write-Host 'claude-ru -p "создай README для проекта калькулятора на Python"'
Write-Host ""

Write-Host "Пример 4: Отладка ошибок" -ForegroundColor Yellow
Write-Host 'claude-ru -p "почему возникает ошибка ''cannot read property of undefined''?"'
Write-Host ""

Write-Host "Пример 5: Генерация кода" -ForegroundColor Yellow
Write-Host 'claude-ru -p "напиши функцию сортировки массива на JavaScript"'
Write-Host ""

# Сравнение с английской версией
Write-Host ""
Write-Host "=== Сравнение с английской версией ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Английская версия:" -ForegroundColor Green
Write-Host "   claude --help"
Write-Host "   # Output: Usage: claude [options] [command] [prompt]"
Write-Host ""

Write-Host "Русская версия:" -ForegroundColor Green
Write-Host "   claude-ru --help"
Write-Host "   # Output: Использование: claude [опции] [команда] [запрос]"
Write-Host ""

Write-Host "Функционально обе команды идентичны!" -ForegroundColor Yellow
Write-Host ""

# Сохранение вывода
Write-Host ""
Write-Host "=== Сохранение вывода ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "В файл:" -ForegroundColor Green
Write-Host 'claude-ru -p "создай список команд git" > git-commands.txt'
Write-Host ""

Write-Host "В буфер обмена:" -ForegroundColor Green
Write-Host 'claude-ru -p "команды PowerShell" | Set-Clipboard'
Write-Host ""

Write-Host "Форматирование в JSON:" -ForegroundColor Green
Write-Host 'claude-ru -p "данные" --output-format json > data.json'
Write-Host ""
