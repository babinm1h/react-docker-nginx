# Установка зависимостей для development версии
FROM node:18 as development
# Установите рабочую директорию
WORKDIR /app
# Скопируйте package.json и package-lock.json для установки зависимостей
COPY package*.json ./
# Установите зависимости
RUN npm install
# Наследуемся от этапа development для сборки и запуска приложения в режиме development
FROM development as development-build
#  Копируем все файлы из текущего контекста (корневой директории проекта) внутрь контейнера
COPY . .
# Указываем команду, которая будет запускаться при старте контейнера
CMD ["npm", "start"]
# Устанавливаем окружение с переменной NODE_ENV равной "development"
ENV NODE_ENV=development



# Установка зависимостей для production версии
FROM node:18 as production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Сборка приложения для production версии
FROM production as production-build
COPY . .
RUN npm run build:prod

# Создаем образ для production версии с Nginx
FROM nginx:stable-alpine as production-nginx
# Копируем статические файлы сборки приложения в директорию Nginx
COPY --from=production-build /app/build /usr/share/nginx/html
# Копируем файл конфигурации Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Открываем порт 80 для доступа к приложению
EXPOSE 80
# Запускаем Nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]