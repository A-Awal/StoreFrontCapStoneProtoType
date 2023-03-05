#sstage building the code
FROM node as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


CMD ["npm", "run", "dev"]








