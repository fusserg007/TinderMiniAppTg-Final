FROM node:18-alpine

WORKDIR /app

# Устанавливаем vite глобально
RUN npm install -g vite

COPY package*.json ./

# Удаляем node_modules если они есть
RUN rm -rf node_modules
# Чистим npm кеш
RUN npm cache clean --force
# Устанавливаем зависимости заново
RUN npm install

COPY . .

# Удаляем node_modules снова если они были скопированы
RUN rm -rf node_modules
# Устанавливаем зависимости для Linux
RUN npm install

EXPOSE 5173

CMD ["sh", "-c", "vite --host"] 
