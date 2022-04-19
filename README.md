## kubernetes-tutorial

Running this tutorial depends on having kubernetes-cli, docker and minikube installed.

### Setup

#### Clone project and get dependencies
1. Start by cloning this repository.
2. cd into the directory.
3. Get proper dependencies for node server: `npm i`

### Containerize

Create the necessary docker files for containerization.

1. In the file `dockerfile` include the following: 

````
FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
````

2. Create docker image by running the following in terminal:

````
docker build -t <docker-hub-id>/<project-name> .
````

### Push to docker hub

1. Login to docker by running `docker login` in terminal and specify username and password when prompted.
2. Push docker image to docker hub by running `docker push <docker-hub-id>/<project-name>:<tag>`

### Kubernetes deployment file and loadbalancer file

1. Create the deployment file by inserting the following into deploy.yml:

````
# configuration for deployment of container to kubernetes

apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubernetes-tutorial-deployment
  labels:
    app: kubernetes-tutorial
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kubernetes-tutorial
  template:
    metadata:
      labels:
        app: kubernetes-tutorial 
    spec:
      containers:
      - name: nodeserver
        image: psalqvist/kubernetes-tutorial:latest
        ports:
        - containerPort: 3000
````

2. Create loadbalancer by inserting the following into loadBalancer.yml:

````
# expose backend using load balancer

apiVersion: v1
kind: Service
metadata:
  name: kubernetes-tutorial-service
spec:
  selector:
    app: kubernetes-tutorial 
  type: LoadBalancer
  ports:
  - protocol: TCP
    port: 5000
    targetPort: 3000
    nodePort: 31110
````

### Deploy to Kubernetes

1. Run the following commands

`kubectl apply -f deploy.yml`
`kubectl apply -f loadBalancer.yml`

2. Expose the backend by running: `minikube service kubernetes-tutorial-service`

The endpoints should now be able to be accessed from the browser at you machines ip followed by the endpoints.





