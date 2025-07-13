# Развертывание в продакшене

## Пошаговая инструкция

### 1. Подготовка

Убедитесь, что:
- Домен `tindertgminiapp.shop` настроен и указывает на ваш сервер
- Порты 80 и 443 открыты в файрволе
- Docker и Docker Compose установлены

### 2. Первый запуск (без SSL)

```bash
# Переименуем SSL конфигурацию временно
mv nginx/conf.d/default.conf nginx/conf.d/default.conf.ssl
mv nginx/conf.d/initial.conf nginx/conf.d/default.conf

# Запускаем сервисы без certbot
docker-compose -f docker-compose.prod.yml up -d mongo object-storage imgproxy backend frontend nginx
```

### 3. Получение SSL сертификата

```bash
# Ждем запуска сервисов
sleep 30

# Получаем сертификат
docker-compose -f docker-compose.prod.yml run --rm certbot \
  certonly --webroot --webroot-path=/var/www/certbot \
  --email your-email@example.com --agree-tos --no-eff-email \
  -d tindertgminiapp.shop
```

### 4. Включение SSL

```bash
# Возвращаем SSL конфигурацию
mv nginx/conf.d/default.conf nginx/conf.d/initial.conf.bak
mv nginx/conf.d/default.conf.ssl nginx/conf.d/default.conf

# Перезапускаем nginx
docker-compose -f docker-compose.prod.yml restart nginx

# Запускаем certbot для автообновления
docker-compose -f docker-compose.prod.yml up -d certbot
```

### 5. Проверка

```bash
# Проверяем статус всех сервисов
docker-compose -f docker-compose.prod.yml ps

# Проверяем логи
docker-compose -f docker-compose.prod.yml logs nginx
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs frontend
```

### 6. Настройка Telegram бота

Обновите webhook URL в настройках бота:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://tindertgminiapp.shop/api/webhook
```

## Полезные команды

```bash
# Остановка всех сервисов
docker-compose -f docker-compose.prod.yml down

# Перезапуск сервиса
docker-compose -f docker-compose.prod.yml restart <service_name>

# Просмотр логов
docker-compose -f docker-compose.prod.yml logs -f <service_name>

# Обновление образов
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## Мониторинг

- Сайт: https://tindertgminiapp.shop
- API: https://tindertgminiapp.shop/api/health
- SSL сертификат обновляется автоматически каждые 12 часов

## Устранение неполадок

1. **Ошибка "No closing quotation"** - проверьте синтаксис в docker-compose.prod.yml
2. **Nginx не запускается** - проверьте конфигурацию в nginx/conf.d/
3. **SSL ошибки** - убедитесь, что сертификат получен и файлы существуют
4. **API недоступен** - проверьте логи backend сервиса
