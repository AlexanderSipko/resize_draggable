# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



docker run -d \
  --name my-postgres \
  -e POSTGRES_PASSWORD=my_secret_password \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_DB=mydb \
  -v $(pwd)/postgres-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:12

# запускаем в фоновом режиме
# устанавливаем пароль
# определяем юзера
# определяем имя БД
# пробрасываем тома
# порт для доступа
# версию базы данных
