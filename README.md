1. Налаштування проєкту
Для створення проєкту необхідно переконатись, що на комп'ютері встановлено Node.js. Для цього введіть в терміналі команду для перевірки її версії: node --version
Якщо у терміналі побачимо щось подібне до v18.17.0 (або новішу версію), значить Node.js вже встановлено. 
Якщо отримаємо відповідь command not found: node, то потрібно встановити LTS версію з офіційного сайту: https://nodejs.org/en
Щоб розпочати роботу з Node.js додатком:
Створюємо нову директорію (папку) для проєкту на комп'ютері, наприклад, з назвою nodejs-basics
Відкриваємо термінал і переходимо в цю директорію за допомогою команди cd nodejs-basics, або ж відкриваємо термінал вже у вказаній папці.
У терміналі за допомогою NPM ініціалізуємо новий проєкт Node.js командою: npm init -y
Ця команда створить файл package.json у корені проєкту, який автоматично заповниться дефолтними метаданими:
{
  "name": "nodejs-basics",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
Завжди можна внести зміни в цей файл, адаптувавши його зміст до специфіки проєкту.

1.1. Виконання коду
Створюємо папку src, де буде зберігатися весь код, і створюємо у ній перший JavaScript файл index.js з таким вмістом:
// src/index.js
const message = 'Hello world';
console.log(message);
JavaScript код можна виконати за допомогою команди node, вказавши після неї шлях до файлу, код в якому потрібно виконати:
node src/index.js
2.1 Автоматизація виконання коду
   Щоб автоматизувати цей процес, використовуємо пакети nodemon (https://www.npmjs.com/package/nodemon).
   Nodemon - інструмент для розробки на Node.js, який дозволяє автоматично перезапускати сервер після змін у вихідних файлах.
Встановлюємо їх як залежності розробки командою: npm install --save-dev nodemon
Додайте скрипт у файлі package.json для запуску додатка:
"scripts": {
    "dev": "nodemon src/index.js"
}
Тепер можна запускати додаток за допомогою команди npm run dev, і він буде автоматично перезапускатися при збереженні змін у файлах JavaScript.
1.2. ESLint
   Лінтінг коду відповідно до стандарту — важлива складова кожного проєкту. Це дозволяє задати певний стиль написання коду для всієї команди
   та контролювати дотримання певних кращих практик. Для роботи з ESLint у VS Code вам потрібно встановити плагін ESLint.
   https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
   Етапи ініціалізації ESlint у проєкті командою npm init @eslint/config@latest
   Налаштування лінтінгу з ESLint може бути складним через об’єм можливих налаштувань.
   Якщо працюємо у Windows, то можемо зіткнутися з проблемою: Prettier скаржиться на "неправильні" символи кінця рядка.
   Це відбувається тому, що Windows і Unix-подібні системи (Linux, MacOS) використовують різні символи для позначення кінця рядка у текстових файлах.
   Windows використовує комбінацію символів повернення каретки та переводу рядка (\\r\\n), в той час, як Unix-подібні системи використовують лише перевід рядка (\\n).
   Це розходження може призвести до помилок, коли код, створений у Windows, перевіряється або виконується на системі з Unix-подібними кінцями рядків.

   Просте додавання настройки в конфігураційний файл Prettier може не розв'язати проблему, тому що сам інструмент форматування може не мати прямого контролю над тим,
   як інші інструменти або редактор коду обробляють символи кінця рядка.

   Оптимальним варіантом розв'язання цієї проблеми є використання файлу .editorconfig у вашому проєкті.
   .editorconfig допомагає розробникам визначати та підтримувати послідовні стилі форматування коду в різних редакторах і середовищах. Для цього:
   - Створюємо файл .editorconfig у кореневій директорії проєкту. Цей файл міститиме налаштування, які забезпечать використання єдиних символів кінця рядка, незалежно від ОС.
   - Встановіть розширення EditorConfig для Visual Studio Code. Перейдіть на сторінку розширення EditorConfig у Marketplace Visual Studio Code і встановіть його.
     Це розширення дозволить VS Code автоматично застосовувати налаштування, вказані у файлі .editorconfig.
   У файлі .editorconfig потрібно вказати бажані налаштування, наприклад, використання символу \\n для кінця рядка на всіх платформах:
//**.editorconfig**

root = true

[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

Ці налаштування допоможуть уникнути проблем, пов'язаних із різницею у символах кінця рядка між різними операційними системами, та забезпечити більш гладку роботу з кодом

1.3. Файли налаштувань
Додаємо в корінь проєкта файли конфігурацій з наступним вмістом:
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}

// eslint.config.mjs (.js/.cjs)

import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: { 
	    semi: 'error', 
	    'no-unused-vars': ['error', { args: 'none' }], 
	    'no-undef': 'error' 
	  },
  },
];
Внесемо зміни до файлу package.json:
// package.json

{
  "name": "nodejs-basics",
  "version": "1.0.0",
  "description": "",
  "type":"module",
  "main": "src/index.js",
  "scripts": {
    "lint": "eslint src/**/*.js",
    "start": "node ./src/index.js",
    "dev": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "Alexander Repeta <a.repeta@goit.global>",
  "license": "ISC",
  "devDependencies": {
    "@eslint/js": "^9.2.0",
    "eslint": "^9.2.0",
    "globals": "^15.1.0",
    "nodemon": "^3.1.0"
  }
}
Додаємо у проєкт файл .gitignore з виключеннями:
//.gitignore

/node_modules

.env

.vscode
.DS_Store
.idea
