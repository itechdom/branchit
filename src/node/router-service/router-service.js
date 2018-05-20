//this service is responsible for switching over between a monolith and microservice
//if let's say csv-service wants to interact with passport-service, then it has to go through here
// depending on the deployment setting in config, we can either make an http request to that service or load it directly (in case of a monolith)