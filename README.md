# backend and frontend

## Настройка проекта

**1.** Клонируйте репозиторий:
```
git clone https://github.com/AntonGrigoriev-git/Development.git
```

**2.** Перейдите в директорию проекта, где находится `manage.py`:
```
cd .\Development\ProjectFlow\
```

**3.** Создайте виртуальное окружение:
- **Windows**:
```
python -m venv venv
```
- **macOS и Linux**:
```
python3 -m venv venv
```

**4.** Активируйте виртуальное окружение:
- **Windows**:
```
.\venv\Scripts\Activate
```
- **macOS и Linux**:
```
source venv/bin/activate
```

**5.** Установите зависимости:
```
pip install -r requirements.txt
```

**6.** Выполните миграции:
```
python manage.py migrate
```

**7.** Убедитесь, что у вас установлен Node.js и npm. Установите зависимости для фронтенда:
```
cd frontend # Перейдите в директорию с Vue.js приложением
npm install # После установки могут появиться "8 vulnerabilities (4 moderate, 4 high)". На запуск сервера это не повлияет.
```

**8.** Запустите оба сервера (Django и Vue.js) с помощью команды:
```
npm run start
```

**Примечание**
```
Если вы сталкиваетесь с проблемами импорта в файлах Django, выполните следующие шаги в Visual Studio Code:

1. Откройте командную палитру, нажав Ctrl + Shift + P (или Cmd + Shift + P на macOS), и выберите "Python: Select Interpreter"
   (или выберите интерпретатор Python, нажав на панель состояния в правом нижнем углу).
2. Переключитесь с Global на Recommended (venv).
3. Если Recommended не отображается, нажмите "Find" и выберите путь к вашему виртуальному окружению:
   - Для Windows: `.\ProjectFlow\venv\Scripts\python.exe`
   - Для macOS и Linux: `ProjectFlow/venv/bin/python`
```