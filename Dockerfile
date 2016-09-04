FROM node:6.2.2-wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --unsafe-perm

# Bundle app source
COPY . /usr/src/app

EXPOSE 80
CMD [ "node", "app.js" ]
