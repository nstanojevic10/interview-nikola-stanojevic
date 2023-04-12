# Izvorišna slika: node:latest
FROM node:latest

# Postavi radni direktorijum u /app
WORKDIR /app

# Kopiraj package.json i package-lock.json u /app
COPY package*.json ./

# Instaliraj zavisnosti
RUN npm install

# Kopiraj sve fajlove u /app
COPY . .

# Pokreni ReactJS aplikaciju
CMD ["npm", "start"]
