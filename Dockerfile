# Build stage
FROM nginx:alpine

# Copier tous les fichiers du site
COPY . /usr/share/nginx/html/

# Configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]