FROM node:12.9.0

# set working directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent

COPY . .

# expose start app
CMD ["npm", "start"]