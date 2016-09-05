FROM node:6.2.2-wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
#TODO: It's usually best to do this after the npm install so that the
#      npm install doesn't need happen everytime the src changes.
#      In this case I have steps in the postinstall that need these
#      files here... Should review
COPY . /usr/src/app

# Install app dependencies
#COPY package.json /usr/src/app/
RUN npm install --unsafe-perm

# Bundle app source
#COPY . /usr/src/app

EXPOSE 80
CMD [ "node", "app.js" ]
