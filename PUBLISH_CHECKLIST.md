# ✅ Чеклист для публикации релиза v2.0.0

## Перед публикацией

- [x] Обновлен src/claude-ru.cjs (PTY + 470+ переводов)
- [x] Обновлен install.cmd (автоустановка node-pty)
- [x] Обновлен README.md (бейджи, новые возможности)
- [x] Создан CHANGELOG.md
- [x] Все ссылки обновлены на logansin
- [x] Создан RELEASE_NOTES_v2.0.0.md
- [x] Проверен .gitignore

## Шаги для публикации

### 1. Инициализация Git (если еще не сделано)

```bash
cd C:\Users\OrlovaEN\claude-code-ru
git init
git add .
git commit -m "Release v2.0.0: PTY support and 470+ translations"
```

### 2. Связать с GitHub

```bash
git remote add origin https://github.com/logansin/claude-code-ru.git
git branch -M main
git push -u origin main
```

### 3. Создать релиз на GitHub

**Вариант A: Через веб-интерфейс**
1. Откройте https://github.com/logansin/claude-code-ru/releases/new
2. Tag: `v2.0.0`
3. Title: `🎉 v2.0.0 - PTY Support & 470+ Translations`
4. Description: Скопируйте из `RELEASE_NOTES_v2.0.0.md`
5. Нажмите "Publish release"

**Вариант B: Через gh CLI**
```bash
gh release create v2.0.0 \
  --title "🎉 v2.0.0 - PTY Support & 470+ Translations" \
  --notes-file RELEASE_NOTES_v2.0.0.md
```

### 4. Настроить репозиторий

1. **About section** (справа на главной странице):
   - Description: `🇷🇺 Russian localization for Claude Code CLI | Русская локализация Claude Code с 470+ переводами и поддержкой PTY`
   - Website: `https://github.com/logansin/claude-code-ru`

2. **Topics** (теги):
   ```
   claude, claude-code, claude-ai, russian, localization,
   translation, cli, terminal, anthropic, i18n, l10n,
   russian-language, pty, node-pty, windows, powershell
   ```

### 5. Поделиться проектом

**Русскоязычные ресурсы:**
- [ ] Habr.com - статья о проекте
- [ ] VC.ru - анонс
- [ ] Telegram каналы про AI
- [ ] VK группы разработчиков

**Международные:**
- [ ] Reddit: r/ClaudeAI, r/commandline
- [ ] Twitter/X: #ClaudeCode #AI #CLI
- [ ] Hacker News

## Готово! 🎉

Репозиторий опубликован и готов к использованию!

**Ссылка на релиз:** https://github.com/logansin/claude-code-ru/releases/tag/v2.0.0
