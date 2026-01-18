# =========================
# STAGE 1: Build Frontend
# =========================
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Copy frontend dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy frontend source
COPY resources ./resources
COPY vite.config.* ./
COPY tsconfig.* ./

# Build Vite assets
RUN npm run build


# =========================
# STAGE 2: Backend (Laravel)
# =========================
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    icu-dev \
    mysql-client \
    nodejs \
    npm

# PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        intl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy backend files
COPY . .

# Copy built frontend assets
COPY --from=frontend-build /app/public/build ./public/build

# Install PHP dependencies
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Laravel optimization
RUN php artisan storage:link || true \
    && php artisan config:clear \
    && php artisan route:clear \
    && php artisan view:clear

# Permissions
RUN chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
