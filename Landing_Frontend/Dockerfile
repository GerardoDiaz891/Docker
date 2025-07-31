# Imagen base oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código restante
COPY . .

# Expone el puerto de Vite (por defecto 5173)
EXPOSE 5173

# Inicia Vite en modo desarrollo (usa VITE_API_URL del .env)
CMD ["npm", "run", "dev"]
