# 📦 Как создать релиз на GitHub

## Шаг 1: Убедитесь, что все файлы загружены

```bash
cd C:\Users\OrlovaEN\claude-code-ru

# Инициализируйте git, если еще не сделано
git init

# Добавьте все файлы
git add .

# Создайте коммит
git commit -m "Release v2.0.0: PTY support and 470+ translations"

# Добавьте удаленный репозиторий (если еще не добавлен)
git remote add origin https://github.com/logansin/claude-code-ru.git

# Отправьте на GitHub
git push -u origin main
```

## Шаг 2: Создайте релиз на GitHub

### Через веб-интерфейс:

1. Откройте https://github.com/logansin/claude-code-ru
2. Нажмите **"Releases"** (справа)
3. Нажмите **"Create a new release"**
4. Заполните форму:

   **Tag version:**
   ```
   v2.0.0
   ```

   **Release title:**
   ```
   🎉 v2.0.0 - PTY Support & 470+ Translations
   ```

   **Description:** (скопируйте из RELEASE_NOTES_v2.0.0.md)

5. Нажмите **"Publish release"**

### Через командную строку (gh CLI):

```bash
# Установите GitHub CLI, если еще нет
# https://cli.github.com/

# Создайте релиз
gh release create v2.0.0 \
  --title "🎉 v2.0.0 - PTY Support & 470+ Translations" \
  --notes-file RELEASE_NOTES_v2.0.0.md
```

## Шаг 3: Добавьте Topics (теги)

1. На главной странице репозитория нажмите ⚙️ (Settings) справа от About
2. Добавьте topics:
   ```
   claude
   claude-code
   claude-ai
   russian
   localization
   translation
   cli
   terminal
   anthropic
   i18n
   l10n
   russian-language
   pty
   node-pty
   windows
   powershell
   ```
3. Нажмите "Save changes"

## Шаг 4: Настройте описание репозитория

В разделе About добавьте:

**Description:**
```
🇷🇺 Russian localization for Claude Code CLI | Русская локализация Claude Code с 470+ переводами и поддержкой PTY
```

**Website:** (опционально)
```
https://github.com/logansin/claude-code-ru
```

## Готово! 🎉

Ваш релиз опубликован и репозиторий оптимизирован для поиска!

### Поделитесь проектом:

- Reddit: r/programming, r/commandline
- Habr.com (русскоязычный IT-портал)
- VC.ru
- Twitter/X с хештегами: #ClaudeCode #AI #CLI #Russian
- Telegram каналы про AI и разработку
