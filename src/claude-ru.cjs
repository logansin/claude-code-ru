#!/usr/bin/env node

// Русская локализация для Claude Code
const { spawn } = require('child_process');
const path = require('path');

// Словарь переводов
const translations = {
  // Help screen - main
  'Usage: claude [options] [command] [prompt]': 'Использование: claude [опции] [команда] [запрос]',
  'Claude Code - starts an interactive session by default, use -p/--print for': 'Claude Code - запускает интерактивную сессию по умолчанию, используйте -p/--print для',
  'non-interactive output': 'неинтерактивного вывода',
  'Arguments:': 'Аргументы:',
  'Options:': 'Опции:',
  'Commands:': 'Команды:',
  'Your prompt': 'Ваш запрос',

  // Commands
  'Configure and manage MCP servers': 'Настроить и управлять MCP серверами',
  'Manage Claude Code plugins': 'Управление плагинами Claude Code',
  'Set up a long-lived authentication token': 'Настроить долгоживущий токен аутентификации',
  'requires Claude subscription': 'требуется подписка Claude',
  'Check the health of your Claude Code auto-updater': 'Проверить работоспособность автообновления Claude Code',
  'Check for updates and install if available': 'Проверить наличие обновлений и установить при наличии',
  'Install Claude Code native build. Use [target] to specify version': 'Установить нативную сборку Claude Code. Используйте [target] для указания версии',
  'stable, latest, or specific version': 'stable, latest или конкретная версия',

  // Options descriptions - detailed
  'Enable debug mode with optional category filtering': 'Включить режим отладки с опциональной фильтрацией категорий',
  'Override verbose mode setting from config': 'Переопределить настройку подробного режима из конфигурации',
  'Print response and exit': 'Вывести ответ и выйти',
  'useful for pipes': 'полезно для конвейеров',
  'Note: The workspace trust dialog is skipped when Claude is run with the -p mode. Only use this flag in directories you trust.': 'Примечание: Диалог доверия к рабочему пространству пропускается при запуске Claude с флагом -p. Используйте этот флаг только в доверенных директориях.',
  'Output format': 'Формат вывода',
  'only works with --print': 'работает только с --print',
  'Input format': 'Формат ввода',
  'Continue the most recent conversation': 'Продолжить последний разговор',
  'Resume a conversation by session ID': 'Возобновить разговор по ID сессии',
  'or open interactive picker with optional search term': 'или открыть интерактивный выбор с опциональным поисковым термином',
  'Include partial message chunks as they arrive': 'Включить частичные фрагменты сообщений по мере их поступления',
  'Enable MCP debug mode': 'Включить режим отладки MCP',
  'shows MCP server errors': 'показывает ошибки MCP сервера',
  'Recommended only for sandboxes with no internet access.': 'Рекомендуется только для песочниц без доступа к интернету.',
  'Enable bypassing all permission checks as an option, without it being enabled by default.': 'Разрешить обход всех проверок разрешений как опцию, без включения по умолчанию.',
  'Re-emit user messages from stdin back on stdout for acknowledgment': 'Повторно отправлять пользовательские сообщения из stdin обратно в stdout для подтверждения',
  'Comma or space-separated list of tool names to allow': 'Список имен разрешенных инструментов через запятую или пробел',
  'Comma or space-separated list of tool names to deny': 'Список имен запрещенных инструментов через запятую или пробел',
  'Specify the list of available tools from the built-in set.': 'Укажите список доступных инструментов из встроенного набора.',
  'Use "" to disable all tools, "default" to use all tools, or specify tool names': 'Используйте "" для отключения всех инструментов, "default" для всех инструментов, или укажите имена инструментов',
  'Only works with --print mode.': 'Работает только с режимом --print.',
  'Load MCP servers from JSON files or strings': 'Загрузить MCP серверы из JSON файлов или строк',
  'space-separated': 'разделенные пробелами',
  'Append a system prompt to the default system prompt': 'Добавить системный промпт к системному промпту по умолчанию',
  'When resuming, create a new session ID instead of reusing the original': 'При возобновлении создать новый ID сессии вместо повторного использования оригинального',
  'use with --resume or --continue': 'использовать с --resume или --continue',
  'Disable session persistence - sessions will not be saved to disk and cannot be resumed': 'Отключить сохранение сессий - сессии не будут сохраняться на диск и не могут быть возобновлены',
  'Model for the current session.': 'Модель для текущей сессии.',
  'Provide an alias for the latest model': 'Укажите псевдоним для последней модели',
  'or a model\'s full name': 'или полное имя модели',
  'Agent for the current session.': 'Агент для текущей сессии.',
  'Overrides the \'agent\' setting.': 'Переопределяет настройку \'agent\'.',
  'Beta headers to include in API requests': 'Бета-заголовки для включения в API запросы',
  'API key users only': 'только для пользователей с API ключом',
  'Enable automatic fallback to specified model when default model is overloaded': 'Включить автоматический переход на указанную модель при перегрузке модели по умолчанию',
  'Path to a settings JSON file or a JSON string to load additional settings from': 'Путь к JSON файлу настроек или JSON строка для загрузки дополнительных настроек',
  'Additional directories to allow tool access to': 'Дополнительные директории для разрешения доступа инструментов',
  'Automatically connect to IDE on startup if exactly one valid IDE is available': 'Автоматически подключиться к IDE при запуске, если доступна ровно одна валидная IDE',
  'Only use MCP servers from --mcp-config, ignoring all other MCP configurations': 'Использовать только MCP серверы из --mcp-config, игнорируя все другие конфигурации MCP',
  'Use a specific session ID for the conversation': 'Использовать конкретный ID сессии для разговора',
  'must be a valid UUID': 'должен быть валидным UUID',
  'JSON object defining custom agents': 'JSON объект, определяющий пользовательские агенты',
  'Comma-separated list of setting sources to load': 'Список источников настроек через запятую для загрузки',
  'Load plugins from directories for this session only': 'Загрузить плагины из директорий только для этой сессии',
  'repeatable': 'повторяемый',
  'Disable all slash commands': 'Отключить все slash-команды',
  'Enable Claude in Chrome integration': 'Включить интеграцию Claude в Chrome',
  'Disable Claude in Chrome integration': 'Отключить интеграцию Claude в Chrome',
  'Output the version number': 'Вывести номер версии',

  // Common phrases and words
  'error': 'ошибка',
  'Error': 'Ошибка',
  'warning': 'предупреждение',
  'Warning': 'Предупреждение',
  'Success': 'Успешно',
  'success': 'успешно',
  'Loading': 'Загрузка',
  'loading': 'загрузка',
  'Press': 'Нажмите',
  'press': 'нажмите',
  'Enter': 'Введите',
  'enter': 'введите',
  'Type': 'Введите',
  'type': 'введите',
  'Continue': 'Продолжить',
  'continue': 'продолжить',
  'Exit': 'Выход',
  'exit': 'выход',
  'Help': 'Помощь',
  'help': 'помощь',
  'Command': 'Команда',
  'command': 'команда',
  'Choose': 'Выберите',
  'choose': 'выберите',
  'Select': 'Выберите',
  'select': 'выберите',
  'Cancel': 'Отмена',
  'cancel': 'отмена',
  'Yes': 'Да',
  'yes': 'да',
  'No': 'Нет',
  'no': 'нет',
  'Done': 'Готово',
  'done': 'готово',
  'Failed': 'Не удалось',
  'failed': 'не удалось',
  'prompt': 'запрос',
  'Prompt': 'Запрос',

  // Additional common phrases
  'Display help for command': 'Показать справку по команде',
  'display help for command': 'показать справку по команде',
  'Maximum dollar amount to spend on API calls': 'Максимальная сумма в долларах для API вызовов',
  'Bypass all permission checks': 'Пропустить все проверки разрешений',
  'System prompt to use for the session': 'Системный промпт для использования в сессии',
  'Permission mode to use for the session': 'Режим разрешений для использования в сессии',

  // Common technical terms
  'choices': 'варианты',
  'default': 'по умолчанию',
  'optional': 'опционально',
  'required': 'обязательно',
  'deprecated': 'устарело',
  'DEPRECATED': 'УСТАРЕЛО',
  'Use --debug instead': 'Используйте --debug вместо этого',
  'example': 'пример',
  'Example': 'Пример',
  'e.g.': 'например',

  // Error messages
  'unknown option': 'неизвестная опция',
  'Unknown option': 'Неизвестная опция',
  'missing required argument': 'отсутствует обязательный аргумент',
  'Missing required argument': 'Отсутствует обязательный аргумент',
  'invalid value': 'неверное значение',
  'Invalid value': 'Неверное значение',
  'command not found': 'команда не найдена',
  'Command not found': 'Команда не найдена',

  // Status messages
  'Connecting': 'Подключение',
  'connecting': 'подключение',
  'Connected': 'Подключено',
  'connected': 'подключено',
  'Disconnected': 'Отключено',
  'disconnected': 'отключено',
  'Starting': 'Запуск',
  'starting': 'запуск',
  'Started': 'Запущено',
  'started': 'запущено',
  'Stopping': 'Остановка',
  'stopping': 'остановка',
  'Stopped': 'Остановлено',
  'stopped': 'остановлено',
  'Processing': 'Обработка',
  'processing': 'обработка',
  'Completed': 'Завершено',
  'completed': 'завершено',
  'Waiting': 'Ожидание',
  'waiting': 'ожидание',

  // Interactive messages
  'Are you sure?': 'Вы уверены?',
  'Confirm': 'Подтвердить',
  'confirm': 'подтвердить',
  'Abort': 'Прервать',
  'abort': 'прервать',
  'Retry': 'Повторить',
  'retry': 'повторить',
  'Skip': 'Пропустить',
  'skip': 'пропустить',
  'Save': 'Сохранить',
  'save': 'сохранить',
  'Discard': 'Отменить',
  'discard': 'отменить',

  // File and directory operations
  'File': 'Файл',
  'file': 'файл',
  'Directory': 'Директория',
  'directory': 'директория',
  'Path': 'Путь',
  'path': 'путь',
  'Create': 'Создать',
  'create': 'создать',
  'Delete': 'Удалить',
  'delete': 'удалить',
  'Update': 'Обновить',
  'update': 'обновить',
  'Read': 'Прочитать',
  'read': 'прочитать',
  'Write': 'Записать',
  'write': 'записать',

  // Session and conversation
  'Session': 'Сессия',
  'session': 'сессия',
  'Conversation': 'Разговор',
  'conversation': 'разговор',
  'Message': 'Сообщение',
  'message': 'сообщение',
  'Response': 'Ответ',
  'response': 'ответ',
  'Request': 'Запрос',
  'request': 'запрос',
};

function translateText(text) {
  let translated = text;

  // Сортируем переводы по длине (от длинных к коротким) для правильной замены
  const sortedTranslations = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);

  // Заменяем точные совпадения
  for (const [eng, rus] of sortedTranslations) {
    // Экранируем специальные символы регулярных выражений
    const escapedEng = eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Для коротких слов (1-3 символа) используем границы слов
    // Для длинных фраз - обычную замену
    let regex;
    if (eng.length <= 3 && /^[a-zA-Z]+$/.test(eng)) {
      // Короткое слово - используем границы слов \b
      regex = new RegExp('\\b' + escapedEng + '\\b', 'g');
    } else {
      // Длинная фраза или содержит не только буквы - обычная замена
      regex = new RegExp(escapedEng, 'g');
    }

    translated = translated.replace(regex, rus);
  }

  return translated;
}

// Запускаем оригинальный CLI
const cliPath = path.join(__dirname, 'cli.js');
const args = process.argv.slice(2);

const child = spawn('node', [cliPath, ...args], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: false
});

// Перехватываем stdout и переводим
child.stdout.on('data', (data) => {
  const translated = translateText(data.toString());
  process.stdout.write(translated);
});

// Перехватываем stderr и переводим
child.stderr.on('data', (data) => {
  const translated = translateText(data.toString());
  process.stderr.write(translated);
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (err) => {
  console.error('Ошибка запуска Claude:', err);
  process.exit(1);
});
