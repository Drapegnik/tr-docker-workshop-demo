FROM node:current-alpine3.19 as builder 
# as [name] describes the stage's name
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM busybox:1.35 
# Using a smaller image
WORKDIR /home/static
COPY --from=builder app/dist .
# Copies the files we created on builder
EXPOSE 3000
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"] 
# Serves files on port 3000
