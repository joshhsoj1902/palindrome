FROM node:6-wheezy@sha256:91cc7c697eac95132c0caf8ff2ee465012d63a00ee6080a30e87bfc41b3b1037

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
RUN npm install

RUN npm run bower

# Bundle app source
#COPY . /usr/src/app

CMD [ "node", "app.js" ]
