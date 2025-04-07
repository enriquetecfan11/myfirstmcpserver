# Usa una imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usará el servidor MCP
EXPOSE 3333

# Comando por defecto (se puede sobreescribir en docker-compose)
CMD ["npm", "run", "dev"]
