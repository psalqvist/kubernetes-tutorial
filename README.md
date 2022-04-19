## kubernetes-tutorial

Running this tutorial depends on having kubernetes-cli, docker and minikube installed.

### Setup

#### Clone project and get dependencies
1. Start by cloning this repository.
2. cd into the directory.
3. Get proper dependencies for node server: `npm i`

### Containarize

Create the necessary docker files for containerization.

1. In the file `dockerfile` indluce the following: 

````
FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
````


