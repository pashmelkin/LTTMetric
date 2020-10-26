FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4500
CMD [ "npm", "start" ]
