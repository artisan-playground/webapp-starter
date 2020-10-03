# https://hub.docker.com/_/node
FROM node:lts

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
RUN ls -l
COPY package*.json ./

ENV NODE_ENV=production

# Install production dependencies.
# RUN npm install --only=production

# Copy local code to the container image.
COPY . /usr/src/app
# RUN npm install --only=production
RUN yarn install --production

RUN  ./build.sh vue-app
# COPY build.sh ./
# RUN pwd
# COPY ./vue-app ./
# COPY ./vue-app/dist ./dist
# COPY ./react-app/build ./dist

COPY ./server.js .

# Run the web service on container startup.
CMD [ "node", "server.js" ]