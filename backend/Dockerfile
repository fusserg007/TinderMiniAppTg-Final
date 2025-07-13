FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g ts-node-dev typescript

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

CMD ["npm", "run", "dev"] 
