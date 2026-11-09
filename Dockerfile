FROM node:26-alpine
# The predocs:dev hook runs hack/sync-cobaltcore.sh, which needs bash and git
# to clone C5C3/cobaltcore into the mounted docs/_upstream/cobaltcore.
RUN apk add --no-cache bash git
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY hack/sync-cobaltcore.sh hack/
EXPOSE 5173
CMD ["npm", "run", "docs:dev", "--", "--host=0.0.0.0"]
