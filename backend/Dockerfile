FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=prod && npm cache clean --force

COPY . .

EXPOSE 7003

CMD ["npm", "start"]