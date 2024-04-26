FROM node:lts-alpine
EXPOSE 4000
ENV DB_HOST=host.docker.internal
COPY package.json package-lock.json ./
RUN npm install --production
COPY . ./app
WORKDIR /app
CMD ["node", "."]
