# # koristi se najnovija Node.js slika kao baza
# FROM node:latest
# koristi se najnovija Node.js slika kao baza
FROM node:latest

# postavi radni direktorij
WORKDIR /app

# kopiraj package.json i package-lock.json datoteke
COPY package*.json ./

# instaliraj dependecies
RUN npm install

# kopiraj ostatak aplikacije
COPY . .

# postavi skriptu za pokretanje aplikacije
CMD ["node", "index.js"]

