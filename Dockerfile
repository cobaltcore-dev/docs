# SPDX-FileCopyrightText: SAP SE or an SAP affiliate company
# SPDX-License-Identifier: Apache-2.0
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "docs:dev", "--", "--host=0.0.0.0"]