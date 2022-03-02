# How this repository is organized

This repository is broken down into two parts: this README.md is in the root of the repository and contains source code to run an *Express* node server with a proxy. The second part is in the *grocery-list* folder which contains the Angular application.


This was done this way to facilitate deployment to *Heroku* since it looks in the root folder to decide how to deploy. This deployment strategy was chosen for its simplicity for resolving the issue with *CORS* and it follows the approach used by *ng serve*.

Some ideas for this approach were found here:
https://www.javaguides.net/2020/11/how-to-deploy-angular-application-to-heroku.html

https://blog.logrocket.com/how-a-proxy-server-works-in-node-js/


## How to access the application 

The application is deployed to *Heroku* and can be accessed with this link:
https://my-grocery-list-app-fe.herokuapp.com/