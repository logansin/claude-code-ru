#!/usr/bin/env node

// Русская локализация для Claude Code
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Словарь переводов
const translations = {
  // Help screen - main
  'Usage: claude [options] [command] [prompt]': 'Использование: claude [options] [command] [prompt]',
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
  'stable, latest, or specific version': 'stable, latest, или конкретная версия',

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
  'Use "" to disable all tools, "default" to use all tools, or specify tool names': 'Используйте "" для отключения всех инструментов, default для всех инструментов, или укажите имена инструментов',
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

  // Interactive session phrases
  'Welcome back': 'С возвращением',
  'Welcome': 'Добро пожаловать',
  'Starting interactive session': 'Запуск интерактивной сессии',
  'Resuming session': 'Возобновление сессии',
  'New session': 'Новая сессия',
  'Session ID': 'ID сессии',
  'You': 'Вы',
  'Assistant': 'Ассистент',
  'Thinking': 'Думаю',
  'Working': 'Работаю',

  // Tool and permission messages
  'Tool': 'Инструмент',
  'tool': 'инструмент',
  'Tools': 'Инструменты',
  'tools': 'инструменты',
  'Permission required': 'Требуется разрешение',
  'Allow': 'Разрешить',
  'allow': 'разрешить',
  'Deny': 'Запретить',
  'deny': 'запретить',
  'Always': 'Всегда',
  'always': 'всегда',
  'Never': 'Никогда',
  'never': 'никогда',
  'This time only': 'Только в этот раз',
  'Do you want to allow': 'Хотите разрешить',
  'Do you trust this directory': 'Доверяете ли вы этой директории',
  'Trust': 'Доверять',
  'trust': 'доверять',

  // Token and budget messages
  'Token': 'Токен',
  'token': 'токен',
  'Tokens': 'Токены',
  'tokens': 'токены',
  'Budget': 'Бюджет',
  'budget': 'бюджет',
  'Cost': 'Стоимость',
  'cost': 'стоимость',
  'Usage': 'Использование',
  'usage': 'использование',
  'Remaining': 'Осталось',
  'remaining': 'осталось',
  'Exceeded': 'Превышено',
  'exceeded': 'превышено',

  // Model messages
  'Model': 'Модель',
  'model': 'модель',
  'Models': 'Модели',
  'models': 'модели',
  'Switching to': 'Переключение на',
  'Using model': 'Используется модель',
  'Current model': 'Текущая модель',
  'Available models': 'Доступные модели',

  // Common UI phrases
  'Press Enter to continue': 'Нажмите Enter для продолжения',
  'Press any key': 'Нажмите любую клавишу',
  'Type your message': 'Введите ваше сообщение',
  'How can I help you': 'Чем я могу вам помочь',
  'What would you like to do': 'Что вы хотите сделать',
  'Ready': 'Готово',
  'ready': 'готово',
  'Busy': 'Занят',
  'busy': 'занят',
  'Idle': 'Простой',
  'idle': 'простой',

  // Search and navigation
  'Search': 'Поиск',
  'search': 'поиск',
  'Find': 'Найти',
  'find': 'найти',
  'Next': 'Далее',
  'next': 'далее',
  'Previous': 'Назад',
  'previous': 'назад',
  'Back': 'Назад',
  'back': 'назад',
  'Forward': 'Вперед',
  'forward': 'вперед',

  // Status and progress
  'In progress': 'В процессе',
  'in progress': 'в процессе',
  'Pending': 'В ожидании',
  'pending': 'в ожидании',
  'Complete': 'Завершено',
  'complete': 'завершено',
  'Incomplete': 'Не завершено',
  'incomplete': 'не завершено',
  'Running': 'Выполняется',
  'running': 'выполняется',

  // Actions
  'Run': 'Запустить',
  'run': 'запустить',
  'Execute': 'Выполнить',
  'execute': 'выполнить',
  'Stop': 'Остановить',
  'stop': 'остановить',
  'Restart': 'Перезапустить',
  'restart': 'перезапустить',
  'Reset': 'Сбросить',
  'reset': 'сбросить',
  'Clear': 'Очистить',
  'clear': 'очистить',
  'Copy': 'Копировать',
  'copy': 'копировать',
  'Paste': 'Вставить',
  'paste': 'вставить',
  'Cut': 'Вырезать',
  'cut': 'вырезать',

  // Authentication and configuration
  'Authentication': 'Аутентификация',
  'authentication': 'аутентификация',
  'Logged in': 'Вход выполнен',
  'logged in': 'вход выполнен',
  'Logged out': 'Выход выполнен',
  'logged out': 'выход выполнен',
  'Login': 'Войти',
  'login': 'войти',
  'Logout': 'Выйти',
  'logout': 'выйти',
  'Configuration': 'Конфигурация',
  'configuration': 'конфигурация',
  'Settings': 'Настройки',
  'settings': 'настройки',

  // Common verbs and actions
  'Open': 'Открыть',
  'open': 'открыть',
  'Close': 'Закрыть',
  'close': 'закрыть',
  'Submit': 'Отправить',
  'submit': 'отправить',
  'Send': 'Отправить',
  'send': 'отправить',
  'Receive': 'Получить',
  'receive': 'получить',
  'Download': 'Скачать',
  'download': 'скачать',
  'Upload': 'Загрузить',
  'upload': 'загрузить',
  'Install': 'Установить',
  'install': 'установить',
  'Uninstall': 'Удалить',
  'uninstall': 'удалить',

  // Time-related
  'Now': 'Сейчас',
  'now': 'сейчас',
  'Today': 'Сегодня',
  'today': 'сегодня',
  'Yesterday': 'Вчера',
  'yesterday': 'вчера',
  'Tomorrow': 'Завтра',
  'tomorrow': 'завтра',
  'Recent': 'Недавние',
  'recent': 'недавние',
  'Latest': 'Последние',
  'latest': 'последние',

  // Size and quantity
  'Small': 'Маленький',
  'small': 'маленький',
  'Medium': 'Средний',
  'medium': 'средний',
  'Large': 'Большой',
  'large': 'большой',
  'All': 'Все',
  'all': 'все',
  'None': 'Нет',
  'none': 'нет',
  'Some': 'Некоторые',
  'some': 'некоторые',

  // Quality and state
  'Good': 'Хорошо',
  'good': 'хорошо',
  'Bad': 'Плохо',
  'bad': 'плохо',
  'Better': 'Лучше',
  'better': 'лучше',
  'Worse': 'Хуже',
  'worse': 'хуже',
  'Best': 'Лучшее',
  'best': 'лучшее',
  'Worst': 'Худшее',
  'worst': 'худшее',
  'New': 'Новый',
  'new': 'новый',
  'Old': 'Старый',
  'old': 'старый',
  'Current': 'Текущий',
  'current': 'текущий',
  'Active': 'Активный',
  'active': 'активный',
  'Inactive': 'Неактивный',
  'inactive': 'неактивный',
  'Enabled': 'Включено',
  'enabled': 'включено',
  'Disabled': 'Отключено',
  'disabled': 'отключено',

  // Data and information
  'Data': 'Данные',
  'data': 'данные',
  'Information': 'Информация',
  'information': 'информация',
  'Details': 'Детали',
  'details': 'детали',
  'Description': 'Описание',
  'description': 'описание',
  'Name': 'Имя',
  'name': 'имя',
  'Value': 'Значение',
  'value': 'значение',
  'Key': 'Ключ',
  'key': 'ключ',
  'ID': 'ID',
  'Version': 'Версия',
  'version': 'версия',

  // Network and connectivity
  'Online': 'Онлайн',
  'online': 'онлайн',
  'Offline': 'Офлайн',
  'offline': 'офлайн',
  'Network': 'Сеть',
  'network': 'сеть',
  'Connection': 'Соединение',
  'connection': 'соединение',
  'Timeout': 'Таймаут',
  'timeout': 'таймаут',

  // Results and output
  'Result': 'Результат',
  'result': 'результат',
  'Results': 'Результаты',
  'results': 'результаты',
  'Output': 'Вывод',
  'output': 'вывод',
  'Input': 'Ввод',
  'input': 'ввод',
  'Found': 'Найдено',
  'found': 'найдено',
  'Not found': 'Не найдено',
  'not found': 'не найдено',
  'Available': 'Доступно',
  'available': 'доступно',
  'Unavailable': 'Недоступно',
  'unavailable': 'недоступно',
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

// Пытаемся использовать node-pty для интерактивного режима
let pty;
try {
  pty = require('node-pty');
} catch (e) {
  // node-pty не установлен, используем обычный spawn
  pty = null;
}

const isInteractive = process.stdout.isTTY && process.stdin.isTTY && !args.includes('--help') && !args.includes('-h');

if (isInteractive && pty && os.platform() === 'win32') {
  // Windows + PTY + интерактивный режим - используем node-pty для перевода
  const shell = pty.spawn(process.execPath, [cliPath, ...args], {
    name: 'xterm-color',
    cols: process.stdout.columns || 80,
    rows: process.stdout.rows || 24,
    cwd: process.cwd(),
    env: process.env
  });

  // Перехватываем вывод и переводим
  shell.onData((data) => {
    const translated = translateText(data);
    process.stdout.write(translated);
  });

  // Передаем ввод от stdin в PTY
  process.stdin.setRawMode(true);
  process.stdin.on('data', (data) => {
    shell.write(data.toString());
  });

  // Обрабатываем изменение размера терминала
  process.stdout.on('resize', () => {
    shell.resize(process.stdout.columns || 80, process.stdout.rows || 24);
  });

  shell.onExit(({ exitCode }) => {
    process.stdin.setRawMode(false);
    process.exit(exitCode);
  });

  // Обрабатываем сигналы
  process.on('SIGINT', () => {
    shell.kill();
  });

  process.on('SIGTERM', () => {
    shell.kill();
  });

} else {
  // Неинтерактивный режим или нет PTY - используем обычный spawn
  const child = spawn(process.execPath, [cliPath, ...args], {
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
}
