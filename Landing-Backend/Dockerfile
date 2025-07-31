# Dockerfile en Landing_Backend/

FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "dev"]
