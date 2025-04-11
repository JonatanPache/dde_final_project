# Usa una imagen oficial de Node.js como base
FROM node:22-slim

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Copia el script wait-for-it.sh al contenedor
COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Expone el puerto en el que corre tu app
EXPOSE 3004

# Comando para ejecutar la app después de esperar a MySQL
CMD ["sh", "-c", "sleep 3 && wait-for-it mysql:3306 -- node index.js"]
