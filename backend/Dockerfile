FROM node:lts-alpine
EXPOSE 4000
COPY package.json package-lock.json ./
RUN npm install --production
COPY . ./app
WORKDIR /app
CMD ["node", "."]
