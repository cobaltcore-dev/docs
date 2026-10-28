FROM node:26-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "docs:dev", "--", "--host=0.0.0.0"]