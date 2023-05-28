FROM php:7.4-apache

# Copy PHP code into container
COPY public/ /var/www/html/

# Copy configuration files into container
COPY config/ /var/www/config/

# Copy custom php.ini into container
COPY php.ini /usr/local/etc/php/

# Set Apache document root
ENV APACHE_DOCUMENT_ROOT /var/www/html

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Expose port 80 for web traffic
EXPOSE 80
